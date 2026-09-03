"use client";

import { useRef, useState } from "react";

export function SolutionsExperience() {
  const modelRef = useRef<HTMLElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleAnimation = () => {
    const modelViewer = modelRef.current as any;
    if (!modelViewer) return;

    if (isPlaying) {
      modelViewer.pause();
    } else {
      modelViewer.play();
    }

    setIsPlaying(!isPlaying);
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
          {/* TOPO DO PAINEL COM STATUS E BOTÃO PAUSA/PLAY */}
          <div className="mapping-panel__top">
            <div>
              <span>Projeto 024</span>
              <strong>Fazenda Horizonte</strong>
            </div>

            <div className="mapping-controls">
              <button 
                type="button" 
                className="mapping-play-btn" 
                onClick={toggleAnimation}
              >
                {isPlaying ? "⏸ Pausar Animação" : "▶ Iniciar Animação"}
              </button>
              <span className="mapping-status"><i /> Processado</span>
            </div>
          </div>

          {/* VIEWPORT INTERATIVA (ESTÁTICA, APENAS MOUSE CONTROL) */}
          <div className="mapping-viewport">
            <model-viewer
            ref={modelRef}
            className="unified-3d-scene"
            src="/media/modelo_completo.glb"
            alt="Mapeamento agrícola 3D com drone"
            camera-controls
            autoplay
            shadow-intensity="1.5"
            exposure="1.1"
            environment-image="neutral"
            interaction-prompt="none"
            loading="eager"
            camera-orbit="0deg 50deg 60%" /* 80% aproxima a câmera no carregamento inicial */
            min-camera-orbit="auto 15deg 40%" /* Permite ao usuário dar zoom até 40% de proximidade */
            max-camera-orbit="auto 70deg 200%" /* Limita o zoom out máximo */
            field-of-view="18deg"
          />

          </div>

          <p className="mapping-caption">Arraste com o mouse para girar ou use o scroll para aplicar zoom.</p>
        </div>
      </div>
    </div>
  );
}