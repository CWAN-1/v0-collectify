"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const slides = [
  {
    title: "Selamat Datang di CardHub",
    subtitle: "Platform trading card terbaik di Indonesia",
    description: "Temukan, jual, dan kumpulkan kartu koleksi favoritmu",
    image: "/onboarding-1.jpg"
  },
  {
    title: "Koleksi Lengkap",
    subtitle: "Pokemon, Sports Cards, Yu-Gi-Oh & lebih banyak lagi",
    description: "Akses ribuan kartu koleksi dari berbagai kategori",
    image: "/onboarding-2.jpg"
  },
  {
    title: "Komunitas Aktif",
    subtitle: "Bergabung dengan kolektor lainnya",
    description: "Bagikan koleksi, tips, dan temukan teman baru",
    image: "/onboarding-3.jpg"
  },
  {
    title: "Transaksi Aman",
    subtitle: "Perlindungan pembeli & penjual",
    description: "Jual beli dengan aman dan terpercaya",
    image: "/onboarding-4.jpg"
  }
]

export default function OnboardingPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const router = useRouter()

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      router.push("/login")
    }
  }

  const handleSkip = () => {
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center px-6 pt-12">
        <div className="flex items-center gap-2">
          <div className="size-8 bg-foreground rounded-full flex items-center justify-center">
            <span className="text-background font-bold text-sm">CH</span>
          </div>
        </div>
        <Button variant="ghost" onClick={handleSkip} className="text-muted-foreground">
          Lewati
        </Button>
      </div>

      {/* Slide Content */}
      <div className="flex-1 flex flex-col">
        {/* Image Section */}
        <div className="flex-1 relative mx-6 mt-8 rounded-3xl overflow-hidden bg-muted">
          <Image
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        </div>

        {/* Text Content */}
        <div className="px-6 py-8">
          <p className="text-muted-foreground text-sm mb-2">{slides[currentSlide].subtitle}</p>
          <h1 className="text-2xl font-bold text-foreground mb-3 text-balance">
            {slides[currentSlide].title}
          </h1>
          <p className="text-muted-foreground text-pretty">
            {slides[currentSlide].description}
          </p>
        </div>

        {/* Progress & Navigation */}
        <div className="px-6 pb-12">
          {/* Progress Dots */}
          <div className="flex gap-2 mb-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentSlide
                    ? "w-8 bg-foreground"
                    : "w-1.5 bg-border"
                }`}
              />
            ))}
          </div>

          {/* CTA Button */}
          <Button
            onClick={handleNext}
            className="w-full h-14 rounded-full text-base font-semibold"
          >
            {currentSlide === slides.length - 1 ? "Mulai Sekarang" : "Lanjut"}
            <ChevronRight className="size-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
