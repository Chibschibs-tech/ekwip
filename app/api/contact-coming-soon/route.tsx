import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, company, email, message } = body

    // Here you would typically send an email using a service like Resend, SendGrid, etc.
    // For now, we'll just log the data and return success
    console.log("Coming Soon Contact Form Submission:", {
      name,
      company,
      email,
      message,
      timestamp: new Date().toISOString(),
    })

    // In a real implementation, you would send an email to sales@ekwip.ma
    // Example with Resend:
    /*
    const resend = new Resend(process.env.RESEND_API_KEY)
    
    await resend.emails.send({
      from: 'noreply@ekwip.ma',
      to: 'sales@ekwip.ma',
      subject: `Nouveau contact depuis la page Coming Soon - ${company}`,
      html: `
        <h2>Nouveau contact depuis la page Coming Soon</h2>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Entreprise:</strong> ${company}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString('fr-FR')}</p>
      `
    })
    */

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing coming soon contact form:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
