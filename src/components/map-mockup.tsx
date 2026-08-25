export function MapMockup() {
  return (
    <div
      className="map-mockup"
      role="img"
      aria-label="Representação de uma área de voo delimitada"
    >
      <div className="map-grid" aria-hidden="true" />
      <svg aria-hidden="true" viewBox="0 0 420 280">
        <polygon className="plot plot--green" points="44,72 153,44 195,130 82,157" />
        <polygon className="plot plot--blue" points="226,47 352,67 371,151 248,129" />
        <polygon className="plot plot--pale" points="83,182 207,165 224,238 107,248" />
        <polyline
          className="flight-route"
          points="58,79 82,73 107,75 132,70 158,74 181,70 189,103 166,108 141,111 115,117 89,115 65,110 58,79"
        />
        <circle className="map-point map-point--main" cx="119" cy="91" r="6" />
        <circle className="map-ring" cx="119" cy="91" r="14" />
        <circle className="map-ring map-ring--outer" cx="119" cy="91" r="23" />
        <circle className="map-point" cx="295" cy="91" r="4" />
        <circle className="map-point map-point--blue" cx="158" cy="204" r="4" />
      </svg>
      <div className="map-status map-status--top">
        <span>ÁREA SELECIONADA</span>
        <strong>TALHÃO A</strong>
      </div>
      <div className="map-status map-status--bottom">
        <span>ROTA PREVISTA</span>
        <strong>PRONTO PARA ANÁLISE</strong>
      </div>
    </div>
  );
}
