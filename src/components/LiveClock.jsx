import { useState, useEffect } from "react";

function LiveClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const tick = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(tick);
  }, []);

  const dateStr = now.toLocaleDateString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const timeStr = now.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return (
    <div className="flex items-center gap-2">
      {/* Blinking dot */}
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
      <div className="text-right">
        <p className="font-mono text-xs font-semibold tabular-nums text-white">{timeStr}</p>
        <p className="text-[10px] text-zinc-500">{dateStr}</p>
      </div>
    </div>
  );
}

export default LiveClock;
