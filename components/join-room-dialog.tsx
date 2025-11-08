"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface JoinRoomDialogProps {
  onJoin: (username: string, room: string) => void
}

export function JoinRoomDialog({ onJoin }: JoinRoomDialogProps) {
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("general")
  const [isLoading, setIsLoading] = useState(false)

  const handleJoin = async () => {
    if (username.trim() && room.trim()) {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 500))
      onJoin(username, room)
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && username.trim() && room.trim()) {
      handleJoin()
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background via-background to-muted px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-card p-8 shadow-lg">
          <div className="mb-8 space-y-2">
            <h1 className="text-3xl font-bold text-card-foreground">Welcome to Chat</h1>
            <p className="text-muted-foreground">Join a room and start chatting with others</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-card-foreground">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter your username"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground outline-none focus:border-ring focus:ring-1"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-card-foreground">Room</label>
              <div className="flex gap-2">
                <select
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-foreground outline-none focus:border-ring focus:ring-1"
                >
                  <option value="general">General</option>
                  <option value="random">Random</option>
                  <option value="tech">Tech</option>
                  <option value="gaming">Gaming</option>
                </select>
                <input
                  type="text"
                  placeholder="Or custom..."
                  onChange={(e) => {
                    if (e.target.value.trim()) {
                      setRoom(e.target.value)
                    }
                  }}
                  onKeyDown={handleKeyDown}
                  className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground outline-none focus:border-ring focus:ring-1"
                />
              </div>
            </div>

            <Button onClick={handleJoin} disabled={!username.trim() || !room.trim() || isLoading} className="w-full">
              {isLoading ? "Joining..." : "Join Chat"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
