"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus, ChevronRight, Info, Clock, DollarSign, Gavel, Check, ImageIcon } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const categories = [
  { id: "pokemon", label: "Pokemon TCG" },
  { id: "sports", label: "Sports Cards" },
  { id: "yugioh", label: "Yu-Gi-Oh" },
  { id: "onepiece", label: "One Piece TCG" },
  { id: "mtg", label: "Magic: The Gathering" },
  { id: "digimon", label: "Digimon TCG" },
  { id: "other", label: "Other" },
]

const productTypes = [
  { id: "single", label: "Single Card", description: "Single collectible card" },
  { id: "set", label: "Multiple/Set", description: "Multiple cards or complete sets" },
  { id: "pack", label: "Booster Pack", description: "Unopened booster pack" },
  { id: "box", label: "Booster Box", description: "Unopened booster box" },
  { id: "case", label: "Case", description: "Complete sealed case" },
]

const conditions = [
  { id: "mint", label: "Mint/Near Mint", description: "Perfect condition, no flaws" },
  { id: "excellent", label: "Excellent", description: "Minor signs of play" },
  { id: "good", label: "Good", description: "Visible signs of play" },
  { id: "played", label: "Played", description: "Heavy use visible" },
]

const gradingCompanies = [
  { id: "psa", label: "PSA", description: "Professional Sports Authenticator" },
  { id: "bgs", label: "BGS", description: "Beckett Grading Services" },
  { id: "cgc", label: "CGC", description: "Certified Guaranty Company" },
  { id: "sgc", label: "SGC", description: "Sportscard Guaranty Corporation" },
  { id: "ace", label: "ACE", description: "ACE Grading" },
  { id: "other", label: "Other", description: "Other grading company" },
]

const gradingScores = {
  psa: ["10", "9", "8", "7", "6", "5", "4", "3", "2", "1"],
  bgs: ["10 Pristine", "10 Black Label", "9.5 Gem Mint", "9", "8.5", "8", "7.5", "7", "6.5", "6"],
  cgc: ["10 Pristine", "9.5 Gem Mint", "9", "8.5", "8", "7.5", "7", "6.5", "6"],
  sgc: ["10 Gem Mint", "9.5", "9", "8.5", "8", "7.5", "7", "6.5", "6"],
  ace: ["10", "9.5", "9", "8.5", "8", "7.5", "7"],
  other: ["10", "9.5", "9", "8.5", "8", "7.5", "7", "6", "5"],
}

const auctionDurations = [
  { id: "12h", label: "12 Hours", hours: 12 },
  { id: "24h", label: "24 Hours", hours: 24 },
  { id: "48h", label: "48 Hours", hours: 48 },
  { id: "72h", label: "72 Hours", hours: 72 },
]

type SaleType = "fixed" | "auction"

export default function CreateProductPage() {
  const router = useRouter()
  const [category, setCategory] = useState("")
  const [productType, setProductType] = useState("")
  const [condition, setCondition] = useState("")
  const [isGraded, setIsGraded] = useState(false)
  const [gradingCompany, setGradingCompany] = useState("")
  const [gradingScore, setGradingScore] = useState("")
  const [certNumber, setCertNumber] = useState("")
  const [saleType, setSaleType] = useState<SaleType>("fixed")
  const [auctionDuration, setAuctionDuration] = useState("24h")
  const [formData, setFormData] = useState({
    name: "",
    set: "",
    number: "",
    rarity: "",
    language: "English",
    price: "",
    startingPrice: "",
    stock: "1",
    description: "",
  })
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  const handlePublish = () => {
    setShowSuccessDialog(true)
  }

  const handleCreatePost = () => {
    setShowSuccessDialog(false)
    router.push("/publish/post")
  }

  const handleViewShop = () => {
    setShowSuccessDialog(false)
    router.push("/profile/shop")
  }

  const currentGradingScores = gradingCompany 
    ? gradingScores[gradingCompany as keyof typeof gradingScores] || gradingScores.other 
    : []

  const isFormValid = formData.name && category && productType && formData.price && (
    saleType === "fixed" || (saleType === "auction" && formData.startingPrice)
  ) && (
    !isGraded || (gradingCompany && gradingScore)
  )

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between px-4 h-14">
          <Button variant="ghost" size="icon" className="size-9" onClick={() => router.back()}>
            <ArrowLeft className="size-5" />
          </Button>
          <span className="font-semibold text-sm">Sell Something</span>
          <Button
            onClick={handlePublish}
            disabled={!isFormValid}
            className="h-8 rounded-full px-4 text-xs"
          >
            Publish
          </Button>
        </div>
      </header>

      <main className="px-4 py-5">
        {/* Image Upload */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2.5">
            <label className="text-xs font-medium text-muted-foreground">Card Photos (up to 10)</label>
            <span className="text-xs text-muted-foreground">0/10</span>
          </div>
          <div className="flex gap-2.5 overflow-x-auto pb-2">
            {/* Main Photo */}
            <label className="size-24 shrink-0 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-0.5 cursor-pointer hover:border-foreground/50 transition-colors">
              <Plus className="size-5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground text-center px-1">Main</span>
              <input type="file" accept="image/*" className="hidden" />
            </label>
            
            {/* Additional Photos */}
            {[1, 2, 3, 4].map((i) => (
              <label key={i} className="size-24 shrink-0 border-2 border-dashed border-border rounded-xl flex items-center justify-center cursor-pointer hover:border-foreground/50 transition-colors">
                <Plus className="size-5 text-muted-foreground" />
                <input type="file" accept="image/*" className="hidden" />
              </label>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-1.5 flex items-start gap-1">
            <Info className="size-3 shrink-0 mt-0.5" />
            Upload front, back, and detail shots for best results
          </p>
        </div>

        {/* Product Name */}
        <div className="mb-4">
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Card Name *</label>
          <Input
            placeholder="e.g., Pikachu VMAX Rainbow Rare"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="h-12 rounded-xl bg-muted border-0 text-sm"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Category *</label>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full justify-between h-12 rounded-xl">
                <span className="text-muted-foreground">{category ? categories.find(c => c.id === category)?.label : "Select category"}</span>
                <ChevronRight className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom">
              <SheetHeader className="text-left mb-4">
                <SheetTitle className="text-base">Select Category</SheetTitle>
                <SheetDescription className="sr-only">Choose a category for your card</SheetDescription>
              </SheetHeader>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setCategory(cat.id)
                    }}
                    className={cn(
                      "w-full p-3 rounded-lg text-left text-sm transition-colors",
                      category === cat.id ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-muted/80"
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Product Type */}
        <div className="mb-4">
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Card Type *</label>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full justify-between h-12 rounded-xl">
                <span className="text-muted-foreground">{productType ? productTypes.find(p => p.id === productType)?.label : "Select type"}</span>
                <ChevronRight className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom">
              <SheetHeader className="text-left mb-4">
                <SheetTitle className="text-base">Select Card Type</SheetTitle>
                <SheetDescription className="sr-only">Choose the type of card product</SheetDescription>
              </SheetHeader>
              <div className="space-y-2">
                {productTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => {
                      setProductType(type.id)
                    }}
                    className={cn(
                      "w-full text-left p-3 rounded-lg transition-colors",
                      productType === type.id ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
                    )}
                  >
                    <div className="font-medium text-sm">{type.label}</div>
                    <div className="text-xs opacity-75">{type.description}</div>
                  </button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Condition */}
        <div className="mb-4">
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Card Condition</label>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full justify-between h-12 rounded-xl">
                <span className="text-muted-foreground">{condition ? conditions.find(c => c.id === condition)?.label : "Select condition"}</span>
                <ChevronRight className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom">
              <SheetHeader className="text-left mb-4">
                <SheetTitle className="text-base">Select Condition</SheetTitle>
                <SheetDescription className="sr-only">Choose the card condition</SheetDescription>
              </SheetHeader>
              <div className="space-y-2">
                {conditions.map((cond) => (
                  <button
                    key={cond.id}
                    onClick={() => {
                      setCondition(cond.id)
                    }}
                    className={cn(
                      "w-full text-left p-3 rounded-lg transition-colors",
                      condition === cond.id ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
                    )}
                  >
                    <div className="font-medium text-sm">{cond.label}</div>
                    <div className="text-xs opacity-75">{cond.description}</div>
                  </button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Grading Section */}
        <div className="bg-card rounded-xl border border-border p-3 mb-4">
          <label className="flex items-center gap-2 cursor-pointer mb-3">
            <input
              type="checkbox"
              checked={isGraded}
              onChange={(e) => {
                setIsGraded(e.target.checked)
                if (!e.target.checked) {
                  setGradingCompany("")
                  setGradingScore("")
                  setCertNumber("")
                }
              }}
              className="size-4 rounded"
            />
            <span className="text-sm font-medium">Graded Card</span>
          </label>

          {isGraded && (
            <div className="space-y-3">
              {/* Grading Company */}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Grading Company *</label>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-full justify-between h-10 rounded-lg text-xs">
                      <span className="text-muted-foreground">{gradingCompany ? gradingCompanies.find(g => g.id === gradingCompany)?.label : "Select"}</span>
                      <ChevronRight className="size-3.5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom">
                    <SheetHeader className="text-left mb-4">
                      <SheetTitle className="text-base">Select Grading Company</SheetTitle>
                      <SheetDescription className="sr-only">Choose a grading company</SheetDescription>
                    </SheetHeader>
                    <div className="space-y-2">
                      {gradingCompanies.map((company) => (
                        <button
                          key={company.id}
                          onClick={() => {
                            setGradingCompany(company.id)
                            setGradingScore("")
                          }}
                          className={cn(
                            "w-full text-left p-2.5 rounded-lg transition-colors text-xs",
                            gradingCompany === company.id ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
                          )}
                        >
                          <div className="font-medium">{company.label}</div>
                          <div className="opacity-75">{company.description}</div>
                        </button>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Grading Score */}
              {gradingCompany && (
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Grade *</label>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="w-full justify-between h-10 rounded-lg text-xs">
                        <span className="text-muted-foreground">{gradingScore || "Select grade"}</span>
                        <ChevronRight className="size-3.5" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom">
                      <SheetHeader className="text-left mb-4">
                        <SheetTitle className="text-base">Select Grade</SheetTitle>
                        <SheetDescription className="sr-only">Choose the grading score</SheetDescription>
                      </SheetHeader>
                      <div className="grid grid-cols-3 gap-2">
                        {currentGradingScores.map((score) => (
                          <button
                            key={score}
                            onClick={() => {
                              setGradingScore(score)
                            }}
                            className={cn(
                              "p-2.5 rounded-lg transition-colors text-xs font-medium",
                              gradingScore === score ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
                            )}
                          >
                            {score}
                          </button>
                        ))}
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              )}

              {/* Certification Number */}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Cert Number</label>
                <Input
                  placeholder="e.g., 12345678"
                  value={certNumber}
                  onChange={(e) => setCertNumber(e.target.value)}
                  className="h-10 rounded-lg bg-muted border-0 text-xs"
                />
              </div>
            </div>
          )}
        </div>

        {/* Set & Number */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Set Name</label>
            <Input
              placeholder="e.g., Base Set"
              value={formData.set}
              onChange={(e) => setFormData({ ...formData, set: e.target.value })}
              className="h-12 rounded-xl bg-muted border-0 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Card Number</label>
            <Input
              placeholder="e.g., 4/102"
              value={formData.number}
              onChange={(e) => setFormData({ ...formData, number: e.target.value })}
              className="h-12 rounded-xl bg-muted border-0 text-sm"
            />
          </div>
        </div>

        {/* Rarity & Language */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Rarity</label>
            <Input
              placeholder="e.g., Holo Rare"
              value={formData.rarity}
              onChange={(e) => setFormData({ ...formData, rarity: e.target.value })}
              className="h-12 rounded-xl bg-muted border-0 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Language</label>
            <Input
              placeholder={formData.language}
              disabled
              className="h-12 rounded-xl bg-muted border-0 text-sm opacity-60"
            />
          </div>
        </div>

        {/* Sale Type Selection */}
        <div className="mb-4">
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Sale Type *</label>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => setSaleType("fixed")}
              className={cn(
                "p-3 rounded-xl border-2 transition-colors",
                saleType === "fixed"
                  ? "border-primary bg-primary/5"
                  : "border-border bg-background"
              )}
            >
              <DollarSign className="size-4 mb-1 mx-auto" />
              <div className="text-xs font-medium">Fixed Price</div>
            </button>
            <button
              onClick={() => setSaleType("auction")}
              className={cn(
                "p-3 rounded-xl border-2 transition-colors",
                saleType === "auction"
                  ? "border-primary bg-primary/5"
                  : "border-border bg-background"
              )}
            >
              <Gavel className="size-4 mb-1 mx-auto" />
              <div className="text-xs font-medium">Auction</div>
            </button>
          </div>
        </div>

        {/* Pricing */}
        {saleType === "fixed" ? (
          <div className="mb-4">
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Price (USD) *</label>
            <Input
              type="number"
              placeholder="0.00"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="h-12 rounded-xl bg-muted border-0 text-sm"
            />
          </div>
        ) : (
          <div className="space-y-4 mb-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Starting Price (USD) *</label>
              <Input
                type="number"
                placeholder="0.00"
                value={formData.startingPrice}
                onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
                className="h-12 rounded-xl bg-muted border-0 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Auction Duration *</label>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full justify-between h-12 rounded-xl">
                    <span className="text-muted-foreground">{auctionDurations.find(d => d.id === auctionDuration)?.label}</span>
                    <ChevronRight className="size-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom">
                  <SheetHeader className="text-left mb-4">
                    <SheetTitle className="text-base">Select Duration</SheetTitle>
                    <SheetDescription className="sr-only">Choose the auction duration</SheetDescription>
                  </SheetHeader>
                  <div className="space-y-2">
                    {auctionDurations.map((duration) => (
                      <button
                        key={duration.id}
                        onClick={() => {
                          setAuctionDuration(duration.id)
                        }}
                        className={cn(
                          "w-full p-3 rounded-lg text-left text-sm transition-colors",
                          auctionDuration === duration.id ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <Clock className="size-4" />
                          {duration.label}
                        </div>
                      </button>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        )}

        {/* Stock */}
        <div className="mb-5">
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Quantity</label>
          <Input
            type="number"
            placeholder="1"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            className="h-12 rounded-xl bg-muted border-0 text-sm"
            min="1"
          />
        </div>

        {/* Description */}
        <div className="mb-5">
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Description</label>
          <Textarea
            placeholder="Describe the card condition, any flaws, or additional details..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="min-h-20 rounded-xl bg-muted border-0 resize-none text-sm"
          />
        </div>
      </main>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="mx-4 rounded-2xl max-w-sm">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4 size-16 rounded-full bg-green-500/10 flex items-center justify-center">
              <Check className="size-8 text-green-500" />
            </div>
            <DialogTitle className="text-lg">Listed Successfully!</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Your item is now live. Share it with a post to get more visibility!
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            <Button 
              className="w-full h-12 rounded-xl gap-2"
              onClick={handleCreatePost}
            >
              <ImageIcon className="size-4" />
              Write a Post
            </Button>
            <Button 
              variant="outline"
              className="w-full h-12 rounded-xl"
              onClick={handleViewShop}
            >
              View My Shop
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
