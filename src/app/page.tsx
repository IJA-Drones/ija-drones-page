import Image from "next/image";

import { Brand } from "@/components/brand";
import { Icon } from "@/components/icon";
import { MapMockup } from "@/components/map-mockup";
import { ServiceTabs } from "@/components/service-tabs";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/content/site";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>

      <SiteHeader />

      <main id="conteudo">
        <section className="hero" id="inicio">
          <div className="hero-shell">
            <div className="hero-copy">
              <span className="eyebrow hero-eyebrow">
                <span className="eyebrow-line" />
                Tecnologia aplicada ao campo
              </span>
              <h1>
                Inteligência aérea para produzir com <span>mais precisão.</span>
              </h1>
              <p>
                Pulverização com drones e uma plataforma completa para planejar,
                acompanhar e organizar cada missão no campo.
              </p>
              <div className="hero-actions">
                <a className="button button--green" href="#contato">
                  Solicitar orçamento
                  <Icon name="arrow" />
                </a>
                <a className="button button--outline" href="#solucoes">
                  Conhecer soluções
                </a>
              </div>
              <div className="hero-proof">
                <span className="proof-icon">
                  <Icon name="target" />
                </span>
                <div>
                  <strong>Campo e software conectados</strong>
                  <span>Um ecossistema para toda a operação</span>
                </div>
              </div>
            </div>

            <div className="hero-media">
              <Image
                src="/images/drone-field.jpg"
                alt="Drone agrícola sobre uma plantação"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 38vw"
              />
              <div className="hero-media__wash" />
              <div className="hero-graphic hero-graphic--one" aria-hidden="true" />
              <div className="hero-graphic hero-graphic--two" aria-hidden="true" />

              <div className="hero-caption">
                <span>Operação integrada</span>
                <strong>
                  Precisão
                  <br />
                  Segurança
                  <br />
                  Controle da missão
                </strong>
              </div>
            </div>
          </div>
        </section>

        <section className="highlights" aria-label="Diferenciais da solução">
          <div className="container highlights-grid">
            {site.highlights.map((item) => (
              <article key={item.label}>
                <span className="highlight-icon">
                  <Icon name={item.icon} />
                </span>
                <div>
                  <h2>{item.label}</h2>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section solutions" id="solucoes">
          <div className="container">
            <div className="section-heading section-heading--center">
              <span className="eyebrow">Nossas soluções</span>
              <h2>
                Duas frentes. <span>Um só ecossistema.</span>
              </h2>
              <p>
                Da aplicação em campo ao painel de gestão, a tecnologia acompanha
                toda a jornada da operação.
              </p>
            </div>
            <ServiceTabs />
          </div>
        </section>

        <section className="section platform" id="plataforma">
          <div className="container platform-grid">
            <div className="platform-visual">
              <div className="platform-photo">
                <Image
                  src="/images/aerial-field.jpg"
                  alt="Vista aérea de uma operação em plantação"
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              </div>
              <div className="fleet-card">
                <div className="fleet-card__title">
                  <strong>Central de operações</strong>
                  <span>
                    <i /> ONLINE
                  </span>
                </div>
                <ul>
                  <li>
                    <span>Solicitações</span>
                    <strong>Organizadas</strong>
                  </li>
                  <li>
                    <span>Equipe de campo</span>
                    <strong>Conectada</strong>
                  </li>
                  <li>
                    <span>Missões</span>
                    <strong>Monitoradas</strong>
                  </li>
                </ul>
              </div>
            </div>

            <div className="platform-copy">
              <span className="eyebrow">Plataforma IJA</span>
              <h2>
                Gestão inteligente <span>de ponta a ponta.</span>
              </h2>
              <p>
                Um ambiente digital para receber solicitações, visualizar áreas,
                preparar missões e manter o histórico da operação acessível.
              </p>
              <ul className="check-list">
                <li>
                  <span>01</span>
                  Área da missão visualizada no mapa
                </li>
                <li>
                  <span>02</span>
                  Fluxo entre cliente e equipe operacional
                </li>
                <li>
                  <span>03</span>
                  Acompanhamento do status de cada voo
                </li>
                <li>
                  <span>04</span>
                  Histórico e relatórios centralizados
                </li>
              </ul>
              <a className="text-link text-link--blue" href="#contato">
                Solicitar uma demonstração
                <Icon name="arrow" />
              </a>
            </div>
          </div>
        </section>

        <section className="section process" id="como-funciona">
          <div className="container">
            <div className="section-heading section-heading--center">
              <span className="eyebrow eyebrow--blue">Como funciona</span>
              <h2>
                Do pedido ao <span>relatório final.</span>
              </h2>
              <p>
                Um fluxo claro para transformar a necessidade do campo em uma
                missão bem planejada.
              </p>
            </div>
            <ol className="process-grid">
              {site.process.map((item) => (
                <li key={item.step}>
                  <span className="process-step">{item.step}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section precision">
          <div className="container precision-grid">
            <div className="precision-copy">
              <span className="eyebrow eyebrow--blue">Tecnologia aplicada</span>
              <h2>
                Visão aérea para <span>decisões precisas.</span>
              </h2>
              <p>
                O mapa deixa de ser apenas uma imagem e passa a orientar o fluxo
                completo: solicitação, planejamento, operação e análise.
              </p>
              <ul className="technology-tags" aria-label="Recursos da plataforma">
                <li>Áreas georreferenciadas</li>
                <li>Gestão de missões</li>
                <li>Telemetria</li>
                <li>Histórico operacional</li>
              </ul>
            </div>

            <div className="precision-visual">
              <Image
                src="/images/agriculture-aerial.jpg"
                alt="Vista aérea de talhões agrícolas"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
              />
              <div className="map-card">
                <div className="map-card__header">
                  <span className="live-dot" />
                  <strong>Planejamento visual</strong>
                </div>
                <MapMockup />
              </div>
            </div>
          </div>
        </section>

        <section className="contact" id="contato">
          <div className="contact-orbit" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="container contact-grid">
            <div>
              <span className="eyebrow">Próxima missão</span>
              <h2>Pronto para conectar tecnologia e campo?</h2>
              <p>
                Fale com a IJA Drones para entender qual solução combina com a
                sua operação.
              </p>
            </div>
            <div className="contact-actions">
              <a className="button button--dark" href={`mailto:${site.email}`}>
                Falar com a equipe
                <Icon name="arrow" />
              </a>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <Brand inverse />
            <p>Tecnologia e inovação para operações agrícolas.</p>
          </div>
          <nav aria-label="Navegação do rodapé">
            {site.navigation.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="footer-meta">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <span>© 2026 IJA Drones</span>
          </div>
        </div>
      </footer>
    </>
  );
}
