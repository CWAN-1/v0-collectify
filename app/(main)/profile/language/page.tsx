"use client"

import { useState } from "react"
import { ArrowLeft, Check, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const languages = [
  { id: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { id: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", flag: "🇮🇩" },
]

export default function LanguagePage() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")

  const handleSelectLanguage = (langId: string) => {
    setSelectedLanguage(langId)
    // In a real app, this would update the app's locale
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="flex items-center justify-center relative px-4 h-14">
          <Link href="/profile" className="absolute left-4">
            <Button variant="ghost" size="icon" className="size-9">
              <ArrowLeft className="size-5" />
            </Button>
          </Link>
          <h1 className="text-sm font-semibold">Language</h1>
        </div>
      </header>

      <main className="p-4">
        <div className="flex items-center gap-3 mb-4 p-4 bg-secondary/50 rounded-xl">
          <Globe className="size-5 text-primary" />
          <p className="text-sm text-muted-foreground">
            Select your preferred language for the app interface
          </p>
        </div>

        <div className="space-y-2">
          {languages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => handleSelectLanguage(lang.id)}
              className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-colors ${
                selectedLanguage === lang.id
                  ? "bg-primary/10 border-primary"
                  : "bg-card border-border hover:bg-secondary/50"
              }`}
            >
              <span className="text-2xl">{lang.flag}</span>
              <div className="flex-1 text-left">
                <h3 className="font-medium text-foreground">{lang.name}</h3>
                <p className="text-sm text-muted-foreground">{lang.nativeName}</p>
              </div>
              {selectedLanguage === lang.id && (
                <div className="size-6 bg-primary rounded-full flex items-center justify-center">
                  <Check className="size-4 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </main>
    </div>
  )
}
