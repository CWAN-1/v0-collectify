import { AppLayout } from "@/components/app-layout"
import { SearchBar } from "@/components/community/search-bar"
import { FilterBar } from "@/components/shop/filter-bar"
import { ProductGrid } from "@/components/shop/product-grid"

export default function ShopPage() {
  return (
    <AppLayout>
      <SearchBar />
      <FilterBar />
      <ProductGrid />
    </AppLayout>
  )
}
