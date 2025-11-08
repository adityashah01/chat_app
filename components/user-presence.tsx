"use client"

interface PresenceIndicatorProps {
  users: Array<{ username: string; status: string }>
}

export function UserPresence({ users }: PresenceIndicatorProps) {
  const onlineUsers = users.filter((u) => u.status === "online")
  const awayUsers = users.filter((u) => u.status === "away")

  return (
    <div className="space-y-3 bg-card p-4">
      {onlineUsers.length > 0 && (
        <div>
          <h4 className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Online ({onlineUsers.length})</h4>
          <div className="space-y-1">
            {onlineUsers.map((user) => (
              <div key={user.username} className="flex items-center gap-2 rounded px-2 py-1 hover:bg-muted">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-sm text-card-foreground">{user.username}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {awayUsers.length > 0 && (
        <div>
          <h4 className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Away ({awayUsers.length})</h4>
          <div className="space-y-1">
            {awayUsers.map((user) => (
              <div
                key={user.username}
                className="flex items-center gap-2 rounded px-2 py-1 text-muted-foreground hover:bg-muted"
              >
                <div className="h-2 w-2 rounded-full bg-yellow-500" />
                <span className="text-sm opacity-60">{user.username}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
