import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, company, email, message, to, subject } = body

    // Here you would integrate with your email service
    // For example, using Resend, SendGrid, or similar

    // Simulate email sending for now
    console.log("Sending email to:", to)
    console.log("Subject:", subject)
    console.log("From:", { name, company, email })
    console.log("Message:", message)

    // In a real implementation, you would do something like:
    /*
    const emailContent = `
      Nouveau contact depuis la page Coming Soon:
      
      Nom: ${name}
      Entreprise: ${company}
      Email: ${email}
      
      Message:
      ${message}
    `
    
    await sendEmail({
      to: 'sales@ekwip.ma',
      subject: subject,
      text: emailContent,
      replyTo: email
    })
    */

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
