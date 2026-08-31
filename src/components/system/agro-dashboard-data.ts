import { initialAgroClients, type AgroClient } from "@/components/system/agro-clients-data";

export type AgroRecord = {
  id: number;
  name: string;
  detail: string;
  status: string;
};

export const agroViewNames = [
  "Clientes", "Fornecedores", "Orçamentos", "Contratos", "Ordens de Serviço",
  "Fila Operacional", "Caixa Diário", "Contas a Receber", "Contas a Pagar",
] as const;

export type AgroView = (typeof agroViewNames)[number];
export type AgroRecords = Record<Exclude<AgroView, "Clientes">, readonly AgroRecord[]> & { Clientes: readonly AgroClient[] };
export type AgroCreateView = "Clientes" | "Fornecedores" | "Orçamentos";

export function isAgroView(screen: string): screen is AgroView {
  return agroViewNames.some((view) => view === screen);
}

// Somente exemplos locais: nenhum cadastro, contrato ou lançamento real.
export const initialAgroRecords: AgroRecords = {
  Clientes: initialAgroClients,
  Fornecedores: [],
  Orçamentos: Array.from({ length: 4 }, (_, index) => ({
    id: index + 1, name: `Orçamento ${index + 1}`, detail: `Cliente ${index + 1}`, status: "Em elaboração",
  })),
  Contratos: Array.from({ length: 2 }, (_, index) => ({
    id: index + 1, name: `Contrato ${index + 1}`, detail: `Cliente ${index + 1}`, status: "Na fila operacional",
  })),
  "Ordens de Serviço": [{ id: 1, name: "OS 001", detail: "Cliente 1 · Equipe 1", status: "Planejamento" }],
  "Fila Operacional": Array.from({ length: 2 }, (_, index) => ({
    id: index + 1, name: `Contrato ${index + 1}`, detail: `Propriedade ${index + 1}`, status: "Aguardando planejamento",
  })),
  "Caixa Diário": [],
  "Contas a Receber": [],
  "Contas a Pagar": [],
};

export const agroCreateLabels: Record<AgroCreateView, string> = {
  Clientes: "Novo Cliente",
  Fornecedores: "Novo Fornecedor",
  Orçamentos: "Novo Orçamento",
};

export const agroAreas: readonly {
  title: string;
  icon: string;
  description: string;
  links: readonly { screen: AgroView; icon: string; description: string }[];
}[] = [
  {
    title: "Comercial", icon: "briefcase",
    description: "Cadastros, propostas e contratos antes da execução em campo.",
    links: [
      { screen: "Clientes", icon: "◎", description: "cadastro(s)" },
      { screen: "Fornecedores", icon: "▦", description: "cadastro(s)" },
      { screen: "Orçamentos", icon: "▤", description: "proposta(s)" },
      { screen: "Contratos", icon: "▧", description: "contrato(s)" },
    ],
  },
  {
    title: "Operacional", icon: "⚙",
    description: "Planejamento, equipes, pilotos e estrutura da execução em campo.",
    links: [
      { screen: "Ordens de Serviço", icon: "☑", description: "OS cadastrada(s)" },
      { screen: "Fila Operacional", icon: "≡", description: "contrato(s) aguardando planejamento" },
    ],
  },
  {
    title: "Financeiro", icon: "$",
    description: "Caixa, contas, bancos e lançamentos manuais do Agro.",
    links: [
      { screen: "Caixa Diário", icon: "▤", description: "Fechamento diário e conferência" },
      { screen: "Contas a Receber", icon: "↙", description: "Recebimentos e acompanhamento" },
      { screen: "Contas a Pagar", icon: "↗", description: "Pagamentos e vencimentos" },
    ],
  },
];
