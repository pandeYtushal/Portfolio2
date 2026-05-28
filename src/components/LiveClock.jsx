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
    <div className="relative flex items-center pr-2">
      <div className="text-right">
        <p className="font-mono text-xs font-semibold tabular-nums text-zinc-900 dark:text-white">{timeStr}</p>
        <p className="text-[10px] text-zinc-500">{dateStr}</p>
      </div>
      {/* Radar Ping dot as notification badge */}
      <div className="absolute -right-0.5 -top-0.5 flex h-2 w-2 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
      </div>
    </div>
  );
}

export default LiveClock;
