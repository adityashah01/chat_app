"use client"

interface ConnectionStatusProps {
  status: "connecting" | "connected" | "disconnected" | "error"
  username: string
  room: string
}

export function ConnectionStatus({ status, username, room }: ConnectionStatusProps) {
  const statusConfig = {
    connecting: {
      color: "bg-yellow-500",
      text: "Connecting...",
    },
    connected: {
      color: "bg-green-500",
      text: "Connected",
    },
    disconnected: {
      color: "bg-gray-500",
      text: "Disconnected",
    },
    error: {
      color: "bg-red-500",
      text: "Connection Error",
    },
  }

  const config = statusConfig[status]

  return (
    <div className="flex items-center gap-3 rounded-lg bg-card px-4 py-3 text-sm">
      <div className={`h-2 w-2 rounded-full ${config.color} animate-pulse`} />
      <div className="flex-1">
        <p className="font-medium text-card-foreground">{username}</p>
        <p className="text-xs text-muted-foreground">
          {config.text} • {room}
        </p>
      </div>
    </div>
  )
}
