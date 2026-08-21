"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type RecruiterContext = {
  enabled: boolean;
  toggle: () => void;
};

const Ctx = createContext<RecruiterContext>({ enabled: false, toggle: () => {} });

export function RecruiterProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("recruiter-mode");
    // Hydration-safe: server renders "off", so the sync read must land in an effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved === "on") setEnabled(true);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.recruiter = enabled ? "on" : "off";
    if (enabled) {
      window.localStorage.setItem("recruiter-mode", "on");
    } else {
      window.localStorage.removeItem("recruiter-mode");
    }
  }, [enabled]);

  const toggle = useCallback(() => setEnabled((v) => !v), []);

  return <Ctx.Provider value={{ enabled, toggle }}>{children}</Ctx.Provider>;
}

export function useRecruiter() {
  return useContext(Ctx);
}
