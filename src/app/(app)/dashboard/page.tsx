"use client";

import AppShell from "@/components/AppShell";
import ResultCard from "@/components/ResultCard";
import SearchBar from "@/components/SearchBar";
import TrackerCard from "@/components/TrackerCard";
import UpgradeModal from "@/components/UpgradeModal";
import { useAppState } from "@/components/providers/app-state-provider";
import { useToast } from "@/components/providers/toast-provider";
import { generateMockResults } from "@/lib/mockSearch";
import { parseSearchInput } from "@/lib/parseSearch";
import { SearchResult } from "@/lib/types";
import { Sparkles } from "lucide-react";
import { useState } from "react";

export default function DashboardPage() {
  const { trackers, addTracker, toggleTrackerStatus, userPlan } = useAppState();
  const { push } = useToast();
  const [searchInput, setSearchInput] = useState("iphone 13 128gb");
  const [parsedLabel, setParsedLabel] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const handleSearch = () => {
    const parsed = parseSearchInput(searchInput);
    setParsedLabel(parsed.label);
    setResults(generateMockResults(parsed.label));
  };

  const handleCreateTracker = () => {
    if (!parsedLabel) {
      handleSearch();
      return;
    }
    const parsed = parseSearchInput(searchInput);
    if (!parsed.label) {
      push({ title: "Ingresa una búsqueda", description: "Necesitas texto o URL para crear el tracker", variant: "error" });
      return;
    }
    const response = addTracker({ label: parsed.label, queryText: parsed.queryText, searchUrl: parsed.searchUrl });
    if (!response.ok) {
      setShowUpgrade(true);
      push({ title: "Límite alcanzado", description: "Upgrade para crear más trackers", variant: "error" });
      return;
    }
    push({ title: "Tracker creado", description: `${parsed.label} monitoreándose cada ${userPlan.minIntervalMinutes} min`, variant: "success" });
  };

  return (
    <AppShell
      headerContent={
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Sparkles className="h-4 w-4 text-brand-blue" />
              Ingresá una búsqueda o URL de Mercado Libre. Resultados y trackers son mock.
            </div>
          </div>
          <SearchBar value={searchInput} onChange={setSearchInput} onSearch={handleSearch} />
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[360px,1fr]">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Trackers</h2>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              {trackers.length}/{userPlan.trackerLimit} usados
            </span>
          </div>
          {trackers.map((tracker) => (
            <TrackerCard key={tracker.id} tracker={tracker} onToggleStatus={toggleTrackerStatus} />
          ))}
        </div>
        <div className="space-y-4">
          <div className="card flex items-center justify-between p-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Buscar</p>
              <h3 className="text-lg font-semibold text-slate-900">
                {parsedLabel ? `Resultados para “${parsedLabel}”` : "Resultados simulados"}
              </h3>
              <p className="text-sm text-slate-600">10 cards mock, listos para conectar con API real.</p>
            </div>
            <button onClick={handleCreateTracker} className="btn-primary">
              Iniciar seguimiento
            </button>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {results.length === 0 ? (
              <div className="card p-6 text-center text-sm text-slate-600">Lanza una búsqueda para ver resultados mock.</div>
            ) : (
              results.map((result) => <ResultCard key={result.id} result={result} />)
            )}
          </div>
        </div>
      </div>
      <UpgradeModal open={showUpgrade} onClose={() => setShowUpgrade(false)} />
    </AppShell>
  );
}
