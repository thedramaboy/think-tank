import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Clock, BookMarked } from "lucide-react"

interface TopicsProps {
  selectedTopic?: string
  onTopicSelect: (topic: string | undefined) => void
}

export function Topics({ selectedTopic, onTopicSelect }: TopicsProps) {
  const topics = [
    "Data Science",
    "Self Improvement",
    "Technology",
    "Writing",
    "Relationships",
    "Politics",
    "Productivity",
  ]

  const trendingTopics = [
    { name: "AI/ML", posts: 1234, growth: "+25%" },
    { name: "Web3", posts: 856, growth: "+15%" },
    { name: "DevOps", posts: 654, growth: "+10%" },
  ]

  const newTopics = [
    { name: "Quantum Computing", addedAt: "2h ago" },
    { name: "Green Tech", addedAt: "5h ago" },
    { name: "Cybersecurity", addedAt: "1d ago" },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <BookMarked className="h-4 w-4" />
            Recommended Topics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <Button
                key={topic}
                variant={selectedTopic === topic ? "default" : "secondary"}
                className="rounded-full"
                size="sm"
                onClick={() => onTopicSelect(selectedTopic === topic ? undefined : topic)}
              >
                {topic}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="h-4 w-4" />
            Top Trends
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {trendingTopics.map((topic) => (
            <div key={topic.name} className="flex items-center justify-between">
              <Button
                variant={selectedTopic === topic.name ? "default" : "ghost"}
                className="h-auto p-0 text-base font-normal"
                onClick={() => onTopicSelect(selectedTopic === topic.name ? undefined : topic.name)}
              >
                {topic.name}
              </Button>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">{topic.posts} posts</span>
                <span className="text-green-500">{topic.growth}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Clock className="h-4 w-4" />
            Newest Topics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {newTopics.map((topic) => (
            <div key={topic.name} className="flex items-center justify-between">
              <Button
                variant={selectedTopic === topic.name ? "default" : "ghost"}
                className="h-auto p-0 text-base font-normal"
                onClick={() => onTopicSelect(selectedTopic === topic.name ? undefined : topic.name)}
              >
                {topic.name}
              </Button>
              <span className="text-sm text-muted-foreground">{topic.addedAt}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

