"use client";

import { useState, type ReactNode } from "react";

import { uvisNavigation } from "@/components/system/system-navigation";

type OaSystemShellProps = {
  activeScreen: string;
  notificationCount?: number;
  onNavigate: (screen: string) => void;
  children: ReactNode;
  overlay?: ReactNode;
};

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
    <div className={`os-history oa-system-shell ${sidebarCollapsed ? "is-sidebar-collapsed" : ""}`} data-system-theme="uvis">
      <header className="os-history__topbar mockup-topbar">
        <div className="mockup-topbar__identity">
          <button
            className="os-menu-button mockup-menu-button"
            type="button"
            aria-label={sidebarCollapsed ? "Expandir menu" : "Recolher menu"}
            onClick={() => setSidebarCollapsed((collapsed) => !collapsed)}
          >
            <span /><span /><span />
          </button>

          <div className="oa-wordmark mockup-brand" aria-label="IJA System UVIS">
            <span className="oa-wordmark__mark mockup-brand__mark">IJA</span>
            <strong>IJA System<small>UVIS</small></strong>
          </div>
        </div>

        <div className="browser-address mockup-address">
          <span aria-hidden="true">⌕</span> app.ijasystem.com.br/uvis/{activeScreen.toLocaleLowerCase("pt-BR").replaceAll(" ", "-")}
        </div>

        <div className="os-profile-wrap">
          <button
            className="os-profile-button mockup-profile"
            type="button"
            aria-label="Abrir menu do perfil"
            aria-expanded={profileOpen}
            onClick={() => setProfileOpen((open) => !open)}
          >
            <span aria-hidden="true">AD</span><b>ADMIN PREFEITURA</b><i aria-hidden="true">⌄</i>
          </button>
          {profileOpen ? (
            <div className="os-profile-menu">
              <strong>ADMIN</strong>
              <small>IJA System UVIS</small>
              <button type="button" onClick={() => onNavigate("Usuário")}>Meu perfil</button>
            </div>
          ) : null}
        </div>
      </header>

      <div className="os-history__layout mockup-shell">
        <aside className="os-history__sidebar mockup-sidebar">
          <nav className="mockup-nav" aria-label="Navegação do IJA System">
            {uvisNavigation.map((item) => {
              const badge = item.badge === "notifications" ? String(notificationCount) : item.badge;

              return (
                <button
                  key={item.label}
                  type="button"
                  className={`mockup-nav__item ${item.label === activeScreen ? "is-active" : ""}`}
                  aria-current={item.label === activeScreen ? "page" : undefined}
                  title={sidebarCollapsed ? item.label : undefined}
                  onClick={() => item.label !== activeScreen && onNavigate(item.label)}
                >
                  <span className="os-nav-icon mockup-nav__icon" aria-hidden="true">{item.icon}</span>
                  <span className="os-nav-label mockup-nav__label">{item.label}</span>
                  {badge ? <small className={badge === "LIVE" ? "is-live" : ""}>{badge}</small> : null}
                </button>
              );
            })}
          </nav>
          <div className="system-operator mockup-operator">
            <span>AD</span>
            <p><strong>Admin</strong><small>Administrador</small></p>
          </div>
        </aside>

        <main className="os-history__main">{children}</main>
      </div>

      {overlay}
    </div>
  );
}
