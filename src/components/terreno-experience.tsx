"use client";

import { useRef, useState } from "react";

export function TerrenoExperience() {
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
    <div className="terreno-viewport">
      <model-viewer
        ref={modelRef}
        className="terreno-3d-scene"
        src="/media/terreno_itajuba.glb" /* Adicione seu arquivo .glb aqui */
        alt="Modelo 3D do terreno da nova fábrica em Itajubá"
        camera-controls
        autoplay
        shadow-intensity="1.5"
        exposure="1.1"
        environment-image="neutral"
        interaction-prompt="none"
        loading="eager"
        camera-orbit="0deg 55deg 90%"
        min-camera-orbit="auto 15deg 50%"
        max-camera-orbit="auto 75deg 180%"
        field-of-view="18deg"
      />

      <div className="terreno-controls">
        <button 
          type="button" 
          className="mapping-play-btn" 
          onClick={toggleAnimation}
        >
          {isPlaying ? "⏸ Pausar 3D" : "▶ Rotacionar 3D"}
        </button>
      </div>

      <div className="mapping-coordinate mapping-coordinate--bottom">
        <span>FUTURA FÁBRICA</span>
        <strong>Itajubá - MG</strong>
      </div>
    </div>
  );
}