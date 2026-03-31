import { AppLayout } from "@/components/app-layout"
import { SearchBar } from "@/components/community/search-bar"
import { CategoryTabs } from "@/components/community/category-tabs"
import { MasonryFeed } from "@/components/community/masonry-feed"

export default function CommunityPage() {
  return (
    <AppLayout>
      <SearchBar />
      <CategoryTabs />
      <MasonryFeed />
    </AppLayout>
  )
}
