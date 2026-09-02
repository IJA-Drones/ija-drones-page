"use client";

import { useEffect, useState } from "react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (status !== "success") return;

    const timeout = window.setTimeout(() => setStatus("idle"), 5000);
    return () => window.clearTimeout(timeout);
  }, [status]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao enviar mensagem");
      }

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", interest: "", message: "" });
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Erro desconhecido"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="contact-form"
      aria-label="Formulário de contato"
      aria-busy={status === "loading"}
    >
      <header className="contact-form__header">
        <span>Contato direto</span>
        <h3>Conte sobre sua operação.</h3>
        <p>Preencha os dados abaixo e nossa equipe responderá pelo seu e-mail.</p>
      </header>

      <div className="form-group contact-interest">
        <label htmlFor="contact-interest">Área de interesse</label>
        <div className="contact-interest__select">
          <select
            id="contact-interest"
            name="interest"
            value={formData.interest}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Selecione uma opção
            </option>
            <option value="software">Software</option>
            <option value="pulverizacao">Pulverização</option>
            <option value="outros">Outros</option>
          </select>
          <span aria-hidden="true">⌄</span>
        </div>
      </div>

      <div className="contact-form__row">
        <div className="form-group">
          <label htmlFor="contact-name">Nome</label>
          <input
            type="text"
            id="contact-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Seu nome"
            autoComplete="name"
            maxLength={100}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact-phone">Telefone <span>opcional</span></label>
          <input
            type="tel"
            id="contact-phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(35) 99999-9999"
            autoComplete="tel"
            inputMode="tel"
            maxLength={30}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="contact-email">E-mail</label>
        <input
          type="email"
          id="contact-email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="seu@email.com"
          autoComplete="email"
          inputMode="email"
          maxLength={160}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="contact-message">Como podemos ajudar?</label>
        <textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Conte brevemente sobre sua área, operação ou necessidade."
          rows={4}
          maxLength={2000}
          required
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="button button--primary"
      >
        <span>{status === "loading" ? "Enviando mensagem..." : "Enviar para a IJA"}</span>
        <span className="contact-form__submit-icon" aria-hidden="true">
          {status === "loading" ? <i /> : "↗"}
        </span>
      </button>

      <p className="contact-form__privacy">Seus dados serão usados somente para responder a este contato.</p>

      {status === "success" && (
        <div className="form-message form-message--success" role="status" aria-live="polite">
          <span aria-hidden="true">✓</span>
          <p><strong>Mensagem enviada.</strong> Em breve nossa equipe entrará em contato.</p>
        </div>
      )}

      {status === "error" && (
        <div className="form-message form-message--error" role="alert">
          <span aria-hidden="true">!</span>
          <p><strong>Não foi possível enviar.</strong> {errorMessage}</p>
        </div>
      )}
    </form>
  );
}
