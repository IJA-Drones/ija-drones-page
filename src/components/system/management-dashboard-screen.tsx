"use client";

import { useRef, useState } from "react";

import { SystemPageTitle } from "@/components/system/system-page-title";

type ManagementRequest = {
  id: number;
  unit: string;
  region: string;
  scheduledAt: string;
  createdAt: string;
  address: string;
  cep: string;
  latitude: string;
  longitude: string;
  visitType: string;
  operationType: string;
  propertyType: string;
  da: string;
  height: string;
  focus: string;
  support: string;
  status: string;
  team: string;
};

const managementRequests: readonly ManagementRequest[] = [
  {
    id: 5530,
    unit: "UVIS Lapa/Pinheiros",
    region: "OESTE",
    scheduledAt: "02/09/2026 às 12:30",
    createdAt: "27/08/2026 às 16:25",
    address: "Viaduto Doutor Arnaldo, 2391 – Sumaré",
    cep: "01255090",
    latitude: "-23.5446418",
    longitude: "-46.6833004",
    visitType: "Aedes",
    operationType: "Tratamento",
    propertyType: "Imóvel Geral",
    da: "61",
    height: "20m",
    focus: "Edificação Abandonada com Inservíveis",
    support: "Sim",
    status: "Pendente",
    team: "- Sem equipe -",
  },
  {
    id: 5529,
    unit: "UVIS Lapa/Pinheiros",
    region: "OESTE",
    scheduledAt: "02/09/2026 às 14:00",
    createdAt: "27/08/2026 às 15:48",
    address: "Rua Cardoso de Almeida, 1820 – Perdizes",
    cep: "05013000",
    latitude: "-23.5447257",
    longitude: "-46.6830618",
    visitType: "Aedes",
    operationType: "Tratamento",
    propertyType: "Imóvel Geral",
    da: "48",
    height: "18m",
    focus: "Terreno com acúmulo de inservíveis",
    support: "Não",
    status: "Pendente",
    team: "- Sem equipe -",
  },
];

type ManagementRequestCardProps = {
  request: ManagementRequest;
  onFeedback: (message: string) => void;
};

function ManagementRequestCard({ request, onFeedback }: ManagementRequestCardProps) {
  const [status, setStatus] = useState(request.status);
  const [team, setTeam] = useState(request.team);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <article className="management-request">
      <section className="management-request__summary" aria-label={`Resumo da solicitação ${request.id}`}>
        <h4>#{request.id} {request.unit}</h4>
        <div className="management-request__tags"><span>PENDENTE</span><span>{request.region}</span></div>
        <p className="management-request__team"><span aria-hidden="true">♟</span> Sem equipe atribuída</p>

        <dl className="management-request__meta">
          <div><dt aria-hidden="true">□</dt><dd><strong>Agendada para {request.scheduledAt}</strong></dd></div>
          <div><dt aria-hidden="true">◷</dt><dd>Criada em {request.createdAt}</dd></div>
          <div><dt aria-hidden="true">⌖</dt><dd>{request.address}<small>CEP: {request.cep}</small></dd></div>
        </dl>

        <div className="management-request__row-actions">
          <button type="button" onClick={() => onFeedback(`Editando solicitação #${request.id}`)}>□ Editar</button>
          <button className="is-danger" type="button" onClick={() => onFeedback(`Solicitação #${request.id} selecionada para exclusão`)}>▥ Deletar</button>
        </div>
      </section>

      <section className="management-request__details" aria-label={`Dados técnicos da solicitação ${request.id}`}>
        <div className="management-request__coordinate">
          <strong>{request.latitude}, {request.longitude}</strong>
          <button type="button" aria-label={`Abrir localização da solicitação ${request.id}`} onClick={() => onFeedback(`Localização da solicitação #${request.id} aberta`)}>▤</button>
        </div>
        <dl className="management-request__data">
          <div><dt>Tipo de visita</dt><dd>{request.visitType}</dd></div>
          <div><dt>Tipo de operação</dt><dd>{request.operationType}</dd></div>
          <div><dt>Tipo de imóvel</dt><dd>{request.propertyType}</dd></div>
          <div><dt>D.A</dt><dd>{request.da}</dd></div>
          <div><dt>Altura</dt><dd>{request.height}</dd></div>
          <div><dt>Foco</dt><dd>{request.focus}</dd></div>
          <div><dt>Apoio CET?</dt><dd><span className={request.support === "Sim" ? "is-positive" : ""}>{request.support}</span></dd></div>
        </dl>
      </section>

      <form className="management-request__form" onSubmit={(event) => { event.preventDefault(); onFeedback(`Solicitação #${request.id} salva`); }}>
        <div className="management-request__coordinates">
          <label><span>Latitude</span><input aria-label="Latitude" defaultValue={request.latitude} /></label>
          <label><span>Longitude</span><input aria-label="Longitude" defaultValue={request.longitude} /></label>
        </div>
        <label><span>Protocolo</span><input aria-label="Protocolo" placeholder="Protocolo" /></label>
        <fieldset>
          <label><span>Status</span><select value={status} onChange={(event) => setStatus(event.target.value)}><option>Pendente</option><option>Em análise</option><option>Aprovado</option></select></label>
          <label><span>Equipe responsável</span><select value={team} onChange={(event) => setTeam(event.target.value)}><option>- Sem equipe -</option><option>Equipe UVIS Oeste</option><option>Equipe OA 01</option></select></label>
          <input ref={fileInputRef} className="management-request__file-input" type="file" tabIndex={-1} aria-hidden="true" onChange={() => onFeedback(`Arquivo anexado à solicitação #${request.id}`)} />
          <button className="management-request__attach" type="button" onClick={() => fileInputRef.current?.click()}>⌕ Anexar</button>
          <button className="management-request__save" type="submit">Salvar</button>
        </fieldset>
      </form>
    </article>
  );
}

export function ManagementDashboardScreen() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

  const showFeedback = (message: string) => {
    setFeedback(message);
    window.setTimeout(() => setFeedback(""), 2200);
  };

  return (
    <section className="system-screen management-dashboard" aria-labelledby="management-dashboard-title">
      <header className="management-dashboard__header system-page-header">
        <SystemPageTitle icon="▦" id="management-dashboard-title" title="Painel de Gestão" meta={<>Solicitações filtradas: <strong>5181</strong></>} />
        <div className="management-dashboard__actions">
          <button className="is-primary" type="button" onClick={() => showFeedback("Nova solicitação iniciada")}>＋ <span>Nova Solicitação</span></button>
          <button className="is-success" type="button" onClick={() => showFeedback("Planilha Excel preparada")}>▣ <span>Exportar Excel</span></button>
          <button className="is-danger" type="button" onClick={() => showFeedback("Solicitações canceladas abertas")}>⊗ <span>Canceladas</span></button>
        </div>
      </header>

      <section className={`management-filter ${filtersOpen ? "is-open" : ""}`}>
        <button className="management-filter__toggle" type="button" aria-expanded={filtersOpen} aria-controls="management-filter-fields" onClick={() => setFiltersOpen((open) => !open)}>
          <span><i aria-hidden="true">▼</i> <b>Filtros de Busca</b><small>UVIS/PREFEITURA</small></span><i aria-hidden="true">⌄</i>
        </button>
        {filtersOpen ? (
          <div className="management-filter__fields" id="management-filter-fields">
            <label>Buscar solicitação<input placeholder="Número, unidade ou endereço" /></label>
            <label>Status<select defaultValue="Todos"><option>Todos</option><option>Pendente</option><option>Em análise</option><option>Aprovado</option></select></label>
            <label>Região<select defaultValue="Todas"><option>Todas</option><option>Oeste</option><option>Leste</option><option>Sul</option></select></label>
            <button type="button" onClick={() => showFeedback("Filtros aplicados")}>Aplicar filtros</button>
          </div>
        ) : null}
      </section>

      <div className="management-request-list">
        {managementRequests.map((request) => <ManagementRequestCard key={request.id} request={request} onFeedback={showFeedback} />)}
      </div>

      <div className={`os-feedback ${feedback ? "is-visible" : ""}`} role="status" aria-live="polite">{feedback}</div>
    </section>
  );
}
