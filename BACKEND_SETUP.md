# Collectify 后端搭建指南

本指南帮助您搭建 Collectify 项目的后端系统。

---

## 📋 技术栈

- **数据库**：PostgreSQL（推荐使用 Supabase）
- **ORM**：Prisma
- **认证**：JWT + Cookie
- **支付**：Midtrans（印尼支付网关）

---

## 🚀 快速开始

### 第一步：安装依赖

```bash
npm install
```

### 第二步：设置数据库

#### 选项 A：使用 Supabase（推荐，免费）

1. 访问 https://supabase.com
2. 点击 "New Project"
3. 填写项目信息：
   - Name: `collectify`
   - Database Password: 生成并保存一个强密码
   - Region: 选择离您最近的区域（新加坡）
4. 等待数据库创建完成（约 2 分钟）
5. 进入项目设置 → Database
6. 复制 Connection String (URI)

#### 选项 B：本地 PostgreSQL

```bash
# 使用 Docker
docker run --name collectify-db -e POSTGRES_PASSWORD=yourpassword -p 5432:5432 -d postgres:15

# 连接字符串
# postgresql://postgres:yourpassword@localhost:5432/postgres
```

### 第三步：配置环境变量

创建 `.env.local` 文件：

```env
# 数据库连接字符串
DATABASE_URL="postgresql://username:password@host:5432/database_name"

# JWT 密钥（生成一个随机字符串）
JWT_SECRET="your-super-secret-jwt-key-change-in-production"

# Midtrans（印尼支付）
MIDTRANS_SERVER_KEY="your-midtrans-server-key"
MIDTRANS_CLIENT_KEY="your-midtrans-client-key"
MIDTRANS_ENV="sandbox"  # 或 "production"
```

### 第四步：初始化 Prisma

```bash
# 1. 生成 Prisma Client
npx prisma generate

# 2. 推送数据库 Schema
npx prisma db push
```

### 第五步：启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看应用。

---

## 📊 数据库 Schema

### 核心模型

#### User（用户）
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String?
  avatar    String?
  listings  Listing[]
  bids      Bid[]
  orders    Order[]
  messages  Message[]
  favorites Favorite[]
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

#### Listing（商品）
```prisma
model Listing {
  id          String   @id @default(cuid())
  title       String
  description String?
  price       Decimal  @db.Decimal(10, 2)
  images      String[]
  category    String
  condition   String
  sellerId    String
  seller      User     @relation("UserListings", fields: [sellerId], references: [id])
  bids        Bid[]
  orders      Order[]
  isAuction   Boolean  @default(false)
  auctionEnds DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

#### Bid（出价）
```prisma
model Bid {
  id        String   @id @default(cuid())
  amount    Decimal  @db.Decimal(10, 2)
  listingId String
  listing   Listing  @relation(fields: [listingId], references: [id])
  bidderId  String
  bidder    User     @relation("UserBids", fields: [bidderId], references: [id])
  createdAt DateTime @default(now())
}
```

#### Order（订单）
```prisma
model Order {
  id          String   @id @default(cuid())
  listingId   String
  listing     Listing  @relation(fields: [listingId], references: [id])
  buyerId     String
  buyer       User     @relation("UserOrders", fields: [buyerId], references: [id])
  totalAmount Decimal  @db.Decimal(10, 2)
  status      String   @default("pending")
  paymentId   String?
  shippingAddress String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

---

## 🔌 API 端点

### 认证

#### POST /api/auth/register
注册新用户

**请求体：**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**响应：**
```json
{
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### POST /api/auth/login
登录用户

**请求体：**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**响应：**
```json
{
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```
（同时设置 HTTP-only Cookie）

### 商品

#### GET /api/listings
获取商品列表

**响应：**
```json
[
  {
    "id": "listing-id",
    "title": "Pikachu Card",
    "price": "100000.00",
    "seller": {
      "id": "user-id",
      "name": "John Doe"
    }
  }
]
```

#### GET /api/listings/[id]
获取单个商品详情

---

## 💳 支付集成（Midtrans）

### 第一步：注册 Midtrans 账号

1. 访问 https://midtrans.com
2. 注册账号
3. 创建新项目
4. 获取 Server Key 和 Client Key

### 第二步：配置环境变量

在 `.env.local` 中添加：

```env
MIDTRANS_SERVER_KEY="SB-Mid-server-..."
MIDTRANS_CLIENT_KEY="SB-Mid-client-..."
MIDTRANS_ENV="sandbox"
```

### 第三步：创建支付

参考 Midtrans 文档：https://docs.midtrans.com

---

## 🔐 安全建议

### 1. 环境变量
- 永远不要将 `.env.local` 提交到 Git
- 使用不同的密钥用于开发和生产
- 定期轮换密钥

### 2. 密码
- 使用 bcrypt 加密（已实现）
- 要求强密码
- 添加密码重置功能

### 3. JWT
- 使用强密钥
- 设置合理的过期时间（已设置 7 天）
- 使用 HTTP-only Cookie（已实现）

---

## 📚 参考资源

- Prisma 文档：https://www.prisma.io/docs
- Supabase：https://supabase.com
- Midtrans 文档：https://docs.midtrans.com
- Next.js API Routes：https://nextjs.org/docs/app/building-your-application/routing/route-handlers

---

## ❓ 需要帮助？

如果遇到问题，请检查：
1. 数据库连接字符串是否正确
2. `.env.local` 文件是否存在
3. 端口 3000 是否被占用
4. 浏览器控制台是否有错误信息
