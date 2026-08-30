import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { sendLeadNotification } from './lib/mailer.js'

const PORT = Number(process.env.PORT || 5000)
const CLIENT_ORIGINS = String(process.env.CLIENT_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim().replace(/\/$/, ''))
  .filter(Boolean)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validateLead(body) {
  const fullName = String(body?.fullName || '').trim()
  const email = String(body?.email || '').trim()
  const phone = String(body?.phone || '').trim()
  const message = String(body?.message || '').trim()
  const errors = {}

  if (!fullName) errors.fullName = 'Please enter your full name.'
  if (!email) errors.email = 'Please enter your email address.'
  else if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.'
  if (!phone) errors.phone = 'Please enter your phone number.'
  else if (phone.length < 7) errors.phone = 'Please enter a complete phone number.'
  if (!message) errors.message = 'Please tell us about your requirements.'

  return { errors, values: { fullName, email, phone, message } }
}

const app = express()
app.disable('x-powered-by')
app.use(cors({ origin: CLIENT_ORIGINS }))
app.use(express.json({ limit: '32kb' }))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'ultacx-server' })
})

app.post('/api/contact', async (req, res) => {
  if (String(req.body?.botField || '').trim()) {
    return res.json({ ok: true })
  }

  const { errors, values } = validateLead(req.body)
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ ok: false, errors })
  }

  try {
    await sendLeadNotification(values)
    return res.json({ ok: true })
  } catch (error) {
    console.error('Failed to send lead notification:', error.message)
    return res.status(502).json({
      ok: false,
      message: 'Your request could not be sent just now. Please try again.',
    })
  }
})

app.use((err, _req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ ok: false, message: 'Invalid JSON payload.' })
  }
  return next(err)
})

app.listen(PORT, () => {
  console.log(`ULTA CX server listening on http://localhost:${PORT}`)
})
