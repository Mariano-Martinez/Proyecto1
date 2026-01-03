"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, onSearch, placeholder }: Props) {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={clsx(
        "flex items-center gap-3 rounded-2xl border bg-white px-4 py-3 shadow-card transition",
        focused ? "border-brand-blue ring-2 ring-brand-blue/15" : "border-slate-200"
      )}
    >
      <Search className="h-5 w-5 text-slate-500" />
      <input
        className="flex-1 bg-transparent text-base outline-none"
        placeholder={placeholder || "Pega una URL de Mercado Libre o escribe una búsqueda"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSearch();
        }}
      />
      <button onClick={onSearch} className="btn-primary flex items-center gap-2">
        Buscar
      </button>
    </div>
  );
}
