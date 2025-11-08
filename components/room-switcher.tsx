"use client"

interface RoomSwitcherProps {
  currentRoom: string
  onRoomChange: (room: string) => void
  availableRooms: string[]
}

export function RoomSwitcher({ currentRoom, onRoomChange, availableRooms }: RoomSwitcherProps) {
  return (
    <div className="flex gap-2 border-b border-border bg-card px-6 py-4">
      {availableRooms.map((room) => (
        <button
          key={room}
          onClick={() => onRoomChange(room)}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            currentRoom === room
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          {room.charAt(0).toUpperCase() + room.slice(1)}
        </button>
      ))}
    </div>
  )
}
