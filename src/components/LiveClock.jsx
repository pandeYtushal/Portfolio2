import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

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
    <div className="flex items-center gap-2 bg-card/80 px-4 py-2.5 shadow-sm backdrop-blur-sm">
      <Clock className="h-4 w-4 shrink-0 text-green-500" />
      <div className="text-right">
        <p className="text-xs font-medium text-muted-foreground text-zinc-400">{dateStr}</p>
        <p className="font-mono text-sm font-semibold tabular-nums text-foreground text-zinc-200">{timeStr}</p>
      </div>
    </div>
  );
}

export default LiveClock;
