"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, ChevronRight } from "lucide-react"
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts"
import Image from "next/image"

// Sample historical price data with volume
const priceData = [
  { date: "1/2", price: 9.5, volume: 25 },
  { date: "1/13", price: 9.8, volume: 30 },
  { date: "1/27", price: 10.2, volume: 35 },
  { date: "2/10", price: 9.8, volume: 45 },
  { date: "2/24", price: 10.5, volume: 55 },
  { date: "3/17", price: 11.76, volume: 75 },
]

interface PriceHistoryChartProps {
  currentPrice: number
  cardName?: string
  cardImage?: string
  cardSet?: string
}

function formatPrice(price: number) {
  return `$${price.toFixed(2)}`
}

export function PriceHistoryChart({ 
  currentPrice, 
  cardName = "Pikachu VMAX Rainbow...",
  cardImage = "/cards/pokemon-1.jpg",
  cardSet = "Vivid Voltage 188/185"
}: PriceHistoryChartProps) {
  const [selectedRange] = useState("3m")

  // Calculate price change
  const firstPrice = priceData[0].price
  const lastPrice = priceData[priceData.length - 1].price
  const priceChangePercent = (((lastPrice - firstPrice) / firstPrice) * 100).toFixed(2)
  const isPositive = lastPrice >= firstPrice

  // Stats
  const avgPrice = (priceData.reduce((a, b) => a + b.price, 0) / priceData.length).toFixed(2)
  const totalListings = 291

  return (
    <div className="bg-card border-b border-border">
      {/* Card Info Header */}
      <div className="flex items-start gap-3 px-4 pt-4 pb-3">
        <div className="size-14 rounded-lg overflow-hidden bg-muted shrink-0">
          <Image
            src={cardImage}
            alt={cardName}
            width={56}
            height={56}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm text-foreground truncate">{cardName}</h4>
          <p className="text-xs text-muted-foreground mb-1">{cardSet}</p>
          <div className="flex items-center gap-3">
            <div>
              <span className="text-xs text-muted-foreground">Avg:</span>
              <span className="text-sm font-bold ml-1">${avgPrice}</span>
            </div>
            <span className={`text-sm font-semibold ${isPositive ? "text-green-500" : "text-red-500"}`}>
              {isPositive ? "+" : ""}{priceChangePercent}%
            </span>
            <div className="text-right">
              <span className="text-sm font-medium text-foreground">{totalListings}</span>
              <span className="text-xs text-muted-foreground ml-1">listings</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="px-4 pb-4">
        {/* Title with View Details */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-foreground">Market Price History</h3>
          <button className="flex items-center gap-1 text-xs text-primary font-medium">
            View Details
            <ChevronRight className="size-3" />
          </button>
        </div>

        {/* Chart */}
        <div className="h-40 -mx-2">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={priceData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                yAxisId="price"
                orientation="left"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                domain={[7, 13]}
                tickFormatter={(value) => `$${value}`}
              />
              <YAxis 
                yAxisId="volume"
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                domain={[0, 100]}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-lg">
                        <p className="text-xs text-muted-foreground">{data.date}</p>
                        <p className="text-sm font-semibold">${data.price.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">{data.volume} sales</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar 
                yAxisId="volume"
                dataKey="volume" 
                fill="hsl(var(--muted))"
                radius={[2, 2, 0, 0]}
                barSize={12}
              />
              <Line
                yAxisId="price"
                type="monotone"
                dataKey="price"
                stroke="hsl(217, 91%, 60%)"
                strokeWidth={2}
                dot={{ r: 3, fill: 'hsl(217, 91%, 60%)' }}
                activeDot={{ r: 5, fill: 'hsl(217, 91%, 60%)' }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
