import { useEffect, useState, type ReactNode } from "react";
import Lenis from "lenis";
import { LenisContext } from "./LenisStore";
export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  useEffect(() => {
    const instance = new Lenis({ lerp: 0.09, wheelMultiplier: 1, syncTouch: false });
    setLenis(instance);
    let frame = 0;
    const raf = (time: number) => { instance.raf(time); frame = requestAnimationFrame(raf); };
    frame = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(frame); instance.destroy(); setLenis(null); };
  }, []);
  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
