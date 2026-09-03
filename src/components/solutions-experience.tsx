"use client";

import Image from "next/image";
import { useRef } from "react";

export function SolutionsExperience() {
  const canvasRef = useRef<HTMLDivElement>(null);

  const updatePerspective = (event: React.PointerEvent<HTMLDivElement>) => {
    if (
      event.pointerType === "touch" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !canvasRef.current
    ) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    canvasRef.current.style.setProperty("--mapping-x", `${x * 5}deg`);
    canvasRef.current.style.setProperty("--mapping-y", `${y * -4}deg`);
  };

  const resetPerspective = () => {
    canvasRef.current?.style.removeProperty("--mapping-x");
    canvasRef.current?.style.removeProperty("--mapping-y");
  };

  return (
    <div className="solutions-experience" data-reveal>
      <div className="solutions-experience__header">
        <div>
          <span>Operação em movimento</span>
          <h3>Veja a tecnologia trabalhando no campo.</h3>
        </div>
      </div>

      <div className="solutions-experience__body">
        <div className="mapping-demo">
          <div className="mapping-panel__top">
            <div>
              <span>Projeto 024</span>
              <strong>Fazenda Horizonte</strong>
            </div>
            <span className="mapping-status"><i /> Processado</span>
          </div>

          <div
            className="mapping-viewport"
            onPointerMove={updatePerspective}
            onPointerLeave={resetPerspective}
          >
            <div
              className="mapping-canvas"
              ref={canvasRef}
              role="img"
              aria-label="Mapa aéreo agrícola"
            >
              <div className="mapping-layer mapping-layer--base">
                <Image
                  src="/media/drone-mapping-orthomosaic.jpg"
                  alt="Mapeamento agrícola ortomosaico"
                  fill
                  sizes="(max-width: 820px) 94vw, 72vw"
                  draggable={false}
                />
              </div>
              <div className="mapping-contours" aria-hidden="true" />
              <div className="mapping-coordinate mapping-coordinate--top">
                <span>22°25&apos;58.6&quot;S</span>
                <strong>45°27&apos;10.2&quot;W</strong>
              </div>
              <div className="mapping-coordinate mapping-coordinate--bottom">
                <span>CAPTURA RTK</span>
                <strong>612 imagens</strong>
              </div>
            </div>
          </div>

          <p className="mapping-caption">Demonstração visual de um levantamento aéreo processado.</p>
        </div>
      </div>
    </div>
  );
}