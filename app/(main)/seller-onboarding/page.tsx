"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, User, Building2, ChevronRight, Upload, CheckCircle, AlertCircle, FileText, CreditCard, Shield, Store, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

type SellerType = "individual" | "business" | null

interface FormData {
  // Common fields
  shopName: string
  shopDescription: string
  contactPhone: string
  contactEmail: string
  // Individual seller fields
  realName: string
  idNumber: string
  idFrontImage: string
  idBackImage: string
  // Business seller fields
  companyName: string
  businessLicense: string
  legalRepName: string
  businessLicenseImage: string
  taxRegistrationImage: string
  bankAccountName: string
  bankAccountNumber: string
  bankName: string
}

const initialFormData: FormData = {
  shopName: "",
  shopDescription: "",
  contactPhone: "",
  contactEmail: "",
  realName: "",
  idNumber: "",
  idFrontImage: "",
  idBackImage: "",
  companyName: "",
  businessLicense: "",
  legalRepName: "",
  businessLicenseImage: "",
  taxRegistrationImage: "",
  bankAccountName: "",
  bankAccountNumber: "",
  bankName: "",
}

const steps = {
  individual: [
    { id: 1, title: "基本信息", description: "填写店铺基本资料" },
    { id: 2, title: "身份认证", description: "上传身份证明材料" },
    { id: 3, title: "完成注册", description: "确认信息并提交" },
  ],
  business: [
    { id: 1, title: "企业信息", description: "填写企业基本资料" },
    { id: 2, title: "资质上传", description: "上传营业执照等资质" },
    { id: 3, title: "银行账户", description: "填写对公账户信息" },
    { id: 4, title: "完成注册", description: "确认信息并提交" },
  ],
}

export default function SellerOnboardingPage() {
  const router = useRouter()
  const [sellerType, setSellerType] = useState<SellerType>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const currentSteps = sellerType ? steps[sellerType] : []
  const totalSteps = currentSteps.length

  const handleSelectType = (type: SellerType) => {
    setSellerType(type)
    setCurrentStep(1)
    setFormData(initialFormData)
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      setSellerType(null)
    }
  }

  const handleSubmit = () => {
    // TODO: Submit to backend
    router.push("/profile/shop?registered=true")
  }

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Type selection screen
  if (!sellerType) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <header className="sticky top-0 z-50 bg-background border-b border-border">
          <div className="flex items-center justify-between px-4 pt-12 pb-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="size-5" />
            </Button>
            <span className="font-semibold">成为卖家</span>
            <div className="size-10" />
          </div>
        </header>

        <main className="px-4 py-6">
          {/* Introduction */}
          <div className="text-center mb-8">
            <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Store className="size-8 text-primary" />
            </div>
            <h1 className="text-xl font-bold mb-2">开启您的卡牌销售之旅</h1>
            <p className="text-sm text-muted-foreground">
              选择您的卖家类型，开始注册流程
            </p>
          </div>

          {/* Seller Type Selection */}
          <div className="space-y-4">
            {/* Individual Seller */}
            <button
              onClick={() => handleSelectType("individual")}
              className="w-full bg-card rounded-2xl border border-border p-5 text-left hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <User className="size-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">个人卖家</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    适合个人收藏家出售自己的收藏卡牌
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-muted rounded-md text-xs">快速入驻</span>
                    <span className="px-2 py-1 bg-muted rounded-md text-xs">身份证认证</span>
                    <span className="px-2 py-1 bg-muted rounded-md text-xs">低佣金</span>
                  </div>
                </div>
                <ChevronRight className="size-5 text-muted-foreground shrink-0 mt-2" />
              </div>
            </button>

            {/* Business Seller */}
            <button
              onClick={() => handleSelectType("business")}
              className="w-full bg-card rounded-2xl border border-border p-5 text-left hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="size-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <Building2 className="size-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">企业卖家</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    适合卡牌店铺、经销商等企业用户
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-muted rounded-md text-xs">企业认证</span>
                    <span className="px-2 py-1 bg-muted rounded-md text-xs">批量上架</span>
                    <span className="px-2 py-1 bg-muted rounded-md text-xs">专属客服</span>
                    <span className="px-2 py-1 bg-muted rounded-md text-xs">更多曝光</span>
                  </div>
                </div>
                <ChevronRight className="size-5 text-muted-foreground shrink-0 mt-2" />
              </div>
            </button>
          </div>

          {/* Benefits */}
          <div className="mt-8">
            <h3 className="text-sm font-semibold mb-4">成为卖家的优势</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-card rounded-xl p-4 border border-border">
                <CreditCard className="size-5 text-primary mb-2" />
                <h4 className="text-sm font-medium mb-1">低佣金</h4>
                <p className="text-xs text-muted-foreground">行业最低佣金比例</p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-border">
                <Shield className="size-5 text-primary mb-2" />
                <h4 className="text-sm font-medium mb-1">交易保障</h4>
                <p className="text-xs text-muted-foreground">平台担保安全交易</p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-border">
                <User className="size-5 text-primary mb-2" />
                <h4 className="text-sm font-medium mb-1">精准流量</h4>
                <p className="text-xs text-muted-foreground">海量活跃买家资源</p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-border">
                <FileText className="size-5 text-primary mb-2" />
                <h4 className="text-sm font-medium mb-1">便捷工具</h4>
                <p className="text-xs text-muted-foreground">完善的卖家管理后台</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Registration flow
  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between px-4 pt-12 pb-4">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="size-5" />
          </Button>
          <span className="font-semibold">
            {sellerType === "individual" ? "个人卖家入驻" : "企业卖家入驻"}
          </span>
          <div className="size-10" />
        </div>

        {/* Progress Steps */}
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2">
            {currentSteps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className={cn(
                  "size-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0",
                  currentStep > step.id
                    ? "bg-primary text-primary-foreground"
                    : currentStep === step.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}>
                  {currentStep > step.id ? <CheckCircle className="size-4" /> : step.id}
                </div>
                {index < currentSteps.length - 1 && (
                  <div className={cn(
                    "h-0.5 flex-1 mx-2",
                    currentStep > step.id ? "bg-primary" : "bg-muted"
                  )} />
                )}
              </div>
            ))}
          </div>
          <div className="mt-3">
            <h3 className="font-semibold text-sm">{currentSteps[currentStep - 1]?.title}</h3>
            <p className="text-xs text-muted-foreground">{currentSteps[currentStep - 1]?.description}</p>
          </div>
        </div>
      </header>

      <main className="px-4 py-6">
        {/* Individual Seller Steps */}
        {sellerType === "individual" && (
          <>
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">店铺名称 *</h3>
                  <Input
                    placeholder="请输入店铺名称"
                    value={formData.shopName}
                    onChange={(e) => updateFormData("shopName", e.target.value)}
                    className="h-14 rounded-2xl bg-muted border-0 text-base"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">店铺简介</h3>
                  <Textarea
                    placeholder="介绍您的店铺和主营品类..."
                    value={formData.shopDescription}
                    onChange={(e) => updateFormData("shopDescription", e.target.value)}
                    className="min-h-24 rounded-2xl bg-muted border-0 resize-none"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">联系电话 *</h3>
                  <Input
                    placeholder="请输入联系电话"
                    value={formData.contactPhone}
                    onChange={(e) => updateFormData("contactPhone", e.target.value)}
                    className="h-14 rounded-2xl bg-muted border-0 text-base"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">联系邮箱</h3>
                  <Input
                    placeholder="请输入联系邮箱"
                    value={formData.contactEmail}
                    onChange={(e) => updateFormData("contactEmail", e.target.value)}
                    className="h-14 rounded-2xl bg-muted border-0 text-base"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Identity Verification */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">真实姓名 *</h3>
                  <Input
                    placeholder="请输入您的真实姓名"
                    value={formData.realName}
                    onChange={(e) => updateFormData("realName", e.target.value)}
                    className="h-14 rounded-2xl bg-muted border-0 text-base"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">身份证号 *</h3>
                  <Input
                    placeholder="请输入身份证号码"
                    value={formData.idNumber}
                    onChange={(e) => updateFormData("idNumber", e.target.value)}
                    className="h-14 rounded-2xl bg-muted border-0 text-base"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">身份证照片 *</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="aspect-[3/2] border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors bg-muted/50">
                      <Camera className="size-6 text-muted-foreground mb-1" />
                      <span className="text-xs text-muted-foreground">人像面</span>
                      <input type="file" accept="image/*" className="hidden" />
                    </label>
                    <label className="aspect-[3/2] border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors bg-muted/50">
                      <Camera className="size-6 text-muted-foreground mb-1" />
                      <span className="text-xs text-muted-foreground">国徽面</span>
                      <input type="file" accept="image/*" className="hidden" />
                    </label>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 flex items-start gap-1">
                    <AlertCircle className="size-3.5 shrink-0 mt-0.5" />
                    请上传清晰的身份证正反面照片，确保信息完整可见
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="bg-card rounded-2xl border border-border p-4">
                  <h4 className="font-semibold mb-3">确认注册信息</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">卖家类型</span>
                      <span>个人卖家</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">店铺名称</span>
                      <span>{formData.shopName || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">真实姓名</span>
                      <span>{formData.realName || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">联系电话</span>
                      <span>{formData.contactPhone || "-"}</span>
                    </div>
                  </div>
                </div>

                <label className="flex items-start gap-3 p-4 bg-muted rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-0.5 size-4 rounded"
                  />
                  <span className="text-sm text-muted-foreground">
                    我已阅读并同意《卖家服务协议》和《平台交易规则》
                  </span>
                </label>
              </div>
            )}
          </>
        )}

        {/* Business Seller Steps */}
        {sellerType === "business" && (
          <>
            {/* Step 1: Company Info */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">公司名称 *</h3>
                  <Input
                    placeholder="请输入公司全称"
                    value={formData.companyName}
                    onChange={(e) => updateFormData("companyName", e.target.value)}
                    className="h-14 rounded-2xl bg-muted border-0 text-base"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">店铺名称 *</h3>
                  <Input
                    placeholder="请输入店铺展示名称"
                    value={formData.shopName}
                    onChange={(e) => updateFormData("shopName", e.target.value)}
                    className="h-14 rounded-2xl bg-muted border-0 text-base"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">店铺简介</h3>
                  <Textarea
                    placeholder="介绍您的店铺和主营品类..."
                    value={formData.shopDescription}
                    onChange={(e) => updateFormData("shopDescription", e.target.value)}
                    className="min-h-24 rounded-2xl bg-muted border-0 resize-none"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">法人代表姓名 *</h3>
                  <Input
                    placeholder="请输入法人代表姓名"
                    value={formData.legalRepName}
                    onChange={(e) => updateFormData("legalRepName", e.target.value)}
                    className="h-14 rounded-2xl bg-muted border-0 text-base"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">联系电话 *</h3>
                  <Input
                    placeholder="请输入联系电话"
                    value={formData.contactPhone}
                    onChange={(e) => updateFormData("contactPhone", e.target.value)}
                    className="h-14 rounded-2xl bg-muted border-0 text-base"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">联系邮箱</h3>
                  <Input
                    placeholder="请输入联系邮箱"
                    value={formData.contactEmail}
                    onChange={(e) => updateFormData("contactEmail", e.target.value)}
                    className="h-14 rounded-2xl bg-muted border-0 text-base"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Business Qualifications */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">营业执照号 *</h3>
                  <Input
                    placeholder="请输入统一社会信用代码"
                    value={formData.businessLicense}
                    onChange={(e) => updateFormData("businessLicense", e.target.value)}
                    className="h-14 rounded-2xl bg-muted border-0 text-base"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">营业执照照片 *</h3>
                  <label className="aspect-[4/3] border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors bg-muted/50">
                    <Upload className="size-8 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">点击上传营业执照</span>
                    <span className="text-xs text-muted-foreground mt-1">支持 JPG、PNG 格式</span>
                    <input type="file" accept="image/*" className="hidden" />
                  </label>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">税务登记证 (如有)</h3>
                  <label className="aspect-[4/3] border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors bg-muted/50">
                    <Upload className="size-8 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">点击上传税务登记证</span>
                    <span className="text-xs text-muted-foreground mt-1">三证合一可跳过</span>
                    <input type="file" accept="image/*" className="hidden" />
                  </label>
                </div>
              </div>
            )}

            {/* Step 3: Bank Account */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="bg-primary/10 rounded-xl p-4 mb-2">
                  <p className="text-sm text-primary">
                    请填写企业对公账户信息，用于接收销售款项
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">开户名称 *</h3>
                  <Input
                    placeholder="请输入开户名称（需与营业执照一致）"
                    value={formData.bankAccountName}
                    onChange={(e) => updateFormData("bankAccountName", e.target.value)}
                    className="h-14 rounded-2xl bg-muted border-0 text-base"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">银行账号 *</h3>
                  <Input
                    placeholder="请输入银行账号"
                    value={formData.bankAccountNumber}
                    onChange={(e) => updateFormData("bankAccountNumber", e.target.value)}
                    className="h-14 rounded-2xl bg-muted border-0 text-base"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">开户银行 *</h3>
                  <Sheet>
                    <SheetTrigger asChild>
                      <button className="w-full h-14 px-4 rounded-2xl bg-muted flex items-center justify-between">
                        <span className={formData.bankName ? "text-foreground" : "text-muted-foreground"}>
                          {formData.bankName || "选择开户银行"}
                        </span>
                        <ChevronRight className="size-5 text-muted-foreground" />
                      </button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="h-[50vh] rounded-t-3xl">
                      <SheetHeader className="pb-4">
                        <SheetTitle>选择开户银行</SheetTitle>
                      </SheetHeader>
                      <div className="space-y-2">
                        {["中国工商银行", "中国建设银行", "中国农业银行", "中国银行", "招商银行", "交通银行", "其他银行"].map((bank) => (
                          <button
                            key={bank}
                            onClick={() => updateFormData("bankName", bank)}
                            className={`w-full p-4 rounded-xl text-left transition-colors ${
                              formData.bankName === bank ? "bg-foreground text-background" : "bg-muted hover:bg-border"
                            }`}
                          >
                            {bank}
                          </button>
                        ))}
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="bg-card rounded-2xl border border-border p-4">
                  <h4 className="font-semibold mb-3">确认注册信息</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">卖家类型</span>
                      <span>企业卖家</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">公司名称</span>
                      <span>{formData.companyName || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">店铺名称</span>
                      <span>{formData.shopName || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">法人代表</span>
                      <span>{formData.legalRepName || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">联系电话</span>
                      <span>{formData.contactPhone || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">开户银行</span>
                      <span>{formData.bankName || "-"}</span>
                    </div>
                  </div>
                </div>

                <label className="flex items-start gap-3 p-4 bg-muted rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-0.5 size-4 rounded"
                  />
                  <span className="text-sm text-muted-foreground">
                    我已阅读并同意《卖家服务协议》、《企业入驻协议》和《平台交易规则》
                  </span>
                </label>
              </div>
            )}
          </>
        )}
      </main>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 pb-[calc(env(safe-area-inset-bottom)+8px)]">
        {currentStep === totalSteps ? (
          <Button
            onClick={handleSubmit}
            disabled={!agreedToTerms}
            className="w-full h-14 rounded-full text-base font-semibold"
          >
            提交审核
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            className="w-full h-14 rounded-full text-base font-semibold"
          >
            下一步
          </Button>
        )}
      </div>
    </div>
  )
}
