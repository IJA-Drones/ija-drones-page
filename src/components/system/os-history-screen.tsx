"use client";

import { useMemo, useState } from "react";

import { OaSystemShell } from "@/components/system/oa-system-shell";

type OsHistoryScreenProps = {
  onNavigate: (screen: string) => void;
};

type ServiceOrder = {
  id: number;
  unit: string;
  region: string;
  address: string;
  district: string;
  city: string;
  date: string;
  time: string;
  team: string;
  status: "Em andamento" | "Concluída";
  approval: "Aprovado" | "Pendente";
};

const serviceOrders: ServiceOrder[] = [
  {
    id: 5499,
    unit: "UVIS Itaim Paulista",
    region: "LESTE",
    address: "Avenida Marechal Tito, 7557",
    district: "Itaim Paulista",
    city: "São Paulo",
    date: "04/09/2026",
    time: "13:30",
    team: "PLOA 21",
    status: "Em andamento",
    approval: "Aprovado",
  },
  {
    id: 5498,
    unit: "UVIS Itaim Paulista",
    region: "LESTE",
    address: "Rua Valdomiro Gonzaga Silva, 627",
    district: "Jardim das Oliveiras",
    city: "São Paulo",
    date: "04/09/2026",
    time: "13:00",
    team: "PLOA 21",
    status: "Em andamento",
    approval: "Aprovado",
  },
  {
    id: 5497,
    unit: "UVIS Itaim Paulista",
    region: "LESTE",
    address: "Rua Carmine Monetti, 1280",
    district: "Jardim das Oliveiras",
    city: "São Paulo",
    date: "04/09/2026",
    time: "12:30",
    team: "PLOA 21",
    status: "Em andamento",
    approval: "Aprovado",
  },
  {
    id: 5496,
    unit: "UVIS Itaim Paulista",
    region: "LESTE",
    address: "Rua Moisés Alves dos Santos, 1018",
    district: "Jardim das Oliveiras",
    city: "São Paulo",
    date: "04/09/2026",
    time: "12:00",
    team: "PLOA 21",
    status: "Em andamento",
    approval: "Aprovado",
  },
  {
    id: 5495,
    unit: "UVIS Itaim Paulista",
    region: "LESTE",
    address: "Rua Tibúrcio de Sousa, 944",
    district: "Jardim Helena",
    city: "São Paulo",
    date: "03/09/2026",
    time: "17:20",
    team: "PLOA 18",
    status: "Concluída",
    approval: "Aprovado",
  },
];

export function OsHistoryScreen({ onNavigate }: OsHistoryScreenProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [selectedOrder, setSelectedOrder] = useState<ServiceOrder | null>(null);
  const [feedback, setFeedback] = useState("");

  const filteredOrders = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase("pt-BR");

    return serviceOrders.filter((order) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        `${order.id} ${order.unit} ${order.address} ${order.district} ${order.team}`
          .toLocaleLowerCase("pt-BR")
          .includes(normalizedSearch);
      const matchesStatus = statusFilter === "Todos" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const showFeedback = (message: string) => {
    setFeedback(message);
    window.setTimeout(() => setFeedback(""), 2200);
  };

  const overlay = (
    <>
      {selectedOrder ? (
        <div className="os-detail-backdrop" role="presentation" onMouseDown={() => setSelectedOrder(null)}>
          <section className="os-detail" role="dialog" aria-modal="true" aria-labelledby="os-detail-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="os-detail__close" type="button" aria-label="Fechar detalhes" onClick={() => setSelectedOrder(null)}>×</button>
            <span>Ordem de serviço</span>
            <h4 id="os-detail-title">OS #{selectedOrder.id}</h4>
            <dl><dt>Unidade</dt><dd>{selectedOrder.unit}</dd><dt>Operação</dt><dd>{selectedOrder.address}</dd><dt>Equipe</dt><dd>{selectedOrder.team}</dd><dt>Status</dt><dd>{selectedOrder.status}</dd></dl>
            <button type="button" onClick={() => { showFeedback(`OS #${selectedOrder.id} aberta`); setSelectedOrder(null); }}>Abrir ordem completa</button>
          </section>
        </div>
      ) : null}

      <div className={`os-feedback ${feedback ? "is-visible" : ""}`} role="status" aria-live="polite">{feedback}</div>
    </>
  );

  return (
    <OaSystemShell activeScreen="Histórico OS" onNavigate={onNavigate} overlay={overlay}>
          <div className="os-history__heading">
            <div className="os-history__title">
              <span aria-hidden="true">◷</span>
              <div>
                <h3>Histórico de OS</h3>
                <p>Consulte o histórico das ordens de serviço.</p>
                <small>OS filtradas: <b>{filteredOrders.length === serviceOrders.length ? "4184" : filteredOrders.length}</b></small>
              </div>
            </div>

            <div className="os-export-actions">
              <button className="is-primary" type="button" onClick={() => showFeedback("Filtro exportado em Excel")}>▣ <span>Exportar filtro</span></button>
              <button type="button" onClick={() => showFeedback("Excels individuais preparados")}>▤ <span>Excels individuais</span></button>
              <button className="is-pdf" type="button" onClick={() => showFeedback("PDFs individuais preparados")}>▥ <span>PDFs individuais</span></button>
              <button className="is-success" type="button" onClick={() => showFeedback("Exportação completa preparada")}>▦ <span>Exportar tudo</span></button>
              <button className="is-back" type="button" onClick={() => onNavigate("Dashboard")}>← <span>Voltar</span></button>
            </div>
          </div>

          <section className={`os-filter ${filtersOpen ? "is-open" : ""}`}>
            <button
              className="os-filter__toggle"
              type="button"
              aria-expanded={filtersOpen}
              aria-controls="os-filter-fields"
              onClick={() => setFiltersOpen((open) => !open)}
            >
              <span>▼ <b>Filtros de busca</b></span><i aria-hidden="true">⌄</i>
            </button>
            {filtersOpen ? (
              <div className="os-filter__fields" id="os-filter-fields">
                <label>Buscar OS, unidade ou endereço<input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Digite para buscar" /></label>
                <label>Status<select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option>Todos</option><option>Em andamento</option><option>Concluída</option></select></label>
                <button type="button" onClick={() => { setSearch(""); setStatusFilter("Todos"); }}>Limpar filtros</button>
              </div>
            ) : null}
          </section>

          <div className="os-table-wrap">
            <table className="os-table">
              <thead><tr><th>OS</th><th>Unidade</th><th>Operação</th><th>Equipe</th><th>Status</th><th>Ação</th></tr></thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td><strong>#{order.id}</strong></td>
                    <td><b>{order.unit}</b><small>{order.region}</small></td>
                    <td><b>{order.address}</b><span>{order.district} — {order.city}</span><small>▣ {order.date}&nbsp;&nbsp; ◷ {order.time}</small></td>
                    <td><span className="os-team">♟ {order.team}</span></td>
                    <td><span className={`os-status ${order.status === "Concluída" ? "is-complete" : ""}`}>{order.status}</span><small>{order.approval}</small></td>
                    <td>
                      <div className="os-row-actions">
                        <button type="button" aria-label={`Ver OS ${order.id}`} title="Ver OS" onClick={() => setSelectedOrder(order)}>▣</button>
                        <button className="is-pdf" type="button" aria-label={`Exportar PDF da OS ${order.id}`} title="Exportar PDF" onClick={() => showFeedback(`PDF da OS #${order.id} preparado`)}>▥</button>
                        <button className="is-excel" type="button" aria-label={`Exportar Excel da OS ${order.id}`} title="Exportar Excel" onClick={() => showFeedback(`Excel da OS #${order.id} preparado`)}>▤</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredOrders.length === 0 ? <p className="os-empty">Nenhuma ordem de serviço encontrada.</p> : null}
          </div>
    </OaSystemShell>
  );
}
