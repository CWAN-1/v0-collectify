"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  })
  const [agreeTerms, setAgreeTerms] = useState(false)
  const router = useRouter()

  const passwordChecks = [
    { label: "Minimal 8 karakter", valid: formData.password.length >= 8 },
    { label: "Satu huruf besar", valid: /[A-Z]/.test(formData.password) },
    { label: "Satu angka", valid: /[0-9]/.test(formData.password) },
  ]

  const handleRegister = () => {
    router.push("/setup-profile")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center px-4 pt-12 pb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="size-5" />
        </Button>
      </div>

      <div className="flex-1 px-6 overflow-auto">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Buat Akun
          </h1>
          <p className="text-muted-foreground">
            Bergabung dengan komunitas kolektor trading card.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Name */}
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Nama Lengkap"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="h-14 pl-12 rounded-2xl bg-muted border-0 text-base"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="h-14 pl-12 rounded-2xl bg-muted border-0 text-base"
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <Input
              type="tel"
              placeholder="Nomor Telepon"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="h-14 pl-12 rounded-2xl bg-muted border-0 text-base"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Kata Sandi"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="h-14 pl-12 pr-12 rounded-2xl bg-muted border-0 text-base"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </button>
          </div>

          {/* Password Requirements */}
          <div className="space-y-2 pt-2">
            {passwordChecks.map((check, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className={`size-4 rounded-full flex items-center justify-center ${
                  check.valid ? "bg-foreground" : "bg-border"
                }`}>
                  {check.valid && <Check className="size-2.5 text-background" />}
                </div>
                <span className={`text-sm ${check.valid ? "text-foreground" : "text-muted-foreground"}`}>
                  {check.label}
                </span>
              </div>
            ))}
          </div>

          {/* Terms */}
          <div className="flex items-start gap-3 pt-2">
            <Checkbox
              id="terms"
              checked={agreeTerms}
              onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
              className="mt-0.5"
            />
            <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
              Saya setuju dengan{" "}
              <Link href="/terms" className="font-medium text-foreground underline">
                Syarat & Ketentuan
              </Link>{" "}
              dan{" "}
              <Link href="/privacy" className="font-medium text-foreground underline">
                Kebijakan Privasi
              </Link>
            </label>
          </div>
        </div>

        {/* Register Button */}
        <Button
          onClick={handleRegister}
          disabled={!agreeTerms}
          className="w-full h-14 rounded-full text-base font-semibold mt-8"
        >
          Daftar
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-8">
          <Separator className="flex-1" />
          <span className="text-muted-foreground text-sm">atau daftar dengan</span>
          <Separator className="flex-1" />
        </div>

        {/* Social Login */}
        <div className="flex gap-4">
          <Button variant="outline" className="flex-1 h-14 rounded-2xl border-border">
            <svg className="size-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </Button>
          <Button variant="outline" className="flex-1 h-14 rounded-2xl border-border">
            <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
          </Button>
          <Button variant="outline" className="flex-1 h-14 rounded-2xl border-border">
            <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-12 pt-8">
        <p className="text-center text-muted-foreground">
          Sudah punya akun?{" "}
          <Link href="/login" className="font-semibold text-foreground">
            Masuk
          </Link>
        </p>
      </div>
    </div>
  )
}
