"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

import { Icon } from "@/components/icon";
import { SystemPageTitle } from "@/components/system/system-page-title";
import { filterVehicles, initialVehicles, vehicleFleets, vehicleMetrics, vehicleOperations, vehicleServiceState, vehicleStatuses, vehicleTeams, vehiclesToCsv, type MockupVehicle } from "@/components/system/vehicles-data";

const kilometers = new Intl.NumberFormat("pt-BR");
const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export function VehiclesScreen({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const [vehicles, setVehicles] = useState<readonly MockupVehicle[]>(initialVehicles);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [operation, setOperation] = useState("");
  const [service, setService] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [editor, setEditor] = useState<{ vehicle: MockupVehicle | null } | null>(null);
  const [feedback, setFeedback] = useState("");
  const [formError, setFormError] = useState("");
  const editorRef = useRef<HTMLFormElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const createRef = useRef<HTMLButtonElement>(null);
  const metrics = vehicleMetrics(vehicles);
  const filtered = filterVehicles(vehicles, search, operation, service);
  const nextId = Math.max(0, ...vehicles.map((vehicle) => vehicle.id)) + 1;

  useEffect(() => {
    if (editor) {
      editorRef.current?.scrollIntoView({ block: "nearest", behavior: "instant" });
      editorRef.current?.querySelector<HTMLSelectElement>("select")?.focus({ preventScroll: true });
    }
  }, [editor]);

  function clearFilters() { setSearch(""); setOperation(""); setService(""); }

  function closeEditor() {
    setEditor(null);
    setFormError("");
    (triggerRef.current?.isConnected ? triggerRef.current : createRef.current)?.focus({ preventScroll: true });
  }

  function openEditor(vehicle: MockupVehicle | null) {
    setExpandedId(null);
    setFeedback("");
    setFormError("");
    setEditor({ vehicle });
  }

  function saveVehicle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const fleet = String(form.get("fleet")) as MockupVehicle["fleet"];
    const selectedOperation = String(form.get("operation")) as MockupVehicle["operation"];
    const status = String(form.get("status")) as MockupVehicle["status"];
    const teamId = String(form.get("teamId") ?? "");
    const odometerText = String(form.get("odometer") ?? "").trim();
    const nextServiceText = String(form.get("nextServiceKm") ?? "").trim();
    const odometer = Number(odometerText);
    const nextServiceKm = Number(nextServiceText);
    if (!vehicleFleets.includes(fleet) || !vehicleOperations.includes(selectedOperation) || !vehicleStatuses.includes(status)
      || (teamId && !vehicleTeams.some((team) => team.id === teamId)) || !odometerText || !nextServiceText
      || ![odometer, nextServiceKm].every((value) => Number.isSafeInteger(value) && value >= 0 && value <= 9999999)) {
      setFormError("Preencha os campos e informe quilometragens válidas, sem casas decimais.");
      return;
    }
    const id = editor?.vehicle?.id ?? nextId;
    const record: MockupVehicle = {
      id, name: `Veículo ${id}`, identifier: `DEMO-VEI-${String(id).padStart(3, "0")}`,
      fleet, operation: selectedOperation, status, teamId, odometer, nextServiceKm,
      serviceMarked: editor?.vehicle?.serviceMarked ?? false, movement: editor?.vehicle?.movement ?? null,
    };
    setVehicles((current) => editor?.vehicle ? current.map((item) => item.id === id ? record : item) : [record, ...current]);
    clearFilters();
    setFeedback(`${record.name}: ${editor?.vehicle ? "alterações salvas" : "cadastro incluído"} nesta demonstração.`);
    closeEditor();
  }

  function exportVehicles() {
    const url = URL.createObjectURL(new Blob([vehiclesToCsv(filtered)], { type: "text/csv;charset=utf-8;" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "frota-demonstrativa.csv";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setFeedback("Frota exportada em CSV, compatível com Excel. Todos os dados são fictícios.");
  }

  return (
    <section className="system-screen clients-screen vehicles-screen" aria-labelledby="vehicles-title">
      <header className="system-page-header">
        <SystemPageTitle icon={<span className="vehicles-title-icon" />} id="vehicles-title" title="Frota de Veículos" />
        <div className="system-actions clients-screen__actions vehicles-screen__actions">
          <button type="button" onClick={() => onNavigate("Dashboard")}><span aria-hidden="true">←</span> Voltar</button>
          <button type="button" className="is-primary" ref={createRef} onClick={(event) => { triggerRef.current = event.currentTarget; openEditor(null); }}><span aria-hidden="true">＋</span> Novo Veículo</button>
          <button type="button" className="is-success" onClick={exportVehicles} disabled={!filtered.length}><Icon name="report" /> Exportar</button>
        </div>
      </header>

      <div className="vehicles-metrics" aria-label="Indicadores da frota">
        {[{ label: "Frota", value: metrics.total, tone: "fleet" }, { label: "Revisões", value: metrics.due, tone: "due" }, { label: "Atrasados", value: metrics.overdue, tone: "overdue" }, { label: "Marcados", value: metrics.marked, tone: "marked" }].map((metric) => (
          <article key={metric.tone} className={`vehicles-metric vehicles-metric--${metric.tone}`}><span>{metric.label}</span><strong>{metric.value}</strong></article>
        ))}
      </div>

      <section className={`os-filter clients-filter ${filtersOpen ? "is-open" : ""}`}>
        <button className="os-filter__toggle" type="button" aria-expanded={filtersOpen} aria-controls="vehicles-filter-fields" onClick={() => setFiltersOpen((open) => !open)}><span><span className="clients-filter-icon" aria-hidden="true" /><b>Filtros de Busca</b></span><i aria-hidden="true">⌄</i></button>
        {filtersOpen ? <div className="os-filter__fields" id="vehicles-filter-fields">
          <label>Veículo ou equipe<input type="search" value={search} onChange={(event) => { setSearch(event.target.value); setExpandedId(null); }} placeholder="Buscar nome ou identificação" /></label>
          <label>Operação<select value={operation} onChange={(event) => { setOperation(event.target.value); setExpandedId(null); }}><option value="">Todas</option>{vehicleOperations.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Revisão<select value={service} onChange={(event) => { setService(event.target.value); setExpandedId(null); }}><option value="">Todas</option><option value="regular">Em dia</option><option value="due">Próxima (até 2.000 km)</option><option value="overdue">Atrasada</option><option value="marked">Marcada</option></select></label>
          <button type="button" onClick={clearFilters}>Limpar filtros</button>
        </div> : null}
      </section>

      {editor ? <form className="clients-editor" ref={editorRef} key={editor.vehicle?.id ?? "new"} onSubmit={saveVehicle} aria-labelledby="vehicles-editor-title" onKeyDown={(event) => { if (event.key === "Escape") { event.stopPropagation(); closeEditor(); } }}>
        <h4 id="vehicles-editor-title">{editor.vehicle ? `Editar ${editor.vehicle.name}` : `Novo Veículo ${nextId}`}</h4>
        <p>Identificação: {editor.vehicle?.identifier ?? `DEMO-VEI-${String(nextId).padStart(3, "0")}`} · Use apenas informações fictícias. Alterações válidas somente nesta demonstração.</p>
        <div className="clients-editor__fields">
          <label>Frota<select name="fleet" defaultValue={editor.vehicle?.fleet ?? "PRÓPRIA"}>{vehicleFleets.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Operação<select name="operation" defaultValue={editor.vehicle?.operation ?? "PREFEITURA"}>{vehicleOperations.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Equipe responsável<select name="teamId" defaultValue={editor.vehicle?.teamId ?? ""}><option value="">Sem equipe</option>{vehicleTeams.map((team) => <option key={team.id} value={team.id}>{team.name} · {team.pilot}</option>)}</select></label>
          <label>Status<select name="status" defaultValue={editor.vehicle?.status ?? "Ativo"}>{vehicleStatuses.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>KM atual<input name="odometer" type="number" min="0" max="9999999" step="1" required defaultValue={editor.vehicle?.odometer ?? 0} /></label>
          <label>Próxima revisão em (km)<input name="nextServiceKm" type="number" min="0" max="9999999" step="1" required defaultValue={editor.vehicle?.nextServiceKm ?? 10000} /></label>
        </div>
        {formError ? <p className="clients-editor__error" role="alert">{formError}</p> : null}
        <div className="system-actions"><button type="button" onClick={closeEditor}>Cancelar</button><button type="submit" className="is-primary">Salvar veículo</button></div>
      </form> : null}

      <p className="clients-feedback" role="status" aria-live="polite">{feedback}</p>
      <div className="vehicles-table-wrap">
        <table className="vehicles-table" role="table" aria-label="Frota de veículos demonstrativos">
          <thead><tr>{["Veículo / Identificação", "Frota / Op.", "Equipe responsável", "KM atual", "KM restante", "Última movimentação", "Status", "Ações"].map((column) => <th key={column} scope="col">{column}</th>)}</tr></thead>
          {filtered.map((vehicle) => {
            const team = vehicleTeams.find((item) => item.id === vehicle.teamId);
            const remaining = vehicle.nextServiceKm - vehicle.odometer;
            return <tbody key={vehicle.id} role="rowgroup">
              <tr role="row">
                <td role="cell" data-label="Veículo / Identificação"><strong className="vehicles-name">{vehicle.name}</strong><small>{vehicle.identifier}</small></td>
                <td role="cell" data-label="Frota / Op."><div className="vehicles-tags"><span>{vehicle.fleet}</span><span>{vehicle.operation}</span></div></td>
                <td role="cell" data-label="Equipe responsável"><div className="vehicles-team"><small>{team?.pilot ?? "Sem piloto vinculado"}</small><select aria-label={`Equipe responsável por ${vehicle.name}`} value={vehicle.teamId} onChange={(event) => {
                  const teamId = event.target.value;
                  setVehicles((current) => current.map((item) => item.id === vehicle.id ? { ...item, teamId } : item));
                  setFeedback(`Equipe de ${vehicle.name} atualizada nesta demonstração.`);
                }}><option value="">-- Sem equipe --</option>{vehicleTeams.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></div></td>
                <td role="cell" data-label="KM atual"><span className="vehicles-odometer">{kilometers.format(vehicle.odometer)} km</span></td>
                <td role="cell" data-label="KM restante"><span className={`vehicles-remaining is-${vehicleServiceState(vehicle)}`}>{kilometers.format(remaining)} km</span>{remaining <= 0 ? <small className="vehicles-overdue-label">Revisão vencida</small> : null}{vehicle.serviceMarked ? <small className="vehicles-marked-label">Revisão marcada</small> : null}</td>
                <td role="cell" data-label="Última movimentação">{vehicle.movement ? <div className="vehicles-movement"><strong>{kilometers.format(vehicle.movement.from)} → {kilometers.format(vehicle.movement.to)} km</strong><span>Turno aberto | {currency.format(vehicle.movement.cost)}</span><span>{vehicle.movement.refuels} abast. | <time dateTime={`${vehicle.movement.date}T${vehicle.movement.time}`}>{vehicle.movement.date.split("-").reverse().join("/")} {vehicle.movement.time}</time></span></div> : "Sem histórico"}</td>
                <td role="cell" data-label="Status"><span className={`vehicles-status ${vehicle.status === "Inativo" ? "is-inactive" : ""}`}>{vehicle.status}</span></td>
                <td role="cell" data-label="Ações"><button className="vehicles-more" type="button" aria-label={`Ações de ${vehicle.name}`} aria-expanded={expandedId === vehicle.id} aria-controls={`vehicles-actions-${vehicle.id}`} onClick={(event) => { triggerRef.current = event.currentTarget; setExpandedId((current) => current === vehicle.id ? null : vehicle.id); }}><span aria-hidden="true">⋮</span></button></td>
              </tr>
              {expandedId === vehicle.id ? <tr role="row" className="vehicles-expanded-row"><td role="cell" colSpan={8}>
                <div className="vehicles-row-options" id={`vehicles-actions-${vehicle.id}`} role="group" aria-label={`Opções de ${vehicle.name}`} onKeyDown={(event) => { if (event.key === "Escape") { event.stopPropagation(); setExpandedId(null); triggerRef.current?.focus({ preventScroll: true }); } }}>
                  <strong>{vehicle.name}</strong><div className="system-actions">
                    <button type="button" onClick={() => openEditor(vehicle)}>Editar dados</button>
                    <button type="button" className="is-primary" onClick={() => {
                      setVehicles((current) => current.map((item) => item.id === vehicle.id ? { ...item, serviceMarked: !item.serviceMarked } : item));
                      setFeedback(`${vehicle.name}: revisão ${vehicle.serviceMarked ? "desmarcada" : "marcada"} nesta demonstração.`);
                      setExpandedId(null);
                      (service === "marked" ? createRef.current : triggerRef.current)?.focus({ preventScroll: true });
                    }}>{vehicle.serviceMarked ? "Desmarcar revisão" : "Marcar revisão"}</button>
                  </div>
                </div>
              </td></tr> : null}
            </tbody>;
          })}
        </table>
        {!filtered.length ? <div className="clients-empty"><strong>Nenhum veículo encontrado.</strong><p>Ajuste os filtros para consultar a frota.</p></div> : null}
      </div>
      <p className="clients-caption">Exibindo {filtered.length} de {vehicles.length} veículos · Dados e identificações fictícios · Revisões próximas: até 2.000 km</p>
    </section>
  );
}
