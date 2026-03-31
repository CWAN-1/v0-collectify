"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowUpRight, ArrowDownLeft, Plus, ChevronRight, Eye, EyeOff, CreditCard, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"

const transactions = [
  {
    id: "1",
    type: "income",
    title: "Penjualan - Pikachu VMAX",
    amount: 2500000,
    date: "28 Mar 2024",
    status: "completed"
  },
  {
    id: "2",
    type: "withdraw",
    title: "Penarikan ke BCA",
    amount: -5000000,
    date: "25 Mar 2024",
    status: "completed"
  },
  {
    id: "3",
    type: "income",
    title: "Penjualan - Charizard Base Set",
    amount: 25000000,
    date: "23 Mar 2024",
    status: "completed"
  },
  {
    id: "4",
    type: "withdraw",
    title: "Penarikan ke Mandiri",
    amount: -10000000,
    date: "20 Mar 2024",
    status: "pending"
  },
]

const bankAccounts = [
  { id: "1", bank: "BCA", number: "****4567", name: "Budi Santoso", isDefault: true },
  { id: "2", bank: "Mandiri", number: "****8901", name: "Budi Santoso", isDefault: false },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Math.abs(price))
}

export default function WalletPage() {
  const router = useRouter()
  const [showBalance, setShowBalance] = useState(true)
  const [withdrawAmount, setWithdrawAmount] = useState("")

  const balance = 45500000
  const pendingBalance = 2500000

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-foreground text-background px-4 pt-12 pb-8 rounded-b-[2rem]">
        <div className="flex items-center gap-3 mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => router.back()}
            className="text-background hover:bg-background/10"
          >
            <ArrowLeft className="size-5" />
          </Button>
          <h1 className="text-xl font-bold">Saldo Saya</h1>
        </div>

        {/* Balance Card */}
        <div className="bg-background/10 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-background/70">Saldo Tersedia</span>
            <button onClick={() => setShowBalance(!showBalance)}>
              {showBalance ? (
                <Eye className="size-5 text-background/70" />
              ) : (
                <EyeOff className="size-5 text-background/70" />
              )}
            </button>
          </div>
          <p className="text-3xl font-bold mb-4">
            {showBalance ? formatPrice(balance) : "Rp ••••••••"}
          </p>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-background/70">Pending</span>
              <p className="font-semibold">{showBalance ? formatPrice(pendingBalance) : "••••••"}</p>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button className="bg-background text-foreground hover:bg-background/90 rounded-full gap-2">
                  <ArrowUpRight className="size-4" />
                  Tarik Dana
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[70vh] rounded-t-3xl">
                <SheetHeader className="pb-4">
                  <SheetTitle>Tarik Dana</SheetTitle>
                </SheetHeader>
                <div className="space-y-6">
                  {/* Amount Input */}
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">
                      Jumlah Penarikan
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">Rp</span>
                      <Input
                        type="number"
                        placeholder="0"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        className="h-14 pl-12 rounded-2xl bg-muted border-0 text-2xl font-bold"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Saldo tersedia: {formatPrice(balance)}
                    </p>
                  </div>

                  {/* Quick Amount */}
                  <div className="flex flex-wrap gap-2">
                    {[1000000, 5000000, 10000000, 25000000].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setWithdrawAmount(amount.toString())}
                        className="px-4 py-2 bg-muted rounded-full text-sm font-medium"
                      >
                        {formatPrice(amount)}
                      </button>
                    ))}
                  </div>

                  {/* Bank Account */}
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">
                      Rekening Tujuan
                    </label>
                    <button className="w-full flex items-center gap-3 p-4 bg-muted rounded-2xl">
                      <div className="size-12 rounded-full bg-background flex items-center justify-center">
                        <Building2 className="size-5" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-semibold">{bankAccounts[0].bank}</p>
                        <p className="text-sm text-muted-foreground">
                          {bankAccounts[0].number} - {bankAccounts[0].name}
                        </p>
                      </div>
                      <ChevronRight className="size-5 text-muted-foreground" />
                    </button>
                  </div>

                  {/* Submit */}
                  <Button 
                    className="w-full h-14 rounded-full"
                    disabled={!withdrawAmount || Number(withdrawAmount) > balance}
                  >
                    Tarik Dana
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="px-4 -mt-4 relative z-10">
        {/* Bank Accounts */}
        <div className="bg-card rounded-2xl border border-border p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Rekening Bank</h3>
            <button className="text-sm text-muted-foreground flex items-center gap-1">
              <Plus className="size-4" />
              Tambah
            </button>
          </div>
          <div className="space-y-2">
            {bankAccounts.map((account) => (
              <div key={account.id} className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                <div className="size-10 rounded-full bg-background flex items-center justify-center">
                  <Building2 className="size-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{account.bank}</span>
                    {account.isDefault && (
                      <span className="text-xs px-2 py-0.5 bg-foreground text-background rounded-full">
                        Utama
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{account.number}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction History */}
        <div>
          <h3 className="font-semibold mb-3">Riwayat Transaksi</h3>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center gap-3 p-3 bg-card rounded-2xl border border-border">
                <div className={`size-10 rounded-full flex items-center justify-center ${
                  transaction.type === "income" ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"
                }`}>
                  {transaction.type === "income" ? (
                    <ArrowDownLeft className="size-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <ArrowUpRight className="size-5 text-red-600 dark:text-red-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm line-clamp-1">{transaction.title}</p>
                  <p className="text-xs text-muted-foreground">{transaction.date}</p>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-sm ${
                    transaction.type === "income" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  }`}>
                    {transaction.type === "income" ? "+" : "-"}{formatPrice(transaction.amount)}
                  </p>
                  {transaction.status === "pending" && (
                    <span className="text-xs text-muted-foreground">Pending</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
