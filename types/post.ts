export type BasePost = {
  id: number
  title: string
  content: string
  author: {
    name: string
    avatar: string
    initials: string
  }
  image?: string;
  date: string
  tags: string[]
}

export type WebPost = BasePost & {
  type: "web-board"
  likes: number
  comments: number
}

export type HiringPost = BasePost & {
  type: "hiring"
  projectType: "freelance" | "university"
  budget?: string
  bids: number
  timeLeft: string
  department?: string
  duration?: string
}

export type Post = WebPost | HiringPost

