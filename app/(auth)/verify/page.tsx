"use client"

import { useState, useRef, useEffect, Suspense } from "react"
import { ArrowLeft, ArrowRight, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"

function VerifyContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""
  
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [resendTimer, setResendTimer] = useState(60)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendTimer])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1)
    if (!/^\d*$/.test(value)) return

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").slice(0, 6)
    if (!/^\d+$/.test(pastedData)) return

    const newCode = [...code]
    pastedData.split("").forEach((char, index) => {
      if (index < 6) newCode[index] = char
    })
    setCode(newCode)
    const lastFilledIndex = Math.min(pastedData.length - 1, 5)
    inputRefs.current[lastFilledIndex]?.focus()
  }

  const handleVerify = async () => {
    const fullCode = code.join("")
    if (fullCode.length !== 6) return

    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    router.push(`/setup?email=${encodeURIComponent(email)}`)
  }

  const handleResend = async () => {
    if (resendTimer > 0) return
    setResendTimer(60)
  }

  const isCodeComplete = code.every(digit => digit !== "")

  return (
    <div className="h-screen bg-background overflow-hidden flex flex-col">
      {/* Header */}
      <header className="flex items-center px-4 pt-4 pb-2 shrink-0">
        <Link href="/register" className="p-2 -ml-2">
          <ArrowLeft className="size-5 text-foreground" />
        </Link>
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col px-5">
        {/* Logo + Title */}
        <div className="flex flex-col items-center pt-4 pb-5">
          <Image
            src="/logo.png"
            alt="Collectify"
            width={100}
            height={30}
            className="h-7 mb-4"
            style={{ width: "auto" }}
            priority
          />
          <h1 className="text-lg font-bold text-foreground mb-0.5">Verify Your Email</h1>
          <p className="text-xs text-muted-foreground">{"We've sent a 6-digit code to"}</p>
          <p className="text-xs text-foreground font-medium">{email || "your email"}</p>
        </div>

        {/* Code Input */}
        <div className="flex justify-center gap-2 mb-5">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-10 h-11 text-center text-lg font-bold bg-card border border-border rounded-xl text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
            />
          ))}
        </div>

        {/* Resend */}
        <div className="text-center mb-5">
          {resendTimer > 0 ? (
            <p className="text-xs text-muted-foreground">
              Resend code in <span className="text-foreground font-medium">{resendTimer}s</span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="text-xs text-primary font-medium flex items-center gap-1 mx-auto hover:underline"
            >
              <RefreshCw className="size-3" />
              Resend Code
            </button>
          )}
        </div>

        {/* Verify Button */}
        <Button
          onClick={handleVerify}
          disabled={isLoading || !isCodeComplete}
          className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-semibold text-sm"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="size-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Verifying...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Verify
              <ArrowRight className="size-4" />
            </span>
          )}
        </Button>
      </div>
    </div>
  )
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="h-screen bg-background flex items-center justify-center">
        <span className="size-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    }>
      <VerifyContent />
    </Suspense>
  )
}
