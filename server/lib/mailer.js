import nodemailer from 'nodemailer'
import { buildLeadEmail } from './leadEmail.js'

function requiredEnv(name) {
  const value = process.env[name]
  if (!value) throw new Error(`Missing required environment variable: ${name}`)
  return value
}

export function createTransport() {
  return nodemailer.createTransport({
    host: requiredEnv('SMTP_HOST'),
    port: Number(process.env.SMTP_PORT || 465),
    secure: String(process.env.SMTP_SECURE || 'true') === 'true',
    auth: {
      user: requiredEnv('SMTP_USER'),
      pass: requiredEnv('SMTP_PASS'),
    },
  })
}

export async function sendLeadNotification(payload) {
  const transporter = createTransport()
  const { subject, text, html } = buildLeadEmail(payload)

  return transporter.sendMail({
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
    to: requiredEnv('MAIL_TO'),
    replyTo: `${payload.fullName} <${payload.email}>`,
    subject,
    text,
    html,
  })
}
