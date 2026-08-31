"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

import { Icon } from "@/components/icon";
import { SystemPageTitle } from "@/components/system/system-page-title";
import { AgroClientsScreen } from "@/components/system/agro-clients-screen";
import { createAgroClient } from "@/components/system/agro-clients-data";
import { normalizeRegistryText } from "@/components/system/registry-utils";
import {
  agroAreas, agroCreateLabels, initialAgroRecords, isAgroView,
  type AgroCreateView, type AgroRecords,
} from "@/components/system/agro-dashboard-data";

type AgroDashboardScreenProps = { screen: string; onNavigate: (screen: string) => void };

export function AgroDashboardScreen({ screen, onNavigate }: AgroDashboardScreenProps) {
  const [records, setRecords] = useState<AgroRecords>(initialAgroRecords);
  const [editor, setEditor] = useState<{ view: AgroCreateView; screen: string } | null>(null);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");
  const editorRef = useRef<HTMLFormElement>(null);
  const returnFocusRef = useRef<HTMLButtonElement | null>(null);
  const dashboard = screen === "Dashboard";
  const view = isAgroView(screen) ? screen : null;
  const visibleEditor = editor?.screen === screen ? editor : null;
  const createView = view === "Clientes" || view === "Fornecedores" || view === "Orçamentos" ? view : null;
  const viewIcon = agroAreas.flatMap((area) => area.links).find((link) => link.screen === view)?.icon ?? "▤";

  useEffect(() => {
    if (visibleEditor) {
      editorRef.current?.scrollIntoView({ block: "nearest", behavior: "instant" });
      editorRef.current?.querySelector<HTMLInputElement>("input")?.focus({ preventScroll: true });
    }
  }, [visibleEditor]);

  function openEditor(target: AgroCreateView, trigger: HTMLButtonElement) {
    returnFocusRef.current = trigger;
    setEditor({ view: target, screen });
    setError("");
    setFeedback("");
  }

  function closeEditor() {
    setEditor(null);
    setError("");
    returnFocusRef.current?.focus({ preventScroll: true });
  }

  function navigate(target: string) {
    setEditor(null);
    setError("");
    setFeedback("");
    onNavigate(target);
  }

  function saveRecord(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!visibleEditor) return;
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const detail = String(form.get("detail") ?? "").trim();
    const target = visibleEditor.view;
    if (!name || !detail) {
      setError("Preencha os dois campos para salvar o exemplo.");
      return;
    }
    if (target === "Orçamentos" && !records.Clientes.some((client) => client.name === detail)) {
      setError("Selecione um cliente da demonstração.");
      return;
    }
    if (records[target].some((record) => normalizeRegistryText(record.name) === normalizeRegistryText(name))) {
      setError("Este nome já existe nesta lista. Use outro nome genérico.");
      return;
    }
    if (target === "Clientes") {
      setRecords((current) => ({
        ...current,
        Clientes: [...current.Clientes, createAgroClient(Math.max(0, ...current.Clientes.map((client) => client.id)) + 1, name, detail)],
      }));
    } else {
      setRecords((current) => ({
        ...current,
        [target]: [...current[target], {
          id: Math.max(0, ...current[target].map((record) => record.id)) + 1,
          name, detail, status: target === "Orçamentos" ? "Em elaboração" : "Ativo",
        }],
      }));
    }
    setFeedback(`${name} incluído nesta demonstração. Nenhum dado foi enviado ao sistema real.`);
    closeEditor();
  }

  if (view === "Clientes") {
    return <AgroClientsScreen clients={records.Clientes} onNavigate={navigate} onSaveClient={(client) => {
      setRecords((current) => ({
        ...current,
        Clientes: current.Clientes.some((existing) => existing.id === client.id)
          ? current.Clientes.map((existing) => existing.id === client.id ? client : existing)
          : [...current.Clientes, client],
      }));
    }} />;
  }

  const metrics = [
    { label: "Clientes", value: records.Clientes.length },
    { label: "Fornecedores", value: records.Fornecedores.length },
    { label: "Orçamentos", value: records.Orçamentos.length },
    { label: "Fila operacional", value: records["Fila Operacional"].length, description: `de ${records.Contratos.length} contrato(s) no total` },
    { label: "Pendências financeiras", value: records["Contas a Receber"].length + records["Contas a Pagar"].length, description: `de ${records["Caixa Diário"].length} registro(s) financeiros`, warning: true },
  ];

  return (
    <section className="system-screen agro-dashboard" aria-labelledby="agro-dashboard-title">
      <header className="system-page-header">
        <SystemPageTitle
          id="agro-dashboard-title"
          icon={dashboard ? <span className="agro-tree-icon" /> : viewIcon}
          title={dashboard ? "Painel Agro" : screen}
          description={dashboard ? "Acesso rápido aos fluxos comercial, operacional e financeiro do Agro." : "Visão demonstrativa · dados genéricos do Agro."}
        />
        <div className="system-actions agro-dashboard__actions">
          {dashboard ? <>
            <button type="button" className="is-primary agro-action-client" onClick={(event) => openEditor("Clientes", event.currentTarget)}>
              <span aria-hidden="true">＋</span> Novo Cliente
            </button>
            <button type="button" onClick={(event) => openEditor("Fornecedores", event.currentTarget)}>
              <span aria-hidden="true">▦</span> Novo Fornecedor
            </button>
            <button type="button" className="is-primary" onClick={(event) => openEditor("Orçamentos", event.currentTarget)}>
              <span aria-hidden="true">▤</span> Novo Orçamento
            </button>
          </> : <>
            <button type="button" onClick={() => navigate("Dashboard")}><span aria-hidden="true">←</span> Voltar ao painel</button>
            {createView ? <button type="button" className="is-primary" onClick={(event) => openEditor(createView, event.currentTarget)}><span aria-hidden="true">＋</span> {agroCreateLabels[createView]}</button> : null}
          </>}
        </div>
      </header>

      {visibleEditor ? (
        <form className="clients-editor agro-editor" ref={editorRef} onSubmit={saveRecord} aria-labelledby="agro-editor-title" onKeyDown={(event) => {
          if (event.key === "Escape") { event.stopPropagation(); closeEditor(); }
        }}>
          <h4 id="agro-editor-title">{agroCreateLabels[visibleEditor.view]}</h4>
          <p>Use apenas dados fictícios. O cadastro fica somente nesta demonstração.</p>
          <div className="clients-editor__fields" key={visibleEditor.view}>
            <label>Nome genérico
              <input name="name" required maxLength={80} defaultValue={`${visibleEditor.view === "Clientes" ? "Cliente" : visibleEditor.view === "Fornecedores" ? "Fornecedor" : "Orçamento"} ${records[visibleEditor.view].length + 1}`} aria-describedby={error ? "agro-editor-error" : undefined} />
            </label>
            <label>{visibleEditor.view === "Orçamentos" ? "Cliente" : visibleEditor.view === "Clientes" ? "Propriedade" : "Categoria"}
              {visibleEditor.view === "Orçamentos" ? (
                <select name="detail" required>{records.Clientes.map((client) => <option key={client.id} value={client.name}>{client.name}</option>)}</select>
              ) : <input name="detail" required maxLength={80} defaultValue={visibleEditor.view === "Clientes" ? `Propriedade ${records.Clientes.length + 1}` : "Insumos agrícolas"} />}
            </label>
          </div>
          {error ? <p className="clients-editor__error" id="agro-editor-error" role="alert">{error}</p> : null}
          <div className="system-actions">
            <button type="button" onClick={closeEditor}>Cancelar</button>
            <button type="submit" className="is-primary">Salvar exemplo</button>
          </div>
        </form>
      ) : null}
      {feedback ? <p className="agro-feedback" role="status">{feedback}</p> : null}

      {dashboard ? <>
        <dl className="agro-dashboard__metrics" aria-label="Indicadores do Agro">
          {metrics.map((metric) => (
            <div className={`agro-metric ${metric.warning ? "agro-metric--warning" : ""}`} key={metric.label}>
              <dt>{metric.label}</dt>
              <dd>{metric.value}</dd>
              {metric.description ? <dd className="agro-metric__description">{metric.description}</dd> : null}
            </div>
          ))}
        </dl>
        <div className="agro-dashboard__areas">
          {agroAreas.map((area) => (
            <section className="agro-area" aria-label={area.title} key={area.title}>
              <h4><span className="agro-area__icon" aria-hidden="true">{area.icon === "briefcase" ? <i className="agro-briefcase-icon" /> : area.icon}</span>{area.title}</h4>
              <p>{area.description}</p>
              <div className="agro-area__links">
                {area.links.map((link) => (
                  <button type="button" key={link.screen} onClick={() => navigate(link.screen)}>
                    <span className="agro-shortcut-icon" aria-hidden="true">{link.icon}</span>
                    <span className="agro-shortcut-copy">
                      <strong>{link.screen}</strong>
                      <small>{area.title === "Financeiro" ? link.description : `${records[link.screen].length} ${link.description}`}</small>
                    </span>
                    <Icon name="arrow" />
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      </> : view ? (
        <section className="agro-preview" aria-label={`Lista de ${view}`}>
          <p>Total de registros: <strong>{records[view].length}</strong></p>
          {records[view].length ? (
            <div className="module-table-wrap">
              <table className="module-table agro-preview__table" aria-label={view} role="table">
                <thead><tr role="row">{["ID", "Nome", "Referência", "Status"].map((label) => <th key={label} scope="col" role="columnheader">{label}</th>)}</tr></thead>
                <tbody>{records[view].map((record) => (
                  <tr role="row" key={record.id}>
                    <td role="cell" data-label="ID">{String(record.id).padStart(3, "0")}</td>
                    <td role="cell" data-label="Nome">{record.name}</td>
                    <td role="cell" data-label="Referência">{record.detail}</td>
                    <td role="cell" data-label="Status"><span className="agro-preview__status">{record.status}</span></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          ) : <div className="agro-preview__empty"><Icon name="report" /><h4>Nenhum registro por aqui</h4><p>{view === "Fornecedores" ? "Use Novo Fornecedor para adicionar um exemplo." : "Não há lançamentos financeiros nesta demonstração."}</p></div>}
        </section>
      ) : null}
      <p className="agro-dashboard__caption">Demonstração interativa com dados fictícios. As alterações são temporárias.</p>
    </section>
  );
}
