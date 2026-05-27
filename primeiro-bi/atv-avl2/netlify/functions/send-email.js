import nodemailer from 'nodemailer'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }
}

function getRequiredEnv(name) {
  const value = process.env[name]

  if (!value) {
    throw new Error(`Variavel de ambiente ausente: ${name}`)
  }

  return value
}

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { error: 'Metodo nao permitido.' })
  }

  try {
    const { email, message } = JSON.parse(event.body || '{}')
    const normalizedEmail = String(email || '').trim()
    const normalizedMessage = String(message || '').trim()

    if (!emailRegex.test(normalizedEmail)) {
      return jsonResponse(400, { error: 'Informe um email valido.' })
    }

    if (normalizedMessage.length < 10) {
      return jsonResponse(400, {
        error: 'Escreva uma mensagem com pelo menos 10 caracteres.',
      })
    }

    const transporter = nodemailer.createTransport({
      host: getRequiredEnv('SMTP_HOST'),
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: getRequiredEnv('SMTP_USER'),
        pass: getRequiredEnv('SMTP_PASS'),
      },
    })

    const fixedRecipient = process.env.MAIL_TO?.trim()
    const recipients = fixedRecipient
      ? [fixedRecipient, normalizedEmail]
      : [normalizedEmail]

    await transporter.sendMail({
      from: process.env.MAIL_FROM || getRequiredEnv('SMTP_USER'),
      to: recipients,
      replyTo: normalizedEmail,
      subject: 'Novo contato pelo site DEVHUB',
      text: `Email: ${normalizedEmail}\n\nMensagem:\n${normalizedMessage}`,
      html: `
        <h2>Novo contato pelo site DEVHUB</h2>
        <p><strong>Email:</strong> ${normalizedEmail}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${normalizedMessage.replaceAll('\n', '<br>')}</p>
      `,
    })

    return jsonResponse(200, { message: 'Email enviado com sucesso.' })
  } catch (error) {
    console.error(error)

    if (process.env.NODE_ENV !== 'production') {
      return jsonResponse(500, {
        error: error.message,
      })
    }

    return jsonResponse(500, {
      error:
        'Nao foi possivel enviar o email. Confira as variaveis SMTP no Netlify.',
    })
  }
}
