"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

import { Icon } from "@/components/icon";
import { SystemPageTitle } from "@/components/system/system-page-title";
import { clientRegions, clientsToCsv, filterClients, initialClients, normalizeClientText, type ClientRegion, type UvisClient } from "@/components/system/clients-data";

type ClientsScreenProps = { onNavigate: (screen: string) => void };

export function ClientsScreen({ onNavigate }: ClientsScreenProps) {
  const [clients, setClients] = useState<readonly UvisClient[]>(initialClients);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [editor, setEditor] = useState<{ client: UvisClient | null } | null>(null);
  const [pendingDelete, setPendingDelete] = useState<UvisClient | null>(null);
  const [feedback, setFeedback] = useState("");
  const [formError, setFormError] = useState("");
  const editorRef = useRef<HTMLFormElement>(null);
  const returnFocusRef = useRef<HTMLButtonElement | null>(null);
  const createButtonRef = useRef<HTMLButtonElement>(null);
  const cancelDeleteRef = useRef<HTMLButtonElement>(null);
  const filteredClients = filterClients(clients, search, region);

  useEffect(() => {
    if (editor) {
      editorRef.current?.scrollIntoView({ block: "nearest", behavior: "instant" });
      editorRef.current?.querySelector<HTMLInputElement>("input")?.focus({ preventScroll: true });
    }
  }, [editor]);

  useEffect(() => {
    if (pendingDelete) cancelDeleteRef.current?.focus({ preventScroll: true });
  }, [pendingDelete]);

  function restoreFocus() {
    const target = returnFocusRef.current?.isConnected ? returnFocusRef.current : createButtonRef.current;
    target?.focus({ preventScroll: true });
  }

  function openEditor(client: UvisClient | null, trigger: HTMLButtonElement) {
    returnFocusRef.current = trigger;
    setPendingDelete(null);
    setFeedback("");
    setFormError("");
    setEditor({ client });
  }

  function closeEditor() {
    setEditor(null);
    setFormError("");
    restoreFocus();
  }

  function saveClient(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const cityHall = String(form.get("cityHall") ?? "").trim();
    const login = String(form.get("login") ?? "").trim();
    const selectedRegion = String(form.get("region") ?? "") as ClientRegion;
    if (!name || !cityHall || !login || !clientRegions.includes(selectedRegion)) {
      setFormError("Preencha todos os campos para salvar a UVIS.");
      return;
    }
    if (clients.some((client) => client.id !== editor?.client?.id && normalizeClientText(client.login) === normalizeClientText(login))) {
      setFormError("Este login já está em uso. Escolha outro login.");
      return;
    }
    const record: UvisClient = {
      id: editor?.client?.id ?? Math.max(0, ...clients.map((client) => client.id)) + 1,
      name, cityHall, region: selectedRegion, login,
    };
    setClients((current) => editor?.client
      ? current.map((client) => client.id === record.id ? record : client)
      : [record, ...current]);
    setSearch("");
    setRegion("");
    setFeedback(`${name}: ${editor?.client ? "alterações salvas" : "cadastro incluído"} nesta demonstração.`);
    closeEditor();
  }

  function exportClients() {
    const url = URL.createObjectURL(new Blob([clientsToCsv(filteredClients)], { type: "text/csv;charset=utf-8;" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "uvis-cadastradas.csv";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setFeedback("Lista exportada em CSV, compatível com Excel.");
  }

  return (
    <section className="system-screen clients-screen" aria-labelledby="clients-title">
      <header className="system-page-header">
        <SystemPageTitle
          icon={<span className="clients-building-icon" />}
          id="clients-title"
          title="UVIS Cadastradas"
          meta={<>Total de registros: <strong>{clients.length}</strong>{search || region ? <> · Encontrados: <strong>{filteredClients.length}</strong></> : null}</>}
        />
        <div className="system-actions clients-screen__actions">
          <button type="button" onClick={() => onNavigate("Dashboard")}><span aria-hidden="true">←</span> Voltar</button>
          <button className="is-success" type="button" onClick={exportClients} disabled={!filteredClients.length}><Icon name="report" /> Exportar Excel</button>
          <button className="is-primary" type="button" ref={createButtonRef} onClick={(event) => openEditor(null, event.currentTarget)}><span aria-hidden="true">＋</span> Cadastrar UVIS</button>
        </div>
      </header>

      <section className={`os-filter clients-filter ${filtersOpen ? "is-open" : ""}`}>
        <button className="os-filter__toggle" type="button" aria-expanded={filtersOpen} aria-controls="clients-filter-fields" onClick={() => setFiltersOpen((open) => !open)}>
          <span><span className="clients-filter-icon" aria-hidden="true" /><b>Filtros de busca</b></span><i aria-hidden="true">⌄</i>
        </button>
        {filtersOpen ? (
          <div className="os-filter__fields" id="clients-filter-fields">
            <label>Nome, prefeitura ou login<input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar UVIS" /></label>
            <label>Região<select value={region} onChange={(event) => setRegion(event.target.value)}><option value="">Todas as regiões</option>{clientRegions.map((item) => <option key={item}>{item}</option>)}</select></label>
            <button type="button" onClick={() => { setSearch(""); setRegion(""); }}>Limpar filtros</button>
          </div>
        ) : null}
      </section>

      {editor ? (
        <form className="clients-editor" key={editor.client?.id ?? "new"} ref={editorRef} onSubmit={saveClient} aria-labelledby="clients-editor-title" onKeyDown={(event) => { if (event.key === "Escape") { event.stopPropagation(); closeEditor(); } }}>
          <h4 id="clients-editor-title">{editor.client ? "Editar UVIS" : "Cadastrar UVIS"}</h4>
          <p>Alterações apenas nesta demonstração, sem modificar o sistema real.</p>
          <div className="clients-editor__fields">
            <label>Nome da UVIS<input name="name" defaultValue={editor.client?.name ?? ""} required maxLength={90} /></label>
            <label>Prefeitura<input name="cityHall" defaultValue={editor.client?.cityHall ?? "Prefeitura de São Paulo"} required maxLength={90} /></label>
            <label>Região<select name="region" defaultValue={editor.client?.region ?? "CENTRO"}>{clientRegions.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>Login<input name="login" defaultValue={editor.client?.login ?? ""} required maxLength={50} autoCapitalize="none" autoComplete="off" spellCheck={false} /></label>
          </div>
          {formError ? <p className="clients-editor__error" role="alert">{formError}</p> : null}
          <div className="system-actions"><button type="button" onClick={closeEditor}>Cancelar</button><button type="submit" className="is-primary">Salvar UVIS</button></div>
        </form>
      ) : null}

      <p className="clients-feedback" role="status" aria-live="polite">{feedback}</p>

      <div className="clients-table-wrap">
        <table className="clients-table" role="table" aria-label="UVIS cadastradas">
          <thead><tr><th scope="col">ID</th><th scope="col">Nome</th><th scope="col">Prefeitura</th><th scope="col">Região</th><th scope="col">Login</th><th scope="col">Ações</th></tr></thead>
          <tbody>
            {filteredClients.map((client) => (
              <tr key={client.id} role="row" className={pendingDelete?.id === client.id ? "is-confirming" : undefined}>
                <td role="cell" data-label="ID">{client.id}</td>
                <td role="cell" data-label="Nome"><strong>{client.name}</strong></td>
                <td role="cell" data-label="Prefeitura">{client.cityHall}</td>
                <td role="cell" data-label="Região">{client.region}</td>
                <td role="cell" data-label="Login"><code>{client.login}</code></td>
                <td role="cell" data-label="Ações">
                  {pendingDelete?.id === client.id ? (
                    <div className="clients-delete" role="group" aria-label={`Confirmar exclusão de ${client.name}`} onKeyDown={(event) => { if (event.key === "Escape") { event.stopPropagation(); setPendingDelete(null); createButtonRef.current?.focus({ preventScroll: true }); } }}>
                      <p>Excluir esta UVIS da demonstração?</p>
                      <div className="management-request__row-actions clients-row-actions">
                        <button className="is-cancel" type="button" ref={cancelDeleteRef} onClick={() => { setPendingDelete(null); createButtonRef.current?.focus({ preventScroll: true }); }}>Cancelar</button>
                        <button className="is-danger" type="button" onClick={() => {
                          setClients((current) => current.filter((item) => item.id !== client.id));
                          setPendingDelete(null);
                          setFeedback(`${client.name} removida apenas desta demonstração.`);
                          createButtonRef.current?.focus({ preventScroll: true });
                        }}>Confirmar</button>
                      </div>
                    </div>
                  ) : (
                    <div className="management-request__row-actions clients-row-actions">
                      <button type="button" aria-label={`Editar ${client.name}`} onClick={(event) => openEditor(client, event.currentTarget)}><span aria-hidden="true">✎</span> Editar</button>
                      <button className="is-danger" type="button" aria-label={`Excluir ${client.name}`} onClick={() => { setEditor(null); setFeedback(""); setPendingDelete(client); }}><span className="clients-trash-icon" aria-hidden="true" /> Excluir</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!filteredClients.length ? <div className="clients-empty"><strong>Nenhuma UVIS encontrada.</strong><p>Tente outro nome ou região, ou cadastre uma nova unidade.</p></div> : null}
      </div>
      <p className="clients-caption">Exibindo {filteredClients.length} de {clients.length} registros · Dados demonstrativos</p>
    </section>
  );
}
