"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Lab {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

interface PublicLabsProps {
  onBack: () => void;
}

export default function PublicLabs({ onBack }: PublicLabsProps) {
  const [publicLabs, setPublicLabs] = useState<Lab[]>([
    {
      id: 101,
      name: "John's Garage Lab",
      description: "Private chemistry lab in my garage, available for safe experiments and research.",
      price: "$100/hour",
      image: "/placeholder.svg",
    },
    {
      id: 102,
      name: "DIY Robotics Lab",
      description: "My personal robotics workshop, equipped with 3D printers, CNC, and soldering stations.",
      price: "$80/hour",
      image: "/placeholder.svg",
    },
  ]);

  const [rentDialogOpen, setRentDialogOpen] = useState(false);
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null);
  const [date, setDate] = useState<Date>();
  const [hours, setHours] = useState("");
  const { toast } = useToast();

  const handleRent = (lab: Lab) => {
    setSelectedLab(lab);
    setRentDialogOpen(true);
  };

  const submitRental = () => {
    if (selectedLab && date && hours) {
      toast({
        title: "Lab Rental Confirmed",
        description: `You have booked ${selectedLab.name} for ${hours} hours on ${format(date, "PPP")}.`,
      });
      setRentDialogOpen(false);
      setDate(undefined);
      setHours("");
      setSelectedLab(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Community Labs</h2>
        <Button size="lg" variant="outline" onClick={onBack}>
          Back to Rent Lab
        </Button>
      </div>
      <div className="space-y-6">
        {publicLabs.map((lab) => (
          <Card key={lab.id} className="overflow-hidden">
            <div className="grid md:grid-cols-[1fr_300px] gap-6">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold">{lab.name}</h3>
                  <p className="text-muted-foreground">{lab.description}</p>
                  <p className="text-lg font-semibold">{lab.price}</p>
                </div>
                <CardFooter className="px-0 pt-6">
                  <Button size="lg" onClick={() => handleRent(lab)}>Rent This Lab</Button>
                </CardFooter>
              </CardContent>
              <div className="relative min-h-[200px] md:min-h-full">
                <Image src={lab.image || "/placeholder.svg"} alt={lab.name} fill className="object-cover" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* 📌 Dialog สำหรับยืนยันการเช่า Lab */}
      <Dialog open={rentDialogOpen} onOpenChange={setRentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rent Lab</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* 📌 เลือกวันที่ */}
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

            {/* 📌 กรอกจำนวนชั่วโมง */}
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
    </div>
  );
}
