export type EquipmentView = "recent" | "drones" | "batteries" | "maintenance";
export type MockupEquipment = {
  id: string;
  type: "Drone" | "Bateria" | "Veículo";
  name: string;
  model: string;
  serial: string;
  status: "Ativo" | "Em manutenção";
  registeredAt: string;
};

// Demonstration inventory only. Summary counts and category lists share this source.
export const equipmentInventory: readonly MockupEquipment[] = [
  { id: "drone-1", type: "Drone", name: "Drone 1", model: "DRONE DE DEMONSTRAÇÃO", serial: "DEMO-DR-001", status: "Ativo", registeredAt: "2026-08-14" },
  { id: "vehicle-1", type: "Veículo", name: "Veículo 1", model: "FIORINO", serial: "", status: "Ativo", registeredAt: "2026-07-06" },
  { id: "vehicle-2", type: "Veículo", name: "Veículo 2", model: "MASTER", serial: "", status: "Ativo", registeredAt: "2026-06-10" },
  { id: "vehicle-3", type: "Veículo", name: "Veículo 3", model: "HILUX", serial: "", status: "Ativo", registeredAt: "2026-06-10" },
  ...Array.from({ length: 12 }, (_, index): MockupEquipment => ({
    id: `drone-${index + 2}`, type: "Drone", name: `Drone ${index + 2}`,
    model: index % 2 === 0 ? "DJI MAVIC 3E" : "DJI MATRICE 350",
    serial: `DEMO-DR-${String(index + 2).padStart(3, "0")}`, status: "Ativo", registeredAt: "2026-06-01",
  })),
  ...Array.from({ length: 46 }, (_, index): MockupEquipment => ({
    id: `battery-${index + 1}`, type: "Bateria", name: `Bateria ${index + 1}`,
    model: index % 2 === 0 ? "BATERIA MAVIC 3E" : "BATERIA TB65",
    serial: `DEMO-BAT-${String(index + 1).padStart(3, "0")}`, status: "Ativo", registeredAt: "2026-05-20",
  })),
];

export function getEquipmentRecords(view: EquipmentView, inventory: readonly MockupEquipment[] = equipmentInventory) {
  const sorted = [...inventory].sort((a, b) => b.registeredAt.localeCompare(a.registeredAt));
  if (view === "recent") return sorted.slice(0, 8);
  return sorted.filter((item) => view === "maintenance" ? item.status === "Em manutenção" : item.type === (view === "drones" ? "Drone" : "Bateria"));
}

export function formatEquipmentDate(isoDate: string) {
  return isoDate.split("-").reverse().join("/");
}
