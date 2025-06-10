"use client"

import { useLanguage } from "@/contexts/language-context"

export default function TranslationTest() {
  const { t, language, setLanguage } = useLanguage()

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 border rounded shadow-lg z-50">
      <div className="text-xs text-gray-500 mb-2">Translation Test</div>
      <div className="text-sm mb-2">
        Current: {language} | {t("nav.catalog")}
      </div>
      <div className="flex gap-1">
        <button onClick={() => setLanguage("fr")} className="px-2 py-1 text-xs bg-blue-100 rounded">
          FR
        </button>
        <button onClick={() => setLanguage("en")} className="px-2 py-1 text-xs bg-blue-100 rounded">
          EN
        </button>
        <button onClick={() => setLanguage("es")} className="px-2 py-1 text-xs bg-blue-100 rounded">
          ES
        </button>
      </div>
    </div>
  )
}
