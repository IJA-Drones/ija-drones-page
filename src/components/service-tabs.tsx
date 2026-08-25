"use client";

import { useState } from "react";

import { Icon } from "@/components/icon";
import { site, type SolutionKey } from "@/content/site";

export function ServiceTabs() {
  const [activeSolution, setActiveSolution] = useState<SolutionKey>("spraying");
  const solution = site.solutions[activeSolution];

  return (
    <div className="solution-experience">
      <div className="solution-tabs" role="tablist" aria-label="Soluções da IJA Drones">
        {(Object.keys(site.solutions) as SolutionKey[]).map((key) => {
          const item = site.solutions[key];
          const selected = activeSolution === key;

          return (
            <button
              key={key}
              id={`solution-tab-${key}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`solution-panel-${key}`}
              className={`solution-tab solution-tab--${item.color}${selected ? " solution-tab--active" : ""}`}
              onClick={() => setActiveSolution(key)}
            >
              <span>0{key === "spraying" ? "1" : "2"}</span>
              {item.label}
            </button>
          );
        })}
      </div>

      <div
        className={`solution-panel solution-panel--${solution.color}`}
        id={`solution-panel-${activeSolution}`}
        role="tabpanel"
        aria-labelledby={`solution-tab-${activeSolution}`}
      >
        <div className="solution-panel__intro">
          <span className="eyebrow">{solution.eyebrow}</span>
          <h3>{solution.title}</h3>
          <p>{solution.description}</p>
          <a className="text-link" href="#contato">
            Conversar com a equipe
            <Icon name="arrow" />
          </a>
        </div>

        <div className="solution-features">
          {solution.features.map((feature) => (
            <article key={feature.title}>
              <span className="feature-icon">
                <Icon name={feature.icon} />
              </span>
              <div>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
