import { normalizeRegistryText, registryToCsv } from "@/components/system/registry-utils";

export const pilotRegions = ["CENTRO", "OESTE", "SUL", "NORTE", "LESTE"] as const;
export const pilotStatuses = ["Disponível", "Em missão", "Indisponível"] as const;
export type MockupPilot = {
  id: number;
  name: string;
  region: (typeof pilotRegions)[number];
  status: (typeof pilotStatuses)[number];
  login: string;
};

// Generic demonstration records, unrelated to real pilots or access credentials.
export const initialPilots: readonly MockupPilot[] = [
  { id: 1, name: "Piloto 1", region: "LESTE", status: "Disponível", login: "piloto1" },
  { id: 2, name: "Piloto 2", region: "SUL", status: "Em missão", login: "piloto2" },
  { id: 3, name: "Piloto 3", region: "OESTE", status: "Disponível", login: "piloto3" },
];

export function filterPilots(pilots: readonly MockupPilot[], search: string, region: string, status: string) {
  const query = normalizeRegistryText(search);
  return pilots.filter((pilot) => (
    (!region || pilot.region === region) && (!status || pilot.status === status) &&
    normalizeRegistryText(`${pilot.id} ${pilot.name} ${pilot.region} ${pilot.login}`).includes(query)
  ));
}

export function pilotsToCsv(pilots: readonly MockupPilot[]) {
  return registryToCsv(["ID", "NOME", "REGIÃO", "STATUS", "LOGIN"], pilots.map(({ id, name, region, status, login }) => [id, name, region, status, login]));
}
