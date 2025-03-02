"use client"

import { useEffect, useState } from "react"

interface CountdownTimerProps {
  timeLeft: string
}

export function CountdownTimer({ timeLeft }: CountdownTimerProps) {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Convert "2 days" or "5 days" to milliseconds
    const days = Number.parseInt(timeLeft.split(" ")[0])
    const endTime = new Date().getTime() + days * 24 * 60 * 60 * 1000

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = endTime - now

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  return (
    <div className="text-center">
      <h4 className="text-sm font-medium text-muted-foreground mb-4">Time Remaining</h4>
      <div className="grid grid-cols-4 gap-4">
        <div className="space-y-2">
          <div className="text-3xl font-bold tracking-tight">{countdown.days}</div>
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Days</div>
        </div>
        <div className="space-y-2">
          <div className="text-3xl font-bold tracking-tight">{countdown.hours}</div>
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Hours</div>
        </div>
        <div className="space-y-2">
          <div className="text-3xl font-bold tracking-tight">{countdown.minutes}</div>
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Mins</div>
        </div>
        <div className="space-y-2">
          <div className="text-3xl font-bold tracking-tight">{countdown.seconds}</div>
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Secs</div>
        </div>
      </div>
    </div>
  )
}

