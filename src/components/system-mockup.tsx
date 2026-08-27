"use client";

import { useState } from "react";

export function SystemMockup() {
  const [activeNav, setActiveNav] = useState("Dashboard");

  // Estados interativos do Dashboard
  const [status, setStatus] = useState("Aprovado");
  const [piloto, setPiloto] = useState("Piloto 1 (LESTE)");
  const [titulo, setTitulo] = useState("UVIS Teste QA");
  const [tipo, setTipo] = useState("Culex");
  const [foco, setFoco] = useState("Imóvel Abandonado");
  const [saved, setSaved] = useState(false);

  // Estados dos Relatórios e Agenda
  const [filterOpen, setFilterOpen] = useState(false);
  const [agendaView, setAgendaView] = useState<"Mês" | "Lista">("Mês");

  const navItems = [
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

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <section className="platform section" id="plataforma" style={{ padding: "4rem 0", background: "#f8faf7" }}>
      <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1rem" }}>
        
        {/* TÍTULO DA SEÇÃO */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span style={{ 
            display: "inline-flex", 
            alignItems: "center", 
            gap: "0.5rem", 
            padding: "0.4rem 1rem", 
            borderRadius: "20px", 
            background: "rgba(0, 136, 232, 0.1)", 
            color: "#0088e8", 
            fontSize: "0.8rem", 
            fontWeight: "700" 
          }}>
            ✦ Interface intuitiva
          </span>
          <h2 style={{ fontSize: "2.5rem", fontWeight: "800", color: "#0f172a", marginTop: "0.8rem", lineHeight: "1.2" }}>
            Poder e controle <br />
            <span style={{ color: "#0088e8" }}>na palma da mão</span>
          </h2>
          <p style={{ color: "#64748b", marginTop: "0.8rem", fontSize: "1rem", maxWidth: "600px", marginInline: "auto" }}>
            Nossa interface foi desenhada para facilitar a vida do gestor. Acompanhe cada detalhe da operação em tempo real com clareza.
          </p>
        </div>

        {/* CONTAINER DA JANELA DO MOCKUP */}
        <div style={{ 
          background: "#ffffff", 
          borderRadius: "16px", 
          border: "1px solid #cbd5e1", 
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)", 
          overflow: "hidden" 
        }}>
          
          {/* BARRA SUPERIOR DO NAVEGADOR */}
          <div style={{ 
            background: "#0f172a", 
            padding: "0.75rem 1.25rem", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "space-between",
            borderBottom: "1px solid #1e293b"
          }}>
            <div style={{ display: "flex", gap: "6px" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ef4444" }} />
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#f59e0b" }} />
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#10b981" }} />
            </div>

            <div style={{ 
              background: "#1e293b", 
              color: "#94a3b8", 
              padding: "0.3rem 1.5rem", 
              borderRadius: "6px", 
              fontSize: "0.75rem", 
              fontFamily: "monospace" 
            }}>
              ⌕ app.ijasystem.com.br/{activeNav.toLowerCase()}
            </div>

            <div style={{ color: "#ffffff", fontSize: "0.75rem", fontWeight: "bold" }}>
              ● ADMIN ⌄
            </div>
          </div>

          {/* ESTRUTURA DO SISTEMA: SIDEBAR + CONTEÚDO */}
          <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", minHeight: "600px" }}>
            
            {/* SIDEBAR */}
            <aside style={{ 
              background: "#ffffff", 
              borderRight: "1px solid #e2e8f0", 
              display: "flex", 
              flexDirection: "column", 
              justifyContent: "space-between",
              padding: "1rem 0"
            }}>
              <div>
                <div style={{ padding: "0 1.25rem 1rem", borderBottom: "1px solid #f1f5f9" }}>
                  <strong style={{ fontSize: "1rem", color: "#0f172a" }}>IJA System <small style={{ color: "#0088e8" }}>OA</small></strong>
                </div>

                <nav style={{ display: "flex", flexDirection: "column", gap: "2px", padding: "0.5rem 0.5rem" }}>
                  {navItems.map((item) => {
                    const isActive = activeNav === item.label;
                    return (
                      <div
                        key={item.label}
                        onClick={() => setActiveNav(item.label)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "0.5rem 0.75rem",
                          borderRadius: "8px",
                          cursor: "pointer",
                          background: isActive ? "rgba(0, 136, 232, 0.1)" : "transparent",
                          color: isActive ? "#0088e8" : "#475569",
                          fontWeight: isActive ? "700" : "500",
                          fontSize: "0.82rem",
                          transition: "all 0.15s"
                        }}
                      >
                        <span style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                          <span style={{ fontSize: "0.9rem" }}>{item.icon}</span>
                          {item.label}
                        </span>
                        {item.badge && (
                          <span style={{
                            background: item.badge === "LIVE" ? "#ef4444" : "#0088e8",
                            color: "#ffffff",
                            padding: "1px 6px",
                            borderRadius: "10px",
                            fontSize: "0.6rem",
                            fontWeight: "bold"
                          }}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </nav>
              </div>

              {/* OPERADOR */}
              <div style={{ 
                padding: "0.75rem 1.25rem", 
                borderTop: "1px solid #f1f5f9", 
                display: "flex", 
                alignItems: "center", 
                gap: "0.75rem" 
              }}>
                <div style={{ 
                  width: "32px", 
                  height: "32px", 
                  borderRadius: "50%", 
                  background: "#0088e8", 
                  color: "#fff", 
                  display: "grid", 
                  placeItems: "center", 
                  fontWeight: "800", 
                  fontSize: "0.75rem" 
                }}>
                  PH
                </div>
                <div>
                  <strong style={{ display: "block", fontSize: "0.8rem", color: "#0f172a" }}>Pedro H.</strong>
                  <small style={{ color: "#94a3b8", fontSize: "0.7rem" }}>Administrador</small>
                </div>
              </div>
            </aside>

            {/* CONTEÚDO PRINCIPAL (ALTERNA COM OS CLIQUES DO MENU) */}
            <main style={{ background: "#f8fafc", padding: "1.5rem", overflowY: "auto", maxHeight: "600px" }}>
              
              {/* TELA 1: DASHBOARD / DETALHES DA OCORRÊNCIA */}
              {activeNav === "Dashboard" && (
                <div>
                  <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <div>
                      <small style={{ color: "#64748b" }}>Visão geral</small>
                      <h3 style={{ margin: 0, fontSize: "1.3rem", fontWeight: "800", color: "#0f172a" }}>Painel de Gestão</h3>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button style={{ padding: "0.4rem 0.8rem", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#fff", fontSize: "0.75rem", cursor: "pointer" }}>Filtros</button>
                      <button style={{ padding: "0.4rem 0.8rem", borderRadius: "6px", border: "none", background: "#0088e8", color: "#fff", fontWeight: "bold", fontSize: "0.75rem", cursor: "pointer" }}>Exportar</button>
                    </div>
                  </header>

                  <div style={{ background: "#fff", borderRadius: "10px", border: "1px solid #e2e8f0", padding: "1.25rem", marginBottom: "1rem" }}>
                    <h4 style={{ margin: 0, fontSize: "1.1rem", color: "#0f172a" }}>◇ Detalhes da Ocorrência</h4>
                    
                    <div style={{ marginTop: "1rem", display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: "1rem" }}>
                      {/* Resumo */}
                      <div style={{ borderRight: "1px solid #f1f5f9", paddingRight: "1rem" }}>
                        <input 
                          type="text" 
                          value={titulo} 
                          onChange={(e) => setTitulo(e.target.value)} 
                          style={{ width: "100%", padding: "0.4rem", fontWeight: "bold", fontSize: "1rem", border: "1px solid #cbd5e1", borderRadius: "6px" }} 
                        />
                        <div style={{ display: "flex", gap: "0.4rem", marginTop: "0.5rem" }}>
                          <span style={{ background: status === "Aprovado" ? "#10b98122" : "#f59e0b22", color: status === "Aprovado" ? "#10b981" : "#f59e0b", padding: "2px 8px", borderRadius: "12px", fontSize: "0.7rem", fontWeight: "bold" }}>{status}</span>
                          <span style={{ background: "#f1f5f9", color: "#475569", padding: "2px 8px", borderRadius: "12px", fontSize: "0.7rem", fontWeight: "bold" }}>Sul</span>
                        </div>
                        <p style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "0.8rem" }}>◷ 08/01/2026 às 13:00<br />⌖ Av. Paulista, 09 — Bela Vista</p>
                      </div>

                      {/* Localização e Tipos */}
                      <div style={{ borderRight: "1px solid #f1f5f9", paddingRight: "1rem" }}>
                        <div style={{ fontSize: "0.75rem", fontWeight: "bold", color: "#0088e8", marginBottom: "0.5rem" }}>-23.55819, -46.65984 ⌖</div>
                        <label style={{ fontSize: "0.7rem", color: "#64748b", display: "block" }}>Tipo de Praga:</label>
                        <select value={tipo} onChange={(e) => setTipo(e.target.value)} style={{ width: "100%", padding: "0.3rem", borderRadius: "4px", border: "1px solid #cbd5e1", marginBottom: "0.5rem", fontSize: "0.75rem" }}>
                          <option value="Culex">Culex</option>
                          <option value="Aedes aegypti">Aedes aegypti</option>
                        </select>

                        <label style={{ fontSize: "0.7rem", color: "#64748b", display: "block" }}>Foco Identificado:</label>
                        <select value={foco} onChange={(e) => setFoco(e.target.value)} style={{ width: "100%", padding: "0.3rem", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "0.75rem" }}>
                          <option value="Imóvel Abandonado">Imóvel Abandonado</option>
                          <option value="Terreno Baldio">Terreno Baldio</option>
                        </select>
                      </div>

                      {/* Status e Ação */}
                      <div>
                        <label style={{ fontSize: "0.7rem", color: "#64748b", display: "block" }}>Alterar Status:</label>
                        <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ width: "100%", padding: "0.3rem", borderRadius: "4px", border: "1px solid #cbd5e1", marginBottom: "0.5rem", fontSize: "0.75rem" }}>
                          <option value="Aprovado">Aprovar</option>
                          <option value="Pendente">Pendente</option>
                          <option value="Em análise">Em análise</option>
                        </select>

                        <label style={{ fontSize: "0.7rem", color: "#64748b", display: "block" }}>Piloto Responsável:</label>
                        <select value={piloto} onChange={(e) => setPiloto(e.target.value)} style={{ width: "100%", padding: "0.3rem", borderRadius: "4px", border: "1px solid #cbd5e1", marginBottom: "0.8rem", fontSize: "0.75rem" }}>
                          <option value="Piloto 1 (LESTE)">Piloto 1 (LESTE)</option>
                          <option value="Piloto 2 (SUL)">Piloto 2 (SUL)</option>
                        </select>

                        <button onClick={handleSave} style={{ width: "100%", padding: "0.5rem", background: saved ? "#10b981" : "#0088e8", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", fontSize: "0.75rem", cursor: "pointer" }}>
                          {saved ? "Salvo!" : "Salvar Alterações"}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.8rem" }}>
                    <div style={{ background: "#fff", padding: "0.8rem", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                      <span style={{ fontSize: "0.7rem", color: "#64748b" }}>Ocorrências Hoje</span>
                      <strong style={{ display: "block", fontSize: "1.2rem", color: "#0f172a" }}>18</strong>
                    </div>
                    <div style={{ background: "#fff", padding: "0.8rem", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                      <span style={{ fontSize: "0.7rem", color: "#64748b" }}>Em análise</span>
                      <strong style={{ display: "block", fontSize: "1.2rem", color: "#0f172a" }}>07</strong>
                    </div>
                    <div style={{ background: "#fff", padding: "0.8rem", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                      <span style={{ fontSize: "0.7rem", color: "#64748b" }}>Aprovadas este mês</span>
                      <strong style={{ display: "block", fontSize: "1.2rem", color: "#10b981" }}>42</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* TELA 2: RELATÓRIOS (LAYOUT OCEANO AZUL) */}
              {activeNav === "Relatórios" && (
                <div>
                  <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: "1.3rem", fontWeight: "800", color: "#0f172a" }}>📊 Relatórios</h3>
                      <small style={{ color: "#64748b" }}>Solicitações filtradas: <strong>1332</strong></small>
                    </div>
                    <div style={{ display: "flex", gap: "0.4rem" }}>
                      <button style={{ padding: "0.4rem 0.8rem", borderRadius: "16px", border: "1px solid #0088e8", background: "#fff", color: "#0088e8", fontWeight: "bold", fontSize: "0.75rem", cursor: "pointer" }}>📊 Relatório OS</button>
                      <button style={{ padding: "0.4rem 0.8rem", borderRadius: "16px", border: "none", background: "#ef4444", color: "#fff", fontWeight: "bold", fontSize: "0.75rem", cursor: "pointer" }}>📄 Exportar PDF</button>
                      <button style={{ padding: "0.4rem 0.8rem", borderRadius: "16px", border: "none", background: "#10b981", color: "#fff", fontWeight: "bold", fontSize: "0.75rem", cursor: "pointer" }}>📗 Exportar Excel</button>
                    </div>
                  </header>

                  <div style={{ background: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0", padding: "0.75rem", marginBottom: "1rem" }}>
                    <div onClick={() => setFilterOpen(!filterOpen)} style={{ display: "flex", justifyContent: "space-between", cursor: "pointer", fontWeight: "700", fontSize: "0.85rem", color: "#0f172a" }}>
                      <span>🔍 Filtros de busca</span>
                      <span>{filterOpen ? "▲" : "▼"}</span>
                    </div>
                  </div>

                  <strong style={{ display: "block", fontSize: "0.9rem", color: "#0f172a", marginBottom: "0.8rem" }}>Dados de Agosto / 2026</strong>

                  {/* Cards do Relatório */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: "0.6rem", marginBottom: "1.2rem" }}>
                    {[
                      { label: "TOTAL", val: "1332", border: "#0088e8", color: "#0f172a" },
                      { label: "PENDENTES", val: "13", border: "#94a3b8", color: "#475569" },
                      { label: "EM ANÁLISE", val: "0", border: "#eab308", color: "#ca8a04" },
                      { label: "APROVADAS", val: "207", border: "#10b981", color: "#16a34a" },
                      { label: "C/ RECOM.", val: "0", border: "#f97316", color: "#ea580c" },
                      { label: "CONCLUÍDAS", val: "827", border: "#a855f7", color: "#9333ea" },
                      { label: "RECUSADAS", val: "256", border: "#ef4444", color: "#dc2626" },
                      { label: "CANCELADAS", val: "29", border: "#334155", color: "#1e293b" },
                    ].map((card) => (
                      <div key={card.label} style={{ background: "#fff", borderRadius: "8px", borderLeft: `4px solid ${card.border}`, padding: "0.6rem", borderTop: "1px solid #e2e8f0", borderRight: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0" }}>
                        <span style={{ fontSize: "0.6rem", color: "#64748b", fontWeight: "bold" }}>{card.label}</span>
                        <div style={{ fontSize: "1.2rem", fontWeight: "bold", color: card.color }}>{card.val}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div style={{ background: "#fff", padding: "1rem", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                      <strong style={{ fontSize: "0.85rem", color: "#0f172a" }}>🍩 Status</strong>
                      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "120px", marginTop: "0.5rem" }}>
                        <div style={{ width: "80px", height: "80px", borderRadius: "50%", border: "16px solid #a855f7", borderTopColor: "#10b981", borderRightColor: "#ef4444" }} />
                      </div>
                    </div>

                    <div style={{ background: "#fff", padding: "1rem", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                      <strong style={{ fontSize: "0.85rem", color: "#0f172a" }}>📍 Solicitações por Região</strong>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.8rem" }}>
                        {[
                          { region: "NORTE", width: "90%" },
                          { region: "LESTE", width: "55%" },
                          { region: "SUL", width: "45%" },
                        ].map((r) => (
                          <div key={r.region} style={{ display: "grid", gridTemplateColumns: "50px 1fr", alignItems: "center", gap: "0.5rem" }}>
                            <span style={{ fontSize: "0.65rem", fontWeight: "700", color: "#64748b" }}>{r.region}</span>
                            <div style={{ background: "#f1f5f9", borderRadius: "10px", height: "10px", overflow: "hidden" }}>
                              <div style={{ background: "#0088e8", height: "100%", width: r.width }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TELA 3: AGENDA */}
              {activeNav === "Agenda" && (
                <div>
                  <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <h3 style={{ margin: 0, fontSize: "1.3rem", fontWeight: "800", color: "#0f172a" }}>📅 Agenda</h3>
                    <div style={{ display: "flex", gap: "0.4rem" }}>
                      <button style={{ padding: "0.4rem 0.8rem", borderRadius: "6px", border: "none", background: "#ef4444", color: "#fff", fontWeight: "700", fontSize: "0.75rem", cursor: "pointer" }}>📌 Rota do Dia</button>
                      <button style={{ padding: "0.4rem 0.8rem", borderRadius: "6px", border: "none", background: "#06b6d4", color: "#fff", fontWeight: "700", fontSize: "0.75rem", cursor: "pointer" }}>📄 Exportar Atual</button>
                      <button style={{ padding: "0.4rem 0.8rem", borderRadius: "6px", border: "none", background: "#10b981", color: "#fff", fontWeight: "700", fontSize: "0.75rem", cursor: "pointer" }}>📥 Exportar Tudo</button>
                    </div>
                  </header>

                  <div style={{ background: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0", padding: "0.75rem", marginBottom: "1rem" }}>
                    <div onClick={() => setFilterOpen(!filterOpen)} style={{ display: "flex", justifyContent: "space-between", cursor: "pointer", fontWeight: "700", fontSize: "0.85rem", color: "#0f172a" }}>
                      <span>🔍 Filtros de busca</span>
                      <span>{filterOpen ? "▲" : "▼"}</span>
                    </div>
                  </div>

                  <div style={{ background: "#fff", borderRadius: "10px", border: "1px solid #e2e8f0", padding: "0.75rem", marginBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: "0.3rem" }}>
                      <button style={{ border: "1px solid #cbd5e1", background: "#fff", borderRadius: "50%", width: "28px", height: "28px", cursor: "pointer" }}>&lt;</button>
                      <button style={{ border: "1px solid #cbd5e1", background: "#fff", borderRadius: "50%", width: "28px", height: "28px", cursor: "pointer" }}>&gt;</button>
                      <button style={{ border: "1px solid #cbd5e1", background: "#fff", borderRadius: "14px", padding: "0 10px", fontSize: "0.75rem", cursor: "pointer" }}>Hoje</button>
                    </div>
                    <strong style={{ fontSize: "1.1rem", color: "#0f172a" }}>agosto de 2026</strong>
                    <div style={{ background: "#f1f5f9", borderRadius: "20px", padding: "3px" }}>
                      <button onClick={() => setAgendaView("Mês")} style={{ border: "none", background: agendaView === "Mês" ? "#1e3a8a" : "transparent", color: agendaView === "Mês" ? "#fff" : "#64748b", borderRadius: "16px", padding: "4px 12px", fontSize: "0.75rem", fontWeight: "700", cursor: "pointer" }}>Mês</button>
                      <button onClick={() => setAgendaView("Lista")} style={{ border: "none", background: agendaView === "Lista" ? "#1e3a8a" : "transparent", color: agendaView === "Lista" ? "#fff" : "#64748b", borderRadius: "16px", padding: "4px 12px", fontSize: "0.75rem", fontWeight: "700", cursor: "pointer" }}>Lista</button>
                    </div>
                  </div>

                  {agendaView === "Mês" ? (
                    <div style={{ background: "#fff", borderRadius: "10px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", background: "#f8fafc", borderBottom: "1px solid #e2e8f0", textAlign: "center", fontWeight: "700", fontSize: "0.7rem", color: "#64748b", padding: "8px 0" }}>
                        <span>DOM.</span><span>SEG.</span><span>TER.</span><span>QUA.</span><span>QUI.</span><span>SEX.</span><span>SÁB.</span>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "1px", background: "#cbd5e1" }}>
                        {[2, 3, 4, 5, 6, 7, 8].map((day) => (
                          <div key={day} style={{ background: "#fff", minHeight: "90px", padding: "6px" }}>
                            <span style={{ fontSize: "0.75rem", fontWeight: "bold", color: "#475569" }}>{day}</span>
                            <div style={{ display: "flex", flexDirection: "column", gap: "3px", marginTop: "4px" }}>
                              <div style={{ background: "#3b82f6", color: "#fff", fontSize: "0.6rem", padding: "2px 4px", borderRadius: "4px", whiteSpace: "nowrap", overflow: "hidden" }}>Av. Angelina...</div>
                              <div style={{ background: "#93c5fd", color: "#1e3a8a", fontSize: "0.6rem", padding: "2px 4px", borderRadius: "4px", whiteSpace: "nowrap", overflow: "hidden" }}>Rua Cachoeira...</div>
                              {day === 5 && (
                                <div style={{ background: "#f97316", color: "#fff", fontSize: "0.6rem", padding: "2px 4px", borderRadius: "4px", whiteSpace: "nowrap", overflow: "hidden" }}>Rua Hipólito...</div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div style={{ background: "#fff", padding: "1rem", borderRadius: "10px", fontSize: "0.85rem", border: "1px solid #e2e8f0" }}>
                      <div style={{ borderBottom: "1px solid #f1f5f9", padding: "8px 0" }}>📌 <strong>03/08/2026</strong> - Av. Angelina (Pulverização de Precisão)</div>
                      <div style={{ borderBottom: "1px solid #f1f5f9", padding: "8px 0" }}>📌 <strong>04/08/2026</strong> - Rua Cachoeira do Japorê (Mapeamento)</div>
                      <div style={{ padding: "8px 0" }}>📌 <strong>05/08/2026</strong> - Rua Hipólito (Voo Monitorado)</div>
                    </div>
                  )}
                </div>
              )}

              {/* OUTRAS TELAS (PLACEHOLDER DE DEMONSTRAÇÃO) */}
              {!["Dashboard", "Relatórios", "Agenda"].includes(activeNav) && (
                <div style={{ textAlign: "center", padding: "3rem", background: "#fff", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                  <span style={{ fontSize: "2.5rem" }}>⚙️</span>
                  <h4 style={{ margin: "0.8rem 0 0.3rem", color: "#0f172a" }}>Módulo de {activeNav}</h4>
                  <p style={{ color: "#64748b", fontSize: "0.85rem" }}>Esta visualização está sincronizada com a base de dados do sistema em tempo real.</p>
                </div>
              )}
            </main>
          </div>
        </div>

        {/* INDICADOR ONLINE */}
        <div style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.8rem", color: "#10b981", fontWeight: "700" }}>
          ● Sistema online — Operação sincronizada em tempo real
        </div>
      </div>
    </section>
  );
}