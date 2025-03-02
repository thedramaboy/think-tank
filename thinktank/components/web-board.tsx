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
import Image from "next/image"
import type { WebPost } from "@/types/post"
import { usePosts } from "@/app/providers"

interface WebBoardProps {
  searchQuery?: string
}

export function WebBoard({ searchQuery = "" }: WebBoardProps) {
  const { webPosts, setWebPosts } = usePosts()
  const [commentDialogOpen, setCommentDialogOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<WebPost | null>(null)
  const [comment, setComment] = useState("")
  const { toast } = useToast()

  const handleLike = (postId: number) => {
    setWebPosts(
      webPosts.map((post) => {
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

  const handleComment = (post: WebPost) => {
    setSelectedPost(post)
    setCommentDialogOpen(true)
  }

  const submitComment = () => {
    if (selectedPost) {
      setWebPosts(
        webPosts.map((post) => {
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

  const filteredPosts = webPosts.filter(
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
            <div className="grid md:grid-cols-[1fr_300px] gap-6">
              <div>
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
              </div>
              <div className="relative min-h-[200px] md:min-h-full">
                <Image
                  src={`/placeholder.svg?height=400&width=300`}
                  alt={post.title}
                  fill
                  className="object-cover rounded-r-lg"
                />
              </div>
            </div>
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

