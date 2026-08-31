"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

import { Icon } from "@/components/icon";
import { SystemPageTitle } from "@/components/system/system-page-title";
import { normalizeRegistryText } from "@/components/system/registry-utils";
import { filterUsers, initialUsers, userProfiles, userStatuses, usersToCsv, type MockupUser } from "@/components/system/users-data";

type UsersScreenProps = { onNavigate: (screen: string) => void };

export function UsersScreen({ onNavigate }: UsersScreenProps) {
  const [users, setUsers] = useState<readonly MockupUser[]>(initialUsers);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [profile, setProfile] = useState("");
  const [status, setStatus] = useState("");
  const [editor, setEditor] = useState<{ user: MockupUser | null } | null>(null);
  const [pendingDelete, setPendingDelete] = useState<MockupUser | null>(null);
  const [feedback, setFeedback] = useState("");
  const [formError, setFormError] = useState("");
  const editorRef = useRef<HTMLFormElement>(null);
  const returnFocusRef = useRef<HTMLButtonElement | null>(null);
  const createButtonRef = useRef<HTMLButtonElement>(null);
  const cancelDeleteRef = useRef<HTMLButtonElement>(null);
  const filteredUsers = filterUsers(users, search, profile, status);

  useEffect(() => {
    if (editor) {
      editorRef.current?.scrollIntoView({ block: "nearest", behavior: "instant" });
      editorRef.current?.querySelector<HTMLInputElement>("input")?.focus({ preventScroll: true });
    }
  }, [editor]);

  useEffect(() => {
    if (pendingDelete) cancelDeleteRef.current?.focus({ preventScroll: true });
  }, [pendingDelete]);

  function clearFilters() {
    setSearch("");
    setProfile("");
    setStatus("");
  }

  function closeEditor() {
    setEditor(null);
    setFormError("");
    const target = returnFocusRef.current?.isConnected ? returnFocusRef.current : createButtonRef.current;
    target?.focus({ preventScroll: true });
  }

  function openEditor(user: MockupUser | null, trigger: HTMLButtonElement) {
    returnFocusRef.current = trigger;
    setPendingDelete(null);
    setFeedback("");
    setFormError("");
    setEditor({ user });
  }

  function cancelDelete() {
    setPendingDelete(null);
    createButtonRef.current?.focus({ preventScroll: true });
  }

  function saveUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const login = String(form.get("login") ?? "").trim();
    const selectedProfile = String(form.get("profile") ?? "") as MockupUser["profile"];
    const selectedStatus = String(form.get("status") ?? "") as MockupUser["status"];
    if (!name || !login || !userProfiles.includes(selectedProfile) || !userStatuses.includes(selectedStatus)) {
      setFormError("Preencha todos os campos para salvar o usuário.");
      return;
    }
    if (users.some((user) => user.id !== editor?.user?.id && normalizeRegistryText(user.login) === normalizeRegistryText(login))) {
      setFormError("Este login já está em uso. Escolha outro login.");
      return;
    }
    const record: MockupUser = {
      id: editor?.user?.id ?? Math.max(0, ...users.map((user) => user.id)) + 1,
      name, login, profile: selectedProfile, status: selectedStatus,
    };
    setUsers((current) => editor?.user ? current.map((user) => user.id === record.id ? record : user) : [record, ...current]);
    clearFilters();
    setFeedback(`${name}: ${editor?.user ? "alterações salvas" : "cadastro incluído"} nesta demonstração.`);
    closeEditor();
  }

  function exportUsers() {
    const url = URL.createObjectURL(new Blob([usersToCsv(filteredUsers)], { type: "text/csv;charset=utf-8;" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "usuarios-cadastrados.csv";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setFeedback("Lista exportada em CSV, compatível com Excel.");
  }

  return (
    <section className="system-screen clients-screen users-screen" aria-labelledby="users-title">
      <header className="system-page-header">
        <SystemPageTitle icon="◎" id="users-title" title="Usuários Cadastrados" meta={<>Total de registros: <strong>{users.length}</strong>{search || profile || status ? <> · Encontrados: <strong>{filteredUsers.length}</strong></> : null}</>} />
        <div className="system-actions clients-screen__actions">
          <button type="button" onClick={() => onNavigate("Dashboard")}><span aria-hidden="true">←</span> Voltar</button>
          <button className="is-success" type="button" onClick={exportUsers} disabled={!filteredUsers.length}><Icon name="report" /> Exportar Excel</button>
          <button className="is-primary" type="button" ref={createButtonRef} onClick={(event) => openEditor(null, event.currentTarget)}><span aria-hidden="true">＋</span> Cadastrar usuário</button>
        </div>
      </header>

      <section className={`os-filter clients-filter ${filtersOpen ? "is-open" : ""}`}>
        <button className="os-filter__toggle" type="button" aria-expanded={filtersOpen} aria-controls="users-filter-fields" onClick={() => setFiltersOpen((open) => !open)}>
          <span><span className="clients-filter-icon" aria-hidden="true" /><b>Filtros de busca</b></span><i aria-hidden="true">⌄</i>
        </button>
        {filtersOpen ? (
          <div className="os-filter__fields" id="users-filter-fields">
            <label>Nome ou login<input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar usuário" /></label>
            <label>Perfil<select value={profile} onChange={(event) => setProfile(event.target.value)}><option value="">Todos os perfis</option>{userProfiles.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>Status<select value={status} onChange={(event) => setStatus(event.target.value)}><option value="">Todos os status</option>{userStatuses.map((item) => <option key={item}>{item}</option>)}</select></label>
            <button type="button" onClick={clearFilters}>Limpar filtros</button>
          </div>
        ) : null}
      </section>

      {editor ? (
        <form className="clients-editor" key={editor.user?.id ?? "new"} ref={editorRef} onSubmit={saveUser} aria-labelledby="users-editor-title" onKeyDown={(event) => { if (event.key === "Escape") { event.stopPropagation(); closeEditor(); } }}>
          <h4 id="users-editor-title">{editor.user ? "Editar usuário" : "Cadastrar usuário"}</h4>
          <p>Use nomes genéricos. As alterações são demonstrativas e não criam acessos reais.</p>
          <div className="clients-editor__fields">
            <label>Nome do usuário<input name="name" defaultValue={editor.user?.name ?? ""} placeholder="Ex.: Supervisor" required maxLength={80} /></label>
            <label>Login<input name="login" defaultValue={editor.user?.login ?? ""} placeholder="Ex.: supervisor" required maxLength={50} autoCapitalize="none" autoComplete="off" spellCheck={false} /></label>
            <label>Perfil<select name="profile" defaultValue={editor.user?.profile ?? "Consulta"}>{userProfiles.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>Status<select name="status" defaultValue={editor.user?.status ?? "Ativo"}>{userStatuses.map((item) => <option key={item}>{item}</option>)}</select></label>
          </div>
          {formError ? <p className="clients-editor__error" role="alert">{formError}</p> : null}
          <div className="system-actions"><button type="button" onClick={closeEditor}>Cancelar</button><button type="submit" className="is-primary">Salvar usuário</button></div>
        </form>
      ) : null}

      <p className="clients-feedback" role="status" aria-live="polite">{feedback}</p>
      <div className="clients-table-wrap">
        <table className="clients-table users-table" role="table" aria-label="Usuários cadastrados">
          <thead><tr>{["ID", "Nome", "Perfil", "Status", "Login", "Ações"].map((column) => <th key={column} scope="col">{column}</th>)}</tr></thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} role="row" className={pendingDelete?.id === user.id ? "is-confirming" : undefined}>
                <td role="cell" data-label="ID">{user.id}</td>
                <td role="cell" data-label="Nome"><strong>{user.name}</strong></td>
                <td role="cell" data-label="Perfil">{user.profile}</td>
                <td role="cell" data-label="Status"><span className={`users-status ${user.status === "Inativo" ? "is-inactive" : ""}`}>{user.status}</span></td>
                <td role="cell" data-label="Login"><code>{user.login}</code></td>
                <td role="cell" data-label="Ações">
                  {pendingDelete?.id === user.id ? (
                    <div className="clients-delete" role="group" aria-label={`Confirmar exclusão de ${user.name}`} onKeyDown={(event) => { if (event.key === "Escape") { event.stopPropagation(); cancelDelete(); } }}>
                      <p>Excluir este usuário da demonstração?</p>
                      <div className="management-request__row-actions clients-row-actions">
                        <button className="is-cancel" type="button" ref={cancelDeleteRef} onClick={cancelDelete}>Cancelar</button>
                        <button className="is-danger" type="button" onClick={() => {
                          setUsers((current) => current.filter((item) => item.id !== user.id));
                          setFeedback(`${user.name} removido apenas desta demonstração.`);
                          cancelDelete();
                        }}>Confirmar</button>
                      </div>
                    </div>
                  ) : (
                    <div className="management-request__row-actions clients-row-actions">
                      <button type="button" aria-label={`Editar ${user.name}`} onClick={(event) => openEditor(user, event.currentTarget)}><span aria-hidden="true">✎</span> Editar</button>
                      <button className="is-danger" type="button" aria-label={`Excluir ${user.name}`} onClick={() => { setEditor(null); setFeedback(""); setPendingDelete(user); }}><span className="clients-trash-icon" aria-hidden="true" /> Excluir</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!filteredUsers.length ? <div className="clients-empty"><strong>Nenhum usuário encontrado.</strong><p>Tente outro nome, perfil ou status, ou cadastre um novo usuário.</p></div> : null}
      </div>
      <p className="clients-caption">Exibindo {filteredUsers.length} de {users.length} registros · Usuários demonstrativos</p>
    </section>
  );
}
