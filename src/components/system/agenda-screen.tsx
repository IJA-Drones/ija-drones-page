"use client";

import { useState } from "react";

import { SystemPageTitle } from "@/components/system/system-page-title";

type CalendarEvent = {
  title: string;
  tone?: "primary" | "warning";
};

type CalendarDay = {
  day: number;
  outside?: boolean;
  events?: readonly CalendarEvent[];
};

const weekDays = ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sáb."] as const;
const monthLabels = ["julho de 2026", "agosto de 2026", "setembro de 2026"] as const;

const calendarDays: readonly CalendarDay[] = [
  { day: 26, outside: true }, { day: 27, outside: true }, { day: 28, outside: true }, { day: 29, outside: true }, { day: 30, outside: true }, { day: 31, outside: true }, { day: 1 },
  { day: 2 },
  { day: 3, events: [
    { title: "Avenida Angelina, 143" , tone: "primary" }, { title: "Avenida Ede, 779 – Vila" }, { title: "Rua Senador Maynard" }, { title: "Rua Comendador Alfa" }, { title: "Avenida Angelina, 812" }, { title: "Rua Paranacity, 206" }, { title: "Rua Senador Maynard" }, { title: "Travessa Castanhal, 41" },
  ] },
  { day: 4, events: [
    { title: "Rua Cachoeira do Jari" }, { title: "Rua Domingos de Castro" }, { title: "Rua Go Sugaya, 19" }, { title: "Avenida Comendador" }, { title: "Rua Cachoeira do Jari" }, { title: "Rua Go Sugaya, 70" }, { title: "Rua Secundino Domingues" }, { title: "Rua Bento Rodrigues" },
  ] },
  { day: 5, events: [
    { title: "Rua Acutinga, 286" }, { title: "Rua Arumateia, 336" }, { title: "Rua Maria Roschel" }, { title: "Rua Paulino Arena" }, { title: "Rua Hipólito Raposo", tone: "warning" }, { title: "Rua Jerônimo Pedroso" }, { title: "Rua Manoel Nóbrega" }, { title: "Rua Otávio Nébias", tone: "warning" },
  ] },
  { day: 6, events: [
    { title: "Rua dos Dourados, 66" }, { title: "Rua Manuel Moscoso" }, { title: "Rua Belarmino Belisário" }, { title: "Rua Cavatton, 80" }, { title: "Rua José de Araújo" }, { title: "Rua Monte Alegre" }, { title: "Avenida Elísio Teixeira" }, { title: "Rua Cleon Mário", tone: "primary" },
  ] },
  { day: 7, events: [
    { title: "Rua Coronel Albino", tone: "primary" }, { title: "Rua Paulo Dantas", tone: "primary" }, { title: "Rua Aurivercine Duarte" }, { title: "Rua Duse Naccarat", tone: "primary" }, { title: "Rua Tomás Iriarte" }, { title: "Rua Doutor Leão" }, { title: "Rua Gustavo de Lacerda", tone: "primary" }, { title: "Rua Professor Antônio" },
  ] },
  { day: 8 },
  { day: 9 }, { day: 10 }, { day: 11 }, { day: 12 }, { day: 13 }, { day: 14 }, { day: 15 },
  { day: 16 }, { day: 17 }, { day: 18 }, { day: 19 }, { day: 20 }, { day: 21 }, { day: 22 },
  { day: 23 }, { day: 24 }, { day: 25 }, { day: 26 }, { day: 27 }, { day: 28 }, { day: 29 },
  { day: 30 }, { day: 31 }, { day: 1, outside: true }, { day: 2, outside: true }, { day: 3, outside: true }, { day: 4, outside: true }, { day: 5, outside: true },
];

const listAppointments = calendarDays.flatMap((day) => (day.events ?? []).map((event, index) => ({ id: `${day.day}-${index}`, day: day.day, ...event })));

export function AgendaScreen() {
  const [view, setView] = useState<"Mês" | "Lista">("Mês");
  const [monthIndex, setMonthIndex] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [selectedDay, setSelectedDay] = useState(3);
  // The August appointments are demonstration data; adjacent months stay empty.
  const visibleDays: readonly CalendarDay[] = monthIndex === 1 ? calendarDays : Array.from({ length: 42 }, (_, index) => {
    const month = monthIndex + 6;
    const firstWeekday = new Date(Date.UTC(2026, month, 1)).getUTCDay();
    const date = new Date(Date.UTC(2026, month, index - firstWeekday + 1));
    return { day: date.getUTCDate(), outside: date.getUTCMonth() !== month };
  });
  const selectedEvents = monthIndex === 1
    ? calendarDays.find((day) => day.day === selectedDay && !day.outside)?.events ?? []
    : [];

  const showFeedback = (message: string) => {
    setFeedback(message);
    window.setTimeout(() => setFeedback(""), 2200);
  };

  const changeMonth = (direction: -1 | 1) => {
    setMonthIndex((current) => Math.min(monthLabels.length - 1, Math.max(0, current + direction)));
    setSelectedDay(1);
  };

  return (
    <section className="system-screen agenda-screen" aria-labelledby="agenda-title">
      <header className="agenda-screen__header system-page-header">
        <SystemPageTitle icon="▣" id="agenda-title" title="Agenda" />
        <div className="system-actions agenda-screen__actions">
          <button className="is-danger" type="button" onClick={() => showFeedback("Rota do dia preparada")}>◇ Rota do Dia</button>
          <button className="is-primary" type="button" onClick={() => showFeedback("Agenda atual exportada")}>▣ Exportar Atual</button>
          <button className="is-success" type="button" onClick={() => showFeedback("Agenda completa exportada")}>⇩ Exportar Tudo</button>
        </div>
      </header>

      <section className={`agenda-filter ${filtersOpen ? "is-open" : ""}`}>
        <button className="agenda-filter__toggle" type="button" aria-expanded={filtersOpen} aria-controls="agenda-filter-fields" onClick={() => setFiltersOpen((open) => !open)}>
          <span><i aria-hidden="true">▼</i> <b>Filtros de busca</b></span><i aria-hidden="true">⌄</i>
        </button>
        {filtersOpen ? (
          <div className="agenda-filter__fields" id="agenda-filter-fields">
            <label>Buscar endereço<input placeholder="Endereço ou região" /></label>
            <label>Equipe<select defaultValue="Todas"><option>Todas</option><option>Equipe UVIS Oeste</option><option>Equipe OA 01</option></select></label>
            <label>Status<select defaultValue="Todos"><option>Todos</option><option>Agendado</option><option>Em rota</option><option>Concluído</option></select></label>
            <button type="button" onClick={() => showFeedback("Filtros da agenda aplicados")}>Aplicar filtros</button>
          </div>
        ) : null}
      </section>

      <section className="agenda-calendar" aria-label="Calendário de agendamentos">
        <header className="agenda-calendar__toolbar">
          <div className="agenda-calendar__navigation">
            <button type="button" aria-label="Mês anterior" disabled={monthIndex === 0} onClick={() => changeMonth(-1)}>‹</button>
            <button type="button" aria-label="Próximo mês" disabled={monthIndex === monthLabels.length - 1} onClick={() => changeMonth(1)}>›</button>
            <button type="button" onClick={() => setMonthIndex(1)}>Hoje</button>
          </div>
          <h4>{monthLabels[monthIndex]}</h4>
          <div className="agenda-calendar__view" aria-label="Visualização da agenda">
            <button className={view === "Mês" ? "is-active" : ""} type="button" aria-pressed={view === "Mês"} onClick={() => setView("Mês")}>Mês</button>
            <button className={view === "Lista" ? "is-active" : ""} type="button" aria-pressed={view === "Lista"} onClick={() => setView("Lista")}>Lista</button>
          </div>
        </header>

        {view === "Mês" ? (
          <div className="agenda-month">
            <div className="agenda-weekdays">{weekDays.map((day) => <span key={day}>{day}</span>)}</div>
            <div className="agenda-grid">
              {visibleDays.map((day, dayIndex) => (
                <article className={`${day.outside ? "is-outside" : ""} ${!day.outside && day.day === selectedDay ? "is-selected-day" : ""}`} key={`${dayIndex}-${day.day}`}>
                  <span className="agenda-day-number">{day.day}</span>
                  <button
                    className="agenda-mobile-day"
                    type="button"
                    disabled={day.outside}
                    aria-label={`${day.day} de ${monthLabels[monthIndex]}, ${day.events?.length ?? 0} compromissos`}
                    aria-pressed={!day.outside && day.day === selectedDay}
                    onClick={() => setSelectedDay(day.day)}
                  >
                    <span>{day.day}</span>
                    {day.events?.length ? <small aria-hidden="true">{day.events.length}</small> : null}
                  </button>
                  {day.events ? <div className="agenda-day-events">{day.events.map((event, eventIndex) => <button className={event.tone ? `is-${event.tone}` : ""} type="button" title={event.title} key={`${event.title}-${eventIndex}`} onClick={() => showFeedback(`${event.title} aberto`)}>{event.tone === "warning" ? "◉ " : ""}{event.title}</button>)}</div> : null}
                </article>
              ))}
            </div>
            <section className="agenda-mobile-appointments" aria-labelledby="agenda-selected-day">
              <h5 id="agenda-selected-day" aria-live="polite">{selectedDay} de {monthLabels[monthIndex]}</h5>
              {selectedEvents.length ? selectedEvents.map((event, index) => (
                <button key={`${event.title}-${index}`} type="button" onClick={() => showFeedback(`${event.title} aberto`)}>
                  <i className={event.tone === "warning" ? "is-warning" : ""} aria-hidden="true" />
                  <span><b>{event.title}</b><small>Operação UVIS{event.tone === "warning" ? " • Reagendamento" : " • Agendada"}</small></span>
                  <span aria-hidden="true">›</span>
                </button>
              )) : <p>Nenhum compromisso neste dia.</p>}
            </section>
          </div>
        ) : (
          <div className="agenda-list">
            {monthIndex === 1 ? listAppointments.map((appointment) => <button type="button" key={appointment.id} onClick={() => showFeedback(`${appointment.title} aberto`)}><time>AGO <strong>{appointment.day}</strong></time><span><b>{appointment.title}</b><small>Operação UVIS • 08:00–17:00</small></span><i>›</i></button>) : <p className="agenda-list-empty">Nenhum compromisso neste mês.</p>}
          </div>
        )}
      </section>

      <div className={`os-feedback ${feedback ? "is-visible" : ""}`} role="status" aria-live="polite">{feedback}</div>
    </section>
  );
}
