"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Tag } from "@/components/ui/tag"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { CountdownTimer } from "./countdown-timer"
import { usePosts } from "@/app/providers"

interface Project {
  id: number
  title: string
  content: string
  budget?: string
  bids?: number
  timeLeft?: string
  department?: string
  duration?: string
  tags: string[]
  projectType: "freelance" | "university"
}

interface HiringBoardProps {
  searchQuery?: string
}

export function HiringBoard({ searchQuery = "" }: HiringBoardProps) {
  const [bidDialogOpen, setBidDialogOpen] = useState(false)
  const [interestDialogOpen, setInterestDialogOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [bidAmount, setBidAmount] = useState("")
  const [bidProposal, setBidProposal] = useState("")
  const [interestMessage, setInterestMessage] = useState("")
  const { toast } = useToast()

  const { hiringPosts, setHiringPosts } = usePosts()

  const handleBid = (project: Project) => {
    setSelectedProject(project)
    setBidDialogOpen(true)
  }

  const handleShowInterest = (project: Project) => {
    setSelectedProject(project)
    setInterestDialogOpen(true)
  }

  const submitBid = () => {
    if (selectedProject) {
      setHiringPosts((projects) =>
        projects.map((p) => (p.id === selectedProject.id ? { ...p, bids: (p.bids || 0) + 1 } : p)),
      )
      toast({
        title: "Bid submitted",
        description: `Your bid of ${bidAmount} has been submitted successfully.`,
      })
      setBidDialogOpen(false)
      resetBidForm()
    }
  }

  const submitInterest = () => {
    toast({
      title: "Interest submitted",
      description: "Your interest has been registered successfully.",
    })
    setInterestDialogOpen(false)
    setInterestMessage("")
  }

  const resetBidForm = () => {
    setBidAmount("")
    setBidProposal("")
    setSelectedProject(null)
  }

  const filteredFreelanceProjects = hiringPosts.filter(
    (project) =>
      project.projectType === "freelance" &&
      (project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))),
  )

  const filteredUniversityProjects = hiringPosts.filter(
    (project) =>
      project.projectType === "university" &&
      (project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))),
  )

  return (
    <>
      <div className="space-y-8 mt-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Hiring Board</h2>
          <p className="text-sm text-muted-foreground">
            Find freelancers or collaborate with universities on your projects
          </p>
        </div>

        <Tabs defaultValue="freelance" className="w-full">
          <div className="border-b">
            <div className="flex-1 px-2 py-4">
              <TabsList className="h-10 w-full justify-start rounded-none bg-transparent p-0">
                <div className="flex items-center gap-6">
                  <TabsTrigger
                    value="freelance"
                    className="relative h-9 rounded-none border-b-2 border-transparent bg-transparent px-4 pb-3 pt-2 font-medium text-muted-foreground shadow-none transition-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                  >
                    Freelance Projects
                  </TabsTrigger>
                  <TabsTrigger
                    value="university"
                    className="relative h-9 rounded-none border-b-2 border-transparent bg-transparent px-4 pb-3 pt-2 font-medium text-muted-foreground shadow-none transition-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                  >
                    University Collaboration
                  </TabsTrigger>
                </div>
              </TabsList>
            </div>
          </div>

          <TabsContent value="freelance" className="space-y-6 pt-6">
            {filteredFreelanceProjects.map((project) => (
              <div
                key={project.id}
                className="group grid md:grid-cols-[1fr_300px] overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg"
              >
                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight mb-2">{project.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{project.content}</p>
                  </div>
                  <ScrollArea className="w-full whitespace-nowrap">
                    <div className="flex gap-2">
                      {project.tags.map((tag) => (
                        <Tag key={tag} className="bg-primary/5 hover:bg-primary/10">
                          {tag}
                        </Tag>
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-lg">{project.budget}</span>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center text-muted-foreground">
                        <Users className="h-4 w-4 mr-1" />
                        {project.bids} bids
                      </span>
                    </div>
                  </div>
                  <div className="px-0">
                    <Button className="w-full" size="lg" onClick={() => handleBid(project)}>
                      Place Bid
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-center bg-card p-8 border-l">
                  <CountdownTimer timeLeft={project.timeLeft || "0 days"} />
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="university" className="space-y-6 pt-6">
            {filteredUniversityProjects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{project.content}</p>
                  <ScrollArea className="w-full whitespace-nowrap">
                    <div className="flex gap-2">
                      {project.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{project.department}</span>
                    <span>Duration: {project.duration}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => handleShowInterest(project)}>
                    Show Interest
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={bidDialogOpen} onOpenChange={setBidDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Place a Bid</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bid-amount">Bid Amount</Label>
              <Input
                id="bid-amount"
                placeholder="Enter your bid amount"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bid-proposal">Proposal</Label>
              <Textarea
                id="bid-proposal"
                placeholder="Write your proposal..."
                value={bidProposal}
                onChange={(e) => setBidProposal(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={submitBid} className="w-full">
              Submit Bid
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={interestDialogOpen} onOpenChange={setInterestDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Show Interest</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="interest-message">Message</Label>
              <Textarea
                id="interest-message"
                placeholder="Write why you're interested in this project..."
                value={interestMessage}
                onChange={(e) => setInterestMessage(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={submitInterest} className="w-full">
              Submit Interest
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

