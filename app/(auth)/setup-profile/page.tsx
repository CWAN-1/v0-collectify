"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Camera, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"

const avatarOptions = [
  "/avatars/avatar-1.jpg",
  "/avatars/avatar-2.jpg",
  "/avatars/avatar-3.jpg",
  "/avatars/avatar-4.jpg",
  "/avatars/avatar-5.jpg",
  "/avatars/avatar-6.jpg",
]

const interests = [
  "Pokemon TCG",
  "Sports Cards",
  "Yu-Gi-Oh",
  "Magic: The Gathering",
  "One Piece TCG",
  "Digimon",
  "NBA Cards",
  "Football Cards",
  "Vintage Cards",
  "Graded Cards",
]

export default function SetupProfilePage() {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null)
  const [username, setUsername] = useState("")
  const [bio, setBio] = useState("")
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const router = useRouter()

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest))
    } else if (selectedInterests.length < 5) {
      setSelectedInterests([...selectedInterests, interest])
    }
  }

  const handleContinue = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-12 pb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="size-5" />
        </Button>
        <Button variant="ghost" onClick={() => router.push("/")}>
          Lewati
        </Button>
      </div>

      <div className="flex-1 px-6 overflow-auto">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Atur Profil
          </h1>
          <p className="text-muted-foreground">
            Buat profil Anda agar orang lain dapat mengenal Anda.
          </p>
        </div>

        {/* Avatar Selection */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Pilih Avatar</h3>
          
          {/* Selected Avatar Preview */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="size-28 rounded-full bg-muted overflow-hidden border-4 border-background shadow-lg">
                {selectedAvatar ? (
                  <Image
                    src={selectedAvatar}
                    alt="Selected avatar"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Camera className="size-8 text-muted-foreground" />
                  </div>
                )}
              </div>
              <button className="absolute bottom-0 right-0 size-8 bg-foreground rounded-full flex items-center justify-center shadow-lg">
                <Plus className="size-4 text-background" />
              </button>
            </div>
          </div>

          {/* Avatar Options */}
          <div className="flex gap-3 justify-center flex-wrap">
            {avatarOptions.map((avatar, index) => (
              <button
                key={index}
                onClick={() => setSelectedAvatar(avatar)}
                className={`size-14 rounded-full overflow-hidden border-2 transition-all ${
                  selectedAvatar === avatar
                    ? "border-foreground scale-110"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={avatar}
                  alt={`Avatar option ${index + 1}`}
                  width={56}
                  height={56}
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Username */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Username</h3>
          <Input
            type="text"
            placeholder="@username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="h-14 rounded-2xl bg-muted border-0 text-base"
          />
        </div>

        {/* Bio */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Bio</h3>
          <Textarea
            placeholder="Ceritakan sedikit tentang diri Anda dan koleksi Anda..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="min-h-24 rounded-2xl bg-muted border-0 text-base resize-none"
          />
        </div>

        {/* Interests */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-muted-foreground">Minat (Pilih maks. 5)</h3>
            <span className="text-sm text-muted-foreground">{selectedInterests.length}/5</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                  selectedInterests.includes(interest)
                    ? "bg-foreground text-background"
                    : "bg-muted text-foreground hover:bg-border"
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-12 pt-4">
        <Button
          onClick={handleContinue}
          className="w-full h-14 rounded-full text-base font-semibold"
        >
          Selesai
        </Button>
      </div>
    </div>
  )
}
