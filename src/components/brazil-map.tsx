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
            alt="Mapa do Brasil dividido por estados"
            fill
            sizes="(max-width: 980px) 100vw, 48vw"
          />

          <svg className="brazil-map__overlay" aria-hidden="true" viewBox="0 0 1000 912">
            <path className="brazil-map__route" d="M298 250C420 310 488 431 667 490C724 509 745 601 633 719" />
            <path className="brazil-map__route brazil-map__route--secondary" d="M244 423C367 438 513 547 633 719" />

            <g className="brazil-map__pin brazil-map__pin--one" transform="translate(298 250)">
              <circle r="25" />
              <circle r="8" />
            </g>
            <g className="brazil-map__pin brazil-map__pin--two" transform="translate(667 490)">
              <circle r="25" />
              <circle r="8" />
            </g>
            <g className="brazil-map__pin brazil-map__pin--three" transform="translate(633 719)">
              <circle r="25" />
              <circle r="8" />
            </g>
          </svg>
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
