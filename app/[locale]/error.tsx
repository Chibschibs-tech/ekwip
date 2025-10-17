// app/[locale]/error.tsx
"use client";

import { useEffect } from "react";
import LocaleLink from "@/components/LocaleLink";

export default function Error({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-3xl font-semibold mb-2">Oups, une erreur est survenue.</h1>
      <p className="mb-6">Réessaie dans quelques instants.</p>
      <LocaleLink href="/" className="underline">Retour à l’accueil</LocaleLink>
    </main>
  );
}
