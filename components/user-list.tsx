import type { User } from "@/lib/socket-io"

interface UserListProps {
  users: User[]
  currentUserId: string
}

export function UserList({ users, currentUserId }: UserListProps) {
  return (
    <div className="flex flex-col gap-2 bg-card p-4">
      <h3 className="font-semibold text-card-foreground">Users ({users.length})</h3>
      <div className="space-y-2">
        {users.map((user) => (
          <div key={user.id} className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground">
                {user.username}
                {user.id === currentUserId && " (You)"}
              </p>
            </div>
            <div
              className={`h-2 w-2 rounded-full ${
                user.status === "online" ? "bg-green-500" : user.status === "away" ? "bg-yellow-500" : "bg-gray-500"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
