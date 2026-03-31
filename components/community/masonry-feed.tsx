"use client"

import { PostCard } from "./post-card"
import Link from "next/link"

// 模拟数据
const mockPosts = [
  {
    id: "1",
    title: "开箱！终于抽到闪卡皮卡丘，太激动了！",
    image: "https://images.unsplash.com/photo-1613771404721-1f92d799e49f?w=400&h=500&fit=crop",
    author: { name: "卡牌收藏家", avatar: "https://i.pravatar.cc/150?img=1" },
    likes: 328,
    comments: 45,
    tags: ["宝可梦", "闪卡"],
  },
  {
    id: "2",
    title: "梅西签名卡入手记录，2022世界杯纪念版",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=600&fit=crop",
    author: { name: "足球卡迷", avatar: "https://i.pravatar.cc/150?img=2" },
    likes: 892,
    comments: 156,
    tags: ["球星卡", "梅西"],
  },
  {
    id: "3",
    title: "青眼白龙初版，品相完美！",
    image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=400&h=450&fit=crop",
    author: { name: "游戏王老玩家", avatar: "https://i.pravatar.cc/150?img=3" },
    likes: 567,
    comments: 89,
    tags: ["游戏王"],
  },
  {
    id: "4",
    title: "新手入坑指南：如何鉴别正版宝可梦卡牌",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=500&fit=crop",
    author: { name: "鉴卡达人", avatar: "https://i.pravatar.cc/150?img=4" },
    likes: 1205,
    comments: 234,
    tags: ["攻略", "鉴定"],
  },
  {
    id: "5",
    title: "海贼王25周年纪念卡组开箱",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=550&fit=crop",
    author: { name: "海贼迷", avatar: "https://i.pravatar.cc/150?img=5" },
    likes: 445,
    comments: 67,
    tags: ["海贼王"],
  },
  {
    id: "6",
    title: "C罗新秀卡估价咨询，有懂行的吗？",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=480&fit=crop",
    author: { name: "新手小白", avatar: "https://i.pravatar.cc/150?img=6" },
    likes: 189,
    comments: 78,
    tags: ["球星卡", "估价"],
  },
  {
    id: "7",
    title: "万智牌黑莲花复刻版，你们觉得值吗？",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=520&fit=crop",
    author: { name: "MTG玩家", avatar: "https://i.pravatar.cc/150?img=7" },
    likes: 723,
    comments: 145,
    tags: ["万智牌"],
  },
  {
    id: "8",
    title: "分享我的宝可梦卡牌收藏展示架",
    image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=400&h=600&fit=crop",
    author: { name: "收藏展示控", avatar: "https://i.pravatar.cc/150?img=8" },
    likes: 556,
    comments: 92,
    tags: ["收藏", "展示"],
  },
]

export function MasonryFeed() {
  // 将帖子分成两列，模拟瀑布流效果
  const leftPosts = mockPosts.filter((_, i) => i % 2 === 0)
  const rightPosts = mockPosts.filter((_, i) => i % 2 === 1)

  return (
    <div className="flex gap-3 px-4 pb-4">
      <div className="flex flex-1 flex-col gap-3">
        {leftPosts.map((post) => (
          <Link key={post.id} href={`/post/${post.id}`}>
            <PostCard post={post} />
          </Link>
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-3">
        {rightPosts.map((post) => (
          <Link key={post.id} href={`/post/${post.id}`}>
            <PostCard post={post} />
          </Link>
        ))}
      </div>
    </div>
  )
}
