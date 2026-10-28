import { Icon } from "@/components/icon";
import { site } from "@/content/site";

export function SoftwareRegistration() {
  const registration = site.softwareRegistration;
  const issuedAtLabel = registration.issuedAt
    ? new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(
        new Date(`${registration.issuedAt}T00:00:00Z`),
      )
    : null;

  return (
    <section
      className="software-registration container"
      id="registro-inpi"
      aria-labelledby="software-registration-title"
    >
      <div className="software-registration__card" data-reveal>
        <div className="software-registration__icon" aria-hidden="true">
          <Icon name="report" />
        </div>

        <div className="software-registration__copy">
          <span className="kicker">Registro de software</span>
          <h3 id="software-registration-title">
            Tecnologia própria.<br />Registrada no INPI.
          </h3>
          <p>
            O {registration.name} é um programa de computador registrado no
            Instituto Nacional da Propriedade Industrial, parte da tecnologia
            desenvolvida pela IJA para a gestão de operações.
          </p>

          {(registration.certificateUrl || registration.consultationUrl) && (
            <div className="software-registration__actions">
              {registration.certificateUrl && (
                <a
                  className="button button--primary"
                  href={registration.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver certificado (PDF)
                  <span aria-hidden="true">↗</span>
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              )}
              {registration.consultationUrl && (
                <a
                  className="button software-registration__consultation"
                  href={registration.consultationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Consultar no INPI
                  <span aria-hidden="true">↗</span>
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              )}
            </div>
          )}
          {registration.consultationUrl && registration.number && (
            <p className="software-registration__lookup-note">
              Na busca de programas de computador, informe o número do registro.
            </p>
          )}
        </div>

        <dl className="software-registration__details">
          <div>
            <dt>Programa</dt>
            <dd className="software-registration__name">{registration.name}</dd>
          </div>
          <div>
            <dt>Modalidade do registro</dt>
            <dd>Programa de computador</dd>
          </div>
          {registration.number && (
            <div><dt>Número do registro</dt><dd>{registration.number}</dd></div>
          )}
          {registration.holder && (
            <div><dt>Titular</dt><dd>{registration.holder}</dd></div>
          )}
          {registration.issuedAt && (
            <div>
              <dt>Data de expedição</dt>
              <dd><time dateTime={registration.issuedAt}>{issuedAtLabel}</time></dd>
            </div>
          )}
        </dl>
      </div>
    </section>
  );
}
