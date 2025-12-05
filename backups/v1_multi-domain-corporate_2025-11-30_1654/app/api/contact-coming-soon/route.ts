import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, phone, message } = body

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json({ error: "Nom et email sont requis" }, { status: 400 })
    }

    // Send email to sales team
    const emailContent = `
      Nouvelle demande de contact depuis la page "Bientôt disponible"
      
      Nom: ${name}
      Email: ${email}
      Entreprise: ${company || "Non spécifiée"}
      Téléphone: ${phone || "Non spécifié"}
      
      Message:
      ${message || "Aucun message"}
      
      ---
      Envoyé depuis ekwip.ma
    `

    await resend.emails.send({
      from: "contact@ekwip.ma",
      to: "sales@ekwip.ma",
      subject: `Nouvelle demande de contact - ${name}`,
      text: emailContent,
    })

    // Send confirmation email to user
    const confirmationContent = `
      Bonjour ${name},
      
      Merci pour votre intérêt pour Ekwip !
      
      Nous avons bien reçu votre demande et notre équipe vous contactera dans les plus brefs délais.
      
      En attendant, n'hésitez pas à nous contacter directement :
      - Email: sales@ekwip.ma
      - Téléphone: +212 5 22 XX XX XX
      
      Cordialement,
      L'équipe Ekwip
    `

    await resend.emails.send({
      from: "contact@ekwip.ma",
      to: email,
      subject: "Confirmation de votre demande - Ekwip",
      text: confirmationContent,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Erreur lors de l'envoi de l'email" }, { status: 500 })
  }
}
