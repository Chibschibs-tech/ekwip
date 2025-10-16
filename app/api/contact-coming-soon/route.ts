// app/api/contact-coming-soon/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

// POST /api/contact-coming-soon
export async function POST(req: Request) {
  // Ne jamais créer le client au top-level (ça casse en build).
  const key = process.env.RESEND_API_KEY;

  // En build/preview locale sans clé, on NE jette PAS d'erreur
  if (!key) {
    // Log optionnel: console.warn("RESEND_API_KEY manquante, email désactivé");
    return NextResponse.json({ ok: true, emailDisabled: true }, { status: 202 });
  }

  // Avec clé → traitement normal
  const resend = new Resend(key);
  const payload = await req.json().catch(() => ({}));

  // TODO: adapte selon ton schéma
  // await resend.emails.send({ from, to, subject, text/html/react ... });

  return NextResponse.json({ ok: true }, { status: 200 });
}
