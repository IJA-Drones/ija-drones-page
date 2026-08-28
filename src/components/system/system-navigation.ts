export type SystemNavigationItem = {
  label: string;
  icon: string;
  badge?: string;
};

export const uvisNavigation: readonly SystemNavigationItem[] = [
  { label: "Dashboard", icon: "▦" },
  { label: "Histórico OS", icon: "◷" },
  { label: "Notificações", icon: "◆", badge: "notifications" },
  { label: "Relatórios", icon: "▥" },
  { label: "Agenda", icon: "▣" },
  { label: "Usuário", icon: "◎" },
  { label: "Clientes", icon: "◉" },
  { label: "Pilotos", icon: "✈" },
  { label: "Equipamentos", icon: "⚙" },
  { label: "Veículos", icon: "▰", badge: "2" },
  { label: "Mapas", icon: "⌖", badge: "LIVE" },
];

export const agroNavigation: readonly SystemNavigationItem[] = [
  { label: "Talhões & Lavoura", icon: "◇" },
  { label: "Missões Agro", icon: "✦" },
  { label: "Relatórios Agro", icon: "▥" },
  { label: "Telemetria & Frota", icon: "▰" },
  { label: "Previsão do Tempo", icon: "◌" },
  { label: "Mapas de Aplicação", icon: "⌖", badge: "LIVE" },
];
