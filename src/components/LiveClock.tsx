import { useState, useEffect } from "react";

export const LiveClock = () => {
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
    <div className="relative flex items-center pr-3 select-none">
      <div className="text-right">
        <p className="font-mono text-[10px] font-bold tabular-nums text-app-text-primary leading-tight">{timeStr}</p>
        <p className="text-[9px] font-semibold text-app-text-muted mt-0.5 leading-none">{dateStr}</p>
      </div>
      {/* Radar Ping dot */}
      <div className="absolute -right-0 top-1.5 flex h-1.5 w-1.5 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
      </div>
    </div>
  );
};

export default LiveClock;
