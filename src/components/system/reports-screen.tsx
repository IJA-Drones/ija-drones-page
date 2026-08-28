"use client";

import { useState, type CSSProperties } from "react";

import { SystemPageTitle } from "@/components/system/system-page-title";

type ReportMetric = {
  label: string;
  value: string;
  color: string;
};

const reportMetrics: readonly ReportMetric[] = [
  { label: "Total", value: "1332", color: "#315f94" },
  { label: "Pendentes", value: "13", color: "#8090a7" },
  { label: "Em análise", value: "0", color: "#f4df18" },
  { label: "Aprovadas", value: "135", color: "#31915f" },
  { label: "Aprovadas c/ recom.", value: "0", color: "#f36a12" },
  { label: "Concluídas", value: "899", color: "#8d2dff" },
  { label: "Recusadas", value: "256", color: "#ef3e43" },
  { label: "Canceladas", value: "29", color: "#303841" },
];

const statusLegend = [
  { label: "Concluídas", value: "67,5%", color: "#8d2dff" },
  { label: "Recusadas", value: "19,2%", color: "#ef3e43" },
  { label: "Aprovadas", value: "10,1%", color: "#31915f" },
  { label: "Outras", value: "3,2%", color: "#4b5563" },
] as const;

const regionData = [
  { region: "Norte", value: 284, width: 94 },
  { region: "Leste", value: 191, width: 54 },
  { region: "Sul", value: 158, width: 45 },
  { region: "Oeste", value: 126, width: 36 },
  { region: "Centro", value: 83, width: 24 },
] as const;

type ExpandedReport = "status" | "regions" | null;

export function ReportsScreen() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [period, setPeriod] = useState("Agosto / 2026");
  const [expandedReport, setExpandedReport] = useState<ExpandedReport>(null);
  const [feedback, setFeedback] = useState("");

  const showFeedback = (message: string) => {
    setFeedback(message);
    window.setTimeout(() => setFeedback(""), 2200);
  };

  const toggleExpanded = (report: Exclude<ExpandedReport, null>) => {
    setExpandedReport((current) => current === report ? null : report);
  };

  return (
    <section className="system-screen reports-screen" aria-labelledby="reports-title">
      <header className="reports-screen__header system-page-header">
        <SystemPageTitle icon="▥" id="reports-title" title="Relatórios" meta={<>Solicitações filtradas: <strong>1332</strong></>} />
        <div className="system-actions reports-screen__actions">
          <button type="button" onClick={() => showFeedback("Relatório de ordens de serviço preparado")}>▥ Relatório OS</button>
          <button className="is-danger" type="button" onClick={() => showFeedback("Relatório em PDF preparado")}>▣ Exportar PDF</button>
          <button className="is-success" type="button" onClick={() => showFeedback("Planilha Excel preparada")}>▤ Exportar Excel</button>
        </div>
      </header>

      <section className={`reports-filter ${filtersOpen ? "is-open" : ""}`}>
        <button className="reports-filter__toggle" type="button" aria-expanded={filtersOpen} aria-controls="reports-filter-fields" onClick={() => setFiltersOpen((open) => !open)}>
          <span><i aria-hidden="true">▼</i> <b>Filtros de busca</b></span><i aria-hidden="true">⌄</i>
        </button>
        {filtersOpen ? (
          <div className="reports-filter__fields" id="reports-filter-fields">
            <label>Período<select value={period} onChange={(event) => setPeriod(event.target.value)}><option>Agosto / 2026</option><option>Julho / 2026</option><option>Junho / 2026</option></select></label>
            <label>Status<select defaultValue="Todos"><option>Todos</option><option>Pendente</option><option>Aprovada</option><option>Concluída</option></select></label>
            <label>Região<select defaultValue="Todas"><option>Todas</option><option>Norte</option><option>Leste</option><option>Sul</option><option>Oeste</option></select></label>
            <button type="button" onClick={() => showFeedback("Filtros dos relatórios aplicados")}>Aplicar filtros</button>
          </div>
        ) : null}
      </section>

      <h4 className="reports-screen__period">Dados de {period}</h4>

      <div className="reports-metrics">
        {reportMetrics.map((metric) => (
          <article key={metric.label} style={{ "--report-color": metric.color } as CSSProperties}>
            <span>{metric.label}</span><strong>{metric.value}</strong>
          </article>
        ))}
      </div>

      <div className={`reports-charts ${expandedReport ? "has-expanded" : ""}`}>
        <article className={`reports-chart-card reports-chart-card--status ${expandedReport === "status" ? "is-expanded" : ""} ${expandedReport === "regions" ? "is-hidden" : ""}`}>
          <header><h4><span aria-hidden="true">◕</span> Status</h4><small>Período filtrado</small><button type="button" onClick={() => toggleExpanded("status")}>⛶ {expandedReport === "status" ? "Reduzir" : "Expandir"}</button></header>
          <div className="reports-status-chart">
            <div className="reports-donut" aria-label="Gráfico de distribuição dos status"><span><strong>1332</strong><small>solicitações</small></span></div>
            <div className="reports-chart-legend">
              {statusLegend.map((item) => <span key={item.label} style={{ "--legend-color": item.color } as CSSProperties}><i />{item.label}<strong>{item.value}</strong></span>)}
            </div>
          </div>
        </article>

        <article className={`reports-chart-card reports-chart-card--regions ${expandedReport === "regions" ? "is-expanded" : ""} ${expandedReport === "status" ? "is-hidden" : ""}`}>
          <header><h4><span aria-hidden="true">⌖</span> Solicitações por Região</h4><small>Período filtrado</small><button type="button" onClick={() => toggleExpanded("regions")}>⛶ {expandedReport === "regions" ? "Reduzir" : "Expandir"}</button></header>
          <div className="reports-region-chart" aria-label="Gráfico de solicitações por região">
            {regionData.map((item) => (
              <div key={item.region}><span>{item.region}</span><i><b style={{ "--region-width": `${item.width}%` } as CSSProperties} /></i><strong>{item.value}</strong></div>
            ))}
          </div>
        </article>
      </div>

      <div className={`os-feedback ${feedback ? "is-visible" : ""}`} role="status" aria-live="polite">{feedback}</div>
    </section>
  );
}
