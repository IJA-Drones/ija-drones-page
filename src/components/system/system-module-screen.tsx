"use client";

import { useState, type CSSProperties } from "react";

import { SystemPageTitle } from "@/components/system/system-page-title";
import { agroNavigation, uvisNavigation } from "@/components/system/system-navigation";

type ModuleMode = "uvis" | "agro";
type ModuleKind = "table" | "map" | "weather" | "chart";

type ModuleMetric = {
  label: string;
  value: string;
  detail: string;
};

type ModuleRow = {
  id: string;
  cells: readonly string[];
};

type WeatherItem = {
  day: string;
  icon: string;
  temperature: string;
  condition: string;
  detail: string;
};

type ModuleConfig = {
  eyebrow: string;
  title: string;
  description: string;
  action: string;
  kind: ModuleKind;
  metrics: readonly ModuleMetric[];
  columns: readonly string[];
  rows: readonly ModuleRow[];
  weather?: readonly WeatherItem[];
};

type SystemModuleScreenProps = {
  mode: ModuleMode;
  screen: string;
};

const positiveStatus = /ativo|ativa|online|operacional|concluída|disponível|regular|favorável|confirmada|sincronizado/i;
const warningStatus = /atenção|revisão|pendente|planejada|moderado|agendada|em rota/i;

const systemModuleConfigs: Readonly<Record<string, ModuleConfig>> = {
  "Usuário": {
    eyebrow: "Controle de acesso",
    title: "Gestão de usuários",
    description: "Perfis, permissões e acessos de toda a operação municipal.",
    action: "Novo usuário",
    kind: "table",
    metrics: [
      { label: "Usuários ativos", value: "84", detail: "+6 este mês" },
      { label: "Administradores", value: "06", detail: "Acesso completo" },
      { label: "Convites pendentes", value: "03", detail: "Aguardando aceite" },
    ],
    columns: ["Usuário", "Perfil", "Unidade", "Status"],
    rows: [
      { id: "usuario-1", cells: ["Mariana Costa", "Gestora", "UVIS Lapa/Pinheiros", "Ativo"] },
      { id: "usuario-2", cells: ["Rafael Lima", "Operador", "UVIS Sé", "Ativo"] },
      { id: "usuario-3", cells: ["Camila Rocha", "Fiscal", "UVIS Mooca", "Pendente"] },
      { id: "usuario-4", cells: ["João Martins", "Consulta", "Secretaria Municipal", "Ativo"] },
    ],
  },
  "Clientes": {
    eyebrow: "Relacionamento institucional",
    title: "Clientes e unidades atendidas",
    description: "Contratos, unidades vinculadas e situação de cada operação.",
    action: "Novo cliente",
    kind: "table",
    metrics: [
      { label: "Prefeituras", value: "18", detail: "Em 4 estados" },
      { label: "Unidades UVIS", value: "42", detail: "Operação integrada" },
      { label: "Contratos ativos", value: "21", detail: "94% renovados" },
    ],
    columns: ["Cliente", "Responsável", "Unidades", "Status"],
    rows: [
      { id: "cliente-1", cells: ["Prefeitura de São Paulo", "Ana Ribeiro", "14 UVIS", "Ativo"] },
      { id: "cliente-2", cells: ["Prefeitura de Campinas", "Bruno Alves", "06 unidades", "Ativo"] },
      { id: "cliente-3", cells: ["Consórcio Vale Verde", "Renata Souza", "08 municípios", "Em revisão"] },
      { id: "cliente-4", cells: ["Prefeitura de Sorocaba", "Paulo Mendes", "04 unidades", "Ativo"] },
    ],
  },
  "Pilotos": {
    eyebrow: "Operação aérea",
    title: "Pilotos e certificações",
    description: "Disponibilidade, documentação e histórico operacional dos pilotos.",
    action: "Cadastrar piloto",
    kind: "table",
    metrics: [
      { label: "Pilotos ativos", value: "27", detail: "22 disponíveis" },
      { label: "Em missão", value: "05", detail: "Agora" },
      { label: "Certificações", value: "100%", detail: "Documentação válida" },
    ],
    columns: ["Piloto", "Região", "Horas de voo", "Status"],
    rows: [
      { id: "piloto-1", cells: ["Carlos Henrique", "Leste", "1.284 h", "Em rota"] },
      { id: "piloto-2", cells: ["Fernanda Melo", "Sul", "986 h", "Disponível"] },
      { id: "piloto-3", cells: ["Lucas Prado", "Oeste", "742 h", "Disponível"] },
      { id: "piloto-4", cells: ["Beatriz Nunes", "Centro", "615 h", "Em revisão"] },
    ],
  },
  "Equipamentos": {
    eyebrow: "Controle patrimonial",
    title: "Equipamentos operacionais",
    description: "Drones, baterias e acessórios vinculados às equipes de campo.",
    action: "Novo equipamento",
    kind: "table",
    metrics: [
      { label: "Equipamentos", value: "68", detail: "57 operacionais" },
      { label: "Drones", value: "24", detail: "9 modelos" },
      { label: "Em manutenção", value: "05", detail: "2 prioritários" },
    ],
    columns: ["Equipamento", "Identificação", "Equipe", "Status"],
    rows: [
      { id: "equipamento-1", cells: ["Drone DJI Mavic 3E", "PLOA 24", "Equipe OA 01", "Operacional"] },
      { id: "equipamento-2", cells: ["Drone DJI Matrice 350", "PLOA 19", "Equipe UVIS Sul", "Em revisão"] },
      { id: "equipamento-3", cells: ["Kit RTK móvel", "RTK-008", "Equipe OA 02", "Disponível"] },
      { id: "equipamento-4", cells: ["Estação de bateria", "BAT-114", "Base Oeste", "Operacional"] },
    ],
  },
  "Veículos": {
    eyebrow: "Frota terrestre",
    title: "Veículos e bases móveis",
    description: "Quilometragem, revisão e alocação da frota de apoio.",
    action: "Novo veículo",
    kind: "table",
    metrics: [
      { label: "Veículos", value: "16", detail: "13 disponíveis" },
      { label: "Em operação", value: "03", detail: "Rotas ativas" },
      { label: "Revisões", value: "02", detail: "Exigem atenção" },
    ],
    columns: ["Veículo", "Placa", "Equipe", "Status"],
    rows: [
      { id: "veiculo-1", cells: ["Fiat Strada Freedom", "SUK2B95", "Equipe OA 01", "Em revisão"] },
      { id: "veiculo-2", cells: ["Toyota Hilux SR", "GEO8A22", "Equipe UVIS Sul", "Em rota"] },
      { id: "veiculo-3", cells: ["Renault Oroch", "OAQ4F17", "Base Leste", "Disponível"] },
      { id: "veiculo-4", cells: ["Unidade móvel técnica", "TEC1A09", "Equipe OA 02", "Operacional"] },
    ],
  },
  "Alertas Limpeza": {
    eyebrow: "Prevenção operacional",
    title: "Alertas de limpeza",
    description: "Pendências sanitárias identificadas durante vistorias e missões.",
    action: "Novo alerta",
    kind: "table",
    metrics: [
      { label: "Alertas abertos", value: "12", detail: "2 prioritários" },
      { label: "Em atendimento", value: "07", detail: "Equipes designadas" },
      { label: "Resolvidos", value: "39", detail: "Últimos 30 dias" },
    ],
    columns: ["Local", "Ocorrência", "Equipe", "Status"],
    rows: [
      { id: "alerta-1", cells: ["Lapa — Setor 04", "Descarte irregular", "Equipe UVIS Oeste", "Em rota"] },
      { id: "alerta-2", cells: ["Mooca — Setor 12", "Área com acúmulo", "Equipe UVIS Leste", "Pendente"] },
      { id: "alerta-3", cells: ["Sé — Setor 08", "Foco eliminado", "Equipe OA 01", "Concluída"] },
      { id: "alerta-4", cells: ["Santana — Setor 02", "Vistoria preventiva", "Equipe UVIS Norte", "Agendada"] },
    ],
  },
  "Equipe OA": {
    eyebrow: "Coordenação OceanoAzul",
    title: "Equipes OA",
    description: "Composição, disponibilidade e desempenho das equipes próprias.",
    action: "Nova equipe OA",
    kind: "table",
    metrics: [
      { label: "Equipes", value: "08", detail: "6 em campo" },
      { label: "Profissionais", value: "31", detail: "Escala completa" },
      { label: "Missões hoje", value: "18", detail: "92% no prazo" },
    ],
    columns: ["Equipe", "Liderança", "Área", "Status"],
    rows: [
      { id: "equipe-oa-1", cells: ["Equipe OA 01", "Carlos Henrique", "Lapa / Pinheiros", "Em rota"] },
      { id: "equipe-oa-2", cells: ["Equipe OA 02", "Fernanda Melo", "Sé / Centro", "Operacional"] },
      { id: "equipe-oa-3", cells: ["Equipe OA 03", "Lucas Prado", "Mooca / Leste", "Disponível"] },
      { id: "equipe-oa-4", cells: ["Equipe OA 04", "Beatriz Nunes", "Santana / Norte", "Agendada"] },
    ],
  },
  "Equipe UVIS": {
    eyebrow: "Integração municipal",
    title: "Equipes UVIS",
    description: "Unidades de vigilância, responsáveis e capacidade operacional.",
    action: "Vincular equipe",
    kind: "table",
    metrics: [
      { label: "Equipes UVIS", value: "14", detail: "Todas conectadas" },
      { label: "Agentes", value: "86", detail: "72 em escala" },
      { label: "Solicitações", value: "143", detail: "Em atendimento" },
    ],
    columns: ["Unidade", "Responsável", "Agentes", "Status"],
    rows: [
      { id: "equipe-uvis-1", cells: ["UVIS Lapa/Pinheiros", "Mariana Costa", "12 agentes", "Ativa"] },
      { id: "equipe-uvis-2", cells: ["UVIS Mooca/Aricanduva", "Rafael Lima", "09 agentes", "Ativa"] },
      { id: "equipe-uvis-3", cells: ["UVIS Sé", "Camila Rocha", "11 agentes", "Ativa"] },
      { id: "equipe-uvis-4", cells: ["UVIS Santana/Jaçanã", "João Martins", "08 agentes", "Em revisão"] },
    ],
  },
  "Mapas": {
    eyebrow: "Inteligência territorial",
    title: "Mapa operacional",
    description: "Ocorrências, equipes e áreas prioritárias em uma visão geográfica.",
    action: "Nova camada",
    kind: "map",
    metrics: [
      { label: "Pontos ativos", value: "143", detail: "Na área visível" },
      { label: "Equipes no mapa", value: "19", detail: "Atualização ao vivo" },
      { label: "Áreas críticas", value: "07", detail: "Monitoramento reforçado" },
    ],
    columns: ["Região", "Ocorrências", "Equipe", "Status"],
    rows: [
      { id: "mapa-1", cells: ["Lapa / Pinheiros", "38 pontos", "OA 01", "Em rota"] },
      { id: "mapa-2", cells: ["Sé / Centro", "27 pontos", "UVIS Sé", "Atenção"] },
      { id: "mapa-3", cells: ["Mooca / Leste", "21 pontos", "OA 03", "Regular"] },
    ],
  },
  "Geolocalização": {
    eyebrow: "Rastreamento em campo",
    title: "Geolocalização de equipes",
    description: "Posição, última atualização e rota planejada para cada operação.",
    action: "Traçar rota",
    kind: "map",
    metrics: [
      { label: "Equipes online", value: "19", detail: "Sinal estável" },
      { label: "Rotas ativas", value: "08", detail: "42 pontos" },
      { label: "Tempo médio", value: "18 min", detail: "Até o destino" },
    ],
    columns: ["Equipe", "Coordenada", "Atualização", "Status"],
    rows: [
      { id: "geo-1", cells: ["Equipe OA 01", "-23.5446, -46.6830", "há 1 min", "Online"] },
      { id: "geo-2", cells: ["Equipe UVIS Sul", "-23.6241, -46.7018", "há 3 min", "Em rota"] },
      { id: "geo-3", cells: ["Equipe OA 03", "-23.5572, -46.6084", "há 2 min", "Online"] },
    ],
  },
  "Missões Agro": {
    eyebrow: "Planejamento agrícola",
    title: "Missões de aplicação",
    description: "Planejamento, execução e rastreabilidade dos voos agrícolas.",
    action: "Nova missão",
    kind: "table",
    metrics: [
      { label: "Missões hoje", value: "12", detail: "8 concluídas" },
      { label: "Área planejada", value: "846 ha", detail: "Safra 2026" },
      { label: "Em aplicação", value: "03", detail: "Telemetria ativa" },
    ],
    columns: ["Missão", "Talhão", "Aplicação", "Status"],
    rows: [
      { id: "missao-1", cells: ["AGR-0268", "Talhão 04 — Milho", "Fungicida", "Em rota"] },
      { id: "missao-2", cells: ["AGR-0267", "Talhão 11 — Soja", "Herbicida", "Concluída"] },
      { id: "missao-3", cells: ["AGR-0266", "Talhão 08 — Algodão", "Mapeamento", "Planejada"] },
      { id: "missao-4", cells: ["AGR-0265", "Talhão 03 — Café", "Nutrição foliar", "Confirmada"] },
    ],
  },
  "Relatórios Agro": {
    eyebrow: "Indicadores da safra",
    title: "Relatórios agrícolas",
    description: "Resultados de aplicação, consumo e eficiência por cultura.",
    action: "Exportar relatório",
    kind: "chart",
    metrics: [
      { label: "Área aplicada", value: "1.480 ha", detail: "+18% no mês" },
      { label: "Economia de água", value: "90%", detail: "Vs. trator" },
      { label: "Eficiência", value: "96%", detail: "Cobertura prevista" },
    ],
    columns: ["Cultura", "Área", "Aplicações", "Status"],
    rows: [
      { id: "relatorio-agro-1", cells: ["Soja", "640 ha", "18 missões", "Concluída"] },
      { id: "relatorio-agro-2", cells: ["Milho", "472 ha", "14 missões", "Ativa"] },
      { id: "relatorio-agro-3", cells: ["Algodão", "238 ha", "07 missões", "Planejada"] },
    ],
  },
  "Telemetria & Frota": {
    eyebrow: "Monitoramento em tempo real",
    title: "Telemetria e frota",
    description: "Conectividade, bateria e desempenho dos equipamentos agrícolas.",
    action: "Abrir central",
    kind: "chart",
    metrics: [
      { label: "Drones online", value: "09", detail: "Sinal estável" },
      { label: "Horas de voo", value: "284 h", detail: "Neste mês" },
      { label: "Baterias", value: "42", detail: "36 disponíveis" },
    ],
    columns: ["Equipamento", "Bateria", "Sinal", "Status"],
    rows: [
      { id: "telemetria-1", cells: ["DJI Agras T40 — 01", "78%", "Excelente", "Em operação"] },
      { id: "telemetria-2", cells: ["DJI Agras T40 — 02", "92%", "Excelente", "Disponível"] },
      { id: "telemetria-3", cells: ["Mavic 3M — RTK", "61%", "Regular", "Em rota"] },
      { id: "telemetria-4", cells: ["Base móvel — Agro 02", "100%", "Online", "Operacional"] },
    ],
  },
  "Previsão do Tempo": {
    eyebrow: "Janela operacional",
    title: "Previsão do tempo",
    description: "Condições de vento, umidade e chuva para planejar aplicações seguras.",
    action: "Atualizar previsão",
    kind: "weather",
    metrics: [
      { label: "Condição atual", value: "Favorável", detail: "Vento 6 km/h" },
      { label: "Umidade", value: "72%", detail: "Dentro do ideal" },
      { label: "Próxima chuva", value: "18 h", detail: "35% de chance" },
    ],
    weather: [
      { day: "Hoje", icon: "☀", temperature: "27°", condition: "Favorável", detail: "Vento 6 km/h" },
      { day: "Amanhã", icon: "◑", temperature: "25°", condition: "Moderado", detail: "Vento 12 km/h" },
      { day: "Sábado", icon: "☁", temperature: "23°", condition: "Atenção", detail: "Chuva 55%" },
      { day: "Domingo", icon: "☀", temperature: "28°", condition: "Favorável", detail: "Vento 5 km/h" },
    ],
    columns: ["Janela", "Horário", "Vento", "Status"],
    rows: [
      { id: "tempo-1", cells: ["Aplicação matinal", "06:00 — 09:30", "4–7 km/h", "Favorável"] },
      { id: "tempo-2", cells: ["Aplicação vespertina", "15:30 — 17:40", "9–12 km/h", "Moderado"] },
    ],
  },
  "Mapas de Aplicação": {
    eyebrow: "Cobertura e precisão",
    title: "Mapas de aplicação",
    description: "Rotas, cobertura e zonas de manejo registradas por talhão.",
    action: "Importar mapa",
    kind: "map",
    metrics: [
      { label: "Mapas ativos", value: "32", detail: "Safra atual" },
      { label: "Área mapeada", value: "2.140 ha", detail: "18 propriedades" },
      { label: "Cobertura média", value: "96%", detail: "Dentro da meta" },
    ],
    columns: ["Talhão", "Área", "Último voo", "Status"],
    rows: [
      { id: "mapa-agro-1", cells: ["Talhão 04 — Milho", "142 ha", "Hoje, 08:42", "Sincronizado"] },
      { id: "mapa-agro-2", cells: ["Talhão 11 — Soja", "286 ha", "Ontem, 16:20", "Sincronizado"] },
      { id: "mapa-agro-3", cells: ["Talhão 08 — Algodão", "94 ha", "26/08, 07:15", "Pendente"] },
    ],
  },
};

function getStatusClass(value: string) {
  if (positiveStatus.test(value)) return "is-positive";
  if (warningStatus.test(value)) return "is-warning";
  return "is-neutral";
}

function ModuleVisual({ config }: { config: ModuleConfig }) {
  if (config.kind === "map") {
    return (
      <div className="module-map" aria-label="Visualização resumida do mapa operacional">
        <div className="module-map__grid" aria-hidden="true" />
        <span className="module-map__zone module-map__zone--one" aria-hidden="true" />
        <span className="module-map__zone module-map__zone--two" aria-hidden="true" />
        <span className="module-map__route" aria-hidden="true" />
        <i className="module-map__pin module-map__pin--one" aria-hidden="true" />
        <i className="module-map__pin module-map__pin--two" aria-hidden="true" />
        <i className="module-map__pin module-map__pin--three" aria-hidden="true" />
        <div className="module-map__legend"><span><i /> Equipe online</span><span><i /> Área monitorada</span></div>
      </div>
    );
  }

  if (config.kind === "weather" && config.weather) {
    return (
      <div className="module-weather" aria-label="Previsão para os próximos dias">
        {config.weather.map((item) => (
          <article key={item.day}>
            <small>{item.day}</small><span aria-hidden="true">{item.icon}</span><strong>{item.temperature}</strong>
            <b className={getStatusClass(item.condition)}>{item.condition}</b><p>{item.detail}</p>
          </article>
        ))}
      </div>
    );
  }

  if (config.kind === "chart") {
    return (
      <div className="module-chart" aria-label="Evolução dos indicadores operacionais">
        {[54, 72, 61, 84, 76, 92, 88, 96].map((height, index) => (
          <i key={`${height}-${index}`} style={{ "--module-bar-height": `${height}%` } as CSSProperties}><span>{index + 1}</span></i>
        ))}
        <div><span>Início do período</span><strong>Eficiência operacional</strong><span>Hoje</span></div>
      </div>
    );
  }

  return null;
}

export function SystemModuleScreen({ mode, screen }: SystemModuleScreenProps) {
  const [search, setSearch] = useState("");
  const [feedback, setFeedback] = useState("");
  const screenIcon = (mode === "agro" ? agroNavigation : uvisNavigation).find((item) => item.label === screen)?.icon ?? "◇";
  const config = systemModuleConfigs[screen];

  if (!config) return null;

  const normalizedSearch = search.trim().toLocaleLowerCase("pt-BR");
  const filteredRows = normalizedSearch
    ? config.rows.filter((row) => row.cells.some((cell) => cell.toLocaleLowerCase("pt-BR").includes(normalizedSearch)))
    : config.rows;

  const showFeedback = (message: string) => {
    setFeedback(message);
    window.setTimeout(() => setFeedback(""), 2200);
  };

  return (
    <section className="system-screen module-screen" aria-labelledby="module-screen-title">
      <header className="module-screen__header system-page-header">
        <SystemPageTitle icon={screenIcon} id="module-screen-title" eyebrow={config.eyebrow} title={config.title} description={config.description} />
        <div className="module-screen__actions">
          <button type="button" onClick={() => showFeedback("Filtros atualizados")}>⌁ <span>Filtros</span></button>
          <button className="is-primary" type="button" onClick={() => showFeedback(`${config.action} preparado`)}>＋ <span>{config.action}</span></button>
        </div>
      </header>

      <div className="module-metrics">
        {config.metrics.map((metric) => (
          <article key={metric.label}>
            <span>{metric.label}</span><strong>{metric.value}</strong><small>{metric.detail}</small>
          </article>
        ))}
      </div>

      <ModuleVisual config={config} />

      <div className="module-toolbar">
        <label>
          <span aria-hidden="true">⌕</span>
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={`Buscar em ${screen.toLocaleLowerCase("pt-BR")}`} />
        </label>
        <span>{filteredRows.length} registros</span>
        <button className="is-success" type="button" onClick={() => showFeedback("Dados exportados")}>▤ Exportar</button>
      </div>

      <div className="module-table-wrap">
        <table className="module-table">
          <thead><tr>{config.columns.map((column) => <th key={column}>{column}</th>)}<th>Ação</th></tr></thead>
          <tbody>
            {filteredRows.map((row) => (
              <tr key={row.id}>
                {row.cells.map((cell, index) => (
                  <td key={`${row.id}-${config.columns[index]}`}>
                    {index === row.cells.length - 1 ? <span className={`module-status ${getStatusClass(cell)}`}>{cell}</span> : cell}
                  </td>
                ))}
                <td><button type="button" aria-label={`Abrir ${row.cells[0]}`} onClick={() => showFeedback(`${row.cells[0]} aberto`)}>•••</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredRows.length === 0 ? <p className="module-empty">Nenhum registro encontrado.</p> : null}
      </div>

      <div className={`os-feedback ${feedback ? "is-visible" : ""}`} role="status" aria-live="polite">{feedback}</div>
      <span className="module-screen__mode">{mode === "agro" ? "IJA System Agro" : "OceanoAzul UVIS"}</span>
    </section>
  );
}
