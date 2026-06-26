"use client";

import { useEffect, useState } from "react";

import { geoApi, type City } from "@/lib/auth";

interface CitySelectProps {
  value: string;
  onChange: (cityId: string, city: City | null) => void;
  placeholder?: string;
  className?: string;
  id?: string;
}

export function CitySelect({
  value,
  onChange,
  placeholder = "Toutes les villes",
  className = "",
  id,
}: CitySelectProps) {
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    let active = true;
    geoApi
      .cities()
      .then((data) => {
        if (active) setCities(data);
      })
      .catch(() => {
        if (active) setCities([]);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <select
      id={id}
      value={value}
      onChange={(event) => {
        const cityId = event.target.value;
        onChange(cityId, cities.find((c) => c.id === cityId) ?? null);
      }}
      className={`h-11 w-full rounded-xl border border-[#B3D4E5] bg-white px-3 text-sm font-semibold text-[#4E73C7] focus:border-[#4E73C7] focus:outline-none ${className}`}
    >
      <option value="">{placeholder}</option>
      {cities.map((city) => (
        <option key={city.id} value={city.id}>
          {city.nom}
          {city.departments?.nom ? ` — ${city.departments.nom}` : ""}
        </option>
      ))}
    </select>
  );
}
