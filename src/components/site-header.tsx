"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { Icon } from "@/components/icon";
import { site } from "@/content/site";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [siteTheme, setSiteTheme] = useState<"light" | "dark">("light");
  const isDark = siteTheme === "dark";

  useEffect(() => {
    const storedTheme = window.localStorage?.getItem("ija-site-theme");
    const preferredTheme = window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const initialTheme = storedTheme === "dark" || storedTheme === "light" ? storedTheme : preferredTheme;

    document.documentElement.dataset.siteTheme = initialTheme;
    const animationFrame = window.requestAnimationFrame(() => setSiteTheme(initialTheme));

    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  const toggleSiteTheme = () => {
    const nextTheme = isDark ? "light" : "dark";

    setSiteTheme(nextTheme);
    document.documentElement.dataset.siteTheme = nextTheme;
    window.localStorage?.setItem("ija-site-theme", nextTheme);
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand-link" href="#inicio" aria-label="IJA Drones, início">
          <Image
            src="/images/logo-ija-sem-fundo.png"
            alt="IJA Drones - Tecnologia e Inovação"
            width={100}
            height={100}
            preload
            className="header-logo"
          />
        </a>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {site.navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          {site.instagram && (
            <a
              className="header-instagram"
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram da IJA Drones (${site.instagram.handle}), abre em nova aba`}
              title={`Instagram · ${site.instagram.handle}`}
            >
              <Icon name="instagram" />
            </a>
          )}
          <button
            className="site-theme-toggle"
            type="button"
            aria-label={isDark ? "Ativar tema claro do site" : "Ativar tema escuro do site"}
            aria-pressed={isDark}
            title={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
            onClick={toggleSiteTheme}
          >
            <span aria-hidden="true">{isDark ? "☀" : "☾"}</span>
          </button>

          <a className="header-cta" href="#contato">
            Planejar operação
            <span aria-hidden="true">↗</span>
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
      </div>

      {menuOpen ? (
        <div className="mobile-menu mobile-menu--open" id="mobile-menu">
          <nav aria-label="Navegação para dispositivos móveis">
            {site.navigation.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
            {site.instagram && (
              <a
                className="mobile-menu__social"
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
              >
                <Icon name="instagram" />
                <span>Instagram <small>{site.instagram.handle}</small></span>
                <span aria-hidden="true">↗</span>
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            )}
            <a className="mobile-menu__cta" href="#contato" onClick={() => setMenuOpen(false)}>
              Planejar operação
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
