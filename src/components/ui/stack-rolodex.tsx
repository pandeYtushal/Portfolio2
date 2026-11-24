import { useEffect, useState, ComponentType } from "react";
import { m, useReducedMotion } from "motion/react";
import { cn } from "../../lib/utils";

export interface StackRolodexItem {
  /** Stable key for the pill. */
  id: string;
  /** Text inside the pill. */
  name: string;
  /** Any icon component that accepts a className. */
  icon: ComponentType<{ className?: string; style?: React.CSSProperties }> | (() => JSX.Element);
  /** Brand color the icon/active pill takes while the pill is the active one. */
  color?: string;
}

export type RolodexItem = StackRolodexItem;

export interface StackRolodexProps {
  /** Pills to cycle through. Needs at least two items to rotate. */
  items: StackRolodexItem[];
  /** Static line rendered beside the stack. Omit to render the stack alone. */
  label?: string;
  /** Backwards compatibility alias for label. */
  sideLabel?: string;
  /** Milliseconds between rotations. Defaults to 2000. */
  interval?: number;
  /** Vertical distance between neighbouring pills, in pixels. Defaults to 48. */
  step?: number;
  className?: string;
  /** Callback fired whenever the active pill changes. */
  onActiveChange?: (item: StackRolodexItem, index: number) => void;
}

/** Default milliseconds between rotations. */
const DEFAULT_INTERVAL = 1800;

/** Default vertical distance between neighbouring pills, in pixels. */
const DEFAULT_STEP = 48;

/** Number of pills visible on each side of the active one. */
const VISIBLE_COUNT = 3;

/** Seconds one rotation step takes to travel. */
const TRAVEL_SECONDS = 0.5;

/** Quintic cubic bezier deceleration curve: silky-smooth Apple-grade motion. */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Gradient mask dissolving top and bottom edges. */
const EDGE_FADE =
  "linear-gradient(to bottom, transparent 0%, black 28%, black 72%, transparent 100%)";

/**
 * StackRolodex
 * Pixel-perfect rotating vertical pill stack matching @akoder/stack-rolodex:
 * - Continuous infinite wraparound without hard boundaries or edge snapping
 * - Zero-duration teleportation for pills crossing the wrap-around boundary point
 * - Depth-by-distance scaling (scale) and edge fading (opacity)
 * - Quintic easing [0.22, 1, 0.36, 1] for 0.5s rotation travel with 1.5s settled rest
 * - Brand-tinted active pill for colored brands; clean neutral pill for monochrome brands
 * - Accessible: respects prefers-reduced-motion
 */
export function StackRolodex({
  items,
  label = "in my stack",
  sideLabel,
  interval = DEFAULT_INTERVAL,
  step = DEFAULT_STEP,
  className,
  onActiveChange,
}: StackRolodexProps) {
  const displayLabel = sideLabel ?? label;
  const [{ active, previous }, setActive] = useState({ active: 0, previous: 0 });
  const reduceMotion = useReducedMotion();

  const count = items.length;
  const half = Math.floor(count / 2);
  const pillHeight = Math.max(38, Math.min(step - 4, 46));
  const stackHeight = 2 * VISIBLE_COUNT * step + pillHeight;

  // Uninterrupted continuous rotation across all screen types
  useEffect(() => {
    if (count < 2) return;
    const id = setInterval(() => {
      setActive((s) => ({ active: s.active + 1, previous: s.active }));
    }, interval);
    return () => clearInterval(id);
  }, [count, interval]);

  useEffect(() => {
    if (count === 0) return;
    const activeIndex = (((active % count) + count) % count);
    if (items[activeIndex]) {
      onActiveChange?.(items[activeIndex], activeIndex);
    }
  }, [active, count, items, onActiveChange]);

  if (count === 0) return null;

  /**
   * Signed distance from the active pill, wrapped into a centred window.
   * Negative means above the centre, positive means below.
   */
  const offsetFor = (index: number, activeStep: number) => {
    const wrapped = (((index - activeStep) % count) + count) % count;
    return wrapped > half ? wrapped - count : wrapped;
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-3 sm:gap-6 select-none",
        className
      )}
    >
      {displayLabel && (
        <span className="text-sm font-medium text-neutral-400 whitespace-nowrap">
          {displayLabel}
        </span>
      )}

      {/* Rolodex cylinder viewport with top/bottom edge fade */}
      <ul
        className="relative w-44 shrink-0 list-none m-0 p-0 overflow-hidden"
        style={{
          height: stackHeight,
          maskImage: EDGE_FADE,
          WebkitMaskImage: EDGE_FADE,
        }}
      >
        {items.map((item, index) => {
          const d = offsetFor(index, active);
          const was = offsetFor(index, previous);
          // Pills crossing the wrap boundary teleport with 0-duration transition
          const crossed = count > 3 ? Math.abs(d - was) > half : Math.abs(d - was) > 1;
          const distance = Math.abs(d);
          const Icon = item.icon;
          const isActive = distance === 0;
          const tint = isActive ? item.color : undefined;

          return (
            <m.li
              key={item.id}
              onClick={() =>
                setActive((s) => ({ active: s.active + d, previous: s.active }))
              }
              className={cn(
                "absolute left-0 right-0 flex items-center gap-2.5 rounded-none px-4 border select-none whitespace-nowrap cursor-pointer transition-colors duration-300",
                isActive
                  ? "text-white shadow-sm"
                  : "text-neutral-400 hover:text-white/80"
              )}
              style={{
                height: pillHeight,
                top: "50%",
                marginTop: -pillHeight / 2,
                zIndex: count - distance,
                borderColor:
                  isActive && item.color
                    ? `${item.color}45`
                    : isActive
                      ? "rgba(255, 255, 255, 0.22)"
                      : "rgba(255, 255, 255, 0.06)",
                backgroundColor:
                  isActive && item.color
                    ? `${item.color}18`
                    : isActive
                      ? "rgba(255, 255, 255, 0.08)"
                      : "rgba(255, 255, 255, 0.02)",
              }}
              animate={{
                y: d * step,
                scale: 1 - distance * 0.14,
                opacity: distance > VISIBLE_COUNT ? 0 : 1 - distance * 0.45,
              }}
              transition={
                crossed || reduceMotion
                  ? { duration: 0 }
                  : { duration: TRAVEL_SECONDS, ease: EASE }
              }
            >
              <span
                aria-hidden="true"
                className="flex shrink-0 motion-safe:transition-colors motion-safe:duration-500"
                style={tint ? { color: tint } : undefined}
              >
                {Icon && <Icon className="w-4 h-4 shrink-0" />}
              </span>
              <span className="truncate text-sm font-medium">
                {item.name}
              </span>
            </m.li>
          );
        })}
      </ul>
    </div>
  );
}

export default StackRolodex;
