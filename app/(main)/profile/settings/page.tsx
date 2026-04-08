"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ChevronRight, Lock, Phone, Shield, LogOut, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"

export default function AccountSettingsPage() {
  const router = useRouter()
  const [notifications, setNotifications] = useState({
    order: true,
    live: true,
    activity: true,
    message: true,
  })

  const handleLogout = () => {
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-center relative px-4 pt-12 pb-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="size-8 absolute left-4" 
            onClick={() => router.back()}
          >
            <ArrowLeft className="size-4" />
          </Button>
          <h1 className="text-sm font-semibold">Account Settings</h1>
        </div>
      </header>

      <main className="px-4 py-4 space-y-3">
        {/* Notification Settings */}
        <div className="bg-card rounded-xl border border-border p-3">
          <h3 className="text-sm font-medium mb-3">Notifications</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs">Order Updates</span>
              <Switch
                checked={notifications.order}
                onCheckedChange={(checked) => setNotifications({ ...notifications, order: checked })}
                className="scale-90"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs">Live Unboxing</span>
              <Switch
                checked={notifications.live}
                onCheckedChange={(checked) => setNotifications({ ...notifications, live: checked })}
                className="scale-90"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs">Activity</span>
              <Switch
                checked={notifications.activity}
                onCheckedChange={(checked) => setNotifications({ ...notifications, activity: checked })}
                className="scale-90"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs">Messages</span>
              <Switch
                checked={notifications.message}
                onCheckedChange={(checked) => setNotifications({ ...notifications, message: checked })}
                className="scale-90"
              />
            </div>
          </div>
        </div>

        {/* Change Password */}
        <Link href="/profile/settings/password">
          <div className="bg-card rounded-xl border border-border p-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Lock className="size-4 text-muted-foreground" />
              <span className="text-xs font-medium">Change Password</span>
            </div>
            <ChevronRight className="size-4 text-muted-foreground" />
          </div>
        </Link>

        {/* Phone Number */}
        <div className="bg-card rounded-xl border border-border p-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-2.5">
              <Phone className="size-4 text-muted-foreground mt-0.5" />
              <div>
                <span className="text-xs font-medium">Phone Number</span>
                <p className="text-[10px] text-muted-foreground mt-0.5">Required for auction features.</p>
                <p className="text-[10px] text-primary mt-0.5">Each account can only bind one phone number.</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="size-7">
              <Pencil className="size-3.5 text-muted-foreground" />
            </Button>
          </div>
        </div>

        {/* Account Verification */}
        <Link href="/profile/settings/verify">
          <div className="bg-card rounded-xl border border-border p-3">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-2.5">
                <Shield className="size-4 text-muted-foreground mt-0.5" />
                <div>
                  <span className="text-xs font-medium">Account Verification</span>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    Your account is not verified. Complete verification to unlock all features.
                  </p>
                </div>
              </div>
              <ChevronRight className="size-4 text-muted-foreground shrink-0" />
            </div>
          </div>
        </Link>

        {/* Delete Account */}
        <Link href="/profile/settings/delete-account">
          <div className="bg-card rounded-xl border border-border p-3 flex items-center justify-between">
            <span className="text-xs font-medium text-red-500">Delete Account</span>
            <ChevronRight className="size-4 text-red-500" />
          </div>
        </Link>

        {/* Version */}
        <div className="bg-card rounded-xl border border-border p-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Version</span>
          <span className="text-xs font-medium">V1.4.6</span>
        </div>

        {/* Logout Button */}
        <Button
          variant="outline"
          onClick={handleLogout}
          className="w-full h-10 rounded-xl text-sm font-medium mt-4"
        >
          <LogOut className="size-4 mr-2" />
          Log Out
        </Button>
      </main>
    </div>
  )
}
