"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Clock, Users } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Tag } from "@/components/ui/tag"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

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

  const [freelanceProjects, setFreelanceProjects] = useState<Project[]>([
    {
      id: 1,
      title: "AI-Powered Analytics Dashboard",
      content: "Looking for a skilled developer to create a comprehensive analytics dashboard with AI integration...",
      budget: "$2000-3000",
      bids: 8,
      timeLeft: "2 days",
      tags: ["Data Science", "Web Development", "AI/ML"],
    },
    {
      id: 2,
      title: "Mobile App Development",
      content: "Need an experienced mobile developer for creating a cross-platform application...",
      budget: "$5000-7000",
      bids: 12,
      timeLeft: "5 days",
      tags: ["Mobile Development", "React Native", "Technology"],
    },
  ])

  const [universityProjects, setUniversityProjects] = useState<Project[]>([
    {
      id: 1,
      title: "Research on Quantum Computing Applications",
      content: "Seeking collaboration with university researchers on quantum computing applications in cryptography...",
      department: "Computer Science",
      duration: "6 months",
      tags: ["Quantum Computing", "Research", "Technology"],
    },
    {
      id: 2,
      title: "Sustainable Energy Solutions Study",
      content: "Looking for partnership in researching innovative sustainable energy solutions...",
      department: "Environmental Engineering",
      duration: "1 year",
      tags: ["Sustainability", "Engineering", "Research"],
    },
  ])

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
      setFreelanceProjects((projects) =>
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

  const filteredFreelanceProjects = freelanceProjects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const filteredUniversityProjects = universityProjects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <>
      <Tabs defaultValue="freelance" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="freelance">Freelance</TabsTrigger>
          <TabsTrigger value="university">University</TabsTrigger>
        </TabsList>
        <TabsContent value="freelance" className="space-y-6">
          {filteredFreelanceProjects.map((project) => (
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
                  <span className="font-medium">Budget: {project.budget}</span>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {project.bids} bids
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {project.timeLeft} left
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleBid(project)}>
                  Place Bid
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="university" className="space-y-6">
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

