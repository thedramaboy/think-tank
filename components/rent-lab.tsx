"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon, MapPin, Building2, User2, Briefcase, PlusIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tag } from "@/components/ui/tag"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"

type LabType = "neighbor" | "private" | "university"

interface Lab {
  id: number
  name: string
  description: string
  price: string
  location: string
  image: string
  tags: string[]
  type: LabType
  availability?: string
  equipment?: string[]
  owner?: string
  institution?: string
  company?: string
  certifications?: string[]
}

interface RentLabProps {
  searchQuery?: string
}

export function RentLab({ searchQuery = "" }: RentLabProps) {
  const [labs, setLabs] = useState<Lab[]>([
    {
      id: 1,
      name: "Home Workshop & 3D Printing Lab",
      description:
        "Fully equipped garage workshop with 3D printers, basic tools, and workbench. Perfect for DIY projects and prototyping.",
      price: "$25/hour",
      location: "Brooklyn, NY",
      image: "/placeholder.svg",
      type: "neighbor",
      tags: ["3D Printing", "Workshop", "DIY"],
      owner: "John Smith",
      equipment: ["Prusa i3 MK3S+", "Laser Cutter", "Basic Tool Set"],
      availability: "Weekends, Evenings",
    },
    {
      id: 2,
      name: "Electronics & Testing Equipment",
      description: "Complete electronics workspace with testing equipment, soldering stations, and component library.",
      price: "$35/hour",
      location: "Queens, NY",
      image: "/placeholder.svg",
      type: "neighbor",
      tags: ["Electronics", "Testing", "Prototyping"],
      owner: "Sarah Johnson",
      equipment: ["Oscilloscope", "Multimeters", "Soldering Stations"],
      availability: "24/7 Access",
    },
    {
      id: 3,
      name: "BioTech Solutions Lab",
      description:
        "Professional biotechnology laboratory with state-of-the-art equipment for research and development.",
      price: "$300/hour",
      location: "Manhattan, NY",
      image: "/placeholder.svg",
      type: "private",
      tags: ["Biotech", "Research", "Professional"],
      company: "BioTech Solutions Inc.",
      equipment: ["PCR Machines", "Cell Culture Hood", "Microscopes"],
      certifications: ["ISO 17025", "GLP Compliant"],
    },
    {
      id: 4,
      name: "Advanced Materials Testing Lab",
      description: "Industrial laboratory specializing in materials testing and analysis.",
      price: "$250/hour",
      location: "Jersey City, NJ",
      image: "/placeholder.svg",
      type: "private",
      tags: ["Materials", "Testing", "Industrial"],
      company: "MaterialsX Labs",
      equipment: ["SEM", "XRD", "Tensile Tester"],
      certifications: ["ISO 9001", "ASTM Certified"],
    },
    {
      id: 5,
      name: "Advanced Chemistry Lab",
      description: "State-of-the-art chemistry laboratory with modern analytical instruments and safety equipment.",
      price: "$200/hour",
      location: "MIT Campus",
      image: "/placeholder.svg",
      type: "university",
      tags: ["Chemistry", "Research", "Analysis"],
      institution: "MIT",
      equipment: ["Mass Spectrometer", "HPLC", "NMR Spectrometer"],
    },
    {
      id: 6,
      name: "Quantum Computing Research Lab",
      description: "Cutting-edge quantum computing facility with specialized equipment and research tools.",
      price: "$400/hour",
      location: "Stanford University",
      image: "/placeholder.svg",
      type: "university",
      tags: ["Quantum Computing", "Research", "Physics"],
      institution: "Stanford",
      equipment: ["Quantum Processors", "Cryogenic Systems", "Control Electronics"],
    },
  ])

  const [rentDialogOpen, setRentDialogOpen] = useState(false)
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null)
  const [date, setDate] = useState<Date>()
  const [hours, setHours] = useState("")
  const { toast } = useToast()
  const [createPostDialogOpen, setCreatePostDialogOpen] = useState(false)
  const [newPost, setNewPost] = useState({
    name: "",
    description: "",
    price: "",
    location: "",
    equipment: "",
    availability: "",
  })

  const handleRent = (lab: Lab) => {
    setSelectedLab(lab)
    setRentDialogOpen(true)
  }

  const submitRental = () => {
    if (selectedLab && date && hours) {
      toast({
        title: "Lab Rental Confirmed",
        description: `You have booked ${selectedLab.name} for ${hours} hours on ${format(date, "PPP")}.`,
      })
      setRentDialogOpen(false)
      resetRentalForm()
    }
  }

  const resetRentalForm = () => {
    setDate(undefined)
    setHours("")
    setSelectedLab(null)
  }

  const handleCreatePost = () => {
    const newLab: Lab = {
      id: labs.length + 1,
      name: newPost.name,
      description: newPost.description,
      price: newPost.price,
      location: newPost.location,
      image: "/placeholder.svg",
      type: "neighbor",
      tags: ["DIY", "Equipment"],
      owner: "Current User", // In a real app, this would come from auth
      equipment: newPost.equipment.split(",").map((item) => item.trim()),
      availability: newPost.availability,
    }

    setLabs([newLab, ...labs])
    setCreatePostDialogOpen(false)
    setNewPost({
      name: "",
      description: "",
      price: "",
      location: "",
      equipment: "",
      availability: "",
    })
    toast({
      title: "Post Created",
      description: "Your lab space has been listed successfully.",
    })
  }

  const filteredLabs = labs.filter(
    (lab) =>
      !searchQuery ||
      lab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lab.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lab.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const renderLabCard = (lab: Lab) => (
    <div
      key={lab.id}
      className="group grid md:grid-cols-[1fr_300px] overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg"
    >
      <div className="p-6 space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-semibold tracking-tight">{lab.name}</h3>
            <span className="text-lg font-medium">{lab.price}</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            {lab.type === "neighbor" && (
              <span className="flex items-center">
                <User2 className="h-4 w-4 mr-1" />
                {lab.owner}
              </span>
            )}
            {lab.type === "private" && (
              <span className="flex items-center">
                <Briefcase className="h-4 w-4 mr-1" />
                {lab.company}
              </span>
            )}
            {lab.type === "university" && (
              <span className="flex items-center">
                <Building2 className="h-4 w-4 mr-1" />
                {lab.institution}
              </span>
            )}
            <span className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {lab.location}
            </span>
          </div>
          <p className="text-muted-foreground leading-relaxed">{lab.description}</p>
        </div>

        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-2">
            {lab.tags.map((tag) => (
              <Tag key={tag} className="bg-primary/5 hover:bg-primary/10">
                {tag}
              </Tag>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {lab.equipment && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Available Equipment</h4>
            <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
              {lab.equipment.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {lab.type === "neighbor" && lab.availability && (
          <div className="text-sm text-muted-foreground">Availability: {lab.availability}</div>
        )}

        {lab.type === "private" && lab.certifications && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Certifications</h4>
            <div className="flex gap-2">
              {lab.certifications.map((cert) => (
                <span key={cert} className="text-xs bg-secondary px-2 py-1 rounded-full">
                  {cert}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="px-0">
          <Button className="w-full" size="lg" onClick={() => handleRent(lab)}>
            Rent Lab
          </Button>
        </div>
      </div>
      <div className="relative">
        <Image
          src={lab.image || "/placeholder.svg"}
          alt={lab.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
    </div>
  )

  return (
    <>
      <div className="space-y-8 mt-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Available Lab Spaces</h2>
            <p className="text-sm text-muted-foreground">Find and rent lab spaces and equipment for your projects</p>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => setCreatePostDialogOpen(true)} className="hidden md:flex">
              <PlusIcon className="mr-2 h-4 w-4" />
              List Your Space
            </Button>
            <Button onClick={() => setCreatePostDialogOpen(true)} className="md:hidden" size="icon">
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="neighbor" className="w-full">
          <div className="border-b">
            <div className="flex-1 px-2 py-4">
              <TabsList className="h-10 w-full justify-start rounded-none bg-transparent p-0">
                <div className="flex items-center gap-6">
                  <TabsTrigger
                    value="neighbor"
                    className="relative h-9 rounded-none border-b-2 border-transparent bg-transparent px-4 pb-3 pt-2 font-medium text-muted-foreground shadow-none transition-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                  >
                    Neighbor Lab & Equipment
                  </TabsTrigger>
                  <TabsTrigger
                    value="private"
                    className="relative h-9 rounded-none border-b-2 border-transparent bg-transparent px-4 pb-3 pt-2 font-medium text-muted-foreground shadow-none transition-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                  >
                    Private Lab
                  </TabsTrigger>
                  <TabsTrigger
                    value="university"
                    className="relative h-9 rounded-none border-b-2 border-transparent bg-transparent px-4 pb-3 pt-2 font-medium text-muted-foreground shadow-none transition-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                  >
                    University Lab
                  </TabsTrigger>
                </div>
              </TabsList>
            </div>
          </div>

          <TabsContent value="neighbor" className="space-y-6 pt-6">
            {filteredLabs.filter((lab) => lab.type === "neighbor").map(renderLabCard)}
          </TabsContent>

          <TabsContent value="private" className="space-y-6 pt-6">
            {filteredLabs.filter((lab) => lab.type === "private").map(renderLabCard)}
          </TabsContent>

          <TabsContent value="university" className="space-y-6 pt-6">
            {filteredLabs.filter((lab) => lab.type === "university").map(renderLabCard)}
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={createPostDialogOpen} onOpenChange={setCreatePostDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>List Your Lab Space</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Space Name</Label>
              <Input
                id="name"
                placeholder="Enter the name of your lab space"
                value={newPost.name}
                onChange={(e) => setNewPost({ ...newPost, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your lab space and its features"
                value={newPost.description}
                onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                className="min-h-[100px]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price (per hour)</Label>
                <Input
                  id="price"
                  placeholder="e.g. $50"
                  value={newPost.price}
                  onChange={(e) => setNewPost({ ...newPost, price: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Enter location"
                  value={newPost.location}
                  onChange={(e) => setNewPost({ ...newPost, location: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="equipment">Equipment (comma-separated)</Label>
              <Textarea
                id="equipment"
                placeholder="List available equipment, separated by commas"
                value={newPost.equipment}
                onChange={(e) => setNewPost({ ...newPost, equipment: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="availability">Availability</Label>
              <Input
                id="availability"
                placeholder="e.g. Weekends, Evenings"
                value={newPost.availability}
                onChange={(e) => setNewPost({ ...newPost, availability: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleCreatePost} className="w-full">
              Create Listing
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={rentDialogOpen} onOpenChange={setRentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rent Lab Space</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hours">Number of Hours</Label>
              <Input
                id="hours"
                type="number"
                min="1"
                placeholder="Enter number of hours"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={submitRental} className="w-full">
              Confirm Rental
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

