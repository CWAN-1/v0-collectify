"use client"

import { useState, useEffect } from "react"
import { Search, SlidersHorizontal, Heart, Star, X, Check, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import Image from "next/image"


const categories = [
  { id: "all", label: "All", avatar: null, bgColor: "bg-gradient-to-br from-primary to-accent" },
  { id: "pokemon", label: "Pokemon", avatar: "/brands/pikachu.jpg", bgColor: "bg-yellow-500" },
  { id: "yugioh", label: "Yu-Gi-Oh!", avatar: "/brands/yugioh.jpg", bgColor: "bg-orange-600" },
  { id: "onepiece", label: "One Piece", avatar: "/brands/luffy.jpg", bgColor: "bg-red-600" },
  { id: "mtg", label: "MTG", avatar: "/brands/mtg.jpg", bgColor: "bg-amber-700" },
  { id: "sports", label: "Sports", avatar: "/brands/sports.jpg", bgColor: "bg-green-600" },
]

const saleTypes = [
  { id: "all", label: "All" },
  { id: "buy", label: "Buy Now" },
  { id: "auction", label: "Auction" },
]

const conditions = [
  { id: "mint", label: "Mint/Near Mint" },
  { id: "excellent", label: "Excellent" },
  { id: "good", label: "Good" },
  { id: "played", label: "Played" },
]

const sortOptions = [
  { id: "popular", label: "Most Popular" },
  { id: "newest", label: "Newest" },
  { id: "price-low", label: "Price: Low to High" },
  { id: "price-high", label: "Price: High to Low" },
]

const products = [
  {
    id: "1",
    name: "Pikachu VMAX Rainbow Rare",
    price: 250,
    originalPrice: 300,
    image: "/cards/pokemon-1.jpg",
    seller: "CardMaster",
    rating: 4.9,
    sold: 156,
    condition: "Mint",
    isHot: true,
    isVerified: true,
    category: "pokemon",
    saleType: "buy"
  },
  {
    id: "2",
    name: "LeBron James Rookie Card",
    price: 1500,
    image: "/cards/sports-1.jpg",
    seller: "SportsHub",
    rating: 5.0,
    sold: 23,
    condition: "Excellent",
    isHot: true,
    isVerified: true,
    category: "sports",
    saleType: "buy"
  },
  {
    id: "3",
    name: "Blue-Eyes White Dragon 1st Ed",
    price: 850,
    originalPrice: 1000,
    image: "/cards/yugioh-1.jpg",
    seller: "YugiCollector",
    rating: 4.8,
    sold: 45,
    condition: "Near Mint",
    isHot: false,
    isVerified: true,
    category: "yugioh",
    saleType: "buy"
  },
  {
    id: "4",
    name: "Luffy Gear 5 Secret Rare",
    price: 180,
    image: "/cards/onepiece-1.jpg",
    seller: "OnePieceID",
    rating: 4.7,
    sold: 89,
    condition: "Mint",
    isHot: true,
    isVerified: false,
    category: "onepiece",
    saleType: "buy"
  },
  {
    id: "5",
    name: "Charizard Base Set Holo",
    price: 2500,
    image: "/cards/pokemon-2.jpg",
    seller: "VintageCards",
    rating: 4.9,
    sold: 12,
    condition: "Excellent",
    isHot: true,
    isVerified: true,
    category: "pokemon",
    saleType: "buy"
  },
  {
    id: "6",
    name: "Black Lotus",
    price: 4500,
    image: "/cards/mtg-1.jpg",
    seller: "LegendaryCards",
    rating: 5.0,
    sold: 5,
    condition: "Mint",
    isHot: false,
    isVerified: true,
    category: "mtg",
    saleType: "buy"
  },
]

const auctionProducts = [
  {
    id: "auction-1",
    name: "Walking Wake ex Hyper Rare",
    currentBid: 225,
    image: "/cards/pokemon-1.jpg",
    seller: "Aldra",
    bidCount: 7,
    condition: "Mint",
    isHot: true,
    isVerified: false,
    category: "pokemon",
    saleType: "auction",
    endTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
  },
  {
    id: "auction-2",
    name: "Dark Magician Ultimate Rare",
    currentBid: 450,
    image: "/cards/yugioh-1.jpg",
    seller: "YugiMaster",
    bidCount: 12,
    condition: "Near Mint",
    isHot: true,
    isVerified: true,
    category: "yugioh",
    saleType: "auction",
    endTime: new Date(Date.now() + 45 * 60 * 1000),
  },
  {
    id: "auction-3",
    name: "Shanks Manga Art Secret",
    currentBid: 320,
    image: "/cards/onepiece-1.jpg",
    seller: "PirateKing",
    bidCount: 9,
    condition: "Mint",
    isHot: false,
    isVerified: true,
    category: "onepiece",
    saleType: "auction",
    endTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
  },
  {
    id: "auction-4",
    name: "Mox Pearl Alpha Edition",
    currentBid: 8500,
    image: "/cards/mtg-1.jpg",
    seller: "MTGLegend",
    bidCount: 15,
    condition: "Excellent",
    isHot: true,
    isVerified: true,
    category: "mtg",
    saleType: "auction",
    endTime: new Date(Date.now() + 30 * 60 * 1000),
  },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price)
}

function formatTimeLeft(endTime: Date) {
  const now = new Date().getTime()
  const end = endTime.getTime()
  const diff = Math.max(0, end - now)
  
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }
  return `${minutes}m`
}

function AuctionCountdown({ endTime }: { endTime: Date }) {
  const [timeLeft, setTimeLeft] = useState(formatTimeLeft(endTime))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(formatTimeLeft(endTime))
    }, 1000)
    return () => clearInterval(timer)
  }, [endTime])

  return <span>{timeLeft}</span>
}

function ProductCard({ product }: { product: typeof products[0] }) {
  const [liked, setLiked] = useState(false)

  return (
    <Link href={`/shop/${product.id}`} className="block">
      <div className="bg-card rounded-2xl overflow-hidden border border-border">
        {/* Image */}
        <div className="relative aspect-square bg-gradient-to-b from-primary/10 to-transparent">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
          {/* Hot Badge */}
          {product.isHot && (
            <Badge className="absolute top-2 left-2 bg-gradient-to-r from-primary to-accent text-white text-xs border-0">
              Hot
            </Badge>
          )}
          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.preventDefault()
              setLiked(!liked)
            }}
            className="absolute top-2 right-2 size-8 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-border"
          >
            <Heart className={`size-4 ${liked ? "fill-red-500 text-red-500" : ""}`} />
          </button>
        </div>

        {/* Content */}
        <div className="p-3">
          <h3 className="font-medium text-sm text-foreground line-clamp-2 mb-1">
            {product.name}
          </h3>
          
          {/* Condition */}
          <span className="text-xs text-green-400">{product.condition}</span>

          {/* Price */}
          <div className="mt-2">
            <span className="font-bold text-primary">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through ml-2">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Seller & Rating */}
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground">{product.seller}</span>
              {product.isVerified && (
                <div className="size-3.5 bg-primary rounded-full flex items-center justify-center">
                  <Check className="size-2 text-white" />
                </div>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Star className="size-3 fill-yellow-500 text-yellow-500" />
              <span className="text-xs font-medium">{product.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

function AuctionCard({ product }: { product: typeof auctionProducts[0] }) {
  const [liked, setLiked] = useState(false)

  return (
    <Link href={`/auction/${product.id}`} className="block">
      <div className="bg-card rounded-2xl overflow-hidden border border-border">
        {/* Image */}
        <div className="relative aspect-square bg-gradient-to-b from-primary/10 to-transparent">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
          {/* Countdown Badge */}
          <div className="absolute top-2 left-2 bg-red-500/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
            <Clock className="size-2.5" />
            <AuctionCountdown endTime={product.endTime} />
          </div>
          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.preventDefault()
              setLiked(!liked)
            }}
            className="absolute top-2 right-2 size-8 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-border"
          >
            <Heart className={`size-4 ${liked ? "fill-red-500 text-red-500" : ""}`} />
          </button>
        </div>

        {/* Content */}
        <div className="p-3">
          <h3 className="font-medium text-sm text-foreground line-clamp-2 mb-1">
            {product.name}
          </h3>
          
          {/* Condition */}
          <span className="text-xs text-green-400">{product.condition}</span>

          {/* Current Bid */}
          <div className="mt-2 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-muted-foreground block">Current Bid</span>
              <span className="font-bold text-primary">{formatPrice(product.currentBid)}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-muted-foreground block">Bids</span>
              <span className="font-semibold text-sm">{product.bidCount}</span>
            </div>
          </div>

          {/* Seller */}
          <div className="flex items-center gap-1 mt-2 pt-2 border-t border-border">
            <span className="text-xs text-muted-foreground">{product.seller}</span>
            {product.isVerified && (
              <div className="size-3.5 bg-primary rounded-full flex items-center justify-center">
                <Check className="size-2 text-white" />
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSaleType, setSelectedSaleType] = useState("all")
  const [selectedConditions, setSelectedConditions] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("popular")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const filteredProducts = products.filter(product => 
    (selectedCategory === "all" || product.category === selectedCategory) &&
    (selectedConditions.length === 0 || selectedConditions.some(c => product.condition.toLowerCase().includes(c)))
  )

  const filteredAuctions = auctionProducts.filter(product =>
    (selectedCategory === "all" || product.category === selectedCategory) &&
    (selectedConditions.length === 0 || selectedConditions.some(c => product.condition.toLowerCase().includes(c)))
  )

  const toggleCondition = (condition: string) => {
    if (selectedConditions.includes(condition)) {
      setSelectedConditions(selectedConditions.filter(c => c !== condition))
    } else {
      setSelectedConditions([...selectedConditions, condition])
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg">
        <div className="px-4 pt-12 pb-3">
          {/* Search Row */}
          <div className="flex items-center gap-3">
            {/* Shop Title */}
            <span className="text-base font-bold text-foreground shrink-0">Shop</span>
            
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search cards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 pl-9 pr-10 rounded-xl bg-card border-border text-sm"
              />
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <button className="absolute right-3 top-1/2 -translate-y-1/2">
                    <SlidersHorizontal className="size-4 text-muted-foreground" />
                  </button>
                </SheetTrigger>
              <SheetContent side="bottom" className="h-[70vh] rounded-t-3xl">
                <SheetHeader className="pb-4">
                  <SheetTitle className="text-xl">Filter & Sort</SheetTitle>
                </SheetHeader>
                
                <div className="space-y-6 overflow-auto h-full pb-20">
                  {/* Sort */}
                  <div>
                    <h3 className="font-semibold mb-3">Sort By</h3>
                    <div className="space-y-2">
                      {sortOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setSortBy(option.id)}
                          className={`w-full flex items-center justify-between p-3 rounded-xl border ${
                            sortBy === option.id ? "bg-primary text-primary-foreground border-primary" : "bg-secondary border-border"
                          }`}
                        >
                          <span>{option.label}</span>
                          {sortBy === option.id && <Check className="size-5" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Condition */}
                  <div>
                    <h3 className="font-semibold mb-3">Condition</h3>
                    <div className="flex flex-wrap gap-2">
                      {conditions.map((condition) => (
                        <button
                          key={condition.id}
                          onClick={() => toggleCondition(condition.id)}
                          className={`px-4 py-2 rounded-xl text-sm font-medium border ${
                            selectedConditions.includes(condition.id)
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-secondary text-foreground border-border"
                          }`}
                        >
                          {condition.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Apply Button */}
                  <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-border">
                    <Button 
                      onClick={() => setIsFilterOpen(false)}
                      className="w-full h-14 rounded-xl bg-gradient-to-r from-primary to-accent"
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </SheetContent>
              </Sheet>
            </div>

            {/* Cart */}
            <Link href="/cart" className="relative shrink-0">
              <Button variant="ghost" size="icon" className="size-10 bg-card border border-border rounded-xl">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                <span className="absolute -top-1 -right-1 size-4 bg-gradient-to-r from-primary to-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  2
                </span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Brand Categories */}
        <div className="px-4 pb-2">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide py-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl transition-all border ${
                  selectedCategory === category.id
                    ? "border-primary bg-primary/10"
                    : "bg-card border-border"
                }`}
              >
                <div className="size-6 rounded-lg overflow-hidden shrink-0">
                  {category.avatar ? (
                    <Image
                      src={category.avatar}
                      alt={category.label}
                      width={24}
                      height={24}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className={`w-full h-full ${category.bgColor} flex items-center justify-center`}>
                      <span className="text-[8px] font-bold text-white">ALL</span>
                    </div>
                  )}
                </div>
                <span className={`text-xs font-medium whitespace-nowrap ${
                  selectedCategory === category.id ? "text-primary" : "text-foreground"
                }`}>{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sale Type Filter */}
        <div className="px-4 pb-3">
          <div className="flex gap-2">
            {saleTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedSaleType(type.id)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all border ${
                  selectedSaleType === type.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground border-border"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Product Grid */}
      <main className="px-4 pt-2">
        {/* Active Filters */}
        {selectedConditions.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedConditions.map((condition) => (
              <Badge
                key={condition}
                variant="secondary"
                className="pl-3 pr-2 py-1 gap-1 rounded-full"
              >
                {conditions.find(c => c.id === condition)?.label}
                <button onClick={() => toggleCondition(condition)}>
                  <X className="size-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-4">
          {selectedSaleType === "auction" 
            ? `${filteredAuctions.length} auctions found`
            : selectedSaleType === "buy"
            ? `${filteredProducts.length} products found`
            : `${filteredProducts.length + filteredAuctions.length} items found`
          }
        </p>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4">
          {(selectedSaleType === "all" || selectedSaleType === "auction") && 
            filteredAuctions.map((product) => (
              <AuctionCard key={product.id} product={product} />
            ))
          }
          {(selectedSaleType === "all" || selectedSaleType === "buy") &&
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          }
        </div>
      </main>
    </div>
  )
}
