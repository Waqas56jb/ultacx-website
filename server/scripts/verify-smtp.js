import 'dotenv/config'
import nodemailer from 'nodemailer'

const user = process.env.SMTP_USER
const pass = process.env.SMTP_PASS

if (!user || !pass) {
  console.error('SMTP_USER or SMTP_PASS is missing from .env')
  process.exit(1)
}

const candidates = [
  { host: 'smtp.zoho.com', port: 465, secure: true },
  { host: 'smtp.zoho.com', port: 587, secure: false },
  { host: 'smtppro.zoho.com', port: 465, secure: true },
  { host: 'smtppro.zoho.com', port: 587, secure: false },
  { host: 'smtp.zoho.eu', port: 465, secure: true },
  { host: 'smtp.zoho.in', port: 465, secure: true },
]

console.log(`Checking Zoho app password for ${user} (password not printed)\n`)

let valid = null

for (const candidate of candidates) {
  const transporter = nodemailer.createTransport({
    host: candidate.host,
    port: candidate.port,
    secure: candidate.secure,
    auth: { user, pass },
    connectionTimeout: 12000,
    greetingTimeout: 12000,
    socketTimeout: 12000,
  })

  const label = `${candidate.host}:${candidate.port} (${candidate.secure ? 'SSL' : 'STARTTLS'})`

  try {
    await transporter.verify()
    console.log(`VALID  ${label}`)
    valid = candidate
    break
  } catch (error) {
    console.log(`FAILED ${label}`)
    console.log(`        ${error.message}\n`)
  }
}

if (!valid) {
  console.error('App password is not valid on the Zoho SMTP hosts we tried.')
  process.exit(1)
}

console.log('\nApp password is valid.')
console.log(`Use SMTP_HOST=${valid.host} SMTP_PORT=${valid.port} SMTP_SECURE=${valid.secure}`)
process.exit(0)
