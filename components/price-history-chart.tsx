"use client"

import { ChevronRight } from "lucide-react"
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

// Sample historical price data with volume
const priceData = [
  { date: "1/2", price: 9.2, volume: 25 },
  { date: "1/9", price: 9.5, volume: 28 },
  { date: "1/13", price: 9.4, volume: 30 },
  { date: "1/20", price: 10.2, volume: 35 },
  { date: "1/27", price: 10.8, volume: 45 },
  { date: "2/3", price: 10.5, volume: 42 },
  { date: "2/10", price: 9.8, volume: 48 },
  { date: "2/17", price: 10.2, volume: 52 },
  { date: "2/24", price: 10.8, volume: 60 },
  { date: "3/3", price: 11.2, volume: 68 },
  { date: "3/10", price: 11.5, volume: 72 },
  { date: "3/17", price: 11.76, volume: 75 },
]

interface PriceHistoryChartProps {
  currentPrice?: number
}

export function PriceHistoryChart({ currentPrice }: PriceHistoryChartProps) {
  // Calculate stats
  const firstPrice = priceData[0].price
  const lastPrice = priceData[priceData.length - 1].price
  const priceChangePercent = (((lastPrice - firstPrice) / firstPrice) * 100).toFixed(2)
  const isPositive = lastPrice >= firstPrice
  const avgPrice = (priceData.reduce((a, b) => a + b.price, 0) / priceData.length).toFixed(2)
  const totalListings = 291

  return (
    <div className="bg-card border-b border-border px-4 py-4">
      {/* Title with View Details */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-bold text-foreground">Market Price History</h3>
        <button className="flex items-center gap-1 text-xs text-primary font-medium">
          View Details
          <ChevronRight className="size-3" />
        </button>
      </div>

      {/* Stats Row */}
      <div className="flex items-center gap-4 mb-4">
        <div>
          <span className="text-xs text-muted-foreground">Avg:</span>
          <span className="text-base font-bold text-foreground ml-1">${avgPrice}</span>
        </div>
        <span className={`text-sm font-semibold ${isPositive ? "text-green-500" : "text-red-500"}`}>
          {isPositive ? "+" : ""}{priceChangePercent}%
        </span>
        <div>
          <span className="text-base font-medium text-foreground">{totalListings}</span>
          <span className="text-xs text-muted-foreground ml-1">listings</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-44 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={priceData} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
              interval={1}
            />
            <YAxis 
              yAxisId="price"
              orientation="left"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
              domain={[7, 13]}
              tickFormatter={(value) => `$${value}`}
              ticks={[7, 9, 11, 13]}
            />
            <YAxis 
              yAxisId="volume"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
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
              fill="hsl(220, 20%, 75%)"
              radius={[3, 3, 0, 0]}
              barSize={14}
            />
            <Line
              yAxisId="price"
              type="monotone"
              dataKey="price"
              stroke="hsl(217, 91%, 60%)"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 4, fill: 'hsl(217, 91%, 60%)' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
