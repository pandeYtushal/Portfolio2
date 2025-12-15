import { useEffect, useState } from "react";
import { FaRegClock } from "react-icons/fa";

const LiveClock = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      // Time (IST)
      setTime(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        })
      );

      // Date (DD Mon YYYY)
      setDate(
        now.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          timeZone: "Asia/Kolkata",
        })
      );
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="inline-flex items-center gap-3 px-3 py-1 text-[11px] sm:text-xs md:text-sm text-zinc-300">
      {/* Left: Clock */}
      <div className="flex items-center gap-1.5">
        <FaRegClock className="text-zinc-400 text-xl sm:text-sm" />
        <span>{time}</span>
      </div>

      {/* Divider */}
      <span className="w-px h-4 bg-blue-700" />

      {/* Right: Date */}
      <span className="text-zinc-400 whitespace-nowrap text-xs sm:text-sm">
        {date}
      </span>
    </div>
  );
};

export default LiveClock;
