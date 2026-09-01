import Image from "next/image";

export function BrazilMap() {
  return (
    <div className="brazil-map">
      <div className="brazil-map__header">
        <span>Território conectado</span>
        <strong>BRASIL</strong>
      </div>

      <div className="brazil-map__asset">
        <div className="brazil-map__canvas">
          <Image
            src="/images/brazil-map.svg"
            alt="Mapa do Brasil dividido por estados, com um ponto destacado em Itajubá, Minas Gerais"
            fill
            sizes="(max-width: 980px) 100vw, 48vw"
          />

          <svg className="brazil-map__overlay" aria-hidden="true" viewBox="0 0 1000 912">
            {/* Itajubá (-22.4256, -45.4528), projected using the SVG's reference points. */}
            <g className="brazil-map__pin" transform="translate(621 611)">
              <circle r="20" />
              <circle r="8" />
            </g>
          </svg>
          <div className="brazil-map__location">
            <strong>Itajubá · MG</strong>
            <span>Sul de Minas</span>
          </div>
        </div>
      </div>

      <div className="brazil-map__legend">
        <span><i /> Base em Itajubá</span>
        <a href="https://simplemaps.com/svg/country/br" target="_blank" rel="noreferrer">
          Mapa: SimpleMaps
        </a>
      </div>
    </div>
  );
}
