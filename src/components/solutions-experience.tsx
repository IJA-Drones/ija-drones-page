"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import agriculturalSprayerDrone from "@/assets/agricultural-sprayer-drone-realistic.png";

type ExperienceMode = "spraying" | "mapping";
type MapView = "orthomosaic" | "vegetation" | "terrain";
type SprayRate = "economical" | "standard" | "intensive";

const mapViews: Array<{ value: MapView; label: string }> = [
  { value: "orthomosaic", label: "Ortomosaico" },
  { value: "vegetation", label: "Vegetação" },
  { value: "terrain", label: "Elevação" },
];

const sprayRates: Array<{ value: SprayRate; label: string; amount: string }> = [
  { value: "economical", label: "Econômica", amount: "8 L/ha" },
  { value: "standard", label: "Padrão", amount: "12 L/ha" },
  { value: "intensive", label: "Intensiva", amount: "16 L/ha" },
];

export function SolutionsExperience() {
  const [mode, setMode] = useState<ExperienceMode>("spraying");
  const [mapView, setMapView] = useState<MapView>("orthomosaic");
  const [sprayRate, setSprayRate] = useState<SprayRate>("standard");
  const [isSpraying, setIsSpraying] = useState(true);
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

  const activeMapLabel = mapViews.find((item) => item.value === mapView)?.label;

  return (
    <div className="solutions-experience" data-reveal>
      <div className="solutions-experience__header">
        <div>
          <span>Operação em movimento</span>
          <h3>Veja a tecnologia trabalhando no campo.</h3>
        </div>


      </div>

      <div className="solutions-experience__body">

        <div className="mapping-demo" hidden={mode !== "mapping"}>
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
              data-view={mapView}
              ref={canvasRef}
              role="img"
              aria-label={`Mapa aéreo agrícola na visualização ${activeMapLabel}`}
            >
              <div className="mapping-layer mapping-layer--base">
                <Image src="/media/drone-mapping-orthomosaic.jpg" alt="" fill sizes="(max-width: 820px) 94vw, 72vw" draggable={false} />
              </div>
              <div className="mapping-layer mapping-layer--analysis">
                <Image src="/media/drone-mapping-orthomosaic.jpg" alt="" fill sizes="(max-width: 820px) 94vw, 72vw" draggable={false} />
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

          <div className="mapping-toolbar" aria-label="Visualização do mapa">
            {mapViews.map((item) => (
              <button
                key={item.value}
                type="button"
                aria-pressed={mapView === item.value}
                onClick={() => setMapView(item.value)}
              >
                <i aria-hidden="true" />
                {item.label}
              </button>
            ))}
          </div>
          <p className="mapping-caption">Demonstração visual de um levantamento aéreo processado.</p>
        </div>
      </div>
    </div>
  );
}
