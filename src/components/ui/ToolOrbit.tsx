import { useState, useEffect, useRef, useCallback, ComponentType } from "react";
import { m, useReducedMotion } from "motion/react";
import { cn } from "../../lib/utils";

export interface TechCardItem {
  id: string;
  name: string;
  category: string;
  tagline: string;
  projects?: string[];
  color: string;
  bgGradient: string;
  icon: ComponentType<{ className?: string; style?: React.CSSProperties }> | (() => JSX.Element);
}

export type CarouselMode = "RING" | "HELIX";

interface ToolOrbitProps {
  items: TechCardItem[];
  className?: string;
}

export function ToolOrbit({ items, className }: ToolOrbitProps) {
  const reduce = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [mode, setMode] = useState<CarouselMode>("RING");
  const [fxEnabled, setFxEnabled] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<number | null>(null);

  const count = items.length;
  const activeItem = items[activeIndex] || items[0];

  // Screen size detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Continuous anticlockwise rotation: cards arc from right through apex and down to the left
  const rotateAntiClockwise = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % count);
  }, [count]);

  const rotateClockwise = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + count) % count);
  }, [count]);

  // Uninterrupted continuous circular rotation (runs constantly anticlockwise every 2.5s)
  useEffect(() => {
    if (count <= 1 || isDragging) return;
    const timer = setInterval(rotateAntiClockwise, 2500);
    return () => clearInterval(timer);
  }, [count, isDragging, rotateAntiClockwise]);

  // Pointer / Drag interactions for scrubbing the 3D ring
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartRef.current = e.clientX;
    setDragOffset(0);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || dragStartRef.current === null) return;
    const diff = e.clientX - dragStartRef.current;
    setDragOffset(diff);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragStartRef.current !== null) {
      const diff = e.clientX - dragStartRef.current;
      const threshold = isMobile ? 35 : 55;
      if (diff > threshold) {
        // Dragged right -> rotate clockwise
        rotateClockwise();
      } else if (diff < -threshold) {
        // Dragged left -> rotate anticlockwise
        rotateAntiClockwise();
      }
    }
    dragStartRef.current = null;
    setDragOffset(0);
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // Ignore pointer release if target lost
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      rotateClockwise();
    } else if (e.key === "ArrowRight") {
      rotateAntiClockwise();
    }
  };

  // 3D Geometry calculations per card based on offset and selected layout mode
  const getCardTransform = (offset: number) => {
    const absOffset = Math.abs(offset);
    const sign = Math.sign(offset) || 1;

    // Responsive spacing
    const spacingX = isMobile ? 120 : 190;

    switch (mode) {
      case "HELIX": {
        // Helix: Ascending spiral curve
        const angle = offset * (isMobile ? 26 : 22);
        const rad = (angle * Math.PI) / 180;
        const radius = isMobile ? 260 : 420;
        const x = Math.sin(rad) * radius;
        const y = -offset * (isMobile ? 32 : 44);
        const z = -absOffset * (isMobile ? 65 : 95);
        const rotateY = -angle * 0.75;
        const rotateZ = -offset * 8;
        const scale = Math.max(0.68, 1 - absOffset * 0.08);
        return { x, y, z, rotateX: 0, rotateY, rotateZ, scale };
      }

      case "RING":
      default: {
        // RING: Sweeping arch with tangential rotateZ and depth curvature (from Motion+ Exclusive screenshot)
        if (absOffset === 0) {
          return { x: 0, y: 0, z: 0, rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1.05 };
        }
        if (absOffset <= 1) {
          const x = sign * (spacingX * 0.95);
          const y = isMobile ? 32 : 46;
          const z = isMobile ? -50 : -80;
          const rotateZ = sign * (isMobile ? 16 : 18);
          const rotateY = sign * -12;
          return { x, y, z, rotateX: 0, rotateY, rotateZ, scale: 0.92 };
        }
        if (absOffset <= 2) {
          const x = sign * (spacingX * 1.88);
          const y = isMobile ? 98 : 142;
          const z = isMobile ? -140 : -200;
          const rotateZ = sign * (isMobile ? 32 : 36);
          const rotateY = sign * -24;
          return { x, y, z, rotateX: 0, rotateY, rotateZ, scale: 0.78 };
        }
        // Offsets > 2 fade out along the perimeter
        const x = sign * (spacingX * 2.7);
        const y = isMobile ? 180 : 260;
        const z = isMobile ? -240 : -340;
        const rotateZ = sign * (isMobile ? 46 : 52);
        const rotateY = sign * -32;
        return { x, y, z, rotateX: 0, rotateY, rotateZ, scale: 0.62 };
      }
    }
  };

  // Compute depth blur for FX mode
  const getBlurAmount = (absOffset: number) => {
    if (!fxEnabled || reduce) return "blur(0px)";
    if (absOffset === 0) return "blur(0px)";
    if (absOffset <= 1) return "blur(2px)";
    if (absOffset <= 2) return "blur(5.5px)";
    return "blur(10px)";
  };

  // Card opacity
  const getOpacity = (absOffset: number) => {
    if (absOffset === 0) return 1;
    if (absOffset <= 1) return 0.92;
    if (absOffset <= 2) return 0.62;
    return 0;
  };

  const MODES: CarouselMode[] = ["RING", "HELIX"];

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative w-full select-none outline-none flex flex-col items-center justify-center pt-2 pb-6",
        className
      )}
      role="region"
      aria-label="3D Capabilities Carousel"
    >
      {/* Dynamic ambient backlight matching active tool */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-700 opacity-20"
        style={{
          background: activeItem?.color
            ? `radial-gradient(circle 560px at 50% 120px, ${activeItem.color}35 0%, transparent 70%)`
            : "radial-gradient(circle 560px at 50% 120px, rgba(255,255,255,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Main 3D Stage with Perspective */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative w-full max-w-[1180px] h-[330px] md:h-[396px] mx-auto flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden"
        style={{
          perspective: isMobile ? 850 : 1300,
          perspectiveOrigin: "50% 45%",
        }}
      >
        {/* Render visible cards along the 3D ring arch */}
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {items.map((item, idx) => {
            let offset = (idx - activeIndex + count) % count;
            if (offset > count / 2) {
              offset -= count;
            }

            const absOffset = Math.abs(offset);
            const isVisible = absOffset <= 2.5;

            // Include real-time drag offset for smooth gesture scrub
            const normalizedDrag = isDragging ? dragOffset / (isMobile ? 160 : 240) : 0;
            const effectiveOffset = offset + normalizedDrag;

            const transform = getCardTransform(effectiveOffset);
            const blur = getBlurAmount(Math.abs(effectiveOffset));
            const opacity = isVisible ? getOpacity(Math.abs(effectiveOffset)) : 0;
            const isActive = offset === 0;

            const Icon = item.icon;

            return (
              <m.div
                key={item.id}
                onClick={() => {
                  if (Math.abs(dragOffset) < 8) {
                    setActiveIndex(idx);
                  }
                }}
                initial={false}
                animate={{
                  x: transform.x,
                  y: transform.y,
                  z: transform.z,
                  rotateX: transform.rotateX || 0,
                  rotateY: transform.rotateY,
                  rotateZ: transform.rotateZ,
                  scale: transform.scale,
                  opacity,
                  filter: blur,
                }}
                transition={
                  reduce || isDragging
                    ? { duration: 0 }
                    : {
                      type: "spring",
                      stiffness: 150,
                      damping: 22,
                      mass: 0.9,
                    }
                }
                style={{
                  position: "absolute",
                  width: isMobile ? "154px" : "210px",
                  height: isMobile ? "210px" : "276px",
                  zIndex: Math.round(30 - Math.abs(effectiveOffset) * 10),
                  pointerEvents: isVisible ? "auto" : "none",
                  transformStyle: "preserve-3d",
                  willChange: "transform, filter, opacity",
                }}
                className="group cursor-pointer select-none"
              >
                {/* Portrait Card Body */}
                <div
                  style={{
                    background: item.bgGradient,
                    boxShadow: isActive
                      ? `0 0 36px ${item.color}35, 0 20px 45px -10px rgba(0,0,0,0.85)`
                      : "0 14px 30px -10px rgba(0,0,0,0.6)",
                    borderColor: isActive
                      ? `${item.color}90`
                      : "rgba(255, 255, 255, 0.12)",
                  }}
                  className={cn(
                    "w-full h-full rounded-none border p-4 md:p-5 flex flex-col justify-between overflow-hidden relative transition-all duration-300",
                    isActive
                      ? "ring-1 ring-inset ring-white/30"
                      : "hover:border-white/30 hover:brightness-110"
                  )}
                >
                  {/* Subtle Card Ambient Specular Sheen */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${item.color}60 0%, transparent 70%)`,
                    }}
                    aria-hidden="true"
                  />

                  {/* Top Card Eyebrow */}
                  <div className="flex items-center justify-between z-10">
                    <span className="font-mono text-[10px] md:text-[11px] font-semibold tracking-wider uppercase text-white/80">
                      {item.category}
                    </span>
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: item.color,
                        boxShadow: `0 0 8px ${item.color}`,
                      }}
                    />
                  </div>

                  {/* Center Hero Icon */}
                  <div className="my-auto flex items-center justify-center z-10 py-3">
                    {Icon && (
                      <div
                        className="w-14 h-14 md:w-20 md:h-20 flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                        style={{ color: item.color }}
                      >
                        <Icon className="w-full h-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]" />
                      </div>
                    )}
                  </div>

                  {/* Bottom Info: Tech Name & Role / Projects */}
                  <div className="z-10 mt-auto">
                    <h3 className="text-lg md:text-xl font-bold tracking-tight text-white leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-[11px] md:text-xs text-white/70 font-medium line-clamp-1 mt-0.5">
                      {item.tagline}
                    </p>

                    {item.projects && item.projects.length > 0 && (
                      <div className="flex items-center gap-1 mt-2 pt-2 border-t border-white/10 overflow-hidden">
                        <span className="font-mono text-[9px] text-white/50 uppercase">
                          IN:
                        </span>
                        <span className="font-mono text-[9px] md:text-[10px] text-white/90 truncate">
                          {item.projects.join(" · ")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </m.div>
            );
          })}
        </div>
      </div>

      {/* Bottom Control Bar */}
      <div className="w-full max-w-[1040px] px-2 sm:px-4 mt-2 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 sm:gap-4 border-t border-white/[0.08] pt-3 sm:pt-4 z-20">
        {/* Left Badge: TECH + STACK */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-none bg-[#34d399] text-black font-mono text-[11px] font-bold tracking-wider uppercase shadow-sm">
            TECH + STACK
          </span>
          <span className="font-mono text-xs text-neutral-400 hidden md:inline-block">
            {String(activeIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
        </div>

        {/* Center: Layout Mode Switchers (RING | HELIX) */}
        <div className="flex items-center gap-1 bg-[#141418] border border-white/10 rounded-none p-1">
          {MODES.map((mItem) => {
            const isSelected = mode === mItem;
            return (
              <button
                key={mItem}
                type="button"
                onClick={() => setMode(mItem)}
                style={{
                  backgroundColor: isSelected ? "#ffffff" : "transparent",
                  color: isSelected ? "#000000" : "#a3a3a3",
                }}
                className={cn(
                  "px-3 py-1 font-mono text-xs uppercase tracking-wider transition-all duration-200 rounded-none font-semibold",
                  isSelected
                    ? "!text-black shadow"
                    : "hover:!text-white"
                )}
                aria-pressed={isSelected}
              >
                {mItem}
              </button>
            );
          })}
        </div>

        {/* Right: Depth FX Toggle & Stepper Navigation */}
        <div className="flex items-center gap-3">
          {/* Stepper buttons (Clockwise / Anticlockwise) */}
          <div className="flex items-center border border-white/10 rounded-none overflow-hidden bg-[#141418]">
            <button
              type="button"
              onClick={rotateClockwise}
              className="px-2.5 py-1 text-xs text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Rotate clockwise"
            >
              ←
            </button>
            <button
              type="button"
              onClick={rotateAntiClockwise}
              className="px-2.5 py-1 text-xs text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Rotate anticlockwise"
            >
              →
            </button>
          </div>

          {/* FX Toggle (Depth of Field Blur) */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-neutral-400 font-medium">FX</span>
            <button
              type="button"
              onClick={() => setFxEnabled(!fxEnabled)}
              className={cn(
                "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                fxEnabled ? "bg-[#34d399]" : "bg-neutral-700"
              )}
              role="switch"
              aria-checked={fxEnabled}
              aria-label="Toggle depth of field lens blur"
            >
              <span
                className={cn(
                  "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                  fxEnabled ? "translate-x-4" : "translate-x-0"
                )}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToolOrbit;
