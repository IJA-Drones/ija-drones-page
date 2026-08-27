import type { CSSProperties } from "react";
import Image from "next/image";

import { ScrollAnimations } from "@/components/scroll-animations";
import { SiteHeader } from "@/components/site-header";
import { SystemMockup } from "@/components/system-mockup";
import { site } from "@/content/site";

const solutions = [
  {
    number: "01",
    label: "Operação de precisão",
    title: "Pulverização agrícola",
    description:
      "Aplicação aérea planejada para alcançar áreas complexas, reduzir o contato da equipe e registrar cada missão.",
    tags: ["Planejamento por talhão", "Cobertura uniforme", "Registro da aplicação"],
  },
  {
    number: "02",
    label: "Inteligência territorial",
    title: "Mapeamento e planejamento",
    description:
      "Visualização da área, organização dos parâmetros e leitura técnica para preparar uma operação mais segura.",
    tags: ["Áreas georreferenciadas", "Plano de voo", "Análise técnica"],
  },
  {
    number: "03",
    label: "Controle integrado",
    title: "Gestão de missões",
    description:
      "Cliente, equipe, frota e histórico reunidos em um fluxo digital simples, do pedido ao relatório final.",
    tags: ["Status em tempo real", "Gestão de equipe", "Histórico centralizado"],
  },
] as const;

const flow = [
  ["01", "Solicitação", "Área, cultura e objetivo da aplicação entram no fluxo."],
  ["02", "Planejamento", "A equipe avalia o cenário e prepara a missão."],
  ["03", "Operação", "O voo é executado com acompanhamento dos parâmetros."],
  ["04", "Entrega", "Dados e histórico ficam organizados para consulta."],
] as const;

export default function Home() {
  return (
    <>
      <ScrollAnimations />
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <SiteHeader />

      <main id="conteudo">
        {/* HERO SECTION */}
        <section className="hero" id="inicio">
          <Image
            className="hero-image"
            src="/media/ija-drone-spraying.jpeg"
            alt="Drone agrícola realizando pulverização de precisão sobre uma lavoura"
            fill
            priority
            sizes="100vw"
          />
          <div className="hero-overlay" />
          <div className="hero-grid" aria-hidden="true" />

          <div className="container hero-content">
            <div className="hero-copy">
              <span className="kicker hero-kicker">Tecnologia aplicada ao campo</span>
              <h1>Cada hectare.<span>Sob controle.</span></h1>
              <p>
                Pulverização com drones e gestão digital de missões para transformar
                operações complexas em um fluxo preciso, rastreável e eficiente.
              </p>
              <div className="hero-actions">
                <a className="button button--primary" href="#contato">Planejar uma operação <span aria-hidden="true">↗</span></a>
                <a className="button button--glass" href="#solucoes">Explorar soluções</a>
              </div>
            </div>

            <aside className="mission-card" aria-label="Exemplo de acompanhamento de missão">
              <div className="mission-card__top"><span><i /> Missão ativa</span><b>ML-0142</b></div>
              <div className="mission-card__metric"><span>Status operacional</span><strong>Área em aplicação</strong></div>
              <div className="mission-progress"><i /></div>
              <div className="mission-card__meta"><span>Talhão 04</span><span>Operação monitorada</span></div>
            </aside>
          </div>

          <div className="hero-bottom">
            <div className="container hero-proof">
              <span>Aplicação precisa</span><span>Equipe conectada</span><span>Dados organizados</span><span>Decisão mais rápida</span>
            </div>
          </div>
        </section>

        {/* INTRO SECTION */}
        <section className="intro section">
          <div className="container intro-grid" data-reveal>
            <div><span className="kicker">IJA Drones</span><h2>O voo é só o começo da operação.</h2></div>
            <div className="intro-copy">
              <p>Conectamos tecnologia aérea, leitura de campo e software para que cada etapa seja planejada, acompanhada e documentada.</p>
              <a className="text-link" href="#plataforma">Conhecer o ecossistema <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </section>

        {/* SOLUÇÕES */}
        <section className="solutions section" id="solucoes">
          <div className="container">
            <div className="section-heading section-heading--light" data-reveal>
              <span className="kicker">Soluções integradas</span>
              <h2>Do campo ao painel. Sem perder o contexto.</h2>
              <p>Uma operação completa para quem precisa aplicar, acompanhar e transformar informação em próxima decisão.</p>
            </div>
            <div className="solutions-grid">
              {solutions.map((solution, index) => (
                <article className={`solution-card solution-card--${index + 1}`} key={solution.title} data-reveal style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}>
                  <div className="solution-card__number">{solution.number}</div>
                  <span>{solution.label}</span><h3>{solution.title}</h3><p>{solution.description}</p>
                  <ul>{solution.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PLATAFORMA / MOCKUP INTERATIVO DUAL (UVIS x AGRO) */}
        <SystemMockup />

        {/* CAMPO */}
        <section className="field section">
          <div className="container field-grid">
            <div className="field-media" data-reveal>
              <Image src="/media/ija-drone-operation.jpeg" alt="Frota de drones agrícolas sendo preparada para uma operação" fill sizes="(max-width: 900px) 100vw, 48vw" />
              <div className="field-media__label"><span>Estrutura operacional</span><strong>Equipamento, equipe e processo preparados para o campo.</strong></div>
            </div>
            <div className="field-copy" data-reveal>
              <span className="kicker">Tecnologia que sai da tela</span><h2>Planejamento digital. Execução no mundo real.</h2>
              <p>A IJA une a agilidade do drone com uma operação organizada. O resultado é mais visibilidade antes, durante e depois de cada voo.</p>
              <div className="field-principles">
                <article><span>01</span><h3>Precisão</h3><p>Parâmetros e área definidos antes da decolagem.</p></article>
                <article><span>02</span><h3>Segurança</h3><p>Menor exposição da equipe em áreas complexas.</p></article>
                <article><span>03</span><h3>Rastreabilidade</h3><p>Operação registrada para consulta posterior.</p></article>
              </div>
            </div>
          </div>
        </section>

        {/* MÉTODOS E PROCESSO */}
        <section className="process section" id="como-funciona">
          <div className="container">
            <div className="section-heading" data-reveal><span className="kicker">Método IJA</span><h2>Um fluxo claro, do pedido à entrega.</h2></div>
            <ol className="process-grid">
              {flow.map(([step, title, description], index) => (
                <li key={step} data-reveal style={{ "--reveal-delay": `${index * 80}ms` } as CSSProperties}><span>{step}</span><h3>{title}</h3><p>{description}</p></li>
              ))}
            </ol>
          </div>
        </section>

        {/* CONTATO */}
        <section className="contact" id="contato">
          <div className="contact-radar" aria-hidden="true"><i /><i /><i /></div>
          <div className="container contact-grid" data-reveal>
            <div><span className="kicker">Próxima missão</span><h2>Vamos colocar sua operação no radar?</h2></div>
            <div className="contact-copy">
              <p>Conte onde está a área e qual é o objetivo. A equipe IJA ajuda a desenhar o próximo passo.</p>
              <a className="button button--white" href={`mailto:${site.email}`}>Falar com um especialista <span aria-hidden="true">↗</span></a>
              <a className="contact-email" href={`mailto:${site.email}`}>{site.email}</a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#inicio" aria-label="IJA Drones, voltar ao início">
                <Image src="/images/ija-drones-logo-transparent.png" alt="IJA Drones" width={132} height={132} style={{ objectFit: "contain" }} />
              </a>
              <p>Soluções tecnológicas avançadas para o mercado de drones e aviação agrícola.</p>
              <a className="footer-email" href={`mailto:${site.email}`}>{site.email}</a>
            </div>

            <nav className="footer-column" aria-label="Produto">
              <h3>Produto</h3>
              <a href="#solucoes">Funcionalidades</a>
              <a href="#plataforma">Demonstração</a>
              <a href="#como-funciona">Recursos</a>
              <a href="#contato">Para empresas</a>
            </nav>

            <nav className="footer-column" aria-label="Navegação do rodapé">
              <h3>Navegação</h3>
              <a href="#inicio">Início</a>
              <a href="#solucoes">Soluções</a>
              <a href="#como-funciona">Como funciona</a>
              <a href="#contato">Contato <span aria-hidden="true">→</span></a>
            </nav>

            <nav className="footer-column" aria-label="Suporte">
              <h3>Suporte</h3>
              <a href={`mailto:${site.email}?subject=Ajuda%20com%20a%20IJA%20Drones`}>Central de ajuda</a>
              <a href="#plataforma">Status do sistema</a>
              <a href={`mailto:${site.email}`}>Fale conosco</a>
            </nav>
          </div>

          <div className="footer-bottom">
            <p>© 2026 IJA System. Todos os direitos reservados.</p>
            <div>
              <a href={`mailto:${site.email}?subject=Política%20de%20Privacidade`}>Política de Privacidade</a>
              <a href={`mailto:${site.email}?subject=Termos%20de%20Uso`}>Termos de Uso</a>
              <a href="#inicio">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}