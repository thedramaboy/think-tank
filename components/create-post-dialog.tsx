"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PlusIcon } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { usePosts } from "@/app/providers"

export function CreatePostDialog() {
  const { addWebPost, addHiringPost } = usePosts()
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [postType, setPostType] = useState("web-board")
  const [budget, setBudget] = useState("")
  const [projectType, setProjectType] = useState<"freelance" | "university">("freelance")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (postType === "web-board") {
      addWebPost({
        title,
        content,
        author: {
          name: "Current User",
          avatar: "/placeholder.svg",
          initials: "CU",
        },
        tags: ["Technology"],
      })
    } else {
      addHiringPost({
        title,
        content,
        author: {
          name: "Current User",
          avatar: "/placeholder.svg",
          initials: "CU",
        },
        projectType,
        budget: projectType === "freelance" ? budget : undefined,
        timeLeft: "7 days",
        tags: ["Technology"],
      })
    }

    toast({
      title: "Post created",
      description: `Your ${postType} post has been published successfully.`,
    })
    setOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setTitle("")
    setContent("")
    setPostType("web-board")
    setBudget("")
    setProjectType("freelance")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="h-4 w-4 mr-2" />
          Create Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create a new post</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Post Type</Label>
            <RadioGroup value={postType} onValueChange={setPostType} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="web-board" id="web-board" />
                <Label htmlFor="web-board">Web Board</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hiring" id="hiring" />
                <Label htmlFor="hiring">Hiring</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {postType === "hiring" && (
            <>
              <div className="space-y-2">
                <Label>Project Type</Label>
                <Select
                  value={projectType}
                  onValueChange={(value: "freelance" | "university") => setProjectType(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="freelance">Freelance</SelectItem>
                    <SelectItem value="university">University</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {projectType === "freelance" && (
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget</Label>
                  <Input
                    id="budget"
                    placeholder="e.g. $1000-2000"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    required
                  />
                </div>
              )}
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Write your post content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px]"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Publish
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

