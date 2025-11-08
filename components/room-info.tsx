"use client"

import type { User } from "@/lib/socket-io"

interface RoomInfoProps {
  room: string
  userCount: number
  messageCount: number
  users: User[]
}

export function RoomInfo({ room, userCount, messageCount, users }: RoomInfoProps) {
  return (
    <div className="space-y-4 bg-card p-4 text-sm">
      <div>
        <h3 className="mb-2 font-semibold text-card-foreground">Room Stats</h3>
        <div className="space-y-1 text-muted-foreground">
          <p>Room: {room.charAt(0).toUpperCase() + room.slice(1)}</p>
          <p>Active Users: {userCount}</p>
          <p>Messages: {messageCount}</p>
        </div>
      </div>

      <div>
        <h4 className="mb-2 font-semibold text-card-foreground">Online Now ({users.length})</h4>
        <div className="space-y-1">
          {users.map((user) => (
            <div key={user.id} className="flex items-center gap-2 text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-xs">{user.username}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
