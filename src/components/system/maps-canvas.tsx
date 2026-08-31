"use client";

import { useEffect, useRef, useState } from "react";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";

import { groupMapPoints, itajubaCenter, mapBasemaps, mapStatistics, type MapBasemap, type MapPoint, type MapView } from "@/components/system/maps-data";

function popupText(title: string, detail: string) {
  const element = document.createElement("div");
  const heading = document.createElement("strong");
  heading.textContent = title;
  const description = document.createElement("p");
  description.textContent = detail;
  element.append(heading, description);
  return element;
}

export default function MapsCanvas({ points, view }: { points: readonly MapPoint[]; view: MapView }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [basemap, setBasemap] = useState<MapBasemap>("satellite");
  const [tileStatus, setTileStatus] = useState<"loading" | "ready" | "error">("loading");
  const [retry, setRetry] = useState(0);
  const [zoom, setZoom] = useState(13);
  const [fullscreen, setFullscreen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const stats = mapStatistics(points);

  useEffect(() => {
    if (!hostRef.current) return;
    const map = L.map(hostRef.current, { center: itajubaCenter, zoom: 13, minZoom: 10, maxZoom: 18, zoomControl: false, scrollWheelZoom: false });
    mapRef.current = map;
    const onZoom = () => setZoom(map.getZoom());
    map.on("zoomend", onZoom);
    const observer = new ResizeObserver(() => map.invalidateSize({ pan: false }));
    observer.observe(hostRef.current);
    const onFullscreen = () => setFullscreen(document.fullscreenElement === stageRef.current);
    document.addEventListener("fullscreenchange", onFullscreen);
    return () => {
      observer.disconnect();
      document.removeEventListener("fullscreenchange", onFullscreen);
      map.off("zoomend", onZoom);
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const config = mapBasemaps[basemap];
    let loaded = 0;
    let failed = false;
    const layer = L.tileLayer(config.url, { attribution: config.attribution, maxZoom: 18, keepBuffer: 1, updateWhenIdle: true });
    const timeout = window.setTimeout(() => { if (!loaded) setTileStatus("error"); }, 15000);
    layer.on("tileload", () => { loaded += 1; if (!failed) setTileStatus("ready"); });
    layer.on("tileerror", () => { failed = true; setTileStatus("error"); });
    layer.addTo(map);
    return () => { window.clearTimeout(timeout); layer.off(); layer.remove(); };
  }, [basemap, retry]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const layer = L.layerGroup().addTo(map);
    const groups = groupMapPoints(points);
    if (view === "areas") {
      groups.forEach((group) => {
        const bounds = L.latLngBounds(group.points.map((point) => [point.latitude, point.longitude] as L.LatLngTuple)).pad(.3);
        // Give a single-point area a visible, illustrative footprint too.
        const southwest = bounds.getSouthWest();
        const northeast = bounds.getNorthEast();
        L.rectangle([[southwest.lat - .002, southwest.lng - .002], [northeast.lat + .002, northeast.lng + .002]], { color: "#38bdf8", weight: 2, fillColor: "#0879b9", fillOpacity: .2 }).addTo(layer)
          .bindPopup(popupText(group.unit, "Área ilustrativa de atendimento. Não representa um limite oficial."));
      });
    }
    if (view === "logistics") {
      groups.forEach((group) => {
        const coordinates = group.points.map((point) => [point.latitude, point.longitude] as L.LatLngTuple);
        if (coordinates.length > 1) L.polyline(coordinates, { color: "#38bdf8", weight: 4, dashArray: "8 8" }).addTo(layer);
        L.marker(coordinates[0], {
          icon: L.divIcon({ className: "maps-team-marker", html: `<span>${group.number}</span>`, iconSize: [30, 30], iconAnchor: [15, 15] }),
          title: `${group.name} — posição fictícia`, keyboard: true,
        }).addTo(layer).bindPopup(popupText(group.name, `${group.vehicle} · ${group.unit}. Posição e trajeto fictícios, sem rastreamento real.`));
      });
    } else {
      points.forEach((point) => {
        const position: L.LatLngTuple = [point.latitude, point.longitude];
        if (view === "heat") {
          const size = 45 + point.volume * 7;
          L.marker(position, { interactive: false, keyboard: false, icon: L.divIcon({ className: "maps-heat-spot", iconSize: [size, size], iconAnchor: [size / 2, size / 2] }) }).addTo(layer);
        }
        L.marker(position, {
          icon: L.divIcon({ className: `maps-point-marker ${view === "heat" ? "is-heat" : ""}`, iconSize: [16, 16], iconAnchor: [8, 8] }),
          title: `Ponto ${point.id} — ${point.unit}`, keyboard: true,
        }).addTo(layer).bindPopup(popupText(`Ponto ${point.id} · ${point.unit}`, `${point.focus} · ${point.volume} focos fictícios. Demonstração sem ocorrências reais.`));
      });
    }
    return () => { layer.clearLayers(); layer.remove(); };
  }, [points, view]);

  function switchBasemap(value: MapBasemap) { if (value !== basemap) { setTileStatus("loading"); setBasemap(value); } }

  async function toggleFullscreen() {
    if (document.fullscreenElement === stageRef.current) { await document.exitFullscreen(); return; }
    if (stageRef.current?.requestFullscreen) {
      try { await stageRef.current.requestFullscreen(); return; } catch { /* Fall back to an expanded map inside the mockup. */ }
    }
    setExpanded((current) => !current);
  }

  return (
    <div ref={stageRef} className={`maps-stage ${expanded ? "is-expanded" : ""}`}>
      <div ref={hostRef} className="maps-canvas" aria-label="Mapa interativo de Itajubá com dados fictícios. Use as setas para mover e mais ou menos para ampliar." />
      <div className="maps-basemap" role="group" aria-label="Base cartográfica"><button type="button" aria-pressed={basemap === "street"} onClick={() => switchBasemap("street")}>Mapa</button><button type="button" aria-pressed={basemap === "satellite"} onClick={() => switchBasemap("satellite")}>Satélite</button></div>
      <div className="maps-volume" role="status" aria-live="polite"><span>Volume de focos</span><strong>{stats.volume}</strong><small>Demonstrativo</small></div>
      <div className="maps-controls" role="group" aria-label="Controles do mapa">
        <button type="button" aria-label={fullscreen || expanded ? "Reduzir mapa" : "Ampliar mapa"} title={fullscreen || expanded ? "Reduzir mapa" : "Ampliar mapa"} onClick={toggleFullscreen}><span aria-hidden="true">{fullscreen || expanded ? "⊡" : "⛶"}</span></button>
        <button type="button" aria-label="Aumentar zoom" disabled={zoom >= 18} onClick={() => mapRef.current?.zoomIn()}><span aria-hidden="true">＋</span></button>
        <button type="button" aria-label="Diminuir zoom" disabled={zoom <= 10} onClick={() => mapRef.current?.zoomOut()}><span aria-hidden="true">−</span></button>
        <button type="button" aria-label="Centralizar em Itajubá" title="Centralizar em Itajubá" onClick={() => mapRef.current?.setView(itajubaCenter, 13)}><span aria-hidden="true">⌖</span></button>
      </div>
      <div className="maps-location"><strong>Itajubá · MG</strong><span>{view === "heat" ? "Intensidade ilustrativa" : view === "areas" ? "Áreas ilustrativas" : "Trajetos fictícios"}</span>{view === "heat" ? <i aria-hidden="true" /> : null}</div>
      {tileStatus === "loading" ? <p className="maps-network" role="status">Carregando base cartográfica…</p> : null}
      {tileStatus === "error" ? <div className="maps-network is-error" role="status"><span>Não foi possível carregar toda a base. Verifique sua conexão ou alterne para {basemap === "satellite" ? "Mapa" : "Satélite"}.</span><button type="button" onClick={() => { setTileStatus("loading"); setRetry((current) => current + 1); }}>Tentar novamente</button></div> : null}
    </div>
  );
}
