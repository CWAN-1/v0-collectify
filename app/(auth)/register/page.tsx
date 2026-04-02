"use client"

import { useState } from "react"
import { Mail, ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate sending verification code
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Redirect to verification page
    router.push(`/verify?email=${encodeURIComponent(email)}`)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center px-4 py-4">
        <Link href="/login" className="p-2 -ml-2">
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

        {/* Welcome Text */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Create Account</h1>
          <p className="text-muted-foreground">Enter your email to get started</p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSendCode} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 pl-12 pr-4 rounded-xl bg-card border-border text-foreground"
              required
            />
          </div>

          {/* Info Text */}
          <p className="text-sm text-muted-foreground text-center">
            We will send a verification code to your email
          </p>

          {/* Continue Button */}
          <Button
            type="submit"
            disabled={isLoading || !email}
            className="w-full h-14 rounded-xl bg-primary text-primary-foreground font-semibold text-base"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="size-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Sending...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Continue
                <ArrowRight className="size-5" />
              </span>
            )}
          </Button>
        </form>

        {/* Terms */}
        <p className="text-xs text-muted-foreground text-center mt-6">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
          {" "}and{" "}
          <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
        </p>
      </div>

      {/* Bottom Section */}
      <div className="px-6 py-8 text-center safe-area-bottom">
        <p className="text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}
