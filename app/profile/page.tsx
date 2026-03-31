"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Settings,
  ChevronRight,
  Package,
  Heart,
  ShoppingCart,
  Clock,
  Store,
  CreditCard,
  HelpCircle,
  Shield,
  LogOut,
  Star,
  Edit3,
} from "lucide-react"
import { AppLayout } from "@/components/app-layout"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const mockUser = {
  name: "卡牌收藏家",
  avatar: "https://i.pravatar.cc/150?img=12",
  bio: "热爱收藏各类卡牌，专注宝可梦和球星卡",
  followers: 1234,
  following: 567,
  posts: 89,
  verified: true,
  isSeller: true,
}

const orderTabs = [
  { id: "pending", label: "待付款", icon: Clock, count: 2 },
  { id: "shipped", label: "待发货", icon: Package, count: 1 },
  { id: "received", label: "待收货", icon: ShoppingCart, count: 3 },
  { id: "review", label: "待评价", icon: Star, count: 5 },
]

const sellerMenuItems = [
  { id: "shop", label: "我的店铺", icon: Store, href: "/profile/shop" },
  {
    id: "orders",
    label: "订单管理",
    icon: Package,
    href: "/profile/orders",
    badge: "6",
  },
  { id: "wallet", label: "钱包/提现", icon: CreditCard, href: "/profile/wallet" },
]

const generalMenuItems = [
  { id: "favorites", label: "我的收藏", icon: Heart, href: "/profile/favorites" },
  {
    id: "history",
    label: "浏览历史",
    icon: Clock,
    href: "/profile/history",
  },
  { id: "help", label: "帮助中心", icon: HelpCircle, href: "/profile/help" },
  { id: "privacy", label: "隐私设置", icon: Shield, href: "/profile/privacy" },
]

export default function ProfilePage() {
  return (
    <AppLayout>
      <div className="min-h-screen bg-background pb-4">
        {/* Header */}
        <header className="relative bg-primary px-4 pb-16 pt-6">
          <div className="flex items-center justify-end">
            <Link
              href="/profile/settings"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/20"
            >
              <Settings className="h-5 w-5 text-primary-foreground" />
            </Link>
          </div>
        </header>

        {/* Profile Card */}
        <div className="-mt-12 px-4">
          <div className="rounded-2xl bg-card p-4 shadow-lg">
            <div className="flex items-start gap-4">
              <Avatar className="h-20 w-20 border-4 border-card">
                <AvatarImage src={mockUser.avatar} />
                <AvatarFallback>{mockUser.name.slice(0, 1)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold">{mockUser.name}</h1>
                  {mockUser.verified && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success">
                      <svg
                        className="h-3 w-3 text-success-foreground"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                  {mockUser.isSeller && (
                    <span className="rounded-full bg-accent px-2 py-0.5 text-xs text-accent-foreground">
                      卖家
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {mockUser.bio}
                </p>
                <div className="mt-3 flex gap-6">
                  <div className="text-center">
                    <span className="block font-bold">{mockUser.posts}</span>
                    <span className="text-xs text-muted-foreground">动态</span>
                  </div>
                  <div className="text-center">
                    <span className="block font-bold">{mockUser.followers}</span>
                    <span className="text-xs text-muted-foreground">粉丝</span>
                  </div>
                  <div className="text-center">
                    <span className="block font-bold">{mockUser.following}</span>
                    <span className="text-xs text-muted-foreground">关注</span>
                  </div>
                </div>
              </div>
            </div>
            <Button variant="outline" className="mt-4 w-full gap-2">
              <Edit3 className="h-4 w-4" />
              编辑资料
            </Button>
          </div>
        </div>

        {/* Order Status */}
        <div className="mt-4 px-4">
          <div className="rounded-2xl bg-card p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold">我的订单</h2>
              <Link
                href="/profile/orders"
                className="flex items-center text-sm text-muted-foreground"
              >
                全部订单
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {orderTabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <Link
                    key={tab.id}
                    href={`/profile/orders?status=${tab.id}`}
                    className="flex flex-col items-center gap-1"
                  >
                    <div className="relative">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                        <Icon className="h-5 w-5" />
                      </div>
                      {tab.count > 0 && (
                        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs text-accent-foreground">
                          {tab.count}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {tab.label}
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        {/* Seller Section */}
        {mockUser.isSeller && (
          <div className="mt-4 px-4">
            <div className="rounded-2xl bg-card">
              <div className="border-b border-border px-4 py-3">
                <h2 className="font-semibold">卖家中心</h2>
              </div>
              {sellerMenuItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between px-4 py-3.5 transition-colors hover:bg-secondary/50",
                      index !== sellerMenuItems.length - 1 &&
                        "border-b border-border"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <span>{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-xs text-accent-foreground">
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* General Menu */}
        <div className="mt-4 px-4">
          <div className="rounded-2xl bg-card">
            {generalMenuItems.map((item, index) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-4 py-3.5 transition-colors hover:bg-secondary/50",
                    index !== generalMenuItems.length - 1 &&
                      "border-b border-border"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              )
            })}
          </div>
        </div>

        {/* Logout */}
        <div className="mt-4 px-4">
          <Button
            variant="outline"
            className="w-full gap-2 text-destructive hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            退出登录
          </Button>
        </div>
      </div>
    </AppLayout>
  )
}
