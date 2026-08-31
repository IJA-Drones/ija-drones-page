"use client";

import dynamic from "next/dynamic";
import { useMemo, useState, type FormEvent } from "react";

import { Icon } from "@/components/icon";
import { SystemPageTitle } from "@/components/system/system-page-title";
import { defaultMapFilters, filterMapPoints, mapFocusTypes, mapMonths, mapStatistics, mapUnits, type MapFilters, type MapView } from "@/components/system/maps-data";

const MapsCanvas = dynamic(() => import("@/components/system/maps-canvas"), { ssr: false, loading: () => <div className="maps-loading" role="status">Preparando o mapa de Itajubá…</div> });
const views = [{ id: "heat", label: "Calor", icon: "signal" }, { id: "areas", label: "Áreas", icon: "map" }, { id: "logistics", label: "Logística", icon: "fleet" }] as const;

export function MapsScreen() {
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [draft, setDraft] = useState<MapFilters>(defaultMapFilters);
  const [applied, setApplied] = useState<MapFilters>(defaultMapFilters);
  const [view, setView] = useState<MapView>("heat");
  const [showStats, setShowStats] = useState(false);
  // Keep the imperative map layers stable when only a draft filter or panel changes.
  const points = useMemo(() => filterMapPoints(applied), [applied]);
  const stats = mapStatistics(points);
  const month = mapMonths[Number(applied.month) - 1];

  function applyFilters(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setApplied({ ...draft }); }

  return (
    <section className="system-screen clients-screen maps-screen" aria-labelledby="maps-title">
      <header className="system-page-header">
        <SystemPageTitle icon={<span className="maps-title-icon" />} id="maps-title" title="Inteligência Geográfica" />
        <div className="system-actions clients-screen__actions maps-screen__actions"><button type="button" aria-expanded={showStats} aria-controls="maps-statistics" onClick={() => setShowStats((current) => !current)}><Icon name="analytics" /> {showStats ? "Ocultar Estatísticas" : "Ver Estatísticas"}</button></div>
      </header>

      <section className={`os-filter clients-filter maps-filter ${filtersOpen ? "is-open" : ""}`}>
        <button className="os-filter__toggle" type="button" aria-expanded={filtersOpen} aria-controls="maps-filter-fields" onClick={() => setFiltersOpen((current) => !current)}><span><span className="clients-filter-icon" aria-hidden="true" /><b>Filtros de Busca</b></span><i aria-hidden="true">⌄</i></button>
        {filtersOpen ? <form className="os-filter__fields" id="maps-filter-fields" onSubmit={applyFilters}>
          <label>Unidade (UVIS)<select value={draft.unit} onChange={(event) => setDraft((current) => ({ ...current, unit: event.target.value }))}><option value="">Todas as Unidades</option>{mapUnits.map((unit) => <option key={unit}>{unit}</option>)}</select></label>
          <label>Mês de Referência<select value={draft.month} onChange={(event) => setDraft((current) => ({ ...current, month: event.target.value }))}>{mapMonths.map((name, index) => <option key={name} value={String(index + 1).padStart(2, "0")}>{name}</option>)}</select></label>
          <label>Tipo de Foco<select value={draft.focus} onChange={(event) => setDraft((current) => ({ ...current, focus: event.target.value }))}><option value="">Todos os Focos</option>{mapFocusTypes.map((focus) => <option key={focus}>{focus}</option>)}</select></label>
          <button type="submit"><span className="clients-filter-icon" aria-hidden="true" /> Filtrar</button>
        </form> : null}
      </section>

      {showStats ? <section className="maps-statistics" id="maps-statistics" aria-label="Estatísticas do filtro aplicado">
        <article><span>Volume de focos</span><strong>{stats.volume}</strong></article><article><span>Pontos no mapa</span><strong>{stats.points}</strong></article><article><span>Unidades atendidas</span><strong>{stats.units}</strong></article>
      </section> : null}

      <div className="maps-panel">
        <div className="maps-view-switch" role="group" aria-label="Visualização do mapa">{views.map((item) => <button type="button" key={item.id} aria-pressed={view === item.id} onClick={() => setView(item.id)}><Icon name={item.icon} /> {item.label}</button>)}</div>
        <MapsCanvas points={points} view={view} />
        <footer className="maps-panel__footer"><span role="status" aria-live="polite">{month} / 2026 · {applied.unit || "Todas as unidades"} · {stats.points} pontos</span><span>Dados fictícios · Sem rastreamento real</span></footer>
      </div>
      {!points.length ? <p className="clients-feedback" role="status">Nenhum foco demonstrativo para este filtro. Selecione junho, julho ou agosto para explorar os exemplos.</p> : null}
      <p className="clients-caption">Base geográfica real de Itajubá. Focos, áreas e trajetos são apenas ilustrativos. Arraste o mapa ou use os controles de zoom.</p>
    </section>
  );
}
