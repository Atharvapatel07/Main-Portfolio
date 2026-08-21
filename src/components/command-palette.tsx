"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { projects } from "@/content/projects";
import { useRecruiter } from "./recruiter-mode";

type Action = {
  id: string;
  label: string;
  hint: string;
  perform: (helpers: { close: () => void }) => void;
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const router = useRouter();
  const { enabled, toggle } = useRecruiter();

  const openRef = useRef(false);

  const closePalette = () => {
    openRef.current = false;
    setOpen(false);
  };

  const openPalette = () => {
    setQuery("");
    setActiveIndex(0);
    openRef.current = true;
    setOpen(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (openRef.current) closePalette();
        else openPalette();
      }
      if (e.key === "Escape") closePalette();
    };
    const onOpen = () => openPalette();
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, []);

  const actions: Action[] = [
    ...projects.map((p) => ({
      id: `project-${p.slug}`,
      label: p.title,
      hint: `Case study · ${p.status}`,
      perform: ({ close }: { close: () => void }) => {
        router.push(`/projects/${p.slug}`);
        close();
      },
    })),
    {
      id: "nav-projects",
      label: "All projects",
      hint: "Navigate",
      perform: ({ close }) => {
        router.push("/projects");
        close();
      },
    },
    {
      id: "nav-resume",
      label: "Résumé page",
      hint: "Navigate",
      perform: ({ close }) => {
        router.push("/resume");
        close();
      },
    },
    {
      id: "download-resume",
      label: "Download résumé (PDF)",
      hint: "Action",
      perform: ({ close }) => {
        triggerDownload(site.resumePath);
        close();
      },
    },
    {
      id: "copy-email",
      label: `Copy email — ${site.email}`,
      hint: "Action",
      perform: async ({ close }) => {
        try {
          await navigator.clipboard.writeText(site.email);
        } catch {
          /* clipboard unavailable — no-op */
        }
        close();
      },
    },
    {
      id: "github",
      label: "Open GitHub profile",
      hint: site.github.replace("https://", ""),
      perform: ({ close }) => {
        window.open(site.github, "_blank", "noopener");
        close();
      },
    },
    {
      id: "linkedin",
      label: "Open LinkedIn profile",
      hint: site.linkedin.replace("https://", ""),
      perform: ({ close }) => {
        window.open(site.linkedin, "_blank", "noopener");
        close();
      },
    },
    {
      id: "recruiter-mode",
      label: enabled ? "Disable Recruiter Mode" : "Enable Recruiter Mode",
      hint: "Condensed, low-motion view",
      perform: ({ close }) => {
        toggle();
        close();
      },
    },
  ];

  const filtered = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase()),
  );
  const clamped = Math.min(activeIndex, Math.max(0, filtered.length - 1));

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center bg-ink/30 px-4 pt-[12vh] backdrop-blur-sm"
      onClick={() => closePalette()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded="true"
          aria-controls="palette-list"
          aria-activedescendant={filtered[clamped]?.id}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(0);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActiveIndex((i) => Math.max(i - 1, 0));
            } else if (e.key === "Enter" && filtered[clamped]) {
              filtered[clamped].perform({ close: () => closePalette() });
            }
          }}
          placeholder="Search projects, résumé, actions…"
          className="w-full border-b border-line bg-transparent px-5 py-4 text-base outline-none placeholder:text-ink-faint"
        />
        {filtered.length === 0 ? (
          <p className="px-5 py-6 text-sm text-ink-faint">
            No matches. Try “resume”, “email”, or a project name.
          </p>
        ) : (
          <ul id="palette-list" ref={listRef} role="listbox" aria-label="Actions" className="max-h-80 overflow-y-auto py-2">
            {filtered.map((a, i) => (
              <li key={a.id} id={a.id} role="option" aria-selected={i === clamped}>
                <button
                  type="button"
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => a.perform({ close: () => closePalette() })}
                  className={`flex w-full items-center justify-between px-5 py-3 text-left text-sm ${
                    i === clamped ? "bg-blue-panel text-blue" : "text-ink"
                  }`}
                >
                  <span>{a.label}</span>
                  <span className="ml-4 shrink-0 font-mono text-xs text-ink-faint">
                    {a.hint}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
        <p className="border-t border-line bg-canvas px-5 py-2.5 font-mono text-xs text-ink-faint">
          ↑↓ navigate · ↵ select · esc close ·{" "}
          <Link href="/resume" className="underline" onClick={() => closePalette()}>
            résumé
          </Link>
        </p>
      </div>
    </div>
  );
}


function triggerDownload(path: string) {
  const a = document.createElement("a");
  a.href = path;
  a.download = "";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

