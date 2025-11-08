import io, { type Socket } from "socket.io-client"

export interface Message {
  id: string
  username: string
  content: string
  timestamp: number
  userId: string
  file?: {
    name: string
    type: string
    size: number
    data: string // base64 encoded
  }
}

export interface User {
  id: string
  username: string
  status: "online" | "away" | "offline"
}

export interface Room {
  id: string
  name: string
  users: User[]
  messages: Message[]
}

let socket: Socket | null = null

export function initSocket(): Socket {
  if (socket) return socket

  socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000", {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
  })

  return socket
}

export function getSocket(): Socket | null {
  return socket
}

export function disconnectSocket(): void {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}
