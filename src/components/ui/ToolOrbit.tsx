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

  // Viewport dimension telemetry
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Orbital step: advance active node along circumferential arc
  const rotateAntiClockwise = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % count);
  }, [count]);

  const rotateClockwise = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + count) % count);
  }, [count]);

  // Continuous orbital cadence: automatic rotation loop
  useEffect(() => {
    if (count <= 1 || isDragging) return;
    const timer = setInterval(rotateAntiClockwise, 2500);
    return () => clearInterval(timer);
  }, [count, isDragging, rotateAntiClockwise]);

  // Pointer capture and kinetic drag scrub
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
      const threshold = isMobile ? 28 : 45;
      if (diff > threshold) {
        rotateClockwise();
      } else if (diff < -threshold) {
        rotateAntiClockwise();
      }
    }
    dragStartRef.current = null;
    setDragOffset(0);
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // Ignore lost pointer capture target
    }
  };

  // Keyboard navigation dispatch
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      rotateClockwise();
    } else if (e.key === "ArrowRight") {
      rotateAntiClockwise();
    }
  };

  // Projective geometry transformations for radial and helical topologies
  const getCardTransform = (offset: number) => {
    const absOffset = Math.abs(offset);
    const sign = Math.sign(offset) || 1;

    // Compact proportional card spacing
    const spacingX = isMobile ? 104 : 158;

    switch (mode) {
      case "HELIX": {
        // Helical coordinate manifold
        const angle = offset * (isMobile ? 24 : 20);
        const rad = (angle * Math.PI) / 180;
        const radius = isMobile ? 230 : 370;
        const x = Math.sin(rad) * radius;
        const y = -offset * (isMobile ? 28 : 38);
        const z = -absOffset * (isMobile ? 55 : 85);
        const rotateY = -angle * 0.72;
        const rotateZ = -offset * 7;
        const scale = Math.max(0.7, 1 - absOffset * 0.075);
        return { x, y, z, rotateX: 0, rotateY, rotateZ, scale };
      }

      case "RING":
      default: {
        // Circumferential arch with tangential pitch and depth perspective
        if (absOffset === 0) {
          return { x: 0, y: 0, z: 0, rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1.04 };
        }
        if (absOffset <= 1) {
          const x = sign * (spacingX * 0.95);
          const y = isMobile ? 26 : 38;
          const z = isMobile ? -45 : -70;
          const rotateZ = sign * (isMobile ? 14 : 16);
          const rotateY = sign * -11;
          return { x, y, z, rotateX: 0, rotateY, rotateZ, scale: 0.92 };
        }
        if (absOffset <= 2) {
          const x = sign * (spacingX * 1.86);
          const y = isMobile ? 80 : 118;
          const z = isMobile ? -120 : -175;
          const rotateZ = sign * (isMobile ? 28 : 32);
          const rotateY = sign * -22;
          return { x, y, z, rotateX: 0, rotateY, rotateZ, scale: 0.79 };
        }
        // Peripheral horizon nodes
        const x = sign * (spacingX * 2.65);
        const y = isMobile ? 150 : 215;
        const z = isMobile ? -200 : -290;
        const rotateZ = sign * (isMobile ? 42 : 46);
        const rotateY = sign * -28;
        return { x, y, z, rotateX: 0, rotateY, rotateZ, scale: 0.64 };
      }
    }
  };

  // Spatial depth-of-field convolution
  const getBlurAmount = (absOffset: number) => {
    if (!fxEnabled || reduce) return "blur(0px)";
    if (absOffset === 0) return "blur(0px)";
    if (absOffset <= 1) return "blur(1.5px)";
    if (absOffset <= 2) return "blur(4.5px)";
    return "blur(8px)";
  };

  // Opacity attenuation along projective depth
  const getOpacity = (absOffset: number) => {
    if (absOffset === 0) return 1;
    if (absOffset <= 1) return 0.94;
    if (absOffset <= 2) return 0.64;
    return 0;
  };

  const MODES: CarouselMode[] = ["RING", "HELIX"];

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative w-full select-none outline-none flex flex-col items-center justify-center pt-2 pb-4",
        className
      )}
      role="region"
      aria-label="Interactive capabilities carousel"
    >
      {/* Ambient chromatic back-illumination mapped to active node */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-700 opacity-20"
        style={{
          background: activeItem?.color
            ? `radial-gradient(circle 480px at 50% 110px, ${activeItem.color}30 0%, transparent 70%)`
            : "radial-gradient(circle 480px at 50% 110px, rgba(255,255,255,0.05) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Primary 3D stage with geometric perspective */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative w-full max-w-[1140px] h-[285px] md:h-[345px] mx-auto flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden"
        style={{
          perspective: isMobile ? 800 : 1200,
          perspectiveOrigin: "50% 46%",
        }}
      >
        {/* Spatial card manifold */}
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

            // Normalized drag scrub displacement
            const normalizedDrag = isDragging ? dragOffset / (isMobile ? 140 : 210) : 0;
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
                      stiffness: 160,
                      damping: 24,
                      mass: 0.85,
                    }
                }
                style={{
                  position: "absolute",
                  width: isMobile ? "134px" : "180px",
                  height: isMobile ? "184px" : "244px",
                  zIndex: Math.round(30 - Math.abs(effectiveOffset) * 10),
                  pointerEvents: isVisible ? "auto" : "none",
                  transformStyle: "preserve-3d",
                  willChange: "transform, filter, opacity",
                }}
                className="group cursor-pointer select-none"
              >
                {/*
                  Cardboard / Cardstock Paper Body:
                  Tactile kraft paper substrate with fiber grain, scored rim,
                  and authentic punched specimen hole.
                */}
                <div
                  style={{
                    backgroundColor: "#161311",
                    backgroundImage: `
                      linear-gradient(165deg, rgba(34, 29, 25, 0.94) 0%, rgba(22, 19, 17, 0.98) 55%, rgba(13, 11, 10, 1) 100%),
                      repeating-linear-gradient(0deg, rgba(255, 245, 230, 0.015) 0px, rgba(255, 245, 230, 0.015) 1px, transparent 1px, transparent 3px)
                    `,
                    boxShadow: isActive
                      ? `0 0 0 1px ${item.color}75, 0 8px 24px -4px rgba(0,0,0,0.85), 0 0 28px ${item.color}22, inset 0 1px 0 rgba(255,240,225,0.18), inset 0 -1px 0 rgba(0,0,0,0.5)`
                      : "0 2px 4px rgba(0,0,0,0.45), 0 8px 18px -3px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,240,225,0.08), inset 0 -1px 0 rgba(0,0,0,0.4)",
                    borderColor: isActive
                      ? `${item.color}90`
                      : "rgba(235, 215, 195, 0.14)",
                  }}
                  className={cn(
                    "w-full h-full rounded-none border p-3.5 md:p-4 flex flex-col justify-between overflow-hidden relative transition-all duration-300",
                    isActive
                      ? "ring-1 ring-inset ring-white/20"
                      : "hover:border-stone-400/40 hover:brightness-105"
                  )}
                >
                  {/* Subtle paper grain texture and specular accent */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-25 mix-blend-screen"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${item.color}45 0%, transparent 70%)`,
                    }}
                    aria-hidden="true"
                  />

                  {/* Header: Monospace Specimen Stamp & Punch Hole */}
                  <div className="flex items-center justify-between z-10">
                    <span className="font-mono text-[9px] md:text-[10px] font-semibold tracking-widest uppercase text-stone-300">
                      {item.category}
                    </span>
                    {/* Stamped paper punch hole */}
                    <div
                      className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full border border-stone-600/70 bg-[#0a0a0a] shadow-[inset_0_1px_2px_rgba(0,0,0,0.9)] flex items-center justify-center shrink-0"
                      title="Specimen punchhole"
                    >
                      <span
                        className="w-1 h-1 rounded-full"
                        style={{
                          backgroundColor: item.color,
                          boxShadow: isActive ? `0 0 6px ${item.color}` : "none",
                        }}
                      />
                    </div>
                  </div>

                  {/* Center Hero Icon: Stamped screen-print badge */}
                  <div className="my-auto flex items-center justify-center z-10 py-2">
                    {Icon && (
                      <div
                        className="w-11 h-11 md:w-14 md:h-14 flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                        style={{ color: item.color }}
                      >
                        <Icon className="w-full h-full drop-shadow-[0_4px_10px_rgba(0,0,0,0.7)]" />
                      </div>
                    )}
                  </div>

                  {/* Bottom: Typography and Specimen Metadata */}
                  <div className="z-10 mt-auto">
                    <h3 className="text-sm md:text-base font-semibold tracking-tight text-stone-100 leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-[10px] md:text-[11px] text-stone-400 font-medium line-clamp-1 mt-0.5">
                      {item.tagline}
                    </p>

                    {item.projects && item.projects.length > 0 && (
                      <div className="flex items-center justify-between gap-1 mt-2 pt-1.5 border-t border-dashed border-stone-700/60 overflow-hidden">
                        <span className="font-mono text-[8.5px] md:text-[9px] text-stone-300 truncate">
                          {item.projects.join(" · ")}
                        </span>
                        <span className="font-mono text-[8px] text-stone-500 shrink-0">
                          #{String(idx + 1).padStart(2, "0")}
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

      {/* Control Surface */}
      <div className="w-full max-w-[1040px] px-2 sm:px-4 mt-1 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 sm:gap-4 border-t border-white/[0.08] pt-3 z-20">
        {/* Category Registry Badge */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-none bg-[#ffdc18] text-black font-mono text-[10px] font-bold tracking-wider uppercase shadow-sm">
            TECH + STACK
          </span>
          <span className="font-mono text-[11px] text-neutral-400 hidden md:inline-block">
            {activeIndex + 1} / {count}
          </span>
        </div>

        {/* Projection Mode Switcher: RING vs HELIX */}
        <div className="flex items-center gap-1 bg-[#141418] border border-white/10 rounded-none p-0.5">
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
                  "px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider transition-all duration-200 rounded-none font-semibold",
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

        {/* Navigation Step Dispatchers & Depth Field Blur */}
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-white/10 rounded-none overflow-hidden bg-[#141418]">
            <button
              type="button"
              onClick={rotateClockwise}
              className="px-2 py-0.5 text-xs text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Previous capability"
            >
              ←
            </button>
            <button
              type="button"
              onClick={rotateAntiClockwise}
              className="px-2 py-0.5 text-xs text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Next capability"
            >
              →
            </button>
          </div>

          {/* Depth of Field (FX) Tactile Hardware Switch */}
          <button
            type="button"
            onClick={() => setFxEnabled(!fxEnabled)}
            className={cn(
              "group inline-flex items-center gap-2 px-2.5 py-1 rounded-none border transition-all select-none cursor-pointer",
              fxEnabled
                ? "bg-[#181512] border-[#ffdc18]/60 text-white shadow-sm"
                : "bg-[#141418] border-white/10 text-neutral-400 hover:border-white/20 hover:text-white"
            )}
            role="switch"
            aria-checked={fxEnabled}
            aria-label="Toggle depth-of-field lens blur"
          >
            <span className="font-mono text-[10px] font-semibold tracking-wider shrink-0 text-neutral-300 group-hover:text-white transition-colors">
              FX
            </span>
            <div
              className={cn(
                "relative inline-flex h-3.5 w-6 shrink-0 rounded-none border p-[1px] transition-colors duration-200",
                fxEnabled
                  ? "bg-[#ffdc18]/20 border-[#ffdc18]"
                  : "bg-neutral-900 border-neutral-700"
              )}
            >
              <span
                className={cn(
                  "inline-block h-full w-2.5 rounded-none transition-transform duration-200 ease-out",
                  fxEnabled
                    ? "translate-x-2.5 bg-[#ffdc18] shadow-[0_0_6px_rgba(255,220,24,0.6)]"
                    : "translate-x-0 bg-neutral-500 group-hover:bg-neutral-400"
                )}
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ToolOrbit;
