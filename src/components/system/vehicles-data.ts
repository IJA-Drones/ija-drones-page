import { normalizeRegistryText, registryToCsv } from "@/components/system/registry-utils";

export const vehicleOperations = ["PREFEITURA", "AGRO"] as const;
export const vehicleFleets = ["PRÓPRIA", "LOCADA"] as const;
export const vehicleStatuses = ["Ativo", "Inativo"] as const;
export const vehicleTeams = [
  { id: "team-1", name: "Equipe 1", pilot: "Piloto 1" },
  { id: "team-2", name: "Equipe 2", pilot: "Piloto 2" },
  { id: "team-3", name: "Equipe 3", pilot: "Piloto 3" },
] as const;

export type MockupVehicle = {
  id: number;
  name: string;
  identifier: string;
  fleet: (typeof vehicleFleets)[number];
  operation: (typeof vehicleOperations)[number];
  teamId: string;
  odometer: number;
  nextServiceKm: number;
  serviceMarked: boolean;
  status: (typeof vehicleStatuses)[number];
  movement: { from: number; to: number; cost: number; refuels: number; date: string; time: string } | null;
};

// Entirely fictional fleet: no real plates, people, or operational records.
export const initialVehicles: readonly MockupVehicle[] = Array.from({ length: 10 }, (_, index) => {
  const id = index + 1;
  const odometer = [7500, 0, 18000, 25800, 4200, 12600, 9400, 3000, 16000, 21000][index];
  const remaining = [1200, 10000, 1600, -800, 5800, 7400, 10600, 7000, 4000, 9000][index];
  return {
    id, name: `Veículo ${id}`, identifier: `DEMO-VEI-${String(id).padStart(3, "0")}`,
    fleet: index < 8 ? "PRÓPRIA" : "LOCADA", operation: index === 1 || index === 2 ? "AGRO" : "PREFEITURA",
    teamId: index === 0 ? "team-1" : index === 3 ? "team-2" : "",
    odometer, nextServiceKm: odometer + remaining, serviceMarked: false, status: "Ativo",
    movement: index === 0 ? { from: 7400, to: 7500, cost: 200, refuels: 2, date: "2026-08-30", time: "08:00" } : null,
  };
});

export function vehicleServiceState(vehicle: MockupVehicle) {
  const remaining = vehicle.nextServiceKm - vehicle.odometer;
  return remaining <= 0 ? "overdue" : remaining <= 2000 ? "due" : "regular";
}

export function vehicleMetrics(vehicles: readonly MockupVehicle[]) {
  return {
    total: vehicles.length,
    due: vehicles.filter((vehicle) => vehicleServiceState(vehicle) === "due").length,
    overdue: vehicles.filter((vehicle) => vehicleServiceState(vehicle) === "overdue").length,
    marked: vehicles.filter((vehicle) => vehicle.serviceMarked).length,
  };
}

export function filterVehicles(vehicles: readonly MockupVehicle[], search: string, operation: string, service: string) {
  const query = normalizeRegistryText(search);
  return vehicles.filter((vehicle) => {
    const team = vehicleTeams.find((item) => item.id === vehicle.teamId);
    return (!operation || vehicle.operation === operation)
      && (!service || (service === "marked" ? vehicle.serviceMarked : vehicleServiceState(vehicle) === service))
      && normalizeRegistryText(`${vehicle.name} ${vehicle.identifier} ${team?.name ?? "Sem equipe"} ${team?.pilot ?? ""}`).includes(query);
  });
}

export function vehiclesToCsv(vehicles: readonly MockupVehicle[]) {
  return registryToCsv(
    ["VEÍCULO", "IDENTIFICAÇÃO FICTÍCIA", "FROTA", "OPERAÇÃO", "EQUIPE", "PILOTO", "KM ATUAL", "KM RESTANTE", "REVISÃO MARCADA", "STATUS"],
    vehicles.map((vehicle) => {
      const team = vehicleTeams.find((item) => item.id === vehicle.teamId);
      return [vehicle.name, vehicle.identifier, vehicle.fleet, vehicle.operation, team?.name ?? "Sem equipe", team?.pilot ?? "Sem piloto", vehicle.odometer, vehicle.nextServiceKm - vehicle.odometer, vehicle.serviceMarked ? "Sim" : "Não", vehicle.status];
    }),
  );
}
