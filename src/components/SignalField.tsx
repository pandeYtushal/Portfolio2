import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

type Point = { phase: number; orbit: number; speed: number; size: number };

/** A small, original canvas study: a living signal rather than a decorative image. */
export default function SignalField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const points: Point[] = Array.from({ length: reduce ? 96 : 240 }, (_, index) => ({
      phase: index * 2.399963229728653,
      orbit: 0.12 + ((index * 37) % 100) / 125,
      speed: 0.32 + ((index * 17) % 100) / 200,
      size: 0.6 + ((index * 11) % 10) / 10,
    }));
    let frame = 0;
    let width = 1;
    let height = 1;
    let ratio = 1;
    let pointer = { x: 0.5, y: 0.5 };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = (time = 0) => {
      const tick = reduce ? 0 : time / 1000;
      context.clearRect(0, 0, width, height);
      const centerX = width * (0.53 + (pointer.x - 0.5) * 0.06);
      const centerY = height * (0.47 + (pointer.y - 0.5) * 0.06);
      const radius = Math.min(width, height) * 0.31;
      const glow = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 1.25);
      glow.addColorStop(0, "rgba(255, 217, 0, .16)");
      glow.addColorStop(0.4, "rgba(255, 217, 0, .035)");
      glow.addColorStop(1, "rgba(255, 217, 0, 0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      // Field lines create the magnetic structure around the signal core.
      for (let layer = 0; layer < 13; layer += 1) {
        const progress = layer / 12;
        const horizontal = radius * (0.32 + progress * 1.22);
        const vertical = radius * (0.12 + progress * 0.44);
        context.beginPath();
        for (let point = 0; point <= 96; point += 1) {
          const angle = (point / 96) * Math.PI * 2;
          const pull = Math.sin(angle * 3 + tick * (0.4 + progress * 0.3)) * radius * (0.018 + progress * 0.018);
          const x = centerX + Math.cos(angle) * horizontal;
          const y = centerY + Math.sin(angle) * vertical + pull;
          if (point === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.strokeStyle = `rgba(255, 220, 24, ${0.028 + (1 - progress) * 0.06})`;
        context.lineWidth = progress < 0.25 ? 0.85 : 0.55;
        context.stroke();
      }

      points.forEach((point) => {
        const angle = point.phase + tick * point.speed;
        const pulse = 0.82 + Math.sin(tick * 1.7 + point.phase) * 0.14;
        const x = centerX + Math.cos(angle) * radius * point.orbit * 1.45;
        const y = centerY + Math.sin(angle * 1.7) * radius * point.orbit * pulse;
        const alpha = 0.25 + (1 - point.orbit) * 0.58;
        context.beginPath();
        context.fillStyle = `rgba(255, 222, 66, ${alpha})`;
        context.arc(x, y, point.size, 0, Math.PI * 2);
        context.fill();
      });
      context.beginPath();
      context.fillStyle = "#fff4b3";
      context.arc(centerX, centerY, 3, 0, Math.PI * 2);
      context.fill();
      if (!reduce) frame = requestAnimationFrame(draw);
    };

    const move = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer = { x: (event.clientX - bounds.left) / bounds.width, y: (event.clientY - bounds.top) / bounds.height };
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    canvas.addEventListener("pointermove", move);
    resize();
    draw();
    return () => { observer.disconnect(); canvas.removeEventListener("pointermove", move); cancelAnimationFrame(frame); };
  }, [reduce]);

  return <canvas ref={canvasRef} className="signal-field" aria-hidden="true" />;
}
