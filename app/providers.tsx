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
      title: "Understanding Modern Software Architecturezzz",
      content: "Exploring the fundamentals of software architecture patterns...",
      author: {
        name: "Sarah Chen",
        avatar: "/avatar-1.png",
        initials: "SC",
      },
      image: "/software-arch.jpg",
      likes: 42,
      comments: 12,
      date: "2h ago",
      tags: ["Technology", "Software Development", "Architecture"],
    },
    {
      "id": 2,
      "type": "web-board",
      "title": "The Rise of AI in Everyday Applications",
      "content": "How artificial intelligence is shaping our daily lives...",
      "author": {
        "name": "Michael Lee",
        "avatar": "/avatar-2.png",
        "initials": "ML"
      },
      "image": "/ai-apps.jpg",
      "likes": 58,
      "comments": 23,
      "date": "5h ago",
      "tags": ["Technology", "AI", "Machine Learning"]
    },
    {
      "id": 3,
      "type": "web-board",
      "title": "Mastering JavaScript for Frontend Development",
      "content": "A deep dive into JavaScript best practices and modern frameworks...",
      "author": {
        "name": "Emily Davis",
        "avatar": "/avatar-3.png",
        "initials": "ED"
      },
      "image": "/javascript-guide.jpg",
      "likes": 35,
      "comments": 10,
      "date": "1 day ago",
      "tags": ["Programming", "JavaScript", "Frontend"]
    }
  ])

  const [hiringPosts, setHiringPosts] = useState<HiringPost[]>([
  {
    "id": 1,
    "type": "hiring",
    "title": "AI-Powered Analytics Dashboard",
    "content": "Looking for a skilled developer to create a comprehensive analytics dashboard with AI integration...",
    "author": {
      "name": "David Kim",
      "avatar": "/placeholder.svg",
      "initials": "DK"
    },
    "projectType": "freelance",
    "budget": "$2000-3000",
    "bids": 8,
    "timeLeft": "2 days",
    "date": "5h ago",
    "tags": ["Data Science", "Web Development", "AI/ML"]
  },
  {
    "id": 2,
    "type": "hiring",
    "title": "Cross-Platform Mobile App Development",
    "content": "Seeking an experienced developer to build a cross-platform mobile app for e-commerce with real-time payment integration...",
    "author": {
      "name": "Sophia Martinez",
      "avatar": "/placeholder.svg",
      "initials": "SM"
    },
    "projectType": "university",
    "budget": "$4000-5000",
    "bids": 12,
    "timeLeft": "5 days",
    "date": "3h ago",
    "tags": ["Mobile Development", "Flutter", "E-Commerce"],
    "department": "Computer Science",
    "duration": "6 months"
  },
  {
    "id": 3,
    "type": "hiring",
    "title": "Blockchain Smart Contract Developer Needed",
    "content": "Looking for a blockchain developer to create secure and efficient smart contracts for a decentralized finance platform...",
    "author": {
      "name": "Ethan Walker",
      "avatar": "/placeholder.svg",
      "initials": "EW"
    },
    "projectType": "freelance",
    "budget": "$6000-8000",
    "bids": 5,
    "timeLeft": "7 days",
    "date": "1 day ago",
    "tags": ["Blockchain", "Smart Contracts", "DeFi"]
  },
  {
    "id": 4,
    "type": "hiring",
    "title": "Machine Learning Research Assistant",
    "content": "Seeking a research assistant for university AI projects focused on deep learning and NLP...",
    "author": {
      "name": "Dr. Alice Johnson",
      "avatar": "/placeholder.svg",
      "initials": "AJ"
    },
    "projectType": "university",
    "budget": "$3000-4000",
    "bids": 15,
    "timeLeft": "10 days",
    "date": "2 days ago",
    "tags": ["AI/ML", "Deep Learning", "NLP"],
    "department": "Artificial Intelligence",
    "duration": "4 months"
  },
  {
    "id": 5,
    "type": "hiring",
    "title": "React Frontend Developer for SaaS Platform",
    "content": "Need a freelance developer to work on a React-based SaaS platform with real-time data visualization...",
    "author": {
      "name": "John Carter",
      "avatar": "/placeholder.svg",
      "initials": "JC"
    },
    "projectType": "freelance",
    "budget": "$5000-7000",
    "bids": 9,
    "timeLeft": "3 days",
    "date": "6h ago",
    "tags": ["React", "Frontend Development", "SaaS"]
  },
  {
    "id": 6,
    "type": "hiring",
    "title": "Cybersecurity Research Internship",
    "content": "Looking for a university research intern to assist with cybersecurity risk assessment studies...",
    "author": {
      "name": "Dr. Rachel Green",
      "avatar": "/placeholder.svg",
      "initials": "RG"
    },
    "projectType": "university",
    "budget": "$2500-3500",
    "bids": 11,
    "timeLeft": "14 days",
    "date": "5 days ago",
    "tags": ["Cybersecurity", "Risk Assessment", "Ethical Hacking"],
    "department": "Cybersecurity",
    "duration": "3 months"
  },
  {
    "id": 7,
    "type": "hiring",
    "title": "Full-Stack Developer for EdTech Platform",
    "content": "Hiring a freelance developer to build an interactive EdTech web application using Node.js and Vue.js...",
    "author": {
      "name": "Lisa Thompson",
      "avatar": "/placeholder.svg",
      "initials": "LT"
    },
    "projectType": "freelance",
    "budget": "$7000-9000",
    "bids": 6,
    "timeLeft": "4 days",
    "date": "8h ago",
    "tags": ["EdTech", "Full-Stack", "Vue.js"]
  },
  {
    "id": 8,
    "type": "hiring",
    "title": "AI Model Optimization Research",
    "content": "Seeking a university researcher to optimize AI models for efficiency and accuracy in low-power environments...",
    "author": {
      "name": "Dr. Mark Evans",
      "avatar": "/placeholder.svg",
      "initials": "ME"
    },
    "projectType": "university",
    "budget": "$4500-6000",
    "bids": 7,
    "timeLeft": "6 days",
    "date": "3 days ago",
    "tags": ["AI Optimization", "Deep Learning", "Energy Efficiency"],
    "department": "AI Research",
    "duration": "5 months"
  }
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

