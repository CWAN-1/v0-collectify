"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, ChevronRight } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

// Sample historical price data
const priceData = [
  { date: "Jan", price: 180, label: "Jan 2024" },
  { date: "Feb", price: 195, label: "Feb 2024" },
  { date: "Mar", price: 210, label: "Mar 2024" },
  { date: "Apr", price: 185, label: "Apr 2024" },
  { date: "May", price: 220, label: "May 2024" },
  { date: "Jun", price: 250, label: "Jun 2024" },
]

const timeRanges = [
  { id: "1m", label: "1M" },
  { id: "3m", label: "3M" },
  { id: "6m", label: "6M" },
  { id: "1y", label: "1Y" },
  { id: "all", label: "All" },
]

interface PriceHistoryChartProps {
  currentPrice: number
  cardName?: string
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price)
}

export function PriceHistoryChart({ currentPrice, cardName }: PriceHistoryChartProps) {
  const [selectedRange, setSelectedRange] = useState("6m")

  // Calculate price change
  const firstPrice = priceData[0].price
  const lastPrice = priceData[priceData.length - 1].price
  const priceChange = lastPrice - firstPrice
  const priceChangePercent = ((priceChange / firstPrice) * 100).toFixed(1)
  const isPositive = priceChange >= 0

  // Calculate stats
  const prices = priceData.map(d => d.price)
  const avgPrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length)
  const highPrice = Math.max(...prices)
  const lowPrice = Math.min(...prices)

  return (
    <div className="bg-card px-4 py-4 border-b border-border">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-foreground">Price History</h3>
        <button className="flex items-center gap-1 text-xs text-primary">
          View Details
          <ChevronRight className="size-3" />
        </button>
      </div>

      {/* Price Change Summary */}
      <div className="flex items-center gap-2 mb-4">
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
          isPositive 
            ? "bg-green-500/20 text-green-500" 
            : "bg-red-500/20 text-red-500"
        }`}>
          {isPositive ? (
            <TrendingUp className="size-3" />
          ) : (
            <TrendingDown className="size-3" />
          )}
          <span>{isPositive ? "+" : ""}{priceChangePercent}%</span>
        </div>
        <span className="text-xs text-muted-foreground">
          {isPositive ? "+" : ""}{formatPrice(priceChange)} in 6 months
        </span>
      </div>

      {/* Time Range Selector */}
      <div className="flex gap-1 mb-4">
        {timeRanges.map((range) => (
          <button
            key={range.id}
            onClick={() => setSelectedRange(range.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedRange === range.id
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="h-32 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={priceData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              hide 
              domain={['dataMin - 20', 'dataMax + 20']}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload
                  return (
                    <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-lg">
                      <p className="text-xs text-muted-foreground">{data.label}</p>
                      <p className="text-sm font-semibold">{formatPrice(data.price)}</p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: 'hsl(var(--primary))' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-border">
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-0.5">Avg</p>
          <p className="text-sm font-semibold">{formatPrice(avgPrice)}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-0.5">High</p>
          <p className="text-sm font-semibold text-green-500">{formatPrice(highPrice)}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-0.5">Low</p>
          <p className="text-sm font-semibold text-red-500">{formatPrice(lowPrice)}</p>
        </div>
      </div>
    </div>
  )
}
