"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { AgendaScreen } from "@/components/system/agenda-screen";
import { AgroDashboardScreen } from "@/components/system/agro-dashboard-screen";
import { isAgroView } from "@/components/system/agro-dashboard-data";
import { ClientsScreen } from "@/components/system/clients-screen";
import { UsersScreen } from "@/components/system/users-screen";
import { PilotsScreen } from "@/components/system/pilots-screen";
import { EquipmentScreen } from "@/components/system/equipment-screen";
import { VehiclesScreen } from "@/components/system/vehicles-screen";
import { MapsScreen } from "@/components/system/maps-screen";
import { ManagementDashboardScreen } from "@/components/system/management-dashboard-screen";
import { NotificationsScreen } from "@/components/system/notifications-screen";
import { OsHistoryScreen } from "@/components/system/os-history-screen";
import { ReportsScreen } from "@/components/system/reports-screen";
import { SystemModuleScreen } from "@/components/system/system-module-screen";
import { agroNavigation, uvisNavigation } from "@/components/system/system-navigation";
import { SystemPageTitle } from "@/components/system/system-page-title";

const implementedUvisScreens = new Set([
  "Dashboard",
  "Histórico OS",
  "Notificações",
  "Relatórios",
  "Agenda",
  "Clientes",
  "Usuário",
  "Pilotos",
  "Equipamentos",
  "Veículos",
  "Mapas",
]);

export function SystemMockup() {
  // Estado do MODO: 'uvis' (Prefeitura/Urbano) ou 'agro' (Agrícola)
  const [mode, setMode] = useState<"uvis" | "agro">("uvis");
  const [colorMode, setColorMode] = useState<"light" | "dark">("light");
  const isAgro = mode === "agro";
  const isDark = colorMode === "dark";
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const accent = isAgro ? "#7f9f55" : "#0088e8";
  const accentStrong = isAgro ? "#607d3f" : "#0879b9";
  const accentLight = isAgro ? "#9aaf78" : "#38bdf8";

  // Navegação da Sidebar
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [notificationCount, setNotificationCount] = useState(36);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  const navItems = isAgro ? agroNavigation : uvisNavigation;
  const visibleNavItems = navItems.flatMap((item) => [
    { ...item, isSubitem: false },
    ...(item.children && expandedGroup === item.label ? item.children.map((child) => ({ ...child, isSubitem: true })) : []),
  ]);

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, left: 0 });
  }, [activeNav, mode]);

  const navigateTo = (screen: string) => {
    setActiveNav(screen);
    setMobileMenuOpen(false);
    setExpandedGroup(agroNavigation.find((item) => item.children?.some((child) => child.label === screen))?.label ?? null);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    mobileMenuButtonRef.current?.focus({ preventScroll: true });
  };

  return (
    <section 
      className="platform section" 
      id="plataforma" 
      style={{ 
        position: "relative", 
        padding: "5rem 0", 
        overflow: "hidden", 
        transition: "all 0.5s ease" 
      }}
    >
      {/* CONTAINER DE FUNDO COM TRANSITION INSTANTÂNEA E PRÉ-CARREGAMENTO */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden", background: "#051318" }}>
        
        {/* IMAGEM MODO PREFEITURA / UVIS (Sempre carregada na memória) */}
        <Image
            src="/images/cidade-fundo.jpg"
            alt="Fundo Gestão Prefeitura"
            fill
            priority
            sizes="100vw"
            style={{ 
            objectFit: "cover", 
            opacity: !isAgro ? 0.5 : 0, 
            filter: "contrast(115%) brightness(90%)",
            transform: "translateZ(0)",
            willChange: "opacity",
            transition: "opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1)" 
            }}
        />

        {/* IMAGEM MODO AGRO (Sempre carregada na memória) */}
        <Image
            src="/images/agro-fundo.jpg"
            alt="Fundo Agrícola"
            fill
            priority
            sizes="100vw"
            style={{ 
            objectFit: "cover", 
            opacity: isAgro ? 0.5 : 0, 
            filter: "contrast(115%) brightness(90%)",
            transform: "translateZ(0)",
            willChange: "opacity",
            transition: "opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1)" 
            }}
        />
        
        {/* CAMADA DE COR UNIFICADA DA MARCA */}
        <div 
            style={{ 
            position: "absolute", 
            inset: 0, 
            background: isAgro
              ? "linear-gradient(135deg, rgba(16, 35, 30, 0.72) 0%, rgba(25, 52, 43, 0.58) 100%)"
              : "linear-gradient(135deg, rgba(7, 38, 57, 0.72) 0%, rgba(8, 59, 91, 0.58) 100%)",
            mixBlendMode: "normal",
            transform: "translateZ(0)",
            willChange: "background",
            transition: "background 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
            }} 
        />

        {/* VINHETA DE CONTRASTE */}
        <div 
            style={{ 
            position: "absolute", 
            inset: 0, 
            background: "radial-gradient(circle at center, transparent 40%, rgba(4, 14, 20, 0.5) 100%)",
            pointerEvents: "none"
            }} 
        />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
        
        {/* CABEÇALHO DA SEÇÃO */}
        <div className="platform-heading" data-reveal style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <span 
            className="system-pill" 
            style={{ 
              borderColor: accent,
              color: accentLight,
              background: "rgba(255,255,255,0.08)"
            }}
          >
            <i aria-hidden="true" /> {isAgro ? "IJA System Agro" : "IJA System UVIS (Prefeituras)"}
          </span>
          <h2 style={{ color: "#ffffff", marginTop: "0.8rem" }}>
            {isAgro ? (
              <>Gestão Agrícola de Precisão<br /><span style={{ color: accentLight }}>cada hectare sob controle</span></>
            ) : (
              <>Poder e Controle Operacional<br /><span style={{ color: accentLight }}>gestão eficiente para prefeituras</span></>
            )}
          </h2>
          <p style={{ color: "rgba(255, 255, 255, 0.8)", maxWidth: "640px", marginInline: "auto" }}>
            {isAgro
              ? "Acompanhe seus talhões, relatórios de aplicação aérea, mapas de vegetação e a telemetria em tempo real das suas missões no campo."
              : "Interface desenvolvida para a rotina do setor público. Gerencie solicitações, agentes, rotas de fiscalização e relatórios operacionais."
            }
          </p>
        </div>

        {/* BOTÃO ALTERNADOR FORA DO MOCKUP */}
        <div data-reveal style={{ display: "flex", justifyContent: "center", marginBottom: "2.5rem" }}>
          <div role="group" aria-label="Selecionar segmento" style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            width: "min(100%, 380px)",
            background: "rgba(255, 255, 255, 0.12)",
            backdropFilter: "blur(12px)",
            padding: "5px",
            borderRadius: "40px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            gap: "4px"
          }}>
            <button
              type="button"
              aria-pressed={!isAgro}
              onClick={() => {
                setMode("uvis");
                navigateTo("Dashboard");
              }}
              style={{
                minWidth: 0,
                minHeight: "44px",
                padding: "9px 12px",
                borderRadius: "30px",
                border: "none",
                background: !isAgro ? accentStrong : "transparent",
                color: "#ffffff",
                fontWeight: "700",
                fontSize: "0.85rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "none"
              }}
            >
              Prefeitura (UVIS)
            </button>

            <button
              type="button"
              aria-pressed={isAgro}
              onClick={() => {
                setMode("agro");
                navigateTo("Dashboard");
              }}
              style={{
                minWidth: 0,
                minHeight: "44px",
                padding: "9px 12px",
                borderRadius: "30px",
                border: "none",
                background: isAgro ? accentStrong : "transparent",
                color: "#ffffff",
                fontWeight: "700",
                fontSize: "0.85rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "none"
              }}
            >
                Agro
            </button>
          </div>
        </div>

        {/* CENTRO DA TELA: MOCKUP INTERATIVO */}
        <div
          className="system-mockup"
          data-system-theme={isAgro ? "agro" : "uvis"}
          data-color-mode={colorMode}
          data-reveal
          aria-label="Demonstração do painel"
        >
          <div
            className="dashboard-glow"
            aria-hidden="true"
            style={{
              background: isAgro
                ? "radial-gradient(circle, rgba(127,159,85,0.22), transparent 60%)"
                : "radial-gradient(circle, rgba(0,136,232,0.2), transparent 60%)",
            }}
          />
          
          <div
            className={`system-window ${mobileMenuOpen ? "has-mobile-menu" : ""}`}
            data-system-theme={isAgro ? "agro" : "uvis"}
            data-color-mode={colorMode}
            onKeyDown={(event) => {
              if (event.key === "Escape" && mobileMenuOpen) {
                event.stopPropagation();
                closeMobileMenu();
              }
            }}
          >
            <header className="system-browserbar mockup-topbar">
              <div className="mockup-topbar__identity">
                <button
                  className="mockup-menu-button mockup-menu-button--desktop"
                  type="button"
                  aria-label={sidebarCollapsed ? "Expandir menu" : "Recolher menu"}
                  onClick={() => setSidebarCollapsed((collapsed) => !collapsed)}
                >
                  <span /><span /><span />
                </button>

                <button
                  ref={mobileMenuButtonRef}
                  className="mockup-menu-button mockup-menu-button--mobile"
                  type="button"
                  aria-label={mobileMenuOpen ? "Fechar menu do sistema" : "Abrir menu do sistema"}
                  aria-expanded={mobileMenuOpen}
                  aria-controls="mockup-mobile-navigation"
                  onClick={() => setMobileMenuOpen((open) => !open)}
                >
                  <span /><span /><span />
                </button>

                <div className={`mockup-brand ${isAgro ? "mockup-brand--agro" : "mockup-brand--ocean"}`} aria-label={isAgro ? "IJA System Agro" : "IJA System (Prefeituras)"}>
                  <span className="mockup-brand__mark">{isAgro ? "IJA" : "IJA"}</span>
                  <strong>{isAgro ? <>IJA System<small>AGRO</small></> : "IJA System (Prefeituras)"}</strong>
                </div>
              </div>

              <div className="mockup-topbar__actions">
                <button
                  className="mockup-theme-toggle"
                  type="button"
                  aria-label={isDark ? "Ativar tema claro no sistema" : "Ativar tema escuro no sistema"}
                  aria-pressed={isDark}
                  title={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
                  onClick={() => setColorMode((current) => current === "light" ? "dark" : "light")}
                >
                  <span className="mockup-theme-toggle__icon" aria-hidden="true">{isDark ? "☀" : "☾"}</span>
                  <span className="mockup-theme-toggle__label">{isDark ? "Tema claro" : "Tema escuro"}</span>
                </button>

                <button className="system-profile mockup-profile" type="button" aria-label={isAgro ? "Perfil do gestor Agro" : "Perfil da Prefeitura"}>
                  <span aria-hidden="true">●</span>
                  <i aria-hidden="true">⌄</i>
                </button>
              </div>
            </header>

            <div className="mockup-mobile-location">
              <span role="status">{activeNav}</span>
              <small>Demonstração</small>
            </div>

            <nav
              className="mockup-mobile-navigation"
              id="mockup-mobile-navigation"
              aria-label="Menu do sistema no celular"
              hidden={!mobileMenuOpen}
            >
              <p>Escolha uma área</p>
              {visibleNavItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className={item.isSubitem ? "is-subitem" : ""}
                  aria-current={activeNav === item.label ? "page" : undefined}
                  aria-expanded={item.children ? expandedGroup === item.label : undefined}
                  onClick={() => {
                    if (item.children) {
                      setExpandedGroup((current) => current === item.label ? null : item.label);
                      return;
                    }
                    navigateTo(item.label);
                    mobileMenuButtonRef.current?.focus({ preventScroll: true });
                  }}
                >
                  <i className="mockup-nav__icon" aria-hidden="true">{item.icon}</i>
                  <span>{item.label}</span>
                  {item.children ? <span className="mockup-nav__chevron" aria-hidden="true">{expandedGroup === item.label ? "⌃" : "⌄"}</span> : null}
                  {item.badge ? <small>{item.badge === "notifications" ? notificationCount : item.badge}</small> : null}
                </button>
              ))}
            </nav>

            <div className={`system-shell mockup-shell ${sidebarCollapsed ? "is-sidebar-collapsed" : ""}`}>
              {/* SIDEBAR */}
              <aside className="system-sidebar mockup-sidebar">
                <div>
                  <nav className="mockup-nav" aria-label="Menu do sistema">
                    {visibleNavItems.filter((item) => !sidebarCollapsed || !item.isSubitem).map((item) => (
                      <button
                        type="button"
                        key={item.label}
                        className={`mockup-nav__item ${activeNav === item.label ? "is-active" : ""} ${item.isSubitem ? "is-subitem" : ""} ${item.children ? "is-group" : ""} ${item.children?.some((child) => child.label === activeNav) ? "has-active-child" : ""}`}
                        aria-current={activeNav === item.label ? "page" : undefined}
                        aria-expanded={item.children ? !sidebarCollapsed && expandedGroup === item.label : undefined}
                        title={sidebarCollapsed ? item.label : undefined}
                        onClick={() => {
                          if (item.children) {
                            setSidebarCollapsed(false);
                            setExpandedGroup((current) => !sidebarCollapsed && current === item.label ? null : item.label);
                          } else navigateTo(item.label);
                        }}
                      >
                        <i className="mockup-nav__icon" aria-hidden="true">{item.icon}</i>
                        <span className="mockup-nav__label">{item.label}</span>
                        {item.children ? <span className="mockup-nav__chevron" aria-hidden="true">{expandedGroup === item.label ? "⌃" : "⌄"}</span> : null}
                        {item.badge && (
                          <small className={item.badge === "LIVE" ? "is-live" : ""}>
                            {item.badge === "notifications" ? notificationCount : item.badge}
                          </small>
                        )}
                      </button>
                    ))}
                  </nav>
                </div>
                <div className="system-operator mockup-operator">
                  <span>AD</span>
                  <p><strong>Admin</strong><small>{isAgro ? "Engenheiro Agrônomo" : "Administrador"}</small></p>
                </div>
              </aside>

              {/* CONTEÚDO PRINCIPAL DO MOCKUP */}
              <div className="system-content" ref={contentRef}>
                {!isAgro && activeNav === "Histórico OS" ? <OsHistoryScreen onNavigate={navigateTo} /> : null}
                {!isAgro && activeNav === "Notificações" ? (
                  <NotificationsScreen
                    notificationCount={notificationCount}
                    onNavigate={navigateTo}
                    onNotificationCountChange={setNotificationCount}
                  />
                ) : null}
                
                {!isAgro && activeNav === "Dashboard" ? <ManagementDashboardScreen /> : null}

                {!isAgro && activeNav === "Relatórios" ? <ReportsScreen /> : null}

                {!isAgro && activeNav === "Agenda" ? <AgendaScreen /> : null}

                {!isAgro && activeNav === "Clientes" ? <ClientsScreen onNavigate={navigateTo} /> : null}

                {!isAgro && activeNav === "Usuário" ? <UsersScreen onNavigate={navigateTo} /> : null}

                {!isAgro && activeNav === "Pilotos" ? <PilotsScreen onNavigate={navigateTo} /> : null}

                {!isAgro && activeNav === "Equipamentos" ? <EquipmentScreen /> : null}

                {!isAgro && activeNav === "Veículos" ? <VehiclesScreen onNavigate={navigateTo} /> : null}

                {!isAgro && activeNav === "Mapas" ? <MapsScreen /> : null}

                {isAgro && (activeNav === "Dashboard" || isAgroView(activeNav)) ? <AgroDashboardScreen screen={activeNav} onNavigate={navigateTo} /> : null}

                {/* MODO AGRO - TALHÕES E LAVOURA */}
                {isAgro && activeNav === "Talhões & Lavoura" && (
                  <div>
                    <header className="system-content__header system-page-header">
                      <SystemPageTitle icon="◇" id="agro-fields-title" eyebrow="Agricultura de Precisão" title={activeNav} />
                      <div className="system-actions">
                        <button type="button">▤ Exportar NDVI</button>
                        <button className="is-primary" type="button">＋ Novo Voo Agro</button>
                      </div>
                    </header>

                    <div className="system-section-title"><span aria-hidden="true">🌱</span> Status da Lavoura / Safra 2026</div>

                    <div className="agro-overview-grid" style={{ display: "grid", gridTemplateColumns: "var(--agro-columns, 1.2fr 1fr)", gap: "1rem", marginTop: "1rem" }}>
                      <div style={{ background: "#fff", padding: "1rem", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <strong style={{ fontSize: "0.9rem", color: "#1e293b" }}>Talhão 04 — Milho</strong>
                          <span style={{ background: "#10b98122", color: "#10b981", padding: "2px 8px", borderRadius: "10px", fontSize: "0.65rem", fontWeight: "bold" }}>Voo Concluído</span>
                        </div>
                        <small style={{ color: "#64748b", display: "block", marginTop: "0.2rem" }}>Área Total: 142 Hectares | Vazão: 10 L/ha</small>

                        <div style={{ marginTop: "1rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                          <div style={{ background: "#f8fafc", padding: "0.5rem", borderRadius: "6px" }}>
                            <span style={{ fontSize: "0.6rem", color: "#64748b" }}>Área Aplicada</span>
                            <strong style={{ display: "block", fontSize: "1rem", color: "#0f172a" }}>100% (142 ha)</strong>
                          </div>
                          <div style={{ background: "#f8fafc", padding: "0.5rem", borderRadius: "6px" }}>
                            <span style={{ fontSize: "0.6rem", color: "#64748b" }}>Produto Utilizado</span>
                            <strong style={{ display: "block", fontSize: "0.85rem", color: "#0f172a" }}>Fungicida Sítio</strong>
                          </div>
                        </div>
                      </div>

                      <div style={{ background: "#fff", padding: "1rem", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                        <strong style={{ fontSize: "0.85rem", color: "#1e293b" }}>Resumo da Frota Agrícola</strong>
                        <div style={{ marginTop: "0.6rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", borderBottom: "1px solid #f1f5f9", paddingBottom: "4px" }}>
                            <span>🛸 Drone Agrícola T40</span>
                            <strong style={{ color: "#10b981" }}>Em Aplicação</strong>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", borderBottom: "1px solid #f1f5f9", paddingBottom: "4px" }}>
                            <span>🛸 Drone Mapeamento RTK</span>
                            <strong style={{ color: accentStrong }}>Standby</strong>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
                            <span>🚜 Gerador & Base Móvel</span>
                            <strong style={{ color: "#10b981" }}>Operacional</strong>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="system-stats" style={{ marginTop: "1rem" }}>
                      <div><span>Hectares Pulverizados</span><strong>1.480 ha</strong><i>Este mês</i></div>
                      <div><span>Economia de Água</span><strong>90%</strong><i>Vs. Trator</i></div>
                      <div><span>Amassamento da Lavoura</span><strong>0%</strong><i>Aplicação Aérea</i></div>
                    </div>
                  </div>
                )}

                {!isAgro && !implementedUvisScreens.has(activeNav) ? (
                  <SystemModuleScreen key={`uvis-${activeNav}`} mode="uvis" screen={activeNav} />
                ) : null}

                {isAgro && activeNav !== "Talhões & Lavoura" && activeNav !== "Dashboard" && !isAgroView(activeNav) ? (
                  <SystemModuleScreen key={`agro-${activeNav}`} mode="agro" screen={activeNav} />
                ) : null}
              </div>
            </div>
          </div>

          <div className="system-online" style={{ color: accentStrong }}>
            <i style={{ background: accent }} />
            Sistema online <strong>Operação {isAgro ? "Agrícola" : "UVIS"} sincronizada</strong>
          </div>
        </div>

        <div className="platform-cta" data-cta-theme={isAgro ? "agro" : "uvis"} data-reveal>
          <div className="platform-cta__copy">
            <span className="platform-cta__eyebrow"><i aria-hidden="true" /> Ecossistema de gestão operacional</span>
            <p>
              <strong>Gestão simples.<br />Decisão rápida.</strong>
              <span>Uma plataforma que conecta equipes, equipamentos e cada etapa da missão em uma única visão.</span>
            </p>
          </div>

          <div className="platform-cta__highlights" aria-label="Benefícios da plataforma">
            <span><i aria-hidden="true">01</i> Operação centralizada</span>
            <span><i aria-hidden="true">02</i> Dados em tempo real</span>
          </div>

          <div className="platform-cta__action">
            <small>Demonstração personalizada para sua operação</small>
            <a className="button platform-cta__button" href="#contato">
              Solicitar demonstração <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
