"use client";

import { useState } from "react";
import Image from "next/image";

import { OsHistoryScreen } from "@/components/system/os-history-screen";

export function SystemMockup() {
  // Estado do MODO: 'uvis' (Prefeitura/Urbano) ou 'agro' (Agrícola)
  const [mode, setMode] = useState<"uvis" | "agro">("uvis");
  const isAgro = mode === "agro";

  // Navegação da Sidebar
  const [activeNav, setActiveNav] = useState("Dashboard");

  // Estados interativos do Dashboard
  const [status, setStatus] = useState("Aprovado");
  const [piloto, setPiloto] = useState("Piloto 1 (LESTE)");
  const [titulo, setTitulo] = useState("UVIS Teste QA");
  const [tipo, setTipo] = useState("Culex");
  const [foco, setFoco] = useState("Imóvel Abandonado");
  const [saved, setSaved] = useState(false);

  // Estados dos Relatórios e Agenda
  const [agendaView, setAgendaView] = useState<"Mês" | "Lista">("Mês");

  // Menus da Sidebar conforme o Modo
  const uvisNav = [
    { label: "Dashboard", icon: "▦" },
    { label: "Histórico OS", icon: "🕒" },
    { label: "Notificações", icon: "🔔", badge: "34" },
    { label: "Relatórios", icon: "📊" },
    { label: "Agenda", icon: "📅" },
    { label: "Usuário", icon: "👤" },
    { label: "Clientes", icon: "👥" },
    { label: "Pilotos", icon: "✈️" },
    { label: "Equipamentos", icon: "⚙️" },
    { label: "Veículos", icon: "🚚", badge: "2" },
    { label: "Alertas Limpeza", icon: "💧", badge: "2" },
    { label: "Mapas", icon: "📍", badge: "LIVE" },
  ];

  const agroNav = [
    { label: "Talhões & Lavoura", icon: "🌱" },
    { label: "Missões Agro", icon: "🛸" },
    { label: "Relatórios Agro", icon: "📊" },
    { label: "Telemetria & Frota", icon: "🚜" },
    { label: "Previsão do Tempo", icon: "🌤️" },
    { label: "Mapas de Aplicação", icon: "📍", badge: "LIVE" },
  ];

  const navItems = isAgro ? agroNav : uvisNav;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
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
        
        {/* CAMADA DE COR INSTANTÂNEA (AZUL INSTITUCIONAL x VERDE AGRO) */}
        <div 
            style={{ 
            position: "absolute", 
            inset: 0, 
            background: isAgro 
                ? "linear-gradient(135deg, rgba(16, 50, 22, 0.55) 0%, rgba(25, 70, 30, 0.45) 100%)" 
                : "linear-gradient(135deg, rgba(0, 60, 110, 0.55) 0%, rgba(7, 29, 34, 0.50) 100%)",
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
              borderColor: isAgro ? "#8bc53f" : "#0088e8", 
              color: isAgro ? "#a3e635" : "#38bdf8",
              background: "rgba(255,255,255,0.08)"
            }}
          >
            <i aria-hidden="true" /> {isAgro ? "IJA System Agro" : "IJA System UVIS (Prefeituras)"}
          </span>
          <h2 style={{ color: "#ffffff", marginTop: "0.8rem" }}>
            {isAgro ? (
              <>Gestão Agrícola de Precisão<br /><span style={{ color: "#a3e635" }}>cada hectare sob controle</span></>
            ) : (
              <>Poder e Controle Operacional<br /><span style={{ color: "#38bdf8" }}>gestão eficiente para prefeituras</span></>
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
          <div style={{
            display: "inline-flex",
            background: "rgba(255, 255, 255, 0.12)",
            backdropFilter: "blur(12px)",
            padding: "5px",
            borderRadius: "40px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            gap: "4px"
          }}>
            <button
              type="button"
              onClick={() => {
                setMode("uvis");
                setActiveNav("Dashboard");
              }}
              style={{
                padding: "9px 24px",
                borderRadius: "30px",
                border: "none",
                background: !isAgro ? "#0088e8" : "transparent",
                color: "#ffffff",
                fontWeight: "700",
                fontSize: "0.85rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: !isAgro ? "0 4px 14px rgba(0, 136, 232, 0.4)" : "none"
              }}
            >
              Prefeitura (UVIS)
            </button>

            <button
              type="button"
              onClick={() => {
                setMode("agro");
                setActiveNav("Talhões & Lavoura");
              }}
              style={{
                padding: "9px 24px",
                borderRadius: "30px",
                border: "none",
                background: isAgro ? "#8bc53f" : "transparent",
                color: "#ffffff",
                fontWeight: "700",
                fontSize: "0.85rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: isAgro ? "0 4px 14px rgba(139, 197, 63, 0.4)" : "none"
              }}
            >
                Agro
            </button>
          </div>
        </div>

        {/* CENTRO DA TELA: MOCKUP INTERATIVO */}
        <div className="system-mockup" data-reveal aria-label="Demonstração do painel">
          <div className="dashboard-glow" aria-hidden="true" style={{ background: isAgro ? "radial-gradient(circle, rgba(139,197,63,0.3), transparent 60%)" : "radial-gradient(circle, rgba(0,136,232,0.3), transparent 60%)" }} />
          
          <div className="system-window" style={{ background: "#f8fafc", color: "#0f172a" }}>
            {!isAgro && activeNav === "Histórico OS" ? (
              <OsHistoryScreen onNavigate={setActiveNav} />
            ) : (
              <>
                {/* BROWSERBAR */}
                <div className="system-browserbar">
              <div className="browser-dots" aria-hidden="true"><i /><i /><i /></div>
              <div className="browser-address">
                <span aria-hidden="true">⌕</span> app.ijasystem.com.br/{isAgro ? "agro" : "uvis"}/{activeNav.toLowerCase()}
              </div>
              <div className="system-profile">
                <span aria-hidden="true">●</span>
                <b>{isAgro ? "GESTOR AGRO" : "ADMIN PREFEITURA"}</b>
                <i aria-hidden="true">⌄</i>
              </div>
                </div>

                <div className="system-shell">
              {/* SIDEBAR */}
              <aside className="system-sidebar">
                <div>
                  <div className="system-logo">
                    <span className="system-logo__mark" aria-hidden="true" style={{ color: isAgro ? "#8bc53f" : "#0088e8" }}>✦</span>
                    <strong>IJA System <small style={{ color: isAgro ? "#8bc53f" : "#0088e8" }}>{isAgro ? "AGRO" : "UVIS"}</small></strong>
                  </div>
                  <nav aria-label="Menu do sistema">
                    {navItems.map((item) => (
                      <span
                        key={item.label}
                        className={activeNav === item.label ? "is-active" : ""}
                        onClick={() => setActiveNav(item.label)}
                        style={{ cursor: "pointer" }}
                      >
                        <i aria-hidden="true">{item.icon}</i> {item.label}
                        {item.badge && (
                          <small style={{ marginLeft: "auto", background: item.badge === "LIVE" ? "#ef4444" : (isAgro ? "#8bc53f" : "#0088e8"), color: "#fff" }}>
                            {item.badge}
                          </small>
                        )}
                      </span>
                    ))}
                  </nav>
                </div>
                <div className="system-operator">
                  <span>PH</span>
                  <p><strong>Pedro H.</strong><small>{isAgro ? "Engenheiro Agrônomo" : "Administrador"}</small></p>
                </div>
              </aside>

              {/* CONTEÚDO PRINCIPAL DO MOCKUP */}
              <div className="system-content">
                
                {/* MODO PREFEITURA (UVIS) - DASHBOARD */}
                {!isAgro && activeNav === "Dashboard" && (
                  <>
                    <header className="system-content__header">
                      <div><small>Visão Geral Prefeitura</small><h3>Painel de Ocorrências UVIS</h3></div>
                      <div className="system-actions"><span>Filtros</span><b>Exportar OS</b></div>
                    </header>

                    <div className="system-section-title"><span aria-hidden="true">◇</span> Detalhes da Solicitação Urbana</div>

                    <article className="occurrence-card">
                      <div className="occurrence-summary">
                        <input 
                          type="text" 
                          value={titulo} 
                          onChange={(e) => setTitulo(e.target.value)}
                          style={{ background: "transparent", border: "none", fontWeight: "bold", fontSize: "1rem", color: "inherit", width: "100%" }}
                        />
                        <div className="occurrence-tags">
                          <span style={{ background: status === "Aprovado" ? "#10b98122" : "#f59e0b22", color: status === "Aprovado" ? "#10b981" : "#f59e0b" }}>
                            {status}
                          </span>
                          <span>Setor Sul</span>
                        </div>
                        <dl>
                          <div><dt aria-hidden="true">◷</dt><dd>08/01/2026 às 13:00</dd></div>
                          <div><dt aria-hidden="true">⌖</dt><dd>Av. Paulista, 09 — Bela Vista<small>CEP: 01310-930</small></dd></div>
                        </dl>
                      </div>

                      <div className="occurrence-location">
                        <div className="coordinate">-23.55819, -46.65984 <span aria-hidden="true">⌖</span></div>
                        <dl>
                          <dt>Tipo:</dt>
                          <dd>
                            <select value={tipo} onChange={(e) => setTipo(e.target.value)} style={{ background: "transparent", border: "none", color: "inherit" }}>
                              <option value="Culex">Culex</option>
                              <option value="Aedes aegypti">Aedes aegypti</option>
                            </select>
                          </dd>
                          <dt>Foco:</dt>
                          <dd>
                            <select value={foco} onChange={(e) => setFoco(e.target.value)} style={{ background: "transparent", border: "none", color: "inherit" }}>
                              <option value="Imóvel Abandonado">Imóvel Abandonado</option>
                              <option value="Terreno Baldio">Terreno Baldio</option>
                            </select>
                          </dd>
                        </dl>
                      </div>

                      <div className="occurrence-status">
                        <label>Status</label>
                        <select 
                          value={status} 
                          onChange={(e) => setStatus(e.target.value)}
                          style={{ width: "100%", padding: "4px", borderRadius: "4px", background: "rgba(255,255,255,0.1)", color: "inherit" }}
                        >
                          <option value="Aprovado">Aprovar</option>
                          <option value="Pendente">Pendente</option>
                          <option value="Em análise">Em análise</option>
                        </select>

                        <label style={{ marginTop: "6px" }}>Piloto responsável</label>
                        <select 
                          value={piloto} 
                          onChange={(e) => setPiloto(e.target.value)}
                          style={{ width: "100%", padding: "4px", borderRadius: "4px", background: "rgba(255,255,255,0.1)", color: "inherit" }}
                        >
                          <option value="Piloto 1 (LESTE)">Piloto 1 (LESTE)</option>
                          <option value="Piloto 2 (SUL)">Piloto 2 (SUL)</option>
                        </select>

                        <button 
                          type="button" 
                          onClick={handleSave}
                          style={{ marginTop: "8px", padding: "6px", borderRadius: "4px", background: saved ? "#10b981" : "#0088e8", color: "#fff", border: "none", cursor: "pointer" }}
                        >
                          {saved ? "Salvo!" : "Salvar"}
                        </button>
                      </div>
                    </article>

                    <div className="system-stats">
                      <div><span>Ocorrências hoje</span><strong>18</strong><i>+4 desde ontem</i></div>
                      <div><span>Em análise</span><strong>07</strong><i>Equipe conectada</i></div>
                      <div><span>Operações aprovadas</span><strong>42</strong><i>Este mês</i></div>
                    </div>
                  </>
                )}

                {/* MODO PREFEITURA (UVIS) - RELATÓRIOS E AGENDA */}
                {!isAgro && activeNav === "Relatórios" && (
                  <div>
                    <header className="system-content__header">
                      <div><small>Relatórios de Gestão Pública</small><h3>Solicitações filtradas: 1332</h3></div>
                      <div className="system-actions"><span>Relatório OS</span><b>Exportar PDF</b></div>
                    </header>
                    <div className="system-section-title">Dados de Agosto / 2026</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: "0.5rem" }}>
                      {[
                        { label: "TOTAL", val: "1332", color: "#0088e8" },
                        { label: "PENDENTES", val: "13", color: "#64748b" },
                        { label: "APROVADAS", val: "207", color: "#10b981" },
                        { label: "CONCLUÍDAS", val: "827", color: "#a855f7" },
                        { label: "RECUSADAS", val: "256", color: "#ef4444" },
                      ].map((card) => (
                        <div key={card.label} style={{ background: "rgba(0,0,0,0.03)", padding: "0.6rem", borderRadius: "6px", borderLeft: `3px solid ${card.color}` }}>
                          <span style={{ fontSize: "0.6rem", opacity: 0.8 }}>{card.label}</span>
                          <div style={{ fontSize: "1.2rem", fontWeight: "bold", color: card.color }}>{card.val}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!isAgro && activeNav === "Agenda" && (
                  <div>
                    <header className="system-content__header">
                      <div><small>Agendamentos de Aplicação</small><h3>agosto de 2026</h3></div>
                      <div className="system-actions">
                        <span onClick={() => setAgendaView(agendaView === "Mês" ? "Lista" : "Mês")} style={{ cursor: "pointer" }}>Visão: {agendaView}</span>
                        <b>Rota do Dia</b>
                      </div>
                    </header>

                    <div style={{ background: "#fff", borderRadius: "8px", padding: "0.8rem", border: "1px solid #e2e8f0" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", textTransform: "uppercase", fontSize: "0.6rem", fontWeight: "bold", opacity: 0.6, marginBottom: "0.5rem", textAlign: "center" }}>
                        <span>DOM</span><span>SEG</span><span>TER</span><span>QUA</span><span>QUI</span><span>SEX</span><span>SÁB</span>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px" }}>
                        {[2, 3, 4, 5, 6, 7, 8].map((day) => (
                          <div key={day} style={{ background: "#f8fafc", minHeight: "65px", padding: "4px", borderRadius: "4px", border: "1px solid #f1f5f9" }}>
                            <span style={{ fontSize: "0.65rem", fontWeight: "bold" }}>{day}</span>
                            {day === 3 && <div style={{ background: "#3b82f6", color: "#fff", fontSize: "0.45rem", padding: "2px", borderRadius: "2px", marginTop: "2px" }}>Av. Angelina</div>}
                            {day === 4 && <div style={{ background: "#93c5fd", color: "#000", fontSize: "0.45rem", padding: "2px", borderRadius: "2px", marginTop: "2px" }}>Rua Cachoeira</div>}
                            {day === 5 && <div style={{ background: "#f97316", color: "#fff", fontSize: "0.45rem", padding: "2px", borderRadius: "2px", marginTop: "2px" }}>Rua Hipólito</div>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* MODO AGRO - TALHÕES E LAVOURA */}
                {isAgro && (
                  <div>
                    <header className="system-content__header">
                      <div><small>Agricultura de Precisão</small><h3>Monitoramento por Talhão</h3></div>
                      <div className="system-actions">
                        <span style={{ background: "rgba(139,197,63,0.15)", color: "#5d8f20", border: "1px solid #8bc53f" }}>Exportar NDVI</span>
                        <b style={{ background: "#8bc53f", color: "#fff" }}>Novo Voo Agro</b>
                      </div>
                    </header>

                    <div className="system-section-title"><span aria-hidden="true">🌱</span> Status da Lavoura / Safra 2026</div>

                    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "1rem", marginTop: "1rem" }}>
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
                            <strong style={{ color: "#0088e8" }}>Standby</strong>
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

                  </div>
                </div>
              </>
            )}
          </div>

          {isAgro || activeNav !== "Histórico OS" ? (
            <div className="system-online">
              <i style={{ background: isAgro ? "#8bc53f" : "#0088e8" }} />
              Sistema online <strong>Operação {isAgro ? "Agrícola" : "UVIS"} sincronizada</strong>
            </div>
          ) : null}
        </div>

        <div className="platform-cta" data-reveal style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <p style={{ color: "#ffffff" }}>
            <strong>Gestão simples, decisão rápida.</strong> Conheça a plataforma que conecta sua equipe, seus equipamentos e cada missão.
          </p>
          <a className="button button--ink" href="#contato" style={{ background: isAgro ? "#8bc53f" : "#0088e8", color: "#fff" }}>
            Solicitar demonstração <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
