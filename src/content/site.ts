export const site = {
  name: "IJA Drones",
  email: "suporte@ijadrones.com.br",
  navigation: [
    { label: "Visão", href: "#visao" },
    { label: "Soluções", href: "#solucoes" },
    { label: "Plataforma", href: "#plataforma" },
    { label: "Método", href: "#como-funciona" },
    { label: "Contato", href: "#contato" },
  ],
  highlights: [
    {
      label: "Operação no campo",
      description: "Pulverização planejada para cada área",
      icon: "flight",
    },
    {
      label: "Gestão centralizada",
      description: "Solicitações, equipe e frota no mesmo fluxo",
      icon: "dashboard",
    },
    {
      label: "Visibilidade da missão",
      description: "Acompanhamento da operação de ponta a ponta",
      icon: "signal",
    },
    {
      label: "Dados organizados",
      description: "Mapas e relatórios para apoiar decisões",
      icon: "report",
    },
  ],
  solutions: {
    spraying: {
      label: "Pulverização agrícola",
      eyebrow: "Operação de precisão",
      title: "Eficiência no campo, aplicação onde importa.",
      description:
        "Planejamento por área, execução com drone e registro da operação em um fluxo pensado para o agronegócio.",
      color: "green",
      features: [
        {
          title: "Planejamento por talhão",
          description:
            "A área de aplicação orienta rota, cobertura e parâmetros da missão.",
          icon: "target",
        },
        {
          title: "Acesso a áreas complexas",
          description:
            "Operação aérea para terrenos onde máquinas enfrentam mais limitações.",
          icon: "terrain",
        },
        {
          title: "Registro da operação",
          description:
            "Informações da missão organizadas para consulta e acompanhamento.",
          icon: "report",
        },
      ],
    },
    software: {
      label: "Software de gestão",
      eyebrow: "Controle integrado",
      title: "Da solicitação do voo ao relatório final.",
      description:
        "Uma plataforma para conectar cliente, equipe operacional, frota e dados geográficos em uma experiência simples.",
      color: "blue",
      features: [
        {
          title: "Gestão de frota",
          description:
            "Status de drones, operadores e missões reunidos em um painel central.",
          icon: "fleet",
        },
        {
          title: "Solicitação geográfica",
          description:
            "Definição visual da área e dos detalhes necessários para planejar o voo.",
          icon: "map",
        },
        {
          title: "Indicadores e relatórios",
          description:
            "Histórico das operações e informações úteis para gestão e tomada de decisão.",
          icon: "analytics",
        },
      ],
    },
  },
  process: [
    {
      step: "01",
      title: "Solicitação",
      description: "A área e o objetivo da operação são registrados.",
    },
    {
      step: "02",
      title: "Planejamento",
      description: "A equipe analisa o cenário e prepara o plano de voo.",
    },
    {
      step: "03",
      title: "Operação",
      description: "A missão é executada e acompanhada pela plataforma.",
    },
    {
      step: "04",
      title: "Relatório",
      description: "Os dados da missão ficam organizados para consulta.",
    },
  ],
} as const;

export type SolutionKey = keyof typeof site.solutions;
