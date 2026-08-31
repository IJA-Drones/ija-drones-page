import { normalizeRegistryText, registryToCsv } from "@/components/system/registry-utils";

export const userProfiles = ["Administrador", "Coordenadoria", "Supervisor", "Desenvolvedor", "Operador", "Fiscal", "Suporte", "Consulta"] as const;
export const userStatuses = ["Ativo", "Inativo"] as const;
export type MockupUser = {
  id: number;
  name: string;
  profile: (typeof userProfiles)[number];
  status: (typeof userStatuses)[number];
  login: string;
};

// Generic demonstration accounts, unrelated to real people or access credentials.
export const initialUsers: readonly MockupUser[] = [
  { id: 1, name: "Admin", profile: "Administrador", status: "Ativo", login: "admin" },
  { id: 2, name: "Coordenadoria", profile: "Coordenadoria", status: "Ativo", login: "coordenadoria" },
  { id: 3, name: "Supervisor", profile: "Supervisor", status: "Ativo", login: "supervisor" },
  { id: 4, name: "Dev", profile: "Desenvolvedor", status: "Ativo", login: "dev" },
  { id: 5, name: "Operador", profile: "Operador", status: "Ativo", login: "operador" },
  { id: 6, name: "Fiscal", profile: "Fiscal", status: "Ativo", login: "fiscal" },
  { id: 7, name: "Suporte", profile: "Suporte", status: "Ativo", login: "suporte" },
  { id: 8, name: "Consulta", profile: "Consulta", status: "Inativo", login: "consulta" },
  { id: 9, name: "Planejamento", profile: "Coordenadoria", status: "Ativo", login: "planejamento" },
  { id: 10, name: "Monitoramento", profile: "Operador", status: "Inativo", login: "monitoramento" },
];

export function filterUsers(users: readonly MockupUser[], search: string, profile: string, status: string) {
  const query = normalizeRegistryText(search);
  return users.filter((user) => (
    (!profile || user.profile === profile) && (!status || user.status === status) &&
    normalizeRegistryText(`${user.id} ${user.name} ${user.profile} ${user.login}`).includes(query)
  ));
}

export function usersToCsv(users: readonly MockupUser[]) {
  return registryToCsv(["ID", "NOME", "PERFIL", "STATUS", "LOGIN"], users.map(({ id, name, profile, status, login }) => [id, name, profile, status, login]));
}
