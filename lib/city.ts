"use client";

import { useEffect, useState } from "react";

const CITY_KEY = "livelo.selected_city";

export interface SelectedCity {
  id: string;
  nom: string;
}

function read(): SelectedCity | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CITY_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<SelectedCity>;
    if (!parsed.id || !parsed.nom) return null;
    return { id: parsed.id, nom: parsed.nom };
  } catch {
    return null;
  }
}

/** Hook : ville sélectionnée par l'acheteur (persistée en localStorage). */
export function useSelectedCity() {
  const [city, setCityState] = useState<SelectedCity | null>(null);

  useEffect(() => {
    void Promise.resolve().then(() => setCityState(read()));
  }, []);

  function setCity(next: SelectedCity | null) {
    setCityState(next);
    if (typeof window === "undefined") return;
    if (next) {
      window.localStorage.setItem(CITY_KEY, JSON.stringify(next));
    } else {
      window.localStorage.removeItem(CITY_KEY);
    }
  }

  return { city, setCity };
}
