"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Mail, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

type Step = "email" | "otp" | "success"

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>("email")
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const router = useRouter()

  const handleSendOTP = () => {
    setStep("otp")
  }

  const handleVerifyOTP = () => {
    setStep("success")
  }

  const handleBackToLogin = () => {
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center px-4 pt-12 pb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="size-5" />
        </Button>
      </div>

      <div className="flex-1 px-6">
        {step === "email" && (
          <>
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Forgot Password?
              </h1>
              <p className="text-muted-foreground">
                Enter your email to receive a verification code.
              </p>
            </div>

            <div className="relative mb-8">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 pl-12 rounded-2xl bg-muted border-0 text-base"
              />
            </div>

            <Button
              onClick={handleSendOTP}
              disabled={!email}
              className="w-full h-14 rounded-full text-base font-semibold"
            >
              Send Code
            </Button>
          </>
        )}

        {step === "otp" && (
          <>
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Verify Code
              </h1>
              <p className="text-muted-foreground">
                Enter the 4-digit code sent to{" "}
                <span className="text-foreground font-medium">{email}</span>
              </p>
            </div>

            <div className="flex justify-center mb-8">
              <InputOTP maxLength={4} value={otp} onChange={setOtp}>
                <InputOTPGroup className="gap-4">
                  <InputOTPSlot index={0} className="size-16 text-2xl font-bold rounded-2xl border-border bg-muted" />
                  <InputOTPSlot index={1} className="size-16 text-2xl font-bold rounded-2xl border-border bg-muted" />
                  <InputOTPSlot index={2} className="size-16 text-2xl font-bold rounded-2xl border-border bg-muted" />
                  <InputOTPSlot index={3} className="size-16 text-2xl font-bold rounded-2xl border-border bg-muted" />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button
              onClick={handleVerifyOTP}
              disabled={otp.length < 4}
              className="w-full h-14 rounded-full text-base font-semibold mb-6"
            >
              Verify
            </Button>

            <p className="text-center text-muted-foreground">
              {"Didn't receive the code?"}{" "}
              <button className="font-semibold text-foreground">
                Resend
              </button>
            </p>
          </>
        )}

        {step === "success" && (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="size-24 bg-muted rounded-full flex items-center justify-center mb-8">
              <Shield className="size-12 text-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Password Updated
            </h1>
            <p className="text-muted-foreground mb-8">
              Your password has been successfully changed. Please sign in with your new password.
            </p>
            <Button
              onClick={handleBackToLogin}
              className="w-full h-14 rounded-full text-base font-semibold"
            >
              Sign In
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
