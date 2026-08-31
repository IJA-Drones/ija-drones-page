"use client";

import { useRef, useState } from "react";

import { Icon } from "@/components/icon";
import { SystemPageTitle } from "@/components/system/system-page-title";
import { formatEquipmentDate, getEquipmentRecords, type EquipmentView } from "@/components/system/equipment-data";

const equipmentCards = [
  { view: "drones", label: "Drones", link: "Ver frota completa" },
  { view: "batteries", label: "Baterias", link: "Ver estoque total" },
  { view: "maintenance", label: "Em manutenção", link: "Ver equipamentos parados" },
] as const;

const viewTitles: Record<EquipmentView, string> = {
  recent: "Atividades Recentes de Cadastro",
  drones: "Frota de Drones",
  batteries: "Estoque de Baterias",
  maintenance: "Equipamentos em Manutenção",
};

export function EquipmentScreen() {
  const [view, setView] = useState<EquipmentView>("recent");
  const selectedCardRef = useRef<HTMLButtonElement | null>(null);
  const records = getEquipmentRecords(view);

  return (
    <section className="system-screen equipment-screen" aria-labelledby="equipment-title">
      <header className="system-page-header">
        <SystemPageTitle
          icon={<span className="equipment-package-icon" />}
          id="equipment-title"
          title="Gestão de Equipamentos"
          description="Visão geral de hardware e ativos da Oceano Azul."
        />
      </header>

      <div className="equipment-summary" role="group" aria-label="Resumo dos equipamentos">
        {equipmentCards.map((card) => (
          <button
            key={card.view}
            type="button"
            className={`equipment-summary__card equipment-summary__card--${card.view}`}
            aria-pressed={view === card.view}
            aria-controls="equipment-records"
            onClick={(event) => {
              selectedCardRef.current = event.currentTarget;
              setView((current) => current === card.view ? "recent" : card.view);
            }}
          >
            <span className="equipment-summary__label">{card.label}</span>
            <strong className="equipment-summary__value">{getEquipmentRecords(card.view).length}</strong>
            <span className="equipment-summary__icon" aria-hidden="true">
              {card.view === "drones" ? <Icon name="flight" /> : card.view === "batteries" ? <span className="equipment-battery-icon">ϟ</span> : <span className="equipment-maintenance-icon">⚒</span>}
            </span>
            <span className="equipment-summary__link">{card.link}<Icon name="arrow" /></span>
          </button>
        ))}
      </div>

      <section className="equipment-activity" id="equipment-records" aria-labelledby="equipment-records-title">
        <header className="equipment-activity__header">
          <h4 id="equipment-records-title"><span aria-hidden="true">◷</span>{viewTitles[view]}</h4>
          {view !== "recent" ? (
            <div className="system-actions">
              <button type="button" onClick={() => { setView("recent"); selectedCardRef.current?.focus({ preventScroll: true }); }}><span aria-hidden="true">←</span> Voltar ao resumo</button>
            </div>
          ) : null}
        </header>
        <div className="equipment-table-wrap">
          <table className="equipment-table" role="table" aria-label={viewTitles[view]}>
            <thead><tr>{["Tipo", "Renomação / Modelo", "Nº de série", "Status", "Cadastrado em"].map((column) => <th key={column} scope="col">{column}</th>)}</tr></thead>
            <tbody>
              {records.map((item) => (
                <tr key={item.id} role="row">
                  <td role="cell" data-label="Tipo"><span className="equipment-type"><span className="equipment-chip-icon" aria-hidden="true" /><span className="equipment-type__label">{item.type}</span></span></td>
                  <td role="cell" data-label="Renomação / Modelo"><strong>{item.name}</strong><small>{item.model}</small></td>
                  <td role="cell" data-label="Nº de série">{item.serial || "–"}</td>
                  <td role="cell" data-label="Status"><span className={`equipment-status ${item.status === "Em manutenção" ? "is-maintenance" : ""}`}><span className="equipment-status__icon" aria-hidden="true">{item.status === "Ativo" ? "✓" : "!"}</span>{item.status}</span></td>
                  <td role="cell" data-label="Cadastrado em"><time dateTime={item.registeredAt}>{formatEquipmentDate(item.registeredAt)}</time></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!records.length ? <div className="equipment-empty"><span aria-hidden="true">✓</span><strong>Nenhum equipamento em manutenção.</strong><p>Todos os equipamentos desta demonstração estão ativos.</p></div> : null}
      </section>
      <p className="equipment-caption" role="status" aria-live="polite">{view === "recent" ? `${records.length} cadastros mais recentes` : `${records.length} equipamentos nesta categoria`} · Dados demonstrativos</p>
    </section>
  );
}
