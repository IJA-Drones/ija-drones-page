"use client";

import { useState, type ReactNode } from "react";

type OaSystemShellProps = {
  activeScreen: string;
  notificationCount?: number;
  onNavigate: (screen: string) => void;
  children: ReactNode;
  overlay?: ReactNode;
};

type NavigationItem = {
  label: string;
  icon: string;
  badge?: string;
  expandable?: boolean;
};

const navigation: readonly NavigationItem[] = [
  { label: "Dashboard", icon: "▦" },
  { label: "Histórico OS", icon: "◷" },
  { label: "Notificações", icon: "♟", badge: "notifications" },
  { label: "Relatórios", icon: "▥" },
  { label: "Agenda", icon: "▣" },
  { label: "Usuário", icon: "♟", expandable: true },
  { label: "Clientes", icon: "♟" },
  { label: "Pilotos", icon: "▣", expandable: true },
  { label: "Equipamentos", icon: "⚙" },
  { label: "Veículos", icon: "▰", badge: "2" },
  { label: "Alertas Limpeza", icon: "♢", badge: "2" },
  { label: "Equipe OA", icon: "♟", expandable: true },
  { label: "Equipe UVIS", icon: "▣", expandable: true },
  { label: "Mapas", icon: "⌖", badge: "LIVE" },
  { label: "Geolocalização", icon: "⌕" },
];

export function OaSystemShell({
  activeScreen,
  notificationCount = 34,
  onNavigate,
  children,
  overlay,
}: OaSystemShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className={`os-history oa-system-shell ${sidebarCollapsed ? "is-sidebar-collapsed" : ""}`}>
      <header className="os-history__topbar">
        <button
          className="os-menu-button"
          type="button"
          aria-label={sidebarCollapsed ? "Expandir menu" : "Recolher menu"}
          onClick={() => setSidebarCollapsed((collapsed) => !collapsed)}
        >
          <span /><span /><span />
        </button>

        <div className="oa-wordmark" aria-label="Oceano Azul">
          <span className="oa-wordmark__mark">OA</span>
          <strong>OceanoAzul</strong>
        </div>

        <div className="os-profile-wrap">
          <button
            className="os-profile-button"
            type="button"
            aria-label="Abrir menu do perfil"
            aria-expanded={profileOpen}
            onClick={() => setProfileOpen((open) => !open)}
          >
            <span aria-hidden="true">●</span><i aria-hidden="true">⌄</i>
          </button>
          {profileOpen ? (
            <div className="os-profile-menu">
              <strong>ADMIN</strong>
              <small>Oceano Azul</small>
              <button type="button" onClick={() => onNavigate("Usuário")}>Meu perfil</button>
            </div>
          ) : null}
        </div>
      </header>

      <div className="os-history__layout">
        <aside className="os-history__sidebar">
          <nav aria-label="Navegação do IJA System">
            {navigation.map((item) => {
              const badge = item.badge === "notifications" ? String(notificationCount) : item.badge;

              return (
                <button
                  key={item.label}
                  type="button"
                  className={item.label === activeScreen ? "is-active" : ""}
                  aria-current={item.label === activeScreen ? "page" : undefined}
                  title={sidebarCollapsed ? item.label : undefined}
                  onClick={() => item.label !== activeScreen && onNavigate(item.label)}
                >
                  <span className="os-nav-icon" aria-hidden="true">{item.icon}</span>
                  <span className="os-nav-label">{item.label}</span>
                  {item.expandable ? <i className="os-nav-chevron" aria-hidden="true">⌄</i> : null}
                  {badge ? <small className={badge === "LIVE" ? "is-live" : ""}>{badge}</small> : null}
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="os-history__main">{children}</main>
      </div>

      {overlay}
    </div>
  );
}
