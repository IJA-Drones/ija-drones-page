"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

import { createAgroClient, filterAgroClients, type AgroClient } from "@/components/system/agro-clients-data";
import { normalizeRegistryText } from "@/components/system/registry-utils";
import { SystemPageTitle } from "@/components/system/system-page-title";

type AgroClientsScreenProps = {
  clients: readonly AgroClient[];
  onSaveClient: (client: AgroClient) => void;
  onNavigate: (screen: string) => void;
};

function closeRowActions(button: HTMLButtonElement) {
  const disclosure = button.closest("details");
  if (disclosure) disclosure.open = false;
  return disclosure?.querySelector<HTMLElement>("summary") ?? button;
}

export function AgroClientsScreen({ clients, onSaveClient, onNavigate }: AgroClientsScreenProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [editor, setEditor] = useState<{ client: AgroClient | null } | null>(null);
  const [detailId, setDetailId] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const editorRef = useRef<HTMLFormElement>(null);
  const detailRef = useRef<HTMLElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const createButtonRef = useRef<HTMLButtonElement>(null);
  const filteredClients = filterAgroClients(clients, search, status);
  const detailClient = clients.find((client) => client.id === detailId);
  const nextClient = createAgroClient(Math.max(0, ...clients.map((client) => client.id)) + 1);

  useEffect(() => {
    if (editor) {
      editorRef.current?.scrollIntoView({ block: "nearest", behavior: "instant" });
      editorRef.current?.querySelector<HTMLInputElement>("input")?.focus({ preventScroll: true });
    }
  }, [editor]);

  useEffect(() => {
    if (detailId !== null) {
      detailRef.current?.scrollIntoView({ block: "nearest", behavior: "instant" });
      detailRef.current?.focus({ preventScroll: true });
    }
  }, [detailId]);

  function restoreFocus() {
    const target = returnFocusRef.current?.isConnected ? returnFocusRef.current : createButtonRef.current;
    target?.focus({ preventScroll: true });
  }

  function openEditor(client: AgroClient | null, trigger: HTMLElement) {
    returnFocusRef.current = trigger;
    setDetailId(null);
    setError("");
    setFeedback("");
    setEditor({ client });
  }

  function closePanel() {
    setEditor(null);
    setDetailId(null);
    setError("");
    restoreFocus();
  }

  function saveClient(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editor) return;
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const detail = String(form.get("detail") ?? "").trim();
    const document = String(form.get("document") ?? "").trim().toUpperCase();
    const address = String(form.get("address") ?? "").trim();
    const selectedStatus = String(form.get("status") ?? "");
    if (!name || !detail || !address || !["Ativo", "Inativo"].includes(selectedStatus)) {
      setError("Preencha todos os campos para salvar o cliente.");
      return;
    }
    if (!/^DEMO-[A-Z0-9-]{1,20}$/.test(document)) {
      setError("Use um documento fictício no formato DEMO-0001, sem CPF ou CNPJ real.");
      return;
    }
    if (clients.some((client) => client.id !== editor.client?.id
      && (normalizeRegistryText(client.name) === normalizeRegistryText(name) || client.document === document))) {
      setError("Já existe um cliente com esse nome ou documento demonstrativo.");
      return;
    }
    onSaveClient({ id: editor.client?.id ?? nextClient.id, name, detail, document, address, status: selectedStatus as AgroClient["status"] });
    setSearch("");
    setStatus("");
    setFeedback(`${name}: ${editor.client ? "alterações salvas" : "cadastro incluído"} apenas nesta demonstração.`);
    closePanel();
  }

  return (
    <section className="system-screen agro-dashboard agro-clients" aria-labelledby="agro-clients-title">
      <header className="system-page-header">
        <SystemPageTitle id="agro-clients-title" icon="◎" title="Clientes do Agro"
          meta={<>Total de registros: <strong>{clients.length}</strong>{search || status ? <> · Encontrados: <strong>{filteredClients.length}</strong></> : null}</>} />
        <div className="system-actions agro-dashboard__actions">
          <button type="button" onClick={() => onNavigate("Dashboard")}><span aria-hidden="true">←</span> Voltar</button>
          <button type="button" className="is-primary agro-action-client" ref={createButtonRef} onClick={(event) => openEditor(null, event.currentTarget)}><span aria-hidden="true">＋</span> Novo Cliente</button>
        </div>
      </header>

      <section className={`os-filter clients-filter ${filtersOpen ? "is-open" : ""}`} aria-label="Filtros de clientes">
        <button type="button" className="os-filter__toggle" aria-expanded={filtersOpen} aria-controls="agro-clients-filters" onClick={() => setFiltersOpen((open) => !open)}>
          <span><span className="clients-filter-icon" aria-hidden="true" /><b>Filtros de busca</b></span><i aria-hidden="true">⌄</i>
        </button>
        {filtersOpen ? <div className="os-filter__fields" id="agro-clients-filters">
          <label>Cliente, documento ou endereço<input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar cliente" /></label>
          <label>Situação<select value={status} onChange={(event) => setStatus(event.target.value)}><option value="">Todas as situações</option><option>Ativo</option><option>Inativo</option></select></label>
          <button type="button" onClick={() => { setSearch(""); setStatus(""); }}>Limpar filtros</button>
        </div> : null}
      </section>

      {editor ? <form className="clients-editor agro-editor" ref={editorRef} key={editor.client?.id ?? "new"} onSubmit={saveClient} aria-labelledby="agro-client-editor-title" onKeyDown={(event) => {
        if (event.key === "Escape") { event.stopPropagation(); closePanel(); }
      }}>
        <h4 id="agro-client-editor-title">{editor.client ? "Editar cliente" : "Novo Cliente"}</h4>
        <p>Use dados genéricos. Nenhuma alteração é enviada ao sistema real.</p>
        <div className="clients-editor__fields">
          <label>Nome genérico<input name="name" required maxLength={80} defaultValue={editor.client?.name ?? nextClient.name} /></label>
          <label>Documento demonstrativo<input name="document" required maxLength={25} defaultValue={editor.client?.document ?? nextClient.document} aria-describedby="agro-client-document-hint" autoComplete="off" spellCheck={false} /></label>
          <label>Propriedade<input name="detail" required maxLength={80} defaultValue={editor.client?.detail ?? nextClient.detail} /></label>
          <label>Situação<select name="status" defaultValue={editor.client?.status ?? "Ativo"}><option>Ativo</option><option>Inativo</option></select></label>
          <label className="agro-client-address-field">Endereço fictício<input name="address" required maxLength={200} defaultValue={editor.client?.address ?? nextClient.address} /></label>
        </div>
        <p id="agro-client-document-hint">Identificador de exemplo: DEMO-0001. Não informe CPF ou CNPJ.</p>
        {error ? <p className="clients-editor__error" role="alert">{error}</p> : null}
        <div className="system-actions"><button type="button" onClick={closePanel}>Cancelar</button><button type="submit" className="is-primary">Salvar cliente</button></div>
      </form> : null}

      {detailClient ? <section className="agro-client-detail" ref={detailRef} tabIndex={-1} aria-labelledby="agro-client-detail-title" onKeyDown={(event) => {
        if (event.key === "Escape") { event.stopPropagation(); closePanel(); }
      }}>
        <h4 id="agro-client-detail-title">{detailClient.name}</h4>
        <dl>{[["Documento", detailClient.document], ["Propriedade", detailClient.detail], ["Endereço", detailClient.address], ["Situação", detailClient.status]].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
        <div className="system-actions"><button type="button" onClick={closePanel}>Fechar detalhes</button></div>
      </section> : null}

      <p className="agro-feedback agro-clients__feedback" role="status">{feedback}</p>
      <div className="agro-clients-table-wrap">
        <table className="agro-clients-table" role="table" aria-label="Clientes do Agro">
          <thead><tr role="row">{["ID", "Cliente", "Documento", "Endereço", "Ações"].map((label) => <th key={label} scope="col" role="columnheader">{label}</th>)}</tr></thead>
          <tbody>{filteredClients.map((client) => <tr key={client.id} role="row">
            <td role="cell" data-label="ID">#{client.id}</td>
            <td role="cell" data-label="Cliente"><strong>{client.name}</strong><small>Cadastro comercial {client.status === "Ativo" ? "ativo" : "inativo"}</small></td>
            <td role="cell" data-label="Documento"><code>{client.document}</code></td>
            <td role="cell" data-label="Endereço">{client.address}</td>
            <td role="cell" data-label="Ações">
              <details className="agro-client-actions" name="agro-client-actions" onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false;
              }} onKeyDown={(event) => {
                if (event.key === "Escape") { event.stopPropagation(); event.currentTarget.open = false; event.currentTarget.querySelector("summary")?.focus(); }
              }}>
                <summary aria-label={`Ações de ${client.name}`}><span aria-hidden="true">⋮</span></summary>
                <div className="agro-client-actions__popover" role="group" aria-label={`Opções de ${client.name}`}>
                  <button type="button" onClick={(event) => { returnFocusRef.current = closeRowActions(event.currentTarget); setEditor(null); setDetailId(client.id); }}><span aria-hidden="true">◎</span> Ver detalhes</button>
                  <button type="button" onClick={(event) => openEditor(client, closeRowActions(event.currentTarget))}><span aria-hidden="true">✎</span> Editar cliente</button>
                  <button type="button" onClick={(event) => {
                    const trigger = closeRowActions(event.currentTarget);
                    const nextStatus = client.status === "Ativo" ? "Inativo" : "Ativo";
                    onSaveClient({ ...client, status: nextStatus });
                    setFeedback(`${client.name}: cadastro ${nextStatus === "Ativo" ? "ativado" : "inativado"} nesta demonstração.`);
                    createButtonRef.current?.focus({ preventScroll: true });
                    if (!status) trigger.focus({ preventScroll: true });
                  }}><span aria-hidden="true">{client.status === "Ativo" ? "⊘" : "✓"}</span> {client.status === "Ativo" ? "Inativar" : "Ativar"} cliente</button>
                </div>
              </details>
            </td>
          </tr>)}</tbody>
        </table>
        {!filteredClients.length ? <div className="clients-empty"><strong>Nenhum cliente encontrado.</strong><p>Tente outro termo ou limpe os filtros.</p></div> : null}
      </div>
      <p className="agro-dashboard__caption">Exibindo {filteredClients.length} de {clients.length} clientes · Nomes, documentos e endereços fictícios. Alterações temporárias.</p>
    </section>
  );
}
