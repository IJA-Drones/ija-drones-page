import type { ReactNode } from "react";

type SystemPageTitleProps = {
  description?: ReactNode;
  eyebrow?: string;
  icon: ReactNode;
  id: string;
  meta?: ReactNode;
  title: string;
};

export function SystemPageTitle({ description, eyebrow, icon, id, meta, title }: SystemPageTitleProps) {
  return (
    <div className="system-page-title">
      <span className="system-page-title__icon" aria-hidden="true">{icon}</span>
      <div className="system-page-title__copy">
        {eyebrow ? <small className="system-page-title__eyebrow">{eyebrow}</small> : null}
        <h3 id={id}>{title}</h3>
        {description ? <p className="system-page-title__description">{description}</p> : null}
        {meta ? <small className="system-page-title__meta">{meta}</small> : null}
      </div>
    </div>
  );
}
