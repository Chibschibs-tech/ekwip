"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(formData: FormData) {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const company = formData.get("company") as string
    const phone = formData.get("phone") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    if (!name || !email || !message) {
        return { error: "Veuillez remplir tous les champs obligatoires." }
    }

    try {
        const { data, error } = await resend.emails.send({
            from: "Ekwip Contact <onboarding@resend.dev>", // Using default Resend testing domain
            to: [process.env.CONTACT_EMAIL || "delivered@resend.dev"], // Use env var or default to testing address
            subject: `Nouveau message de ${name}: ${subject}`,
            html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Entreprise:</strong> ${company || "Non renseigné"}</p>
        <p><strong>Téléphone:</strong> ${phone || "Non renseigné"}</p>
        <p><strong>Sujet:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
        })

        if (error) {
            console.error("Resend error:", error)
            return { error: "Une erreur est survenue lors de l'envoi du message." }
        }

        return { success: true }
    } catch (error) {
        console.error("Server error:", error)
        return { error: "Une erreur interne est survenue." }
    }
}
