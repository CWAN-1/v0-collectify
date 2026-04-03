"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus, ChevronRight, Info, AlertCircle, Clock, DollarSign, Gavel } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
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
  { id: "single", label: "单卡", description: "单张卡牌" },
  { id: "set", label: "多卡/套卡", description: "多张卡牌组合或完整套卡" },
  { id: "pack", label: "卡包", description: "未开封卡包" },
  { id: "box", label: "卡盒", description: "未开封卡盒" },
  { id: "case", label: "卡箱", description: "整箱未开封产品" },
]

const conditions = [
  { id: "mint", label: "Mint/Near Mint", description: "完美状态，无任何瑕疵" },
  { id: "excellent", label: "Excellent", description: "轻微使用痕迹" },
  { id: "good", label: "Good", description: "明显使用痕迹" },
  { id: "played", label: "Played", description: "重度使用痕迹" },
]

const gradingCompanies = [
  { id: "psa", label: "PSA", description: "Professional Sports Authenticator" },
  { id: "bgs", label: "BGS", description: "Beckett Grading Services" },
  { id: "cgc", label: "CGC", description: "Certified Guaranty Company" },
  { id: "sgc", label: "SGC", description: "Sportscard Guaranty Corporation" },
  { id: "ace", label: "ACE", description: "ACE Grading" },
  { id: "other", label: "其他", description: "其他评级公司" },
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
  { id: "12h", label: "12小时", hours: 12 },
  { id: "24h", label: "24小时", hours: 24 },
  { id: "48h", label: "48小时", hours: 48 },
  { id: "72h", label: "72小时", hours: 72 },
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

  const handlePublish = () => {
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
        <div className="flex items-center justify-between px-4 pt-12 pb-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="size-5" />
          </Button>
          <span className="font-semibold">出售卡牌</span>
          <div className="size-10" />
        </div>
      </header>

      <main className="px-4 py-6">
        {/* Image Upload */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-muted-foreground">商品图片 (最多10张)</h3>
            <span className="text-xs text-muted-foreground">0/10</span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {/* Main Photo */}
            <label className="size-28 shrink-0 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-foreground/50 transition-colors">
              <Plus className="size-6 text-muted-foreground" />
              <span className="text-xs text-muted-foreground text-center px-2">主图</span>
              <input type="file" accept="image/*" className="hidden" />
            </label>
            
            {/* Additional Photos */}
            {[1, 2, 3, 4].map((i) => (
              <label key={i} className="size-28 shrink-0 border-2 border-dashed border-border rounded-xl flex items-center justify-center cursor-pointer hover:border-foreground/50 transition-colors">
                <Plus className="size-5 text-muted-foreground" />
                <input type="file" accept="image/*" className="hidden" />
              </label>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2 flex items-start gap-1">
            <Info className="size-3.5 shrink-0 mt-0.5" />
            请上传正面、背面及细节照片
          </p>
        </div>

        {/* Product Name */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">卡牌名称 *</h3>
          <Input
            placeholder="例如：皮卡丘 VMAX 彩虹稀有"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="h-14 rounded-2xl bg-muted border-0 text-base"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">卡牌类别 *</h3>
          <Sheet>
            <SheetTrigger asChild>
              <button className="w-full h-14 px-4 rounded-2xl bg-muted flex items-center justify-between">
                <span className={category ? "text-foreground" : "text-muted-foreground"}>
                  {category ? categories.find(c => c.id === category)?.label : "选择类别"}
                </span>
                <ChevronRight className="size-5 text-muted-foreground" />
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[50vh] rounded-t-3xl">
              <SheetHeader className="pb-4">
                <SheetTitle>选择卡牌类别</SheetTitle>
              </SheetHeader>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`w-full p-4 rounded-xl text-left transition-colors ${
                      category === cat.id ? "bg-foreground text-background" : "bg-muted hover:bg-border"
                    }`}
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
          <h3 className="text-sm font-medium text-muted-foreground mb-2">商品类型 *</h3>
          <Sheet>
            <SheetTrigger asChild>
              <button className="w-full h-14 px-4 rounded-2xl bg-muted flex items-center justify-between">
                <span className={productType ? "text-foreground" : "text-muted-foreground"}>
                  {productType ? productTypes.find(t => t.id === productType)?.label : "选择商品类型"}
                </span>
                <ChevronRight className="size-5 text-muted-foreground" />
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[60vh] rounded-t-3xl">
              <SheetHeader className="pb-4">
                <SheetTitle>选择商品类型</SheetTitle>
              </SheetHeader>
              <div className="space-y-2">
                {productTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setProductType(type.id)}
                    className={`w-full p-4 rounded-xl text-left transition-colors ${
                      productType === type.id ? "bg-foreground text-background" : "bg-muted hover:bg-border"
                    }`}
                  >
                    <span className="font-medium">{type.label}</span>
                    <p className={`text-sm ${productType === type.id ? "text-background/70" : "text-muted-foreground"}`}>
                      {type.description}
                    </p>
                  </button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Grading Toggle */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">是否评级</h3>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setIsGraded(false)
                setGradingCompany("")
                setGradingScore("")
                setCertNumber("")
              }}
              className={cn(
                "flex-1 h-14 rounded-2xl font-medium transition-colors",
                !isGraded ? "bg-foreground text-background" : "bg-muted text-foreground"
              )}
            >
              裸卡（未评级）
            </button>
            <button
              onClick={() => setIsGraded(true)}
              className={cn(
                "flex-1 h-14 rounded-2xl font-medium transition-colors",
                isGraded ? "bg-foreground text-background" : "bg-muted text-foreground"
              )}
            >
              已评级
            </button>
          </div>
        </div>

        {/* Grading Details - Show if isGraded */}
        {isGraded && (
          <div className="mb-4 p-4 bg-card rounded-2xl border border-border space-y-4">
            <div className="flex items-center gap-2 text-sm text-primary">
              <AlertCircle className="size-4" />
              <span>请填写评级信息</span>
            </div>

            {/* Grading Company */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">评级公司 *</h3>
              <Sheet>
                <SheetTrigger asChild>
                  <button className="w-full h-14 px-4 rounded-2xl bg-muted flex items-center justify-between">
                    <span className={gradingCompany ? "text-foreground" : "text-muted-foreground"}>
                      {gradingCompany ? gradingCompanies.find(c => c.id === gradingCompany)?.label : "选择评级公司"}
                    </span>
                    <ChevronRight className="size-5 text-muted-foreground" />
                  </button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[60vh] rounded-t-3xl">
                  <SheetHeader className="pb-4">
                    <SheetTitle>选择评级公司</SheetTitle>
                  </SheetHeader>
                  <div className="space-y-2">
                    {gradingCompanies.map((company) => (
                      <button
                        key={company.id}
                        onClick={() => {
                          setGradingCompany(company.id)
                          setGradingScore("")
                        }}
                        className={`w-full p-4 rounded-xl text-left transition-colors ${
                          gradingCompany === company.id ? "bg-foreground text-background" : "bg-muted hover:bg-border"
                        }`}
                      >
                        <span className="font-medium">{company.label}</span>
                        <p className={`text-sm ${gradingCompany === company.id ? "text-background/70" : "text-muted-foreground"}`}>
                          {company.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Grading Score */}
            {gradingCompany && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">评级分数 *</h3>
                <Sheet>
                  <SheetTrigger asChild>
                    <button className="w-full h-14 px-4 rounded-2xl bg-muted flex items-center justify-between">
                      <span className={gradingScore ? "text-foreground" : "text-muted-foreground"}>
                        {gradingScore || "选择评级分数"}
                      </span>
                      <ChevronRight className="size-5 text-muted-foreground" />
                    </button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-[60vh] rounded-t-3xl">
                    <SheetHeader className="pb-4">
                      <SheetTitle>选择评级分数</SheetTitle>
                    </SheetHeader>
                    <div className="space-y-2 max-h-[45vh] overflow-y-auto">
                      {currentGradingScores.map((score) => (
                        <button
                          key={score}
                          onClick={() => setGradingScore(score)}
                          className={`w-full p-4 rounded-xl text-left transition-colors ${
                            gradingScore === score ? "bg-foreground text-background" : "bg-muted hover:bg-border"
                          }`}
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
              <h3 className="text-sm font-medium text-muted-foreground mb-2">认证编号</h3>
              <Input
                placeholder="输入评级证书编号（选填）"
                value={certNumber}
                onChange={(e) => setCertNumber(e.target.value)}
                className="h-14 rounded-2xl bg-muted border-0"
              />
            </div>
          </div>
        )}

        {/* Condition - Only show if not graded */}
        {!isGraded && (
          <div className="mb-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">卡牌品相</h3>
            <Sheet>
              <SheetTrigger asChild>
                <button className="w-full h-14 px-4 rounded-2xl bg-muted flex items-center justify-between">
                  <span className={condition ? "text-foreground" : "text-muted-foreground"}>
                    {condition ? conditions.find(c => c.id === condition)?.label : "选择品相"}
                  </span>
                  <ChevronRight className="size-5 text-muted-foreground" />
                </button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[50vh] rounded-t-3xl">
                <SheetHeader className="pb-4">
                  <SheetTitle>选择卡牌品相</SheetTitle>
                </SheetHeader>
                <div className="space-y-2">
                  {conditions.map((cond) => (
                    <button
                      key={cond.id}
                      onClick={() => setCondition(cond.id)}
                      className={`w-full p-4 rounded-xl text-left transition-colors ${
                        condition === cond.id ? "bg-foreground text-background" : "bg-muted hover:bg-border"
                      }`}
                    >
                      <span className="font-medium">{cond.label}</span>
                      <p className={`text-sm ${condition === cond.id ? "text-background/70" : "text-muted-foreground"}`}>
                        {cond.description}
                      </p>
                    </button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        )}

        {/* Set & Number */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">系列/扩展包</h3>
            <Input
              placeholder="例如：Vivid Voltage"
              value={formData.set}
              onChange={(e) => setFormData({ ...formData, set: e.target.value })}
              className="h-14 rounded-2xl bg-muted border-0"
            />
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">卡号</h3>
            <Input
              placeholder="例如：188/185"
              value={formData.number}
              onChange={(e) => setFormData({ ...formData, number: e.target.value })}
              className="h-14 rounded-2xl bg-muted border-0"
            />
          </div>
        </div>

        {/* Rarity & Language */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">稀有度</h3>
            <Input
              placeholder="例如：Rainbow Rare"
              value={formData.rarity}
              onChange={(e) => setFormData({ ...formData, rarity: e.target.value })}
              className="h-14 rounded-2xl bg-muted border-0"
            />
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">语言版本</h3>
            <Input
              value={formData.language}
              onChange={(e) => setFormData({ ...formData, language: e.target.value })}
              className="h-14 rounded-2xl bg-muted border-0"
            />
          </div>
        </div>

        {/* Sale Type */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">售卖方式 *</h3>
          <div className="flex gap-3">
            <button
              onClick={() => setSaleType("fixed")}
              className={cn(
                "flex-1 h-16 rounded-2xl font-medium transition-colors flex flex-col items-center justify-center gap-1",
                saleType === "fixed" ? "bg-foreground text-background" : "bg-muted text-foreground"
              )}
            >
              <DollarSign className="size-5" />
              <span>一口价</span>
            </button>
            <button
              onClick={() => setSaleType("auction")}
              className={cn(
                "flex-1 h-16 rounded-2xl font-medium transition-colors flex flex-col items-center justify-center gap-1",
                saleType === "auction" ? "bg-foreground text-background" : "bg-muted text-foreground"
              )}
            >
              <Gavel className="size-5" />
              <span>拍卖</span>
            </button>
          </div>
        </div>

        {/* Fixed Price Options */}
        {saleType === "fixed" && (
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">价格 (USD) *</h3>
              <Input
                type="number"
                placeholder="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="h-14 rounded-2xl bg-muted border-0"
              />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">库存</h3>
              <Input
                type="number"
                min="1"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="h-14 rounded-2xl bg-muted border-0"
              />
            </div>
          </div>
        )}

        {/* Auction Options */}
        {saleType === "auction" && (
          <div className="mb-4 p-4 bg-card rounded-2xl border border-border space-y-4">
            <div className="flex items-center gap-2 text-sm text-primary">
              <Gavel className="size-4" />
              <span>拍卖设置</span>
            </div>

            {/* Starting Price */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">起拍价 (USD) *</h3>
              <Input
                type="number"
                placeholder="输入起拍价"
                value={formData.startingPrice}
                onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
                className="h-14 rounded-2xl bg-muted border-0"
              />
            </div>

            {/* Buy Now Price (Optional) */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">一口价 (选填)</h3>
              <Input
                type="number"
                placeholder="设置后买家可直接购买"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="h-14 rounded-2xl bg-muted border-0"
              />
              <p className="text-xs text-muted-foreground mt-1">
                可选择设置一口价，买家可直接以此价格购买
              </p>
            </div>

            {/* Auction Duration */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">拍卖时长 *</h3>
              <div className="grid grid-cols-4 gap-2">
                {auctionDurations.map((duration) => (
                  <button
                    key={duration.id}
                    onClick={() => setAuctionDuration(duration.id)}
                    className={cn(
                      "h-12 rounded-xl font-medium transition-colors flex items-center justify-center gap-1 text-sm",
                      auctionDuration === duration.id ? "bg-foreground text-background" : "bg-muted text-foreground"
                    )}
                  >
                    <Clock className="size-3.5" />
                    {duration.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Description */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">商品描述</h3>
          <Textarea
            placeholder="详细描述卡牌状态、特点等..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="min-h-28 rounded-2xl bg-muted border-0 resize-none"
          />
        </div>
      </main>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 pb-[calc(env(safe-area-inset-bottom)+8px)]">
        <Button
          onClick={handlePublish}
          disabled={!isFormValid}
          className="w-full h-14 rounded-full text-base font-semibold"
        >
          {saleType === "fixed" ? "立即上架" : "开始拍卖"}
        </Button>
      </div>
    </div>
  )
}
