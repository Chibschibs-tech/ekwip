import LocaleLink from "@/components/LocaleLink";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-3xl font-semibold mb-2">404 — Page introuvable</h1>
      <p className="mb-6">La page demandée n’existe pas ou a été déplacée.</p>
      <LocaleLink href="/" className="underline">Retour à l’accueil</LocaleLink>
    </main>
  );
}

// (facultatif) éviter l’indexation
export const dynamic = "force-dynamic";
