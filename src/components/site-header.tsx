"use client";

import { useState } from "react";

import { Brand } from "@/components/brand";
import { Icon } from "@/components/icon";
import { site } from "@/content/site";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand-link" href="#inicio" aria-label="IJA Drones, início">
          <Brand logoOnly />
        </a>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {site.navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="header-cta" href="#contato">
          Solicitar orçamento
          <Icon name="arrow" />
        </a>

        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {menuOpen ? (
        <div className="mobile-menu mobile-menu--open" id="mobile-menu">
          <nav aria-label="Navegação para dispositivos móveis">
            {site.navigation.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
            <a className="mobile-menu__cta" href="#contato" onClick={() => setMenuOpen(false)}>
              Solicitar orçamento
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
