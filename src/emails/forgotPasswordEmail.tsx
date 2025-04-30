// lib/email.ts

import { sendEmail, SendEmailParams } from "../lib/nodemailerConfig";
import { ResetPasswordEmail } from "@/components";

export async function forgotPasswordEmail(to: string, resetLink: string) {

    const email: SendEmailParams = {
        fromDescription: "Soporte",
        to,
        subject: "Recupera tu Contraseña",
        emailComponent: <ResetPasswordEmail resetLink={resetLink} email={to}/>,
    }

  try {
    const info = await sendEmail(email)
    console.log('Correo enviado:', info.response);
    return info;
  } catch (error) {
    console.error('Error enviando email:', error);
    throw error;
  }
}