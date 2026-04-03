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
    { id: 1, title: "Basic Info", description: "Set up your shop profile" },
    { id: 2, title: "Identity Verification", description: "Upload identification documents" },
    { id: 3, title: "Complete Registration", description: "Confirm information and submit" },
  ],
  business: [
    { id: 1, title: "Business Info", description: "Set up your company details" },
    { id: 2, title: "Qualifications", description: "Upload business credentials" },
    { id: 3, title: "Bank Account", description: "Add your bank account information" },
    { id: 4, title: "Complete Registration", description: "Confirm information and submit" },
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
            <span className="font-semibold text-base">Become a Seller</span>
            <div className="size-10" />
          </div>
        </header>

        <main className="px-4 py-6">
          {/* Introduction */}
          <div className="text-center mb-8">
            <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Store className="size-8 text-primary" />
            </div>
            <h1 className="text-xl font-bold mb-2">Start Your Card Selling Journey</h1>
            <p className="text-sm text-muted-foreground">
              Choose your seller type and start the registration process
            </p>
          </div>

          {/* Seller Type Selection */}
          <div className="space-y-3">
            {/* Individual Seller */}
            <button
              onClick={() => handleSelectType("individual")}
              className="w-full bg-card rounded-2xl border border-border p-4 text-left hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <User className="size-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm mb-1">Individual Seller</h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    For collectors selling their own cards
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 bg-muted rounded text-xs">Quick Setup</span>
                    <span className="px-2 py-0.5 bg-muted rounded text-xs">ID Verification</span>
                    <span className="px-2 py-0.5 bg-muted rounded text-xs">Lower Fees</span>
                  </div>
                </div>
                <ChevronRight className="size-5 text-muted-foreground shrink-0 mt-1" />
              </div>
            </button>

            {/* Business Seller */}
            <button
              onClick={() => handleSelectType("business")}
              className="w-full bg-card rounded-2xl border border-border p-4 text-left hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="size-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <Building2 className="size-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm mb-1">Business Seller</h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    For card shops, dealers, and businesses
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 bg-muted rounded text-xs">Business Verified</span>
                    <span className="px-2 py-0.5 bg-muted rounded text-xs">Bulk Listing</span>
                    <span className="px-2 py-0.5 bg-muted rounded text-xs">Support</span>
                    <span className="px-2 py-0.5 bg-muted rounded text-xs">More Visibility</span>
                  </div>
                </div>
                <ChevronRight className="size-5 text-muted-foreground shrink-0 mt-1" />
              </div>
            </button>
          </div>

          {/* Benefits */}
          <div className="mt-8">
            <h3 className="text-sm font-semibold mb-3">Seller Benefits</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-card rounded-xl p-3 border border-border">
                <CreditCard className="size-4 text-primary mb-1.5" />
                <h4 className="text-xs font-semibold mb-0.5">Low Fees</h4>
                <p className="text-xs text-muted-foreground">Industry-leading commission rates</p>
              </div>
              <div className="bg-card rounded-xl p-3 border border-border">
                <Shield className="size-4 text-primary mb-1.5" />
                <h4 className="text-xs font-semibold mb-0.5">Safe Trading</h4>
                <p className="text-xs text-muted-foreground">Platform-protected transactions</p>
              </div>
              <div className="bg-card rounded-xl p-3 border border-border">
                <User className="size-4 text-primary mb-1.5" />
                <h4 className="text-xs font-semibold mb-0.5">Targeted Traffic</h4>
                <p className="text-xs text-muted-foreground">Access active buyer community</p>
              </div>
              <div className="bg-card rounded-xl p-3 border border-border">
                <FileText className="size-4 text-primary mb-1.5" />
                <h4 className="text-xs font-semibold mb-0.5">Seller Tools</h4>
                <p className="text-xs text-muted-foreground">Complete management dashboard</p>
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
          <span className="font-semibold text-base">
            {sellerType === "individual" ? "Individual Registration" : "Business Registration"}
          </span>
          <div className="size-10" />
        </div>

        {/* Progress Steps */}
        <div className="px-4 pb-4">
          <div className="flex items-center gap-1.5">
            {currentSteps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className={cn(
                  "size-6 rounded-full flex items-center justify-center text-xs font-semibold shrink-0",
                  currentStep > step.id
                    ? "bg-primary text-primary-foreground"
                    : currentStep === step.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}>
                  {currentStep > step.id ? <CheckCircle className="size-3.5" /> : step.id}
                </div>
                {index < currentSteps.length - 1 && (
                  <div className={cn(
                    "h-0.5 flex-1 mx-1",
                    currentStep > step.id ? "bg-primary" : "bg-muted"
                  )} />
                )}
              </div>
            ))}
          </div>
          <div className="mt-2.5">
            <h3 className="font-semibold text-xs">{currentSteps[currentStep - 1]?.title}</h3>
            <p className="text-xs text-muted-foreground">{currentSteps[currentStep - 1]?.description}</p>
          </div>
        </div>
      </header>

      <main className="px-4 py-5">
        {/* Individual Seller Steps */}
        {sellerType === "individual" && (
          <>
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Shop Name *</label>
                  <Input
                    placeholder="Enter your shop name"
                    value={formData.shopName}
                    onChange={(e) => updateFormData("shopName", e.target.value)}
                    className="h-12 rounded-xl bg-muted border-0 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Shop Description</label>
                  <Textarea
                    placeholder="Tell us about your shop and what you sell..."
                    value={formData.shopDescription}
                    onChange={(e) => updateFormData("shopDescription", e.target.value)}
                    className="min-h-20 rounded-xl bg-muted border-0 resize-none text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Phone Number *</label>
                  <Input
                    placeholder="Enter your phone number"
                    value={formData.contactPhone}
                    onChange={(e) => updateFormData("contactPhone", e.target.value)}
                    className="h-12 rounded-xl bg-muted border-0 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email Address</label>
                  <Input
                    placeholder="Enter your email address"
                    value={formData.contactEmail}
                    onChange={(e) => updateFormData("contactEmail", e.target.value)}
                    className="h-12 rounded-xl bg-muted border-0 text-sm"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Identity Verification */}
            {currentStep === 2 && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Full Name *</label>
                  <Input
                    placeholder="Enter your full name"
                    value={formData.realName}
                    onChange={(e) => updateFormData("realName", e.target.value)}
                    className="h-12 rounded-xl bg-muted border-0 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">ID Number *</label>
                  <Input
                    placeholder="Enter your ID number"
                    value={formData.idNumber}
                    onChange={(e) => updateFormData("idNumber", e.target.value)}
                    className="h-12 rounded-xl bg-muted border-0 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">ID Photos *</label>
                  <div className="grid grid-cols-2 gap-2.5">
                    <label className="aspect-video border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors bg-muted/50">
                      <Camera className="size-5 text-muted-foreground mb-1" />
                      <span className="text-xs text-muted-foreground">Front</span>
                      <input type="file" accept="image/*" className="hidden" />
                    </label>
                    <label className="aspect-video border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors bg-muted/50">
                      <Camera className="size-5 text-muted-foreground mb-1" />
                      <span className="text-xs text-muted-foreground">Back</span>
                      <input type="file" accept="image/*" className="hidden" />
                    </label>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5 flex items-start gap-1">
                    <AlertCircle className="size-3 shrink-0 mt-0.5" />
                    Upload clear ID photos with all information visible
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {currentStep === 3 && (
              <div className="space-y-3">
                <div className="bg-card rounded-xl border border-border p-3">
                  <h4 className="font-semibold text-sm mb-2.5">Confirm Your Information</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Seller Type</span>
                      <span>Individual</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shop Name</span>
                      <span>{formData.shopName || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Full Name</span>
                      <span>{formData.realName || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phone</span>
                      <span>{formData.contactPhone || "-"}</span>
                    </div>
                  </div>
                </div>

                <label className="flex items-start gap-2 p-3 bg-muted rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-0.5 size-4 rounded"
                  />
                  <span className="text-xs text-muted-foreground leading-relaxed">
                    I have read and agree to the Seller Agreement and Platform Terms
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
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Company Name *</label>
                  <Input
                    placeholder="Enter your company name"
                    value={formData.companyName}
                    onChange={(e) => updateFormData("companyName", e.target.value)}
                    className="h-12 rounded-xl bg-muted border-0 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Shop Name *</label>
                  <Input
                    placeholder="Enter your shop display name"
                    value={formData.shopName}
                    onChange={(e) => updateFormData("shopName", e.target.value)}
                    className="h-12 rounded-xl bg-muted border-0 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Shop Description</label>
                  <Textarea
                    placeholder="Tell us about your shop and what you sell..."
                    value={formData.shopDescription}
                    onChange={(e) => updateFormData("shopDescription", e.target.value)}
                    className="min-h-20 rounded-xl bg-muted border-0 resize-none text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Legal Representative *</label>
                  <Input
                    placeholder="Enter legal representative name"
                    value={formData.legalRepName}
                    onChange={(e) => updateFormData("legalRepName", e.target.value)}
                    className="h-12 rounded-xl bg-muted border-0 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Phone Number *</label>
                  <Input
                    placeholder="Enter your phone number"
                    value={formData.contactPhone}
                    onChange={(e) => updateFormData("contactPhone", e.target.value)}
                    className="h-12 rounded-xl bg-muted border-0 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email Address</label>
                  <Input
                    placeholder="Enter your email address"
                    value={formData.contactEmail}
                    onChange={(e) => updateFormData("contactEmail", e.target.value)}
                    className="h-12 rounded-xl bg-muted border-0 text-sm"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Business Qualifications */}
            {currentStep === 2 && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Business License Number *</label>
                  <Input
                    placeholder="Enter your business license number"
                    value={formData.businessLicense}
                    onChange={(e) => updateFormData("businessLicense", e.target.value)}
                    className="h-12 rounded-xl bg-muted border-0 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Business License Image *</label>
                  <label className="aspect-square border-2 border-dashed border-border rounded-xl flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors bg-muted/50">
                    <Camera className="size-6 text-muted-foreground" />
                    <input type="file" accept="image/*" className="hidden" />
                  </label>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Tax Registration Certificate *</label>
                  <label className="aspect-square border-2 border-dashed border-border rounded-xl flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors bg-muted/50">
                    <Camera className="size-6 text-muted-foreground" />
                    <input type="file" accept="image/*" className="hidden" />
                  </label>
                </div>
              </div>
            )}

            {/* Step 3: Bank Account */}
            {currentStep === 3 && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Account Holder Name *</label>
                  <Input
                    placeholder="Enter account holder name"
                    value={formData.bankAccountName}
                    onChange={(e) => updateFormData("bankAccountName", e.target.value)}
                    className="h-12 rounded-xl bg-muted border-0 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Bank Name *</label>
                  <Input
                    placeholder="Enter your bank name"
                    value={formData.bankName}
                    onChange={(e) => updateFormData("bankName", e.target.value)}
                    className="h-12 rounded-xl bg-muted border-0 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Account Number *</label>
                  <Input
                    placeholder="Enter your account number"
                    value={formData.bankAccountNumber}
                    onChange={(e) => updateFormData("bankAccountNumber", e.target.value)}
                    className="h-12 rounded-xl bg-muted border-0 text-sm"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <div className="space-y-3">
                <div className="bg-card rounded-xl border border-border p-3">
                  <h4 className="font-semibold text-sm mb-2.5">Confirm Your Information</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Seller Type</span>
                      <span>Business</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Company Name</span>
                      <span>{formData.companyName || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shop Name</span>
                      <span>{formData.shopName || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phone</span>
                      <span>{formData.contactPhone || "-"}</span>
                    </div>
                  </div>
                </div>

                <label className="flex items-start gap-2 p-3 bg-muted rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-0.5 size-4 rounded"
                  />
                  <span className="text-xs text-muted-foreground leading-relaxed">
                    I have read and agree to the Seller Agreement and Platform Terms
                  </span>
                </label>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer Buttons */}
      <footer className="fixed bottom-0 left-0 right-0 bg-background border-t border-border px-4 py-3">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex-1 h-12 rounded-xl"
            onClick={handleBack}
          >
            Back
          </Button>
          <Button 
            className="flex-1 h-12 rounded-xl"
            onClick={currentStep === totalSteps ? handleSubmit : handleNext}
            disabled={
              (currentStep === totalSteps && !agreedToTerms) ||
              (currentStep === 1 && (!formData.shopName || !formData.contactPhone))
            }
          >
            {currentStep === totalSteps ? "Complete" : "Next"}
          </Button>
        </div>
      </footer>
    </div>
  )
}
