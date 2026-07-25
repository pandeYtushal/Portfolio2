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

  const dateStr = now
    .toLocaleDateString(undefined, { day: "2-digit", month: "short" })
    .toUpperCase();

  const dayName = now
    .toLocaleDateString(undefined, { weekday: "short" })
    .toUpperCase();

  const getOffsetStr = () => {
    const offset = -now.getTimezoneOffset();
    const absOffset = Math.abs(offset);
    const h = Math.floor(absOffset / 60);
    const m = absOffset % 60;
    const sign = offset >= 0 ? "+" : "-";
    return `UTC${sign}${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
  };

  /* Each digit gets its own segmented cell */
  const Digit = ({ value, dim }: { value: string; dim?: boolean }) => (
    <span
      className={`inline-flex items-center justify-center w-[1.6em] sm:w-[1.8em] h-[2em] sm:h-[2.2em] rounded-md bg-app-bg/80 border border-app-border/30 font-black tabular-nums text-sm sm:text-base leading-none ${
        dim ? "text-app-text-secondary" : "text-app-text-primary"
      }`}
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {value}
    </span>
  );

  const Separator = () => (
    <span className="flex flex-col items-center justify-center gap-[3px] mx-0.5">
      <span className="h-[3px] w-[3px] rounded-full bg-app-accent animate-pulse" />
      <span className="h-[3px] w-[3px] rounded-full bg-app-accent animate-pulse" />
    </span>
  );

  return (
    <div className="flex flex-col items-center gap-2 select-none">
      {/* Digit Display */}
      <div className="flex items-center gap-[3px] sm:gap-1">
        <Digit value={hours[0]} />
        <Digit value={hours[1]} />
        <Separator />
        <Digit value={minutes[0]} />
        <Digit value={minutes[1]} />
        <Separator />
        <Digit value={seconds[0]} dim />
        <Digit value={seconds[1]} dim />
      </div>

      {/* Metadata strip */}
      <div className="flex items-center gap-2 sm:gap-3 text-[8px] sm:text-[9px] font-mono font-semibold tracking-[0.12em] text-app-text-muted uppercase">
        <span className="flex items-center gap-1">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
          <span>LIVE</span>
        </span>
        <span className="text-app-border">•</span>
        <span>{dayName}</span>
        <span className="text-app-border">•</span>
        <span>{dateStr}</span>
        <span className="hidden sm:inline text-app-border">•</span>
        <span className="hidden sm:inline text-app-text-secondary">{getOffsetStr()}</span>
      </div>
    </div>
  );
};

export default LiveClock;
