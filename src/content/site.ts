export const site = {
  name: "IJA Drones",
  email: "suporte@ijadrones.com.br",
  instagram: {
    url: "https://www.instagram.com/ijadronesbrasil/",
    handle: "@ijadronesbrasil",
  },
  contactEmail: {
    subject: "Tenho interesse nos serviços da IJA Drones",
    body: [
      "Olá, equipe IJA Drones!",
      "",
      "Conheci o site e tenho interesse em saber mais sobre os serviços de vocês. Gostaria de conversar com um especialista para entender as opções e solicitar um orçamento.",
      "",
      "Podem retornar por este e-mail?",
      "",
      "Obrigado!",
    ].join("\r\n"),
  },
  navigation: [
    { label: "Visão", href: "#visao" },
    { label: "Soluções", href: "#solucoes" },
    { label: "Plataforma", href: "#plataforma" },
    { label: "Método", href: "#como-funciona" },
    { label: "Contato", href: "#contato" },
  ],
  softwareRegistration: {
    name: "IJA System",
    number: "BR 51 2026 007433-9" as string | null,
    holder: "IJA Drones Brasil Ltda. - ME" as string | null,
    issuedAt: "2026-09-15" as string | null,
    certificateUrl:
      "/docs/ija-system/certificado-inpi-br-51-2026-007433-9.pdf" as string | null,
    // O endereço de detalhes do INPI depende de uma sessão iniciada no portal.
    consultationUrl:
      "https://busca.inpi.gov.br/pePI/jsp/programas/ProgramaSearchBasico.jsp" as string | null,
  },
  abesAward: {
    name: "Prêmio Brasil, País Digital",
    edition: "2026",
    organization: "ABES",
    category: "Saúde",
    title: "3º lugar em",
    recognition: "Soluções Mais Admiradas",
    recognitionDescription: "Iniciativas que Geram um Impacto Real",
    operation: "Combate à dengue em São Paulo.",
    // Colocação e categoria conferidas na placa; operação informada pela IJA.
    description:
      "A IJA Drones Brasil recebeu o 3º lugar na categoria Saúde do Prêmio Brasil, País Digital, da ABES, com sua operação de combate à dengue em São Paulo.",
    awardUrl: "https://abes.org.br/premiobrasilpaisdigital/",
    // Preencher com a notícia sobre a IJA quando ela for publicada pela ABES.
    officialPublication: null as {
      title: string;
      url: string;
      publishedAt?: string; // ISO 8601: AAAA-MM-DD.
      summary?: string;
    } | null,
    // Preencher apenas se um certificado em PDF for fornecido.
    certificateUrl: null as string | null,
    photos: [
      {
        src: "/images/abes-2026/placa-saude-tratada.png",
        alt: "Placa do Prêmio Brasil, país digital, concedida à IJA Drones Brasil pelo 3º lugar em Saúde, com a identificação da ABES.",
        title: "Um reconhecimento ao impacto real.",
        caption: "Placa recebida pela IJA Drones Brasil na categoria Saúde.",
        width: 1086,
        height: 1448,
      },
    ],
  },
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

export const contactEmailHref = `mailto:${site.email}?subject=${encodeURIComponent(site.contactEmail.subject)}&body=${encodeURIComponent(site.contactEmail.body)}`;

export type SolutionKey = keyof typeof site.solutions;
