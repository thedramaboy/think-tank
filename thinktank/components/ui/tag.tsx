import type React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function Tag({ children, className, ...props }: TagProps) {
  return (
    <Button
      variant="secondary"
      size="sm"
      className={cn("h-6 rounded-full px-3 text-xs font-medium", className)}
      {...props}
    >
      {children}
    </Button>
  )
}

