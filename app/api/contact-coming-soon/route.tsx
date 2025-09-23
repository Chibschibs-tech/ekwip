import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, company, email, message } = body

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Ekwip Website <noreply@ekwip.ma>",
      to: ["sales@ekwip.ma"],
      subject: `Nouveau contact depuis la page Coming Soon - ${company}`,
      html: `
        <h2>Nouveau contact depuis la page Coming Soon</h2>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Entreprise:</strong> ${company}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message || "Aucun message spécifique"}</p>
      `,
    })

    if (error) {
      console.error("Error sending email:", error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
