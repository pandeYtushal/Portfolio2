import { useEffect, useState } from "react";
import { FaRegClock } from "react-icons/fa";

const LiveClock = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
      };

      setTime(now.toLocaleTimeString("en-IN", options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900/80 border border-zinc-700 rounded-full text-[11px] sm:text-xs md:text-sm text-zinc-300">
      <FaRegClock className="text-zinc-400 text-xs sm:text-sm" />
      <span>{time}</span>
      <span className="text-zinc-400 hidden sm:inline">GMT+5:30</span>
      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
    </div>
  );
};

export default LiveClock;
