import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { CloudRain, Sun, Moon, Cloud, CloudFog, CloudLightning, Snowflake } from "lucide-react";

// Coordinates for New Delhi (fallback)
const LAT = 28.6139;
const LON = 77.2090;

type WeatherState = "clear" | "clouds" | "rain" | "snow" | "thunder" | "fog" | "loading";

export const LiveEnvironment = () => {
  const location = useLocation();
  const [time, setTime] = useState<string>("");
  const [weather, setWeather] = useState<{ state: WeatherState; isDay: boolean }>({
    state: "loading",
    isDay: true,
  });

  // 1. Clock Engine
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 2. Weather Engine
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current_weather=true`
        );
        const data = await res.json();
        const code = data.current_weather.weathercode;
        const isDay = data.current_weather.is_day === 1;

        let state: WeatherState = "clear";
        if ([1, 2, 3].includes(code)) state = "clouds";
        if ([45, 48].includes(code)) state = "fog";
        if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) state = "rain";
        if ([71, 73, 75, 77, 85, 86].includes(code)) state = "snow";
        if ([95, 96, 99].includes(code)) state = "thunder";

        setWeather({ state, isDay });
      } catch (err) {
        console.error("Failed to fetch environment data", err);
      }
    };
    fetchWeather();
  }, []);

  // Map state to Icon
  const WeatherIcon = () => {
    if (weather.state === "loading") return <div className="w-4 h-4 rounded-full border-2 border-app-text-muted border-t-transparent animate-spin" />;

    switch (weather.state) {
      case "rain": return <CloudRain className="w-4 h-4" />;
      case "clouds": return <Cloud className="w-4 h-4" />;
      case "fog": return <CloudFog className="w-4 h-4" />;
      case "thunder": return <CloudLightning className="w-4 h-4" />;
      case "snow": return <Snowflake className="w-4 h-4" />;
      case "clear":
      default:
        return weather.isDay ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />;
    }
  };

  return (
    <>
      {/* HUD (Heads Up Display) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className={`fixed top-6 left-4 sm:top-auto sm:left-auto sm:bottom-10 sm:right-10 z-[50] ${location.pathname === "/" ? "flex" : "hidden sm:flex"} items-center gap-3 px-4 py-2 bg-app-text-primary backdrop-blur-md rounded-full text-app-bg text-[10px] sm:text-xs font-bold uppercase tracking-widest pointer-events-none shadow-lg`}
      >
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="tabular-nums">{time} IST</span>
        <span className="w-px h-3 bg-app-border/40 mx-1" />
        <WeatherIcon />
      </motion.div>

      {/* Atmospheric Overlays */}

      {/* Night Filter (Subtle dimming and blue tint) */}
      {!weather.isDay && weather.state !== "loading" && (
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#0a0f1a]/80 mix-blend-multiply transition-opacity duration-1000" />
      )}

      {/* Rain Effect (CSS pure visual) */}
      {weather.state === "rain" && (
        <div className="fixed inset-0 z-[1] pointer-events-none opacity-20 overflow-hidden mix-blend-screen">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="rainPattern" width="100" height="200" patternUnits="userSpaceOnUse">
                <line x1="50" y1="-20" x2="40" y2="20" stroke="white" strokeWidth="1" opacity="0.4">
                  <animate attributeName="y1" from="-20" to="200" dur="0.6s" repeatCount="indefinite" />
                  <animate attributeName="y2" from="20" to="240" dur="0.6s" repeatCount="indefinite" />
                </line>
                <line x1="20" y1="-50" x2="10" y2="10" stroke="white" strokeWidth="0.5" opacity="0.3">
                  <animate attributeName="y1" from="-50" to="200" dur="0.7s" repeatCount="indefinite" />
                  <animate attributeName="y2" from="10" to="260" dur="0.7s" repeatCount="indefinite" />
                </line>
                <line x1="80" y1="0" x2="70" y2="40" stroke="white" strokeWidth="1.5" opacity="0.5">
                  <animate attributeName="y1" from="0" to="200" dur="0.5s" repeatCount="indefinite" />
                  <animate attributeName="y2" from="40" to="240" dur="0.5s" repeatCount="indefinite" />
                </line>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#rainPattern)" />
          </svg>
        </div>
      )}

      {/* Fog Effect */}
      {weather.state === "fog" && (
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-app-surface/20 backdrop-blur-[2px] transition-all duration-1000" />
      )}
    </>
  );
};

export default LiveEnvironment;
