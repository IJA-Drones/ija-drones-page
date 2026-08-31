export const clientRegions = ["CENTRO", "OESTE", "SUL", "NORTE", "LESTE"] as const;
export type ClientRegion = (typeof clientRegions)[number];

export type UvisClient = {
  id: number;
  name: string;
  cityHall: string;
  region: ClientRegion;
  login: string;
};

// Demonstração de registros com dados genéricos
const units: readonly [number, string, ClientRegion, string][] = [
  [1, "Unidade Centro 01", "CENTRO", "unidade.centro01"],
  [2, "Unidade Oeste 01", "OESTE", "unidade.oeste01"],
  [3, "Unidade Sul 01", "SUL", "unidade.sul01"],
  [4, "Unidade Sul 02", "SUL", "unidade.sul02"],
  [5, "Unidade Norte 01", "NORTE", "unidade.norte01"],
  [6, "Unidade Leste 01", "LESTE", "unidade.leste01"],
  [7, "Unidade Leste 02", "LESTE", "unidade.leste02"],
  [8, "Unidade Norte 02", "NORTE", "unidade.norte02"],
  [9, "Unidade Oeste 02", "OESTE", "unidade.oeste02"],
  [10, "Unidade Centro 02", "CENTRO", "unidade.centro02"],
];

export const initialClients: readonly UvisClient[] = units.map(([id, name, region, login]) => ({
  id, name, region, login, cityHall: "Prefeitura de São Paulo",
}));

export function normalizeClientText(value: string) {
  return normalizeRegistryText(value);
}

export function filterClients(clients: readonly UvisClient[], search: string, region: string) {
  const query = normalizeClientText(search);
  return clients.filter((client) => (
    (!region || client.region === region) &&
    normalizeClientText(`${client.id} ${client.name} ${client.cityHall} ${client.login}`).includes(query)
  ));
}

export function clientsToCsv(clients: readonly UvisClient[]) {
  const rows = clients.map(({ id, name, cityHall, region, login }) => [id, name, cityHall, region, login]);
  return registryToCsv(["ID", "NOME", "PREFEITURA", "REGIÃO", "LOGIN"], rows);
}
import { normalizeRegistryText, registryToCsv } from "@/components/system/registry-utils";
