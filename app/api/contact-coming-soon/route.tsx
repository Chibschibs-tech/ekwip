import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { name, email, company, message } = await request.json()

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    // Send email to sales@ekwip.ma
    await resend.emails.send({
      from: "noreply@ekwip.ma",
      to: "sales@ekwip.ma",
      subject: `Nouveau contact depuis la page Coming Soon - ${name}`,
      html: `
        <h2>Nouveau contact depuis la page Coming Soon</h2>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Entreprise:</strong> ${company || "Non spécifiée"}</p>
        <p><strong>Message:</strong></p>
        <p>${message || "Aucun message"}</p>
      `,
    })

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
