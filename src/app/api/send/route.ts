import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/content/site";

function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

export async function POST(req: Request) {
  try {
    // Verificar se a chave de API está configurada
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY não configurada");
      return NextResponse.json(
        { error: "Configuração do servidor incompleta." },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = await req.json();
    const { name, email, phone, message } = body;

    // Validação dos campos
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios." },
        { status: 400 }
      );
    }

    // Validação do email
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "E-mail inválido." },
        { status: 400 }
      );
    }

    // Sanitizar dados
    const sanitizedName = escapeHtml(name.trim());
    const sanitizedMessage = escapeHtml(message.trim());
    const sanitizedEmail = escapeHtml(email.trim());
    const sanitizedPhone = escapeHtml(phone?.trim() || "");

    const data = await resend.emails.send({
      from: "Contato IJA <onboarding@resend.dev>",
      to: [site.email],
      replyTo: email,
      subject: `Nova mensagem de contato: ${sanitizedName}`,
      html: `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nova Mensagem de Contato - IJA Drones</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', Arial, sans-serif; background-color: #f5f5f5;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5;">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <table width="100%" max-width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden;">
                  
                  <!-- Header com Cores IJA -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #72d526 0%, #39b9ee 100%); padding: 50px 30px 40px; text-align: center;">
                      <img src="https://ijadrones.com.br/images/ija-drones-logo-transparent.png" alt="IJA Drones" width="100" height="100" style="margin-bottom: 20px; max-width: 100%; height: auto;">
                      <p style="margin: 0 0 15px; font-size: 13px; font-weight: 700; color: #ffffff; letter-spacing: 1.2px; text-transform: uppercase;">Novo Potencial Cliente</p>
                      <h1 style="margin: 0; font-size: 32px; font-weight: 700; color: #ffffff; line-height: 1.2;">Olá, Equipe IJA!</h1>
                    </td>
                  </tr>

                  <!-- Descrição -->
                  <tr>
                    <td style="padding: 35px 30px 20px;">
                      <p style="margin: 0 0 10px; font-size: 15px; color: #333333; line-height: 1.7;">Um novo potencial cliente demonstrou interesse em conhecer as soluções de drones e aviação agrícola da IJA.</p>
                      <p style="margin: 0; font-size: 15px; color: #666666; line-height: 1.7;"><strong>Acompanhe os dados capturados abaixo e entre em contato para qualificar essa oportunidade.</strong></p>
                    </td>
                  </tr>

                  <!-- Box de Dados -->
                  <tr>
                    <td style="padding: 0 30px 30px;">
                      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
                        
                        <!-- Nome -->
                        <tr>
                          <td style="padding: 20px 25px; border-bottom: 1px solid #efefef;">
                            <p style="margin: 0 0 8px; font-size: 11px; font-weight: 800; color: #72d526; letter-spacing: 0.5px; text-transform: uppercase;">Nome</p>
                            <p style="margin: 0; font-size: 16px; font-weight: 600; color: #1a1a1a;">${sanitizedName}</p>
                          </td>
                        </tr>

                        <!-- Email -->
                        <tr>
                          <td style="padding: 20px 25px; border-bottom: 1px solid #efefef;">
                            <p style="margin: 0 0 8px; font-size: 11px; font-weight: 800; color: #72d526; letter-spacing: 0.5px; text-transform: uppercase;">E-mail</p>
                            <p style="margin: 0; font-size: 16px; font-weight: 600; color: #39b9ee;">
                              <a href="mailto:${sanitizedEmail}" style="color: #39b9ee; text-decoration: none;">${sanitizedEmail}</a>
                            </p>
                          </td>
                        </tr>

                        ${sanitizedPhone ? `
                        <!-- Telefone -->
                        <tr>
                          <td style="padding: 20px 25px; border-bottom: 1px solid #efefef;">
                            <p style="margin: 0 0 8px; font-size: 11px; font-weight: 800; color: #72d526; letter-spacing: 0.5px; text-transform: uppercase;">Telefone</p>
                            <p style="margin: 0; font-size: 16px; font-weight: 600; color: #1a1a1a;">
                              <a href="tel:${sanitizedPhone}" style="color: #1a1a1a; text-decoration: none;">${sanitizedPhone}</a>
                            </p>
                          </td>
                        </tr>
                        ` : ''}

                        <!-- Mensagem -->
                        <tr>
                          <td style="padding: 20px 25px;">
                            <p style="margin: 0 0 8px; font-size: 11px; font-weight: 800; color: #72d526; letter-spacing: 0.5px; text-transform: uppercase;">Mensagem</p>
                            <div style="margin: 0; font-size: 15px; color: #333333; line-height: 1.6; background: #ffffff; border-left: 4px solid #72d526; padding: 12px 15px; border-radius: 4px;">
                              ${sanitizedMessage.replace(/\n/g, "<br>")}
                            </div>
                          </td>
                        </tr>

                      </table>
                    </td>
                  </tr>

                  <!-- Botão CTA -->
                  <tr>
                    <td style="padding: 30px; text-align: center;">
                      <a href="mailto:${sanitizedEmail}?subject=Re:%20${encodeURIComponent(sanitizedName)}" style="display: inline-block; padding: 14px 40px; background: linear-gradient(135deg, #72d526 0%, #9af24b 100%); color: #06191d; text-decoration: none; border-radius: 50px; font-weight: 700; font-size: 14px; box-shadow: 0 4px 12px rgba(114, 213, 38, 0.25); transition: all 200ms ease; border: none; cursor: pointer;">
                        → Responder por E-mail
                      </a>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #06191d; padding: 30px; text-align: center; border-top: 3px solid #72d526;">
                      <p style="margin: 0 0 10px; font-size: 14px; font-weight: 700; color: #ffffff;">IJA Drones</p>
                      <p style="margin: 0 0 12px; font-size: 13px; color: #a4b6aa; line-height: 1.5;">Soluções tecnológicas avançadas para o mercado de drones e aviação agrícola.</p>
                      <p style="margin: 0; font-size: 11px; color: #5d7084;">© 2026 IJA System. Todos os direitos reservados.</p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    if (data.error) {
      console.error("Erro do Resend:", data.error);
      return NextResponse.json(
        { error: "Erro ao enviar mensagem. Tente novamente mais tarde." },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: "Mensagem enviada com sucesso!" 
    }, { status: 200 });
  } catch (error) {
    console.error("Erro na rota de contato:", error);
    return NextResponse.json(
      { error: "Erro ao processar sua mensagem. Tente novamente mais tarde." },
      { status: 500 }
    );
  }
}