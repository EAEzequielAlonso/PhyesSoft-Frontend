// lib/email.ts

import { sendEmail, SendEmailParams } from "../lib/nodemailerConfig";
import {VerificationEmail} from "@/components"; // 👈 Ruta hacia tu componente

export async function sendVerificationEmail(to: string, code: string) {

  const email: SendEmailParams = {
    fromDescription: "PHYES Soft",
    to,
    subject: "Tu Codigo de Verficación",
    emailComponent: <VerificationEmail code={code} email={to} />,

  }
  sendEmail(email)
  try {
    const info = await sendEmail(email)
    console.log('Correo enviado:', info.response);
    return info;
  } catch (error) {
    console.error('Error enviando email:', error);
    throw error;
  }
}