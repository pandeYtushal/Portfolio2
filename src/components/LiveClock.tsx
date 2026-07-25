import { useState, useEffect } from "react";

export const LiveClock = () => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const tick = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(tick);
  }, []);

  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  const dateStr = now.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
  }).toUpperCase();

  const getOffsetStr = () => {
    const offset = -now.getTimezoneOffset();
    const absOffset = Math.abs(offset);
    const hoursVal = Math.floor(absOffset / 60);
    const mins = absOffset % 60;
    const sign = offset >= 0 ? "+" : "-";
    return `GMT${sign}${hoursVal}${mins > 0 ? `:${mins}` : ""}`;
  };

  return (
    <div className="flex items-center gap-3.5 px-4 py-2 rounded-xl border border-app-border/40 bg-app-surface/30 select-none text-[10px] tracking-wider font-mono shadow-sm">
      {/* Telemetry Indicator */}
      <div className="flex items-center gap-2 shrink-0">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
        </span>
        <span className="text-app-text-muted font-bold text-[9px] uppercase tracking-[0.15em] select-none">
          SYS.LIVE
        </span>
      </div>

      {/* Vertical divider */}
      <span className="text-app-border select-none">|</span>

      {/* Clock Readout */}
      <div className="flex items-center gap-1 font-bold tabular-nums text-app-text-primary text-[11px] drop-shadow-[0_0_3px_rgba(255,138,0,0.15)]">
        <span>{hours}</span>
        <span className="animate-pulse text-app-accent">:</span>
        <span>{minutes}</span>
        <span className="animate-pulse text-app-accent">:</span>
        <span className="text-app-text-secondary">{seconds}</span>
      </div>

      {/* Vertical divider */}
      <span className="text-app-border select-none">|</span>

      {/* Timezone / Date Badge */}
      <div className="flex items-center gap-2 text-[9px] font-semibold text-app-text-muted shrink-0">
        <span className="text-app-text-secondary font-bold select-none">{getOffsetStr()}</span>
        <span className="select-none">•</span>
        <span>{dateStr}</span>
      </div>
    </div>
  );
};

export default LiveClock;
