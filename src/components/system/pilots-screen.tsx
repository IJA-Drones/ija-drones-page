"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

import { Icon } from "@/components/icon";
import { SystemPageTitle } from "@/components/system/system-page-title";
import { normalizeRegistryText } from "@/components/system/registry-utils";
import { filterPilots, initialPilots, pilotRegions, pilotStatuses, pilotsToCsv, type MockupPilot } from "@/components/system/pilots-data";

type PilotsScreenProps = { onNavigate: (screen: string) => void };

export function PilotsScreen({ onNavigate }: PilotsScreenProps) {
  const [pilots, setPilots] = useState<readonly MockupPilot[]>(initialPilots);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [status, setStatus] = useState("");
  const [editor, setEditor] = useState<{ pilot: MockupPilot | null } | null>(null);
  const [pendingDelete, setPendingDelete] = useState<MockupPilot | null>(null);
  const [feedback, setFeedback] = useState("");
  const [formError, setFormError] = useState("");
  const editorRef = useRef<HTMLFormElement>(null);
  const returnFocusRef = useRef<HTMLButtonElement | null>(null);
  const createButtonRef = useRef<HTMLButtonElement>(null);
  const cancelDeleteRef = useRef<HTMLButtonElement>(null);
  const filteredPilots = filterPilots(pilots, search, region, status);

  useEffect(() => {
    if (editor) {
      editorRef.current?.scrollIntoView({ block: "nearest", behavior: "instant" });
      editorRef.current?.querySelector<HTMLInputElement>("input")?.focus({ preventScroll: true });
    }
  }, [editor]);

  useEffect(() => {
    if (pendingDelete) cancelDeleteRef.current?.focus({ preventScroll: true });
  }, [pendingDelete]);

  function clearFilters() {
    setSearch("");
    setRegion("");
    setStatus("");
  }

  function closeEditor() {
    setEditor(null);
    setFormError("");
    const target = returnFocusRef.current?.isConnected ? returnFocusRef.current : createButtonRef.current;
    target?.focus({ preventScroll: true });
  }

  function openEditor(pilot: MockupPilot | null, trigger: HTMLButtonElement) {
    returnFocusRef.current = trigger;
    setPendingDelete(null);
    setFeedback("");
    setFormError("");
    setEditor({ pilot });
  }

  function cancelDelete() {
    setPendingDelete(null);
    createButtonRef.current?.focus({ preventScroll: true });
  }

  function savePilot(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const login = String(form.get("login") ?? "").trim();
    const selectedRegion = String(form.get("region") ?? "") as MockupPilot["region"];
    const selectedStatus = String(form.get("status") ?? "") as MockupPilot["status"];
    if (!name || !login || !pilotRegions.includes(selectedRegion) || !pilotStatuses.includes(selectedStatus)) {
      setFormError("Preencha todos os campos para salvar o piloto.");
      return;
    }
    if (pilots.some((pilot) => pilot.id !== editor?.pilot?.id && normalizeRegistryText(pilot.login) === normalizeRegistryText(login))) {
      setFormError("Este login já está em uso. Escolha outro login.");
      return;
    }
    const record: MockupPilot = {
      id: editor?.pilot?.id ?? Math.max(0, ...pilots.map((pilot) => pilot.id)) + 1,
      name, login, region: selectedRegion, status: selectedStatus,
    };
    setPilots((current) => editor?.pilot ? current.map((pilot) => pilot.id === record.id ? record : pilot) : [record, ...current]);
    clearFilters();
    setFeedback(`${name}: ${editor?.pilot ? "alterações salvas" : "cadastro incluído"} nesta demonstração.`);
    closeEditor();
  }

  function exportPilots() {
    const url = URL.createObjectURL(new Blob([pilotsToCsv(filteredPilots)], { type: "text/csv;charset=utf-8;" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "pilotos-cadastrados.csv";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setFeedback("Lista exportada em CSV, compatível com Excel.");
  }

  return (
    <section className="system-screen clients-screen pilots-screen" aria-labelledby="pilots-title">
      <header className="system-page-header">
        <SystemPageTitle icon="✈" id="pilots-title" title="Pilotos Cadastrados" meta={<>Total de registros: <strong>{pilots.length}</strong>{search || region || status ? <> · Encontrados: <strong>{filteredPilots.length}</strong></> : null}</>} />
        <div className="system-actions clients-screen__actions">
          <button type="button" onClick={() => onNavigate("Dashboard")}><span aria-hidden="true">←</span> Voltar</button>
          <button className="is-success" type="button" onClick={exportPilots} disabled={!filteredPilots.length}><Icon name="report" /> Exportar Excel</button>
          <button className="is-primary" type="button" ref={createButtonRef} onClick={(event) => openEditor(null, event.currentTarget)}><span aria-hidden="true">＋</span> Cadastrar piloto</button>
        </div>
      </header>

      <section className={`os-filter clients-filter ${filtersOpen ? "is-open" : ""}`}>
        <button className="os-filter__toggle" type="button" aria-expanded={filtersOpen} aria-controls="pilots-filter-fields" onClick={() => setFiltersOpen((open) => !open)}>
          <span><span className="clients-filter-icon" aria-hidden="true" /><b>Filtros de busca</b></span><i aria-hidden="true">⌄</i>
        </button>
        {filtersOpen ? (
          <div className="os-filter__fields" id="pilots-filter-fields">
            <label>Nome ou login<input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar piloto" /></label>
            <label>Região<select value={region} onChange={(event) => setRegion(event.target.value)}><option value="">Todas as regiões</option>{pilotRegions.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>Status<select value={status} onChange={(event) => setStatus(event.target.value)}><option value="">Todos os status</option>{pilotStatuses.map((item) => <option key={item}>{item}</option>)}</select></label>
            <button type="button" onClick={clearFilters}>Limpar filtros</button>
          </div>
        ) : null}
      </section>

      {editor ? (
        <form className="clients-editor" key={editor.pilot?.id ?? "new"} ref={editorRef} onSubmit={savePilot} aria-labelledby="pilots-editor-title" onKeyDown={(event) => { if (event.key === "Escape") { event.stopPropagation(); closeEditor(); } }}>
          <h4 id="pilots-editor-title">{editor.pilot ? "Editar piloto" : "Cadastrar piloto"}</h4>
          <p>Use nomes genéricos. As alterações são demonstrativas e não criam acessos reais.</p>
          <div className="clients-editor__fields">
            <label>Nome do piloto<input name="name" defaultValue={editor.pilot?.name ?? ""} placeholder="Ex.: Piloto 4" required maxLength={80} /></label>
            <label>Login<input name="login" defaultValue={editor.pilot?.login ?? ""} placeholder="Ex.: piloto4" required maxLength={50} autoCapitalize="none" autoComplete="off" spellCheck={false} /></label>
            <label>Região<select name="region" defaultValue={editor.pilot?.region ?? "LESTE"}>{pilotRegions.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>Status<select name="status" defaultValue={editor.pilot?.status ?? "Disponível"}>{pilotStatuses.map((item) => <option key={item}>{item}</option>)}</select></label>
          </div>
          {formError ? <p className="clients-editor__error" role="alert">{formError}</p> : null}
          <div className="system-actions"><button type="button" onClick={closeEditor}>Cancelar</button><button type="submit" className="is-primary">Salvar piloto</button></div>
        </form>
      ) : null}

      <p className="clients-feedback" role="status" aria-live="polite">{feedback}</p>
      <div className="clients-table-wrap">
        <table className="clients-table pilots-table" role="table" aria-label="Pilotos cadastrados">
          <thead><tr>{["ID", "Nome", "Região", "Status", "Login", "Ações"].map((column) => <th key={column} scope="col">{column}</th>)}</tr></thead>
          <tbody>
            {filteredPilots.map((pilot) => (
              <tr key={pilot.id} role="row" className={pendingDelete?.id === pilot.id ? "is-confirming" : undefined}>
                <td role="cell" data-label="ID">{pilot.id}</td>
                <td role="cell" data-label="Nome"><strong>{pilot.name}</strong></td>
                <td role="cell" data-label="Região">{pilot.region}</td>
                <td role="cell" data-label="Status"><span className={`pilots-status ${pilot.status === "Indisponível" ? "is-inactive" : ""}`}>{pilot.status}</span></td>
                <td role="cell" data-label="Login"><code>{pilot.login}</code></td>
                <td role="cell" data-label="Ações">
                  {pendingDelete?.id === pilot.id ? (
                    <div className="clients-delete" role="group" aria-label={`Confirmar exclusão de ${pilot.name}`} onKeyDown={(event) => { if (event.key === "Escape") { event.stopPropagation(); cancelDelete(); } }}>
                      <p>Excluir este piloto da demonstração?</p>
                      <div className="management-request__row-actions clients-row-actions">
                        <button className="is-cancel" type="button" ref={cancelDeleteRef} onClick={cancelDelete}>Cancelar</button>
                        <button className="is-danger" type="button" onClick={() => {
                          setPilots((current) => current.filter((item) => item.id !== pilot.id));
                          setFeedback(`${pilot.name} removido apenas desta demonstração.`);
                          cancelDelete();
                        }}>Confirmar</button>
                      </div>
                    </div>
                  ) : (
                    <div className="management-request__row-actions clients-row-actions">
                      <button type="button" aria-label={`Editar ${pilot.name}`} onClick={(event) => openEditor(pilot, event.currentTarget)}><span aria-hidden="true">✎</span> Editar</button>
                      <button className="is-danger" type="button" aria-label={`Excluir ${pilot.name}`} onClick={() => { setEditor(null); setFeedback(""); setPendingDelete(pilot); }}><span className="clients-trash-icon" aria-hidden="true" /> Excluir</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!filteredPilots.length ? <div className="clients-empty"><strong>Nenhum piloto encontrado.</strong><p>Tente outro nome, região ou status, ou cadastre um novo piloto.</p></div> : null}
      </div>
      <p className="clients-caption">Exibindo {filteredPilots.length} de {pilots.length} registros · Pilotos demonstrativos</p>
    </section>
  );
}
