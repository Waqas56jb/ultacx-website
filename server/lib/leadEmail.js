function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function formatReceivedAt(date = new Date()) {
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Africa/Kigali',
    timeZoneName: 'short',
  }).format(date)
}

function row(label, value, href) {
  const safeLabel = escapeHtml(label)
  const safeValue = escapeHtml(value)
  const inner = href
    ? `<a href="${escapeHtml(href)}" style="color:#0F8BD4;text-decoration:none;font-weight:600;">${safeValue}</a>`
    : safeValue

  return `
    <tr>
      <td style="padding:14px 18px 4px;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#7B9DD0;font-weight:700;">
        ${safeLabel}
      </td>
    </tr>
    <tr>
      <td style="padding:0 18px 14px;font-size:16px;line-height:1.5;color:#0B2450;font-weight:600;border-bottom:1px solid #EEF3FA;">
        ${inner}
      </td>
    </tr>
  `
}

export function buildLeadEmail({ fullName, email, phone, message }) {
  const receivedAt = formatReceivedAt()
  const safeName = escapeHtml(fullName)
  const safeMessage = escapeHtml(message).replace(/\r\n|\r|\n/g, '<br />')
  const replyHref = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(`Re: Your ULTA CX enquiry`)}`

  const subject = `New website lead — ${fullName}`

  const text = [
    'New ULTA CX website lead',
    '',
    `Name: ${fullName}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Received: ${receivedAt}`,
    '',
    'Requirements:',
    message,
  ].join('\n')

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0;padding:0;background:#EEF3FA;font-family:Inter,Segoe UI,Helvetica,Arial,sans-serif;color:#0B2450;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#EEF3FA;padding:32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 18px 44px -12px rgba(11,36,80,0.16);">
            <tr>
              <td style="background:#0B2450;padding:36px 32px 32px;">
                <p style="margin:0;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#A2DAF8;font-weight:700;">
                  Customer Experience Solutions
                </p>
                <h1 style="margin:12px 0 0;font-size:28px;line-height:1.15;letter-spacing:-0.03em;color:#ffffff;font-weight:800;">
                  ULTA CX
                </h1>
                <p style="margin:10px 0 0;font-size:15px;color:#D6E2F2;">
                  Your Brand. Our Team. One Customer Experience.
                </p>
                <div style="margin-top:22px;height:3px;width:72px;background:linear-gradient(90deg,#0F8BD4 0%,#3FA935 55%,#E9A81C 100%);border-radius:999px;"></div>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 32px 8px;">
                <span style="display:inline-block;padding:6px 12px;border-radius:999px;background:#ECF7FE;color:#0A6EAE;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;font-weight:700;">
                  New website lead
                </span>
                <h2 style="margin:16px 0 0;font-size:24px;line-height:1.25;letter-spacing:-0.025em;color:#0B2450;">
                  ${safeName} just requested a conversation
                </h2>
                <p style="margin:12px 0 0;font-size:15px;line-height:1.6;color:#1D4788;">
                  A new enquiry was submitted on the ULTA CX landing page. Reply directly from this email to reach the lead.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 8px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F7FAFD;border:1px solid #D6E2F2;border-radius:18px;">
                  ${row('Full name', fullName)}
                  ${row('Business email', email, `mailto:${email}`)}
                  ${row('Phone number', phone, `tel:${phone}`)}
                  ${row('Received', receivedAt)}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 8px;">
                <p style="margin:0 0 10px;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#7B9DD0;font-weight:700;">
                  Requirements
                </p>
                <div style="padding:18px 20px;background:#ffffff;border:1px solid #D6E2F2;border-left:4px solid #0F8BD4;border-radius:14px;font-size:15px;line-height:1.7;color:#0F2A5A;">
                  ${safeMessage}
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px 36px;" align="center">
                <a href="${escapeHtml(replyHref)}" style="display:inline-block;background:#0F8BD4;color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;padding:14px 28px;border-radius:999px;">
                  Reply to ${safeName}
                </a>
              </td>
            </tr>
            <tr>
              <td style="background:#071A38;padding:22px 32px;text-align:center;">
                <p style="margin:0;font-size:12px;line-height:1.6;color:#AEC4E4;">
                  Sent automatically from the ultacx.com contact form.
                </p>
                <p style="margin:6px 0 0;font-size:12px;color:#7B9DD0;">
                  © ${new Date().getFullYear()} ULTA CX Ltd. All Rights Reserved.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`

  return { subject, text, html }
}
