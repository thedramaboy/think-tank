"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"

export function SearchBox() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])

  useEffect(() => {
    // Mock search functionality
    const searchContent = async () => {
      if (query.length > 2) {
        // Simulate API call
        const mockResults = [
          { id: 1, title: "AI in Healthcare", type: "post" },
          { id: 2, title: "Chemistry Lab", type: "lab" },
          { id: 3, title: "Mobile App Project", type: "project" },
        ].filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
        setResults(mockResults)
      } else {
        setResults([])
      }
    }

    const debounce = setTimeout(searchContent, 300)
    return () => clearTimeout(debounce)
  }, [query])

  return (
    <div className="relative">
      <div className="relative">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search..."
          className="pl-8 w-[300px]"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-background border rounded-md shadow-lg z-10">
          {results.map((result: any) => (
            <div key={result.id} className="px-4 py-2 hover:bg-muted cursor-pointer">
              <div className="text-sm font-medium">{result.title}</div>
              <div className="text-xs text-muted-foreground capitalize">{result.type}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

