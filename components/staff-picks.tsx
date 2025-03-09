import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

export function StaffPicks() {
  const picks = [
    {
      id: 1,
      title: "Making Featured stories even more visible",
      author: "Melissa DePuydt",
      time: "2d ago",
      avatar: "avatar-3.png",
    },
    {
      id: 2,
      title: "Via Negativa and Negative Capability",
      author: "Sarah Firth",
      time: "5d ago",
      avatar: "avatar-4.png",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Staff Picks</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {picks.map((pick) => (
          <div key={pick.id} className="space-y-2">
            <Link href="#" className="block hover:text-primary">
              <h3 className="font-medium">{pick.title}</h3>
            </Link>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Avatar className="h-6 w-6">
              <AvatarImage src={pick.avatar} alt={pick.author} />
                <AvatarFallback>
                  {pick.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {pick.author} · {pick.time}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

