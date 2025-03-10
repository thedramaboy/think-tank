"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import PublicLabs from "./public-labs"


interface Lab {
  id: number
  name: string
  description: string
  price: string
  image: string
}

interface RentLabProps {
  searchQuery?: string
}

export function RentLab({ searchQuery = "" }: RentLabProps) {

  const router = useRouter();

  const [addLabDialogOpen, setAddLabDialogOpen] = useState(false);

  const [labs, setLabs] = useState<Lab[]>([
    {
      id: 1,
      name: "Advanced Chemistry Lab",
      description: "Fully equipped chemistry laboratory with modern analytical instruments and safety equipment...",
      price: "$200/hour",
      image: "/chem-lab.jpg",
    },
    {
      id: 2,
      name: "Biotechnology Research Lab",
      description: "State-of-the-art biotechnology lab with PCR machines, cell culture facilities, and more...",
      price: "$250/hour",
      image: "/bio-lab.jpg",
    },
    {
      id: 3,
      name: "Public Labs",
      description: "Explore community labs available for rent from individuals!",
      price: "$50/hour",
      image: "/garage-lab.jpg",
    }
  ])

  const [rentDialogOpen, setRentDialogOpen] = useState(false)
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null)
  const [date, setDate] = useState<Date>()
  const [hours, setHours] = useState("")
  const { toast } = useToast()
  const [viewPublicLabs, setViewPublicLabs] = useState(false);


  const handleRent = (lab: Lab) => {
    setSelectedLab(lab)
    setRentDialogOpen(true)
  }

  const handlePublicLabClick = () => {
    router.push("/public-labs");
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

  const filteredLabs = labs.filter(
    (lab) =>
      lab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lab.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <>
      {viewPublicLabs ? (
      <PublicLabs onBack={() => setViewPublicLabs(false)} />
    ) : (
      <div className="space-y-6">
        {filteredLabs.map((lab) => (
          <Card key={lab.id} className="overflow-hidden">
            <div className="grid md:grid-cols-[1fr_300px] gap-6">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold">{lab.name}</h3>
                  <p className="text-muted-foreground">{lab.description}</p>
                  <p className="text-lg font-semibold">{lab.price}</p>
                </div>
                <CardFooter className="px-0 pt-6 space-x-4">
                  {lab.name === "Public Labs" ? (
                    <>
                      <Button size="lg" variant="outline" onClick={() => setViewPublicLabs(true)}>
                        Browse Labs
                      </Button>
                      <Button size="lg" onClick={() => setAddLabDialogOpen(true)}>
                        List My Lab
                      </Button>
                    </>
                  ) : (
                    <Button size="lg" onClick={() => handleRent(lab)}>
                      Rent Lab
                    </Button>
                  )}
                </CardFooter>
              </CardContent>
              <div className="relative min-h-[200px] md:min-h-full">
                <Image src={lab.image || "/placeholder.svg"} alt={lab.name} fill className="object-cover" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    )}
      <Dialog open={rentDialogOpen} onOpenChange={setRentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rent Lab</DialogTitle>
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

      <Dialog open={addLabDialogOpen} onOpenChange={setAddLabDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>List Your Lab</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Label>Lab Name</Label>
            <Input placeholder="Enter lab name" />
            <Label>Description</Label>
            <Input placeholder="Enter lab description" />
            <Label>Price Per Hour</Label>
            <Input type="text" placeholder="$ per hour" />
          </div>
          <DialogFooter>
            <Button onClick={() => setAddLabDialogOpen(false)}>Submit Lab</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </>
  )
}

