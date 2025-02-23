import { CreatePostDialog } from "@/components/create-post-dialog"
import { NotificationsPopover } from "@/components/notifications-popover"
import { SearchBox } from "@/components/search-box"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold">
            ThinkTank
          </Link>
          <SearchBox />
        </div>
        <div className="flex items-center gap-2">
          <NotificationsPopover />
          <CreatePostDialog />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

