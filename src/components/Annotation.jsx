import { motion } from "framer-motion";

export default function Annotation({
  annotation,
  index,
  isActive,
  animalAccent,
  position,
  onClick,
}) {
  const shouldOpenLeft = position.x >= 55;

  function handleClick(event) {
    event.stopPropagation();
    onClick();
  }

  return (
    <motion.button
      type="button"
      initial={false}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.12 }}
      onPointerDown={(event) => event.stopPropagation()}
      onClick={handleClick}
      data-annotation-id={annotation.id}
      aria-label={`Hotspot anotácie ${annotation.title}`}
      className={`absolute z-20 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 ${
        shouldOpenLeft ? "flex-row-reverse text-right" : "text-left"
      }`}
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
    >
      <span
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-white text-sm font-bold shadow-[0_14px_28px_rgba(0,0,0,0.22)] ${
          isActive ? "bg-charcoal text-ivory" : "bg-mustard text-charcoal"
        }`}
        style={{ backgroundColor: isActive ? "#201F1C" : animalAccent }}
      >
        {index + 1}
      </span>
      <span
        className={`hidden max-w-[13rem] rounded-full border px-3 py-2 text-xs font-semibold leading-4 shadow-[0_12px_30px_rgba(0,0,0,0.22)] backdrop-blur sm:block ${
          isActive
            ? "border-charcoal bg-charcoal text-ivory"
            : "border-white/42 bg-ivory/88 text-charcoal"
        }`}
      >
        {annotation.title}
      </span>
    </motion.button>
  );
}
