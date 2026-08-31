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
            alt="Mapa do Brasil dividido por estados, com pontos destacados na região de Itajubá, sul de Minas Gerais"
            fill
            sizes="(max-width: 980px) 100vw, 48vw"
          />

          <svg className="brazil-map__overlay" aria-hidden="true" viewBox="0 0 1000 912">
            {/* Itajubá (-22.4256, -45.4528), projected using the SVG's reference points.
                The smaller dots illustrate connections within southern Minas Gerais. */}
            <path className="brazil-map__route" d="M607 601Q609 610 621 611" />
            <path className="brazil-map__route brazil-map__route--secondary" d="M628 595Q632 606 621 611" />

            <g className="brazil-map__pin brazil-map__pin--one" transform="translate(607 601)">
              <circle r="12" />
              <circle r="5" />
            </g>
            <g className="brazil-map__pin brazil-map__pin--two" transform="translate(628 595)">
              <circle r="12" />
              <circle r="5" />
            </g>
            <g className="brazil-map__pin brazil-map__pin--three" transform="translate(621 611)">
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
        <span><i /> Tecnologia própria</span>
        <span><i /> Operações conectadas</span>
        <a href="https://simplemaps.com/svg/country/br" target="_blank" rel="noreferrer">
          Mapa: SimpleMaps
        </a>
      </div>
    </div>
  );
}
