import { Lock, MapPin } from "lucide-react";
import { rooms } from "../data/tourData.js";

export default function MiniMap({ currentRoomId, connectedRooms, canMove, onRoomChange }) {
  return (
    <div className="rounded-[28px] border border-charcoal/10 bg-white/58 p-5 shadow-card">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="font-serif text-2xl text-charcoal">Mapa bytu</h3>
          <p className="mt-1 text-sm text-graphite/64">
            {canMove ? "Prechodné miestnosti sú zvýraznené." : "Pohyb je pri rybičke zamknutý."}
          </p>
        </div>
        <span className="grid h-10 w-10 place-items-center rounded-full bg-linen text-walnut">
          {canMove ? <MapPin className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
        </span>
      </div>

      <div className="relative mt-5 aspect-[4/3] overflow-hidden rounded-3xl border border-charcoal/10 bg-[linear-gradient(135deg,rgba(247,241,231,0.92),rgba(239,228,212,0.74))]">
        <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
          {rooms.map((room) =>
            room.connectedTo.map((targetId) => {
              const target = rooms.find((item) => item.id === targetId);
              if (!target || room.id > target.id) return null;
              return (
                <line
                  key={`${room.id}-${targetId}`}
                  x1={`${room.position.x}%`}
                  y1={`${room.position.y}%`}
                  x2={`${target.position.x}%`}
                  y2={`${target.position.y}%`}
                  stroke="rgba(32,31,28,0.16)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              );
            })
          )}
        </svg>

        {rooms.map((room) => {
          const isActive = room.id === currentRoomId;
          const isConnected = connectedRooms.includes(room.id);
          const isAvailable = canMove && (isConnected || isActive);

          return (
            <button
              key={room.id}
              type="button"
              disabled={!isAvailable}
              onClick={() => isAvailable && onRoomChange(room.id)}
              className={`absolute min-w-0 -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-2 text-xs font-semibold shadow-sm transition ${
                isActive
                  ? "border-charcoal bg-charcoal text-ivory"
                  : isAvailable
                    ? "border-mustard/50 bg-white text-charcoal hover:bg-mustard"
                    : "border-charcoal/10 bg-white/52 text-graphite/34"
              }`}
              style={{ left: `${room.position.x}%`, top: `${room.position.y}%` }}
            >
              <span className="block max-w-[6.25rem] truncate">{room.shortTitle}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
