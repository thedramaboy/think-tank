"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WebBoard } from "@/components/web-board"
import { HiringBoard } from "@/components/hiring-board"
import { RentLab } from "@/components/rent-lab"
import { StaffPicks } from "@/components/staff-picks"
import { Topics } from "@/components/topics"
import { usePosts } from "./providers"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const { posts, setPosts } = usePosts()

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">
      <div className="space-y-8">
        <Tabs defaultValue="for-you" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="for-you">Discussion Board</TabsTrigger>
            <TabsTrigger value="hiring">Hiring Board</TabsTrigger>
            <TabsTrigger value="rent-lab">Rent Lab</TabsTrigger>
          </TabsList>
          <TabsContent value="for-you">
            <WebBoard searchQuery={searchQuery} posts={posts} setPosts={setPosts} />
          </TabsContent>
          <TabsContent value="hiring">
            <HiringBoard searchQuery={searchQuery} />
          </TabsContent>
          <TabsContent value="rent-lab">
            <RentLab searchQuery={searchQuery} />
          </TabsContent>
        </Tabs>
      </div>
      <div className="space-y-6">
        <StaffPicks />
        <Topics selectedTopic={undefined} onTopicSelect={() => {}} />
      </div>
    </div>
  )
}

