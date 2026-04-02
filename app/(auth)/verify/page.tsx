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
    // Focus first input on mount
    inputRefs.current[0]?.focus()
  }, [])

  useEffect(() => {
    // Countdown timer for resend
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendTimer])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1)
    }
    
    if (!/^\d*$/.test(value)) return

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Auto-focus next input
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
    
    // Focus last filled input or next empty
    const lastFilledIndex = Math.min(pastedData.length - 1, 5)
    inputRefs.current[lastFilledIndex]?.focus()
  }

  const handleVerify = async () => {
    const fullCode = code.join("")
    if (fullCode.length !== 6) return

    setIsLoading(true)
    
    // Simulate verification
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Redirect to profile setup
    router.push(`/setup?email=${encodeURIComponent(email)}`)
  }

  const handleResend = async () => {
    if (resendTimer > 0) return
    
    // Simulate resending
    setResendTimer(60)
  }

  const isCodeComplete = code.every(digit => digit !== "")

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center px-4 py-4">
        <Link href="/register" className="p-2 -ml-2">
          <ArrowLeft className="size-6 text-foreground" />
        </Link>
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-6 py-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/logo.png"
            alt="Collectify"
            width={160}
            height={48}
            className="h-12"
            style={{ width: 'auto' }}
          />
        </div>

        {/* Text */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Verify Your Email</h1>
          <p className="text-muted-foreground">
            {"We've sent a 6-digit code to"}
          </p>
          <p className="text-foreground font-medium">{email}</p>
        </div>

        {/* Code Input */}
        <div className="flex justify-center gap-2 mb-8">
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
              className="w-12 h-14 text-center text-xl font-bold bg-card border border-border rounded-xl text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
            />
          ))}
        </div>

        {/* Resend */}
        <div className="text-center mb-8">
          {resendTimer > 0 ? (
            <p className="text-sm text-muted-foreground">
              Resend code in <span className="text-foreground font-medium">{resendTimer}s</span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="text-sm text-primary font-medium flex items-center gap-1 mx-auto hover:underline"
            >
              <RefreshCw className="size-4" />
              Resend Code
            </button>
          )}
        </div>

        {/* Verify Button */}
        <Button
          onClick={handleVerify}
          disabled={isLoading || !isCodeComplete}
          className="w-full h-14 rounded-xl bg-primary text-primary-foreground font-semibold text-base"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="size-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Verifying...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Verify
              <ArrowRight className="size-5" />
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <span className="size-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    }>
      <VerifyContent />
    </Suspense>
  )
}
