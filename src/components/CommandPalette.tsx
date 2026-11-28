import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { PROJECTS_DATA } from "../data/projects";
import { springs } from "../motion.theme";

type Command = { label: string; hint: string; run: () => void };

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const close = () => { setOpen(false); setQuery(""); };
  const go = (hash: string) => { navigate({ pathname: "/", hash }); close(); };
  // Command registry: section landmarks and project deep links
  const commands: Command[] = [
    { label: "Go to work", hint: "#projects", run: () => go("#projects") },
    { label: "Go to tools", hint: "#tools", run: () => go("#tools") },
    { label: "Go to experience", hint: "#experience", run: () => go("#experience") },
    { label: "Go to about", hint: "#about", run: () => go("#about") },
    { label: "Go to blog", hint: "#blog", run: () => go("#blog") },
    { label: "Go to contact", hint: "#contact", run: () => go("#contact") },
    ...PROJECTS_DATA.map(project => ({ label: `Open ${project.title}`, hint: "Case study", run: () => { navigate(`/project/${project.id}`); close(); } })),
  ];
  const results = commands.filter(command => command.label.toLowerCase().includes(query.toLowerCase()) || command.hint.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const editing = target?.matches("input, textarea, [contenteditable='true']");
      if (event.key === "Escape") close();
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setOpen(value => !value); }
      if (event.key === "/" && !editing) { event.preventDefault(); setOpen(true); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => { if (open) window.setTimeout(() => input.current?.focus(), 0); }, [open]);

  return <AnimatePresence>{open && <m.div className="command-layer" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={close}><m.section className="command-palette" role="dialog" aria-modal="true" aria-label="Command palette" initial={reduce ? false : { opacity: 0, y: 18, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: .98 }} transition={springs.ui} onMouseDown={event => event.stopPropagation()}><div className="command-search"><span>/</span><input ref={input} value={query} onChange={event => setQuery(event.target.value)} placeholder="Search commands" aria-label="Search commands" /><kbd>ESC</kbd></div><div className="command-results">{results.map(command => <button key={command.label} type="button" onClick={command.run}><span>{command.label}</span><small>{command.hint}</small></button>)}{results.length === 0 && <p>No matching command.</p>}</div><footer><span>⌘ K</span><span>Navigate</span><span>↵ Select</span></footer></m.section></m.div>}</AnimatePresence>;
}
