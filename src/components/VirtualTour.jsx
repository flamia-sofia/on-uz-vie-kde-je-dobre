import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Compass,
  DoorOpen,
  Fish,
  Lock,
  MapPin,
  Maximize2,
  Minimize2,
  Move,
  RotateCw,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Annotation from "./Annotation.jsx";
import MiniMap from "./MiniMap.jsx";
import {
  defaultRoomId,
  directions,
  getAnnotations,
  getRoomById,
  roomNavigationHotspots,
} from "../data/tourData.js";

function getSceneBackground(room) {
  if (room.scene.panoramaUrl) {
    return `url("${room.scene.panoramaUrl}")`;
  }

  if (room.scene.imageUrl) {
    return `url("${room.scene.imageUrl}")`;
  }

  return room.scene.fallback;
}

function getDirectionIndex(direction) {
  return directions.findIndex((item) => item.value === direction);
}

function normalizeAngle(value) {
  return ((value % 360) + 360) % 360;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

const ANCHOR_AUTHORING_FOV = 90;
const STANDARD_SCENE_FOV = 92;
const IMMERSIVE_SCENE_FOV = 68;
const HOTSPOT_EDGE_BUFFER = 10;

function getNearestDirection(angle) {
  const normalizedAngle = normalizeAngle(angle);
  const index = Math.round(normalizedAngle / 90) % directions.length;

  return directions[index].value;
}

function getPanoramaPosition(angle) {
  return clamp(50 + (normalizeAngle(angle) / 360) * 100, 0, 100);
}

function getSignedAngleDelta(targetAngle, viewAngle) {
  return normalizeAngle(targetAngle - viewAngle + 180) - 180;
}

function getSceneAnchorBearing(point) {
  const directionAngle = point.direction ?? 0;
  const localOffset = ((point.x ?? 50) - 50) * (ANCHOR_AUTHORING_FOV / 100);

  return normalizeAngle(directionAngle + localOffset);
}

function getProjectedScenePosition(point, viewAngle, fieldOfView) {
  const delta = getSignedAngleDelta(getSceneAnchorBearing(point), viewAngle);
  const x = 50 + (delta / fieldOfView) * 100;

  return {
    x,
    y: point.y,
    isVisible: x >= -HOTSPOT_EDGE_BUFFER && x <= 100 + HOTSPOT_EDGE_BUFFER,
  };
}

function NavigationHotspot({ hotspot, position, onNavigate }) {
  function handleNavigate(event) {
    event.stopPropagation();
    onNavigate(hotspot.targetRoomId, hotspot.arrivalAngle);
  }

  return (
    <motion.button
      type="button"
      initial={false}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.12 }}
      onPointerDown={(event) => event.stopPropagation()}
      onClick={handleNavigate}
      aria-label={hotspot.label}
      className="absolute z-30 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-ivory/50 bg-charcoal/72 px-3 py-2 text-xs font-semibold text-ivory shadow-[0_16px_36px_rgba(0,0,0,0.28)] backdrop-blur transition hover:border-mustard hover:bg-mustard hover:text-charcoal sm:px-4 sm:text-sm"
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ivory/14">
        <DoorOpen className="h-4 w-4" />
      </span>
      <span className="max-w-[8.5rem] text-left leading-tight sm:max-w-[11rem]">{hotspot.label}</span>
      <ArrowRight className="h-4 w-4 shrink-0" />
    </motion.button>
  );
}

export default function VirtualTour({ selectedAnimal, currentRoom, currentRoomId, onRoomChange }) {
  const [viewAngle, setViewAngle] = useState(0);
  const [activeAnnotationId, setActiveAnnotationId] = useState(null);
  const [isImmersive, setIsImmersive] = useState(false);
  const [isSliderDragging, setIsSliderDragging] = useState(false);

  const canMove = selectedAnimal.canMove;
  const roomForAnimal = selectedAnimal.id === "fish" ? getRoomById(defaultRoomId) : currentRoom;
  const connectedRooms = roomForAnimal.connectedTo;
  const direction = useMemo(() => getNearestDirection(viewAngle), [viewAngle]);
  const sceneFieldOfView = isImmersive ? IMMERSIVE_SCENE_FOV : STANDARD_SCENE_FOV;
  const navigationHotspots = useMemo(() => {
    if (!canMove) return [];
    return roomNavigationHotspots[roomForAnimal.id] ?? [];
  }, [canMove, roomForAnimal.id]);

  const allAnnotations = useMemo(() => {
    const roomId = selectedAnimal.id === "fish" ? defaultRoomId : roomForAnimal.id;
    return getAnnotations(selectedAnimal.id, roomId);
  }, [roomForAnimal.id, selectedAnimal.id]);

  const projectedAnnotations = useMemo(
    () =>
      allAnnotations
        .map((annotation, index) => ({
          annotation,
          index,
          position: getProjectedScenePosition(annotation, viewAngle, sceneFieldOfView),
        }))
        .filter(({ position }) => position.isVisible),
    [allAnnotations, sceneFieldOfView, viewAngle]
  );

  const projectedNavigationHotspots = useMemo(
    () =>
      navigationHotspots
        .map((hotspot) => ({
          hotspot,
          position: getProjectedScenePosition(hotspot, viewAngle, sceneFieldOfView),
        }))
        .filter(({ position }) => position.isVisible),
    [navigationHotspots, sceneFieldOfView, viewAngle]
  );

  const activeAnnotation =
    allAnnotations.find((annotation) => annotation.id === activeAnnotationId) ??
    allAnnotations[0];

  useEffect(() => {
    if (selectedAnimal.id === "fish" && currentRoomId !== defaultRoomId) {
      onRoomChange(defaultRoomId);
    }
  }, [currentRoomId, onRoomChange, selectedAnimal.id]);

  useEffect(() => {
    setActiveAnnotationId(allAnnotations[0]?.id ?? null);
  }, [roomForAnimal.id, selectedAnimal.id]);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsImmersive(false);
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isImmersive ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isImmersive]);

  function rotate(step) {
    const currentIndex = getDirectionIndex(direction);
    const nextIndex = (currentIndex + step + directions.length) % directions.length;
    setViewAngle(directions[nextIndex].value);
  }

  function moveTo(roomId, arrivalAngle = 0) {
    if (!canMove) return;
    onRoomChange(roomId);
    setViewAngle(arrivalAngle);
  }

  function selectAnnotation(annotation, options = {}) {
    setActiveAnnotationId(annotation.id);

    if (options.focus) {
      setViewAngle(getSceneAnchorBearing(annotation));
    }
  }

  function cycleAnnotation(step) {
    if (!allAnnotations.length) return;

    const activeIndex = Math.max(
      allAnnotations.findIndex((annotation) => annotation.id === activeAnnotation?.id),
      0
    );
    const nextIndex = (activeIndex + step + allAnnotations.length) % allAnnotations.length;
    selectAnnotation(allAnnotations[nextIndex], { focus: true });
  }

  function toggleImmersive() {
    setIsImmersive((current) => !current);
  }

  function getSliderAngle(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const progress = clamp((event.clientX - rect.left) / rect.width, 0, 1);

    return Math.round(progress * 359);
  }

  function handleSliderPointerDown(event) {
    event.stopPropagation();
    setIsSliderDragging(true);
    setViewAngle(getSliderAngle(event));
    event.currentTarget.setPointerCapture?.(event.pointerId);
  }

  function handleSliderPointerMove(event) {
    if (!isSliderDragging) return;
    event.stopPropagation();
    setViewAngle(getSliderAngle(event));
  }

  function handleSliderPointerUp(event) {
    setIsSliderDragging(false);
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  }

  function handleSliderKeyDown(event) {
    const currentAngle = Math.round(normalizeAngle(viewAngle));
    const step = event.shiftKey ? 15 : 5;
    let nextAngle = currentAngle;

    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      nextAngle = clamp(currentAngle + step, 0, 359);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      nextAngle = clamp(currentAngle - step, 0, 359);
    } else if (event.key === "Home") {
      nextAngle = 0;
    } else if (event.key === "End") {
      nextAngle = 359;
    } else {
      return;
    }

    event.preventDefault();
    setViewAngle(nextAngle);
  }

  const sliderId = `tour-angle-slider-${selectedAnimal.id}-${roomForAnimal.id}`;
  const sliderValue = Math.round(normalizeAngle(viewAngle));
  const sliderProgress = (sliderValue / 359) * 100;

  return (
    <section id="obhliadka" className="scroll-mt-16 bg-linen/74 py-20 sm:py-24">
      <div className="premium-container">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            <div className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-semibold uppercase text-mustard">Interaktívna obhliadka</p>
                <h2 className="mt-3 font-serif text-4xl leading-tight text-charcoal sm:text-5xl">
                  Byt cez oči {selectedAnimal.shortLabel}.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-graphite/72">
                  {selectedAnimal.headline} {selectedAnimal.description}
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-charcoal/10 bg-white/60 p-1 shadow-sm">
                <button
                  type="button"
                  onClick={() => rotate(-1)}
                  className="grid h-10 w-10 place-items-center rounded-full text-charcoal transition hover:bg-linen"
                  aria-label="Otočiť pohľad doľava"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="inline-flex min-w-32 items-center justify-center gap-2 px-2 text-sm font-semibold text-charcoal">
                  <RotateCw className="h-4 w-4 text-mustard" />
                  {directions.find((item) => item.value === direction)?.label}
                </span>
                <button
                  type="button"
                  onClick={() => rotate(1)}
                  className="grid h-10 w-10 place-items-center rounded-full text-charcoal transition hover:bg-linen"
                  aria-label="Otočiť pohľad doprava"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div
              className={`tour-shell overflow-hidden border border-charcoal/10 bg-charcoal shadow-soft ${
                isImmersive
                  ? "fixed inset-0 z-[9999] rounded-none border-0"
                  : "rounded-[32px]"
              }`}
            >
              <div className="tour-layout">
                <div
                  className={`tour-scene relative min-h-[520px] overflow-hidden select-none sm:min-h-[610px] ${
                    isImmersive ? "tour-scene--immersive" : ""
                  }`}
                >
                  <motion.div
                    key={`${roomForAnimal.id}-${selectedAnimal.id}`}
                    className="scene-panorama absolute inset-0"
                    data-direction={direction}
                    initial={{ scale: 1.04, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    style={{
                      backgroundImage: getSceneBackground(roomForAnimal),
                      backgroundPosition: `${getPanoramaPosition(viewAngle)}% center`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: roomForAnimal.scene.panoramaUrl
                        ? isImmersive
                          ? "auto 154%"
                          : "auto 112%"
                        : "cover",
                    }}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(32,31,28,0.28)_0%,rgba(32,31,28,0.12)_38%,rgba(32,31,28,0.56)_100%)]" />
                  <div className="absolute inset-x-0 top-0 z-10 flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                    <div className="max-w-full rounded-3xl border border-white/18 bg-charcoal/64 px-4 py-3 text-ivory shadow-[0_12px_34px_rgba(0,0,0,0.18)] backdrop-blur">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase text-ivory/68">
                        <MapPin className="h-4 w-4 text-mustard" />
                        <span>{roomForAnimal.title}</span>
                        <span className="h-1 w-1 rounded-full bg-ivory/42" />
                        <span>{roomForAnimal.scene.label}</span>
                      </div>
                      <p className="mt-1 max-w-xl font-serif text-2xl leading-tight text-ivory">
                        {selectedAnimal.label} práve hodnotí detail, ktorý by maklér možno obišiel.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-ivory/12 px-3 py-2 text-xs font-semibold text-ivory backdrop-blur">
                        <Compass className="h-4 w-4 text-mustard" />
                        Smer {direction}°
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-ivory/12 px-3 py-2 text-xs font-semibold text-ivory backdrop-blur">
                        {roomForAnimal.scene.panoramaUrl ? (
                          <Move className="h-4 w-4" />
                        ) : (
                          <RotateCw className="h-4 w-4" />
                        )}
                        360 pripravené
                      </span>
                      <button
                        type="button"
                        onClick={toggleImmersive}
                        className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-ivory/12 px-3 py-2 text-xs font-semibold text-ivory backdrop-blur transition hover:border-mustard hover:bg-ivory/18"
                        aria-label={
                          isImmersive ? "Ukončiť fullscreen prehliadku" : "Spustiť fullscreen prehliadku"
                        }
                      >
                        {isImmersive ? (
                          <Minimize2 className="h-4 w-4" />
                        ) : (
                          <Maximize2 className="h-4 w-4" />
                        )}
                        {isImmersive ? "Ukončiť" : "Fullscreen"}
                      </button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {projectedAnnotations.map(({ annotation, index, position }) => (
                      <Annotation
                        key={annotation.id}
                        annotation={annotation}
                        index={index}
                        position={position}
                        animalAccent={selectedAnimal.accent}
                        isActive={activeAnnotation?.id === annotation.id}
                        onClick={() => selectAnnotation(annotation)}
                      />
                    ))}
                  </AnimatePresence>

                  <AnimatePresence>
                    {projectedNavigationHotspots.map(({ hotspot, position }) => (
                      <NavigationHotspot
                        key={hotspot.id}
                        hotspot={hotspot}
                        position={position}
                        onNavigate={moveTo}
                      />
                    ))}
                  </AnimatePresence>

                  <div
                    className={`absolute inset-x-4 z-40 rounded-3xl border border-white/18 bg-charcoal/74 p-4 text-ivory shadow-[0_20px_55px_rgba(0,0,0,0.28)] backdrop-blur sm:inset-x-6 ${
                      isImmersive ? "bottom-6" : "bottom-4"
                    }`}
                    onPointerDown={(event) => event.stopPropagation()}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <label
                        htmlFor={sliderId}
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase text-ivory/72"
                      >
                        <RotateCw className="h-4 w-4 text-mustard" />
                        360 pohľad
                      </label>
                      <span className="rounded-full border border-ivory/18 px-3 py-1 text-xs font-semibold text-ivory/76">
                        {Math.round(normalizeAngle(viewAngle))}°
                      </span>
                    </div>
                    <div
                      id={sliderId}
                      role="slider"
                      tabIndex={0}
                      aria-label="Plynulo otočiť 360 pohľad"
                      aria-valuemin={0}
                      aria-valuemax={359}
                      aria-valuenow={sliderValue}
                      aria-valuetext={`${sliderValue}°`}
                      onPointerDown={handleSliderPointerDown}
                      onPointerMove={handleSliderPointerMove}
                      onPointerUp={handleSliderPointerUp}
                      onPointerCancel={handleSliderPointerUp}
                      onKeyDown={handleSliderKeyDown}
                      className="tour-angle-slider mt-3 w-full"
                    >
                      <span className="tour-angle-slider__fill" style={{ width: `${sliderProgress}%` }} />
                      <span className="tour-angle-slider__thumb" style={{ left: `${sliderProgress}%` }} />
                    </div>
                  </div>

                  {selectedAnimal.id === "fish" && (
                    <div
                      className={`absolute left-5 right-5 z-20 rounded-3xl border border-white/18 bg-charcoal/70 p-4 text-ivory shadow-[0_20px_55px_rgba(0,0,0,0.26)] backdrop-blur sm:left-auto sm:max-w-sm ${
                        isImmersive ? "bottom-32" : "bottom-28"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#6F91A5] text-white">
                          <Fish className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="font-serif text-xl">Rybička nikam nechodí.</p>
                          <p className="mt-1 text-sm leading-6 text-ivory/74">
                            Hodnotí byt zo svojho miesta v obývačke. Otočte pohľad a menia sa detaily,
                            ktoré vidí okolo akvária.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="tour-detail border-t border-white/10 bg-charcoal px-4 py-4 text-ivory sm:px-6">
                  <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <p className="flex items-center gap-2 text-xs font-semibold uppercase text-mustard">
                          <span className="h-2 w-2 rounded-full bg-mustard" />
                          Aktívna anotácia
                        </p>
                        <span className="rounded-full border border-ivory/16 px-2.5 py-1 text-xs text-ivory/58">
                          {Math.max(
                            allAnnotations.findIndex(
                              (annotation) => annotation.id === activeAnnotation?.id
                            ),
                            0
                          ) + 1}
                          /{allAnnotations.length}
                        </span>
                      </div>
                      <h3 className="mt-2 font-serif text-2xl leading-tight sm:text-3xl">
                        {activeAnnotation?.title}
                      </h3>
                      <p className="mt-2 max-w-3xl text-sm leading-6 text-ivory/72">
                        {activeAnnotation?.detail}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => cycleAnnotation(-1)}
                        className="grid h-9 w-9 place-items-center rounded-full border border-ivory/18 text-ivory/76 transition hover:border-mustard hover:bg-mustard hover:text-charcoal"
                        aria-label="Predchádzajúca anotácia"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      {allAnnotations.map((annotation, index) => (
                        <button
                          key={annotation.id}
                          type="button"
                          onClick={() => selectAnnotation(annotation, { focus: true })}
                          className={`h-9 min-w-9 rounded-full border px-3 text-sm font-semibold transition ${
                            activeAnnotation?.id === annotation.id
                              ? "border-mustard bg-mustard text-charcoal"
                              : "border-ivory/18 text-ivory/70 hover:border-mustard hover:text-ivory"
                          }`}
                          aria-label={`Zobraziť anotáciu ${annotation.title}`}
                        >
                          {index + 1}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => cycleAnnotation(1)}
                        className="grid h-9 w-9 place-items-center rounded-full border border-ivory/18 text-ivory/76 transition hover:border-mustard hover:bg-mustard hover:text-charcoal"
                        aria-label="Ďalšia anotácia"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-5">
            <MiniMap
              currentRoomId={roomForAnimal.id}
              connectedRooms={connectedRooms}
              canMove={canMove}
              onRoomChange={moveTo}
            />

            <div className="rounded-[28px] border border-charcoal/10 bg-white/58 p-5 shadow-card">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-serif text-2xl text-charcoal">Prechod</h3>
                  <p className="mt-1 text-sm text-graphite/64">
                    {canMove ? "Vyberte susednú miestnosť." : "Z akvária sa neodchádza."}
                  </p>
                </div>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-linen text-walnut">
                  {canMove ? <ArrowRight className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
                </span>
              </div>

              <div className="mt-5 grid gap-2">
                {roomForAnimal.connectedTo.map((roomId) => {
                  const target = getRoomById(roomId);
                  return (
                    <button
                      key={target.id}
                      type="button"
                      disabled={!canMove}
                      onClick={() => moveTo(target.id)}
                      className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                        canMove
                          ? "border-charcoal/10 bg-ivory/72 text-charcoal hover:border-mustard hover:bg-white"
                          : "border-charcoal/8 bg-ivory/45 text-graphite/38"
                      }`}
                    >
                      <span>{target.title}</span>
                      {canMove ? <ArrowRight className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
