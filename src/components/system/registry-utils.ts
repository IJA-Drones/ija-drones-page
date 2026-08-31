export function normalizeRegistryText(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLocaleLowerCase("pt-BR");
}

export function registryToCsv(columns: readonly string[], rows: readonly (readonly (string | number)[])[]) {
  const quote = (value: string | number) => {
    const text = String(value);
    // Keep user-entered values as text when opened in spreadsheet software.
    const safeText = /^[\s\u0000-\u001f]*[=+@-]|^[\t\r\n]/.test(text) ? `'${text}` : text;
    return `"${safeText.replace(/"/g, '""')}"`;
  };
  return "\uFEFF" + [columns, ...rows].map((row) => row.map(quote).join(";")).join("\r\n");
}
