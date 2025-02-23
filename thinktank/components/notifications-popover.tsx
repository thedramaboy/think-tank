"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { BellIcon } from "lucide-react"

const notifications = [
  {
    id: 1,
    title: "New bid on your project",
    description: "Someone placed a bid on 'AI Dashboard'",
    time: "2m ago",
  },
  {
    id: 2,
    title: "Lab booking confirmed",
    description: "Your booking for Chemistry Lab is confirmed",
    time: "1h ago",
  },
  {
    id: 3,
    title: "New comment on your post",
    description: "Sarah commented on your post",
    time: "2h ago",
  },
]

export function NotificationsPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <BellIcon className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <h4 className="font-medium">Notifications</h4>
          <div className="space-y-2">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex flex-col gap-1 rounded-lg p-3 hover:bg-muted cursor-pointer">
                <p className="text-sm font-medium">{notification.title}</p>
                <p className="text-sm text-muted-foreground">{notification.description}</p>
                <p className="text-xs text-muted-foreground">{notification.time}</p>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

