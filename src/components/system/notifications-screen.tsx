"use client";

import { useState, type Dispatch, type SetStateAction } from "react";

import { SystemPageTitle } from "@/components/system/system-page-title";

type NotificationsScreenProps = {
  onNavigate: (screen: string) => void;
  notificationCount: number;
  onNotificationCountChange: Dispatch<SetStateAction<number>>;
};

type SystemNotification = {
  id: number;
  title: string;
  description: string;
  date: string;
};

const initialNotifications: readonly SystemNotification[] = [
  {
    id: 114,
    title: "Alerta automático: manutenção de drones desatualizada",
    description: "2 drone(s) com última manutenção acima de 90 dias: PLOA 24 (383 dias), PLOA 19 (295 dias).",
    date: "27/08/2026 13:44",
  },
  {
    id: 113,
    title: "Alerta automático: revisões de veículo",
    description: "1 veículo(s) com revisão vencida ou próxima (até 500 km); 1 já vencido(s): SUK2B95 (vencido há 2072 km).",
    date: "27/08/2026 13:44",
  },
  {
    id: 112,
    title: "Alerta automático: manutenção de drones desatualizada",
    description: "2 drone(s) com última manutenção acima de 90 dias: PLOA 24 (382 dias), PLOA 19 (294 dias).",
    date: "26/08/2026 15:04",
  },
  {
    id: 111,
    title: "Alerta automático: revisões de veículo",
    description: "1 veículo(s) com revisão vencida ou próxima (até 500 km); 1 já vencido(s): SUK2B95 (vencido há 2072 km).",
    date: "26/08/2026 15:04",
  },
  {
    id: 110,
    title: "Alerta automático: manutenção de drones desatualizada",
    description: "2 drone(s) com última manutenção acima de 90 dias: PLOA 24 (382 dias), PLOA 19 (294 dias).",
    date: "26/08/2026 14:03",
  },
  {
    id: 109,
    title: "Alerta automático: revisões de veículo",
    description: "1 veículo(s) com revisão vencida ou próxima (até 500 km); 1 já vencido(s): SUK2B95 (vencido há 2072 km).",
    date: "26/08/2026 14:03",
  },
];

export function NotificationsScreen({
  onNavigate,
  notificationCount,
  onNotificationCountChange,
}: NotificationsScreenProps) {
  const [notifications, setNotifications] = useState<SystemNotification[]>(() => [...initialNotifications]);
  const [confirmClear, setConfirmClear] = useState(false);
  const [feedback, setFeedback] = useState("");

  const showFeedback = (message: string) => {
    setFeedback(message);
    window.setTimeout(() => setFeedback(""), 2200);
  };

  const removeNotification = (id: number) => {
    setNotifications((current) => current.filter((notification) => notification.id !== id));
    onNotificationCountChange((current) => Math.max(0, current - 1));
    showFeedback("Notificação removida");
  };

  const clearNotifications = () => {
    setNotifications([]);
    onNotificationCountChange(0);
    setConfirmClear(false);
    showFeedback("Todas as notificações foram removidas");
  };

  const overlay = (
    <>
      {confirmClear ? (
        <div className="os-detail-backdrop" role="presentation" onMouseDown={() => setConfirmClear(false)}>
          <section className="notification-confirm" role="dialog" aria-modal="true" aria-labelledby="notification-confirm-title" onMouseDown={(event) => event.stopPropagation()}>
            <span aria-hidden="true">♲</span>
            <h4 id="notification-confirm-title">Limpar todas as notificações?</h4>
            <p>Esta ação remove todos os alertas exibidos. Alertas automáticos podem reaparecer enquanto a pendência continuar ativa.</p>
            <div><button type="button" onClick={() => setConfirmClear(false)}>Cancelar</button><button type="button" onClick={clearNotifications}>Limpar todas</button></div>
          </section>
        </div>
      ) : null}
      <div className={`os-feedback ${feedback ? "is-visible" : ""}`} role="status" aria-live="polite">{feedback}</div>
    </>
  );

  return (
    <section className="system-screen system-screen--notifications" aria-labelledby="notifications-title">
      <div className="notifications-heading system-page-header">
        <SystemPageTitle icon="◆" id="notifications-title" title="Notificações" meta={<><strong>{notificationCount}</strong> alertas</>} />
        <button className="is-danger" type="button" disabled={notifications.length === 0} onClick={() => setConfirmClear(true)}>♲ <span>Limpar todas</span></button>
      </div>

      <section className="notifications-panel" aria-label="Lista de notificações">
        <p className="notifications-help">Alertas automáticos podem reaparecer enquanto a pendência continuar ativa. Para remover de forma definitiva, é preciso resolver o item sinalizado.</p>

        {notifications.length > 0 ? (
          <div className="notifications-list">
            {notifications.map((notification) => (
              <article className="notification-row" key={notification.id}>
                <div className="notification-row__content">
                  <div className="notification-row__title">
                    <span aria-hidden="true">▲</span>
                    <h4>{notification.title}</h4>
                    <b>Automático</b>
                    <i>Nova</i>
                  </div>
                  <p>{notification.description}</p>
                  <small><span aria-hidden="true">◷</span> {notification.date}</small>
                </div>
                <button type="button" aria-label={`Remover: ${notification.title}`} title="Remover notificação" onClick={() => removeNotification(notification.id)}>×</button>
              </article>
            ))}
          </div>
        ) : (
          <div className="notifications-empty"><span aria-hidden="true">✓</span><h4>Tudo certo por aqui</h4><p>Não há novas notificações para exibir.</p><button type="button" onClick={() => onNavigate("Dashboard")}>Voltar ao dashboard</button></div>
        )}
      </section>
      {overlay}
    </section>
  );
}
