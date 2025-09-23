import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Nom, email et message sont requis" }, { status: 400 })
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Ekwip Contact <noreply@ekwip.ma>",
      to: ["sales@ekwip.ma"],
      subject: "Nouveau contact depuis la page Coming Soon",
      html: `
        <h2>Nouveau contact depuis la page Coming Soon</h2>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Entreprise:</strong> ${company}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ error: "Erreur lors de l'envoi de l'email" }, { status: 500 })
    }

    return NextResponse.json({ message: "Message envoyé avec succès" }, { status: 200 })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}
