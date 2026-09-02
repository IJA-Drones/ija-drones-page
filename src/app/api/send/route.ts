import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/content/site";
import { createContactNotification } from "@/emails/contact-notification";

const interestLabels = {
  software: "Software",
  pulverizacao: "Pulverização",
  outros: "Outros",
} as const;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY não configurada");
      return NextResponse.json(
        { error: "Configuração do servidor incompleta." },
        { status: 500 }
      );
    }

    const body = (await req.json()) as Record<string, unknown>;
    const { name, email, phone, interest, message } = body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios." },
        { status: 400 }
      );
    }

    if (typeof interest !== "string" || !(interest in interestLabels)) {
      return NextResponse.json(
        { error: "Selecione uma área de interesse válida." },
        { status: 400 }
      );
    }

    if (phone !== undefined && typeof phone !== "string") {
      return NextResponse.json(
        { error: "Telefone inválido." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim();

    if (!isValidEmail(cleanEmail)) {
      return NextResponse.json(
        { error: "E-mail inválido." },
        { status: 400 }
      );
    }

    const notification = await createContactNotification({
      name: name.trim(),
      email: cleanEmail,
      phone: phone?.trim() || "",
      interest: interestLabels[interest as keyof typeof interestLabels],
      message: message.trim(),
    });
    const resend = new Resend(process.env.RESEND_API_KEY);
    const data = await resend.emails.send({
      from: "Contato IJA <onboarding@resend.dev>",
      to: [site.email],
      replyTo: cleanEmail,
      subject: notification.subject,
      html: notification.html,
      text: notification.text,
    });

    if (data.error) {
      console.error("Erro do Resend:", data.error);
      return NextResponse.json(
        { error: "Erro ao enviar mensagem. Tente novamente mais tarde." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Mensagem enviada com sucesso!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro na rota de contato:", error);
    return NextResponse.json(
      { error: "Erro ao processar sua mensagem. Tente novamente mais tarde." },
      { status: 500 }
    );
  }
}
