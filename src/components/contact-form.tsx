"use client";

import { useState } from "react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
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
      setFormData({ name: "", email: "", phone: "", message: "" });

      // Limpar mensagem de sucesso após 3 segundos
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Erro desconhecido"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-group">
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Seu nome"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="seu@email.com"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Telefone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="(11) 98765-4321"
        />
      </div>

      <div className="form-group">
        <label htmlFor="message">Mensagem</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Descreva sua necessidade..."
          rows={5}
          required
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="button button--primary"
      >
        {status === "loading" ? "Enviando..." : "Enviar mensagem"}
      </button>

      {status === "success" && (
        <div className="form-message form-message--success">
          ✓ Mensagem enviada com sucesso! Em breve entraremos em contato.
        </div>
      )}

      {status === "error" && (
        <div className="form-message form-message--error">
          ✗ {errorMessage}
        </div>
      )}
    </form>
  );
}
