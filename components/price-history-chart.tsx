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

const priceData = [
  { date: "1/2",  price: 8.5,  volume: 45 },
  { date: "1/6",  price: 8.8,  volume: 50 },
  { date: "1/9",  price: 9.2,  volume: 52 },
  { date: "1/13", price: 9.5,  volume: 60 },
  { date: "1/16", price: 9.8,  volume: 38 },
  { date: "1/20", price: 10.1, volume: 55 },
  { date: "1/23", price: 10.5, volume: 65 },
  { date: "1/27", price: 10.3, volume: 44 },
  { date: "1/30", price: 10.2, volume: 48 },
  { date: "2/3",  price: 10.6, volume: 60 },
  { date: "2/6",  price: 10.8, volume: 72 },
  { date: "2/10", price: 9.9,  volume: 40 },
  { date: "2/13", price: 9.5,  volume: 35 },
  { date: "2/17", price: 10.0, volume: 42 },
  { date: "2/20", price: 10.3, volume: 50 },
  { date: "2/24", price: 10.5, volume: 58 },
  { date: "2/27", price: 10.8, volume: 54 },
  { date: "3/3",  price: 11.0, volume: 63 },
  { date: "3/6",  price: 11.2, volume: 65 },
  { date: "3/10", price: 11.4, volume: 70 },
  { date: "3/13", price: 11.5, volume: 78 },
  { date: "3/17", price: 11.76, volume: 62 },
]

interface PriceHistoryChartProps {
  currentPrice?: number
}

export function PriceHistoryChart({ currentPrice }: PriceHistoryChartProps) {
  const firstPrice = priceData[0].price
  const lastPrice = priceData[priceData.length - 1].price
  const priceChangePercent = (((lastPrice - firstPrice) / firstPrice) * 100).toFixed(2)
  const isPositive = lastPrice >= firstPrice
  const avgPrice = (priceData.reduce((a, b) => a + b.price, 0) / priceData.length).toFixed(2)
  const totalListings = 291

  return (
    <div className="bg-card border-b border-border">
      <div className="px-4 pt-4 pb-0">
        {/* Title row */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm text-foreground">Market Price History</h3>
          <button className="flex items-center gap-0.5 text-xs text-primary font-medium">
            View Details
            <ChevronRight className="size-3" />
          </button>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-baseline gap-1">
            <span className="text-xs text-muted-foreground">Avg:</span>
            <span className="text-base font-bold text-foreground">${avgPrice}</span>
          </div>
          <span className={`text-xs font-semibold ${isPositive ? "text-green-500" : "text-red-500"}`}>
            {isPositive ? "+" : ""}{priceChangePercent}%
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-semibold text-foreground">{totalListings}</span>
            <span className="text-xs text-muted-foreground">listings</span>
          </div>
        </div>
      </div>

      {/* Chart — negative horizontal margin so bars reach card edges */}
      <div className="h-44 -mx-0">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={priceData} margin={{ top: 5, right: 8, left: -10, bottom: 0 }}>
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 9, fill: '#9ca3af' }}
              interval="preserveStartEnd"
            />
            <YAxis
              yAxisId="price"
              orientation="left"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 9, fill: '#9ca3af' }}
              tickFormatter={(v) => `$${v}`}
              domain={[7, 13]}
              tickCount={4}
            />
            <YAxis
              yAxisId="volume"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 9, fill: '#9ca3af' }}
              domain={[0, 100]}
              tickCount={5}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.92)',
                border: 'none',
                borderRadius: '8px',
                fontSize: '11px',
                color: '#f8fafc',
                boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                padding: '8px 12px',
              }}
              labelStyle={{ color: '#94a3b8', marginBottom: '4px', fontSize: '10px' }}
              itemStyle={{ color: '#f8fafc' }}
              cursor={{ stroke: 'rgba(148,163,184,0.3)', strokeWidth: 1 }}
              formatter={(value: number, name: string) =>
                name === "price" ? [`$${(value as number).toFixed(2)}`, "Price"] : [value, "Volume"]
              }
            />
            {/* Light blue volume bars */}
            <Bar
              yAxisId="volume"
              dataKey="volume"
              fill="#bfdbfe"
              radius={[2, 2, 0, 0]}
              opacity={0.8}
            />
            {/* Deep blue price line */}
            <Line
              yAxisId="price"
              type="monotone"
              dataKey="price"
              stroke="#1d4ed8"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 4, fill: '#1d4ed8' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
