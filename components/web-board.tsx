"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageSquare, MoreHorizontal } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Tag } from "@/components/ui/tag"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface Post {
  id: number
  title: string
  content: string
  author: {
    name: string
    avatar: string
    initials: string
  }
  likes: number
  comments: number
  date: string
  tags: string[]
}

interface WebBoardProps {
  searchQuery?: string
}

export function WebBoard({ searchQuery = "" }: WebBoardProps) {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: "Understanding Modern Software Architecture",
      content:
        "Exploring the fundamentals of software architecture patterns and their practical applications in today's development landscape...",
      author: {
        name: "Sarah Chen",
        avatar: "/avatar-1.png",
        initials: "SC",
      },
      likes: 42,
      comments: 12,
      date: "2h ago",
      tags: ["Technology", "Software Development", "Architecture"],
    },
    {
      id: 2,
      title: "The Future of AI in Healthcare",
      content:
        "A deep dive into how artificial intelligence is transforming the healthcare industry through innovative solutions...",
      author: {
        name: "David Kim",
        avatar: "/avatar-2.png",
        initials: "DK",
      },
      likes: 89,
      comments: 24,
      date: "5h ago",
      tags: ["Data Science", "Healthcare", "Technology"],
    },
  ])

  const [commentDialogOpen, setCommentDialogOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [comment, setComment] = useState("")
  const { toast } = useToast()

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return { ...post, likes: post.likes + 1 }
        }
        return post
      }),
    )
    toast({
      title: "Post liked",
      description: "Your like has been recorded.",
    })
  }

  const handleComment = (post: Post) => {
    setSelectedPost(post)
    setCommentDialogOpen(true)
  }

  const submitComment = () => {
    if (selectedPost) {
      setPosts(
        posts.map((post) => {
          if (post.id === selectedPost.id) {
            return { ...post, comments: post.comments + 1 }
          }
          return post
        }),
      )
      setCommentDialogOpen(false)
      setComment("")
      toast({
        title: "Comment added",
        description: "Your comment has been posted successfully.",
      })
    }
  }

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <>
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={post.author.avatar} />
                    <AvatarFallback>{post.author.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{post.author.name}</p>
                    <p className="text-sm text-muted-foreground">{post.date}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-muted-foreground">{post.content}</p>
              </div>
              <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" onClick={() => handleLike(post.id)}>
                  <Heart className="h-4 w-4 mr-2" />
                  {post.likes}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleComment(post)}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  {post.comments}
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={commentDialogOpen} onOpenChange={setCommentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a comment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Write your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button onClick={submitComment} className="w-full">
              Post Comment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

