export type MapView = "heat" | "areas" | "logistics";
export type MapBasemap = "street" | "satellite";
export type MapFilters = { unit: string; month: string; focus: string };
export type MapPoint = {
  id: number; unit: string; month: string; focus: string;
  latitude: number; longitude: number; volume: number;
};

export const itajubaCenter: [number, number] = [-22.425, -45.452];
export const mapUnits = ["Unidade 1", "Unidade 2", "Unidade 3"] as const;
export const mapFocusTypes = ["Água parada", "Resíduos", "Vegetação"] as const;
export const mapMonths = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"] as const;
export const defaultMapFilters: MapFilters = { unit: "", month: "08", focus: "" };

// Synthetic observations around Itajubá. These are not actual incidents or team locations.
export const mapPoints: readonly MapPoint[] = [
  { id: 1, unit: "Unidade 1", month: "08", focus: "Água parada", latitude: -22.414, longitude: -45.466, volume: 7 },
  { id: 2, unit: "Unidade 1", month: "08", focus: "Resíduos", latitude: -22.420, longitude: -45.460, volume: 3 },
  { id: 3, unit: "Unidade 1", month: "08", focus: "Vegetação", latitude: -22.426, longitude: -45.469, volume: 2 },
  { id: 4, unit: "Unidade 2", month: "08", focus: "Água parada", latitude: -22.425, longitude: -45.447, volume: 9 },
  { id: 5, unit: "Unidade 2", month: "08", focus: "Resíduos", latitude: -22.431, longitude: -45.438, volume: 4 },
  { id: 6, unit: "Unidade 2", month: "08", focus: "Vegetação", latitude: -22.417, longitude: -45.440, volume: 2 },
  { id: 7, unit: "Unidade 3", month: "08", focus: "Água parada", latitude: -22.440, longitude: -45.457, volume: 5 },
  { id: 8, unit: "Unidade 3", month: "08", focus: "Resíduos", latitude: -22.443, longitude: -45.442, volume: 3 },
  { id: 9, unit: "Unidade 3", month: "08", focus: "Vegetação", latitude: -22.449, longitude: -45.451, volume: 1 },
  { id: 10, unit: "Unidade 1", month: "07", focus: "Água parada", latitude: -22.419, longitude: -45.465, volume: 4 },
  { id: 11, unit: "Unidade 2", month: "07", focus: "Resíduos", latitude: -22.429, longitude: -45.444, volume: 2 },
  { id: 12, unit: "Unidade 3", month: "06", focus: "Vegetação", latitude: -22.440, longitude: -45.450, volume: 3 },
];

export function filterMapPoints(filters: MapFilters) {
  return mapPoints.filter((point) => point.month === filters.month && (!filters.unit || point.unit === filters.unit) && (!filters.focus || point.focus === filters.focus));
}

export function mapStatistics(points: readonly MapPoint[]) {
  return { volume: points.reduce((total, point) => total + point.volume, 0), points: points.length, units: new Set(points.map((point) => point.unit)).size };
}

export function groupMapPoints(points: readonly MapPoint[]) {
  return mapUnits.map((unit, index) => ({
    unit, number: index + 1, name: `Equipe ${index + 1}`, vehicle: `Veículo ${index + 1}`,
    points: points.filter((point) => point.unit === unit),
  })).filter((group) => group.points.length > 0);
}

// Only requested viewport tiles are loaded. No prefetching or offline tile downloads.
export const mapBasemaps = {
  street: {
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
  },
  satellite: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: 'Imagem: <a href="https://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08febac2a9" target="_blank" rel="noopener noreferrer">Esri</a>, Vantor, Earthstar Geographics, GIS User Community',
  },
} as const;
