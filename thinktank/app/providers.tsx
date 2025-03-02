"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"
import type { WebPost, HiringPost } from "@/types/post"

interface PostContextType {
  webPosts: WebPost[]
  hiringPosts: HiringPost[]
  addWebPost: (post: Omit<WebPost, "id" | "likes" | "comments" | "date" | "type">) => void
  addHiringPost: (post: Omit<HiringPost, "id" | "bids" | "date" | "type">) => void
  setWebPosts: React.Dispatch<React.SetStateAction<WebPost[]>>
  setHiringPosts: React.Dispatch<React.SetStateAction<HiringPost[]>>
}

const PostContext = createContext<PostContextType | undefined>(undefined)

export function PostProvider({ children }: { children: React.ReactNode }) {
  const [webPosts, setWebPosts] = useState<WebPost[]>([
    {
      id: 1,
      type: "web-board",
      title: "Understanding Modern Software Architecture",
      content: "Exploring the fundamentals of software architecture patterns...",
      author: {
        name: "Sarah Chen",
        avatar: "/placeholder.svg",
        initials: "SC",
      },
      likes: 42,
      comments: 12,
      date: "2h ago",
      tags: ["Technology", "Software Development", "Architecture"],
    },
  ])

  const [hiringPosts, setHiringPosts] = useState<HiringPost[]>([
    {
      id: 1,
      type: "hiring",
      title: "AI-Powered Analytics Dashboard",
      content: "Looking for a skilled developer to create a comprehensive analytics dashboard with AI integration...",
      author: {
        name: "David Kim",
        avatar: "/placeholder.svg",
        initials: "DK",
      },
      projectType: "freelance",
      budget: "$2000-3000",
      bids: 8,
      timeLeft: "2 days",
      date: "5h ago",
      tags: ["Data Science", "Web Development", "AI/ML"],
    },
  ])

  const addWebPost = (newPost: Omit<WebPost, "id" | "likes" | "comments" | "date" | "type">) => {
    setWebPosts((currentPosts) => [
      {
        ...newPost,
        id: currentPosts.length + 1,
        type: "web-board",
        likes: 0,
        comments: 0,
        date: "Just now",
      },
      ...currentPosts,
    ])
  }

  const addHiringPost = (newPost: Omit<HiringPost, "id" | "bids" | "date" | "type">) => {
    setHiringPosts((currentPosts) => [
      {
        ...newPost,
        id: currentPosts.length + 1,
        type: "hiring",
        bids: 0,
        date: "Just now",
      },
      ...currentPosts,
    ])
  }

  return (
    <PostContext.Provider
      value={{
        webPosts,
        hiringPosts,
        addWebPost,
        addHiringPost,
        setWebPosts,
        setHiringPosts,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}

export function usePosts() {
  const context = useContext(PostContext)
  if (context === undefined) {
    throw new Error("usePosts must be used within a PostProvider")
  }
  return context
}

