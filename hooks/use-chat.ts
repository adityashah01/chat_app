"use client"

import { useEffect, useState, useCallback } from "react"
import type { Socket } from "socket.io-client"
import type { Message, User } from "@/lib/socket-io"

interface UseChatProps {
  socket: Socket | null
  username: string
  room: string
  userId: string
}

export function useChat({ socket, username, room, userId }: UseChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "disconnected" | "error">(
    "disconnected",
  )

  // Join room on mount
  useEffect(() => {
    if (!socket) return

    const handleConnect = () => {
      setConnectionStatus("connected")
      setIsConnected(true)
      socket.emit("join-room", { username, room })
    }

    const handleConnectionError = () => {
      setConnectionStatus("error")
    }

    socket.on("connect", handleConnect)
    socket.on("connect_error", handleConnectionError)

    if (socket.connected) {
      handleConnect()
    }

    return () => {
      socket.off("connect", handleConnect)
      socket.off("connect_error", handleConnectionError)
    }
  }, [socket, username, room])

  // Handle incoming messages
  useEffect(() => {
    if (!socket) return

    const handleUserJoined = (data: any) => {
      setUsers(
        data.users.map((u: any) => ({
          ...u,
          status: "online" as const,
        })),
      )
    }

    const handleReceiveMessage = (message: Message) => {
      setMessages((prev) => [...prev, message])
    }

    const handleUserLeft = (data: any) => {
      setUsers(
        data.users.map((u: any) => ({
          ...u,
          status: "online" as const,
        })),
      )
    }

    const handleDisconnect = () => {
      setConnectionStatus("disconnected")
      setIsConnected(false)
    }

    socket.on("user-joined", handleUserJoined)
    socket.on("receive-message", handleReceiveMessage)
    socket.on("user-left", handleUserLeft)
    socket.on("disconnect", handleDisconnect)

    return () => {
      socket.off("user-joined", handleUserJoined)
      socket.off("receive-message", handleReceiveMessage)
      socket.off("user-left", handleUserLeft)
      socket.off("disconnect", handleDisconnect)
    }
  }, [socket])

  const sendMessage = useCallback(
    (content: string, file?: { name: string; type: string; size: number; data: string }) => {
      if (socket && isConnected) {
        if (content.trim() || file) {
          socket.emit("send-message", { content, room, file })
        }
      }
    },
    [socket, room, isConnected],
  )

  return {
    messages,
    users,
    isConnected,
    connectionStatus,
    sendMessage,
  }
}
