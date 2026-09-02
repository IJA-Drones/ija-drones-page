/* eslint-disable @next/next/no-head-element, @next/next/no-img-element -- E-mail HTML needs raw head and img elements. */
import type { CSSProperties } from "react";
import { render } from "@react-email/render";

type ContactNotificationProps = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  receivedAt: string;
};

const fontFamily =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif";

const labelStyle: CSSProperties = {
  margin: "0 0 7px",
  color: "#728182",
  fontSize: "10px",
  fontWeight: 800,
  letterSpacing: "1px",
  textTransform: "uppercase",
};

function ContactNotificationEmail({
  name,
  email,
  phone,
  interest,
  message,
  receivedAt,
}: ContactNotificationProps) {
  const phoneHref = phone.replace(/[^\d+]/g, "");
  const replySubject = encodeURIComponent("Retorno IJA Drones — " + name);

  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
        <style>
          {"@media only screen and (max-width:620px){.email-shell{padding:16px 10px!important}.email-card{border-radius:20px!important}.email-header,.email-content,.email-footer{padding-left:22px!important;padding-right:22px!important}.contact-column{display:block!important;width:100%!important;box-sizing:border-box!important;border-left:0!important}.contact-column+.contact-column{border-top:1px solid #e2eae4!important}.cta-link{display:block!important;text-align:center!important}}"}
        </style>
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#eef3ef",
          color: "#102326",
          fontFamily,
        }}
      >
        <div
          style={{
            display: "none",
            maxHeight: 0,
            overflow: "hidden",
            opacity: 0,
          }}
        >
          Novo contato de {name} com interesse em {interest}.
        </div>

        <table
          role="presentation"
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          border={0}
          style={{ width: "100%", backgroundColor: "#eef3ef" }}
        >
          <tbody>
            <tr>
              <td
                className="email-shell"
                align="center"
                style={{ padding: "38px 16px" }}
              >
                <table
                  role="presentation"
                  className="email-card"
                  width="100%"
                  cellPadding="0"
                  cellSpacing="0"
                  border={0}
                  style={{
                    width: "100%",
                    maxWidth: "620px",
                    overflow: "hidden",
                    border: "1px solid #dfe8e1",
                    borderRadius: "26px",
                    backgroundColor: "#ffffff",
                    boxShadow: "0 18px 50px rgba(10,35,37,.10)",
                  }}
                >
                  <tbody>
                    <tr>
                      <td
                        className="email-header"
                        style={{
                          padding: "30px 34px 32px",
                          backgroundColor: "#08272a",
                        }}
                      >
                        <table
                          role="presentation"
                          width="100%"
                          cellPadding="0"
                          cellSpacing="0"
                          border={0}
                        >
                          <tbody>
                            <tr>
                              <td valign="middle">
                                <img
                                  src="https://ijadrones.com.br/images/ija-drones-logo-transparent.png"
                                  width="64"
                                  alt="IJA Drones"
                                  style={{
                                    display: "block",
                                    width: "64px",
                                    height: "auto",
                                    border: 0,
                                  }}
                                />
                              </td>
                              <td align="right" valign="middle">
                                <span
                                  style={{
                                    display: "inline-block",
                                    padding: "8px 12px",
                                    border: "1px solid rgba(154,242,75,.35)",
                                    borderRadius: "999px",
                                    backgroundColor: "rgba(154,242,75,.10)",
                                    color: "#b7ff78",
                                    fontSize: "10px",
                                    fontWeight: 800,
                                    letterSpacing: "1.2px",
                                    textTransform: "uppercase",
                                  }}
                                >
                                  Novo contato
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <p
                          style={{
                            margin: "28px 0 8px",
                            color: "#9af24b",
                            fontSize: "12px",
                            fontWeight: 800,
                            letterSpacing: "1.4px",
                            textTransform: "uppercase",
                          }}
                        >
                          Lead recebido pelo site
                        </p>
                        <h1
                          style={{
                            margin: 0,
                            color: "#ffffff",
                            fontSize: "30px",
                            lineHeight: 1.18,
                            letterSpacing: "-.7px",
                          }}
                        >
                          Uma nova oportunidade chegou.
                        </h1>
                        <p
                          style={{
                            margin: "14px 0 0",
                            color: "#a9bcbc",
                            fontSize: "14px",
                            lineHeight: 1.6,
                          }}
                        >
                          Confira os dados abaixo e responda diretamente para
                          iniciar a conversa.
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td
                        className="email-content"
                        style={{ padding: "30px 34px 34px" }}
                      >
                        <p style={labelStyle}>Área de interesse</p>
                        <span
                          style={{
                            display: "inline-block",
                            marginBottom: "24px",
                            padding: "9px 14px",
                            borderRadius: "999px",
                            backgroundColor: "#eafbdc",
                            color: "#2c6812",
                            fontSize: "13px",
                            fontWeight: 800,
                          }}
                        >
                          {interest}
                        </span>

                        <table
                          role="presentation"
                          width="100%"
                          cellPadding="0"
                          cellSpacing="0"
                          border={0}
                          style={{
                            width: "100%",
                            border: "1px solid #e2eae4",
                            borderRadius: "16px",
                            backgroundColor: "#f8faf8",
                          }}
                        >
                          <tbody>
                            <tr>
                              <td
                                className="contact-column"
                                width="50%"
                                valign="top"
                                style={{
                                  padding: "20px 22px",
                                  borderBottom: "1px solid #e2eae4",
                                }}
                              >
                                <p style={labelStyle}>Nome</p>
                                <p
                                  style={{
                                    margin: 0,
                                    color: "#102326",
                                    fontSize: "16px",
                                    fontWeight: 750,
                                    lineHeight: 1.45,
                                  }}
                                >
                                  {name}
                                </p>
                              </td>
                              <td
                                className="contact-column"
                                width="50%"
                                valign="top"
                                style={{
                                  padding: "20px 22px",
                                  borderBottom: "1px solid #e2eae4",
                                  borderLeft: "1px solid #e2eae4",
                                }}
                              >
                                <p style={labelStyle}>Recebido em</p>
                                <p
                                  style={{
                                    margin: 0,
                                    color: "#102326",
                                    fontSize: "14px",
                                    fontWeight: 650,
                                    lineHeight: 1.45,
                                  }}
                                >
                                  {receivedAt}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td
                                colSpan={2}
                                style={{
                                  padding: "20px 22px",
                                  borderBottom: phone
                                    ? "1px solid #e2eae4"
                                    : undefined,
                                }}
                              >
                                <p style={labelStyle}>E-mail</p>
                                <a
                                  href={"mailto:" + email}
                                  style={{
                                    color: "#167596",
                                    fontSize: "15px",
                                    fontWeight: 700,
                                    textDecoration: "none",
                                    wordBreak: "break-all",
                                  }}
                                >
                                  {email}
                                </a>
                              </td>
                            </tr>
                            {phone && (
                              <tr>
                                <td
                                  colSpan={2}
                                  style={{ padding: "20px 22px" }}
                                >
                                  <p style={labelStyle}>Telefone</p>
                                  <a
                                    href={"tel:" + phoneHref}
                                    style={{
                                      color: "#102326",
                                      fontSize: "15px",
                                      fontWeight: 700,
                                      textDecoration: "none",
                                    }}
                                  >
                                    {phone}
                                  </a>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>

                        <p style={{ ...labelStyle, marginTop: "24px" }}>
                          Mensagem enviada
                        </p>
                        <div
                          style={{
                            padding: "20px 22px",
                            borderLeft: "4px solid #9af24b",
                            borderRadius: "4px 14px 14px 4px",
                            backgroundColor: "#f3f7f3",
                            color: "#26393a",
                            fontSize: "15px",
                            lineHeight: 1.7,
                            whiteSpace: "pre-wrap",
                          }}
                        >
                          {message}
                        </div>

                        <a
                          className="cta-link"
                          href={
                            "mailto:" + email + "?subject=" + replySubject
                          }
                          style={{
                            display: "inline-block",
                            marginTop: "28px",
                            padding: "15px 24px",
                            borderRadius: "999px",
                            backgroundColor: "#9af24b",
                            color: "#0b292c",
                            fontSize: "14px",
                            fontWeight: 800,
                            textDecoration: "none",
                          }}
                        >
                          Responder para {name} &nbsp;→
                        </a>
                        <p
                          style={{
                            margin: "14px 0 0",
                            color: "#819091",
                            fontSize: "11px",
                            lineHeight: 1.55,
                          }}
                        >
                          Ao responder este e-mail normalmente, a resposta
                          também será enviada diretamente para o contato.
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td
                        className="email-footer"
                        style={{
                          padding: "21px 34px",
                          borderTop: "1px solid #e2eae4",
                          backgroundColor: "#f8faf8",
                        }}
                      >
                        <p
                          style={{
                            margin: 0,
                            color: "#607172",
                            fontSize: "11px",
                            lineHeight: 1.55,
                          }}
                        >
                          Mensagem automática enviada pelo formulário do site{" "}
                          <strong style={{ color: "#173436" }}>
                            IJA Drones
                          </strong>
                          .
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
}

function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export async function createContactNotification(
  input: Omit<ContactNotificationProps, "receivedAt">
) {
  const data: ContactNotificationProps = {
    name: singleLine(input.name),
    email: singleLine(input.email),
    phone: singleLine(input.phone),
    interest: singleLine(input.interest),
    message: input.message.trim(),
    receivedAt: new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "long",
      timeStyle: "short",
      timeZone: "America/Sao_Paulo",
    }).format(new Date()),
  };

  const subject =
    "Novo contato · " + data.interest + ": " + data.name;
  const text = [
    "NOVO CONTATO PELO SITE — IJA DRONES",
    "",
    "Área de interesse: " + data.interest,
    "Nome: " + data.name,
    "E-mail: " + data.email,
    data.phone ? "Telefone: " + data.phone : null,
    "Recebido em: " + data.receivedAt,
    "",
    "Mensagem:",
    data.message,
    "",
    "Responda este e-mail para falar diretamente com o contato.",
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  return {
    html: await render(<ContactNotificationEmail {...data} />),
    subject,
    text,
  };
}
