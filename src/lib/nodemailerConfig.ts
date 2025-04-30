import nodemailer from "nodemailer";
import { ReactElement } from "react";
import { render } from "@react-email/render"; 

const transporter = nodemailer.createTransport({
    service: 'gmail', // O puede ser 'smtp.mailgun.org', 'SendGrid', etc.
    auth: {
      user: process.env.SMTP_EMAIL,     // tu correo
      pass: process.env.SMTP_PASSWORD,  // tu contraseña o app password
    },
  });

export interface SendEmailParams {
  fromDescription: string; 
  to: string;
  subject: string;
  emailComponent: ReactElement;
}

export async function sendEmail({ fromDescription, to, subject, emailComponent }: SendEmailParams) {
  return await transporter.sendMail({
    from: `${fromDescription} <${process.env.SMTP_USER}>`,
    to,
    subject,
    html: await render(emailComponent),
  });
}
