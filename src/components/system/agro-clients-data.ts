import { normalizeRegistryText } from "@/components/system/registry-utils";

export type AgroClient = {
  id: number;
  name: string;
  detail: string;
  document: string;
  address: string;
  status: "Ativo" | "Inativo";
};

export function createAgroClient(id: number, name = `Cliente ${id}`, detail = `Propriedade ${id}`): AgroClient {
  return {
    id, name, detail,
    document: `DEMO-${String(id).padStart(4, "0")}`,
    address: `${detail}, Estrada Rural Exemplo, km ${id} — Município Exemplo/MG — CEP 00000-000`,
    status: "Ativo",
  };
}

export const initialAgroClients: readonly AgroClient[] = Array.from({ length: 25 }, (_, index) => createAgroClient(index + 1));

export function filterAgroClients(clients: readonly AgroClient[], search: string, status: string) {
  const query = normalizeRegistryText(search);
  return clients.filter((client) => (!status || client.status === status)
    && normalizeRegistryText(`${client.id} ${client.name} ${client.detail} ${client.document} ${client.address}`).includes(query));
}
