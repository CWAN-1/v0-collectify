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
    <div className="h-screen bg-background overflow-hidden flex flex-col">
      {/* Header */}
      <header className="flex items-center px-4 pt-4 pb-3">
        <Link href="/login" className="p-1.5 -ml-1.5">
          <ArrowLeft className="size-5 text-foreground" />
        </Link>
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-5 pb-6">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/logo.png"
            alt="Collectify"
            width={120}
            height={36}
            className="h-8"
            style={{ width: 'auto' }}
          />
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-foreground mb-1">Create Account</h1>
          <p className="text-sm text-muted-foreground">Enter your email to get started</p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSendCode} className="space-y-3">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 pl-10 pr-4 rounded-xl bg-card border-border text-sm"
              required
            />
          </div>

          {/* Info Text */}
          <p className="text-xs text-muted-foreground text-center py-1">
            We will send a verification code to your email
          </p>

          {/* Continue Button */}
          <Button
            type="submit"
            disabled={isLoading || !email}
            className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-semibold text-sm"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="size-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Sending...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Continue
                <ArrowRight className="size-4" />
              </span>
            )}
          </Button>
        </form>

        {/* Terms */}
        <p className="text-xs text-muted-foreground text-center mt-4">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="text-primary hover:underline">Terms</Link>
          {" "}and{" "}
          <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
        </p>
      </div>

      {/* Bottom Section */}
      <div className="px-5 pb-6 text-center">
        <p className="text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}
