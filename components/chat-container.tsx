"use client"

import { useEffect, useRef, useState } from "react"
import type { Message, User } from "@/lib/socket-io"
import { ChatMessage } from "./chat-message"
import { MessageInput } from "./message-input"
import { UserList } from "./user-list"
import { ConnectionStatus } from "./connection-status"

interface ChatContainerProps {
  socket: any
  username: string
  room: string
  userId: string
  onDisconnect: () => void
}

export function ChatContainer({ socket, username, room, userId, onDisconnect }: ChatContainerProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "disconnected" | "error">(
    "connecting",
  )
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (!socket) return

    const handleConnect = () => {
      setConnectionStatus("connected")
      socket.emit("join-room", { username, room })
    }

    const handleUserJoined = (data: any) => {
      setUsers(data.users.map((u: any) => ({ ...u, status: "online" })))
    }

    const handleReceiveMessage = (message: Message) => {
      setMessages((prev) => [...prev, message])
    }

    const handleUserLeft = (data: any) => {
      setUsers(data.users.map((u: any) => ({ ...u, status: "online" })))
    }

    const handleDisconnect = () => {
      setConnectionStatus("disconnected")
    }

    const handleConnectError = () => {
      setConnectionStatus("error")
    }

    socket.on("connect", handleConnect)
    socket.on("user-joined", handleUserJoined)
    socket.on("receive-message", handleReceiveMessage)
    socket.on("user-left", handleUserLeft)
    socket.on("disconnect", handleDisconnect)
    socket.on("connect_error", handleConnectError)

    if (socket.connected) {
      handleConnect()
    }

    return () => {
      socket.off("connect", handleConnect)
      socket.off("user-joined", handleUserJoined)
      socket.off("receive-message", handleReceiveMessage)
      socket.off("user-left", handleUserLeft)
      socket.off("disconnect", handleDisconnect)
      socket.off("connect_error", handleConnectError)
    }
  }, [socket, username, room])

  const handleSendMessage = (content: string) => {
    if (socket && connectionStatus === "connected") {
      socket.emit("send-message", { content, room })
    }
  }

  return (
    <div className="flex h-screen gap-4 bg-background p-4">
      {/* Chat Area */}
      <div className="flex flex-1 flex-col gap-4 rounded-2xl bg-card shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-card-foreground">{room.charAt(0).toUpperCase() + room.slice(1)}</h1>
            <p className="text-sm text-muted-foreground">
              {users.length} {users.length === 1 ? "member" : "members"} online
            </p>
          </div>
          <button
            onClick={onDisconnect}
            className="rounded-lg bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:opacity-90"
          >
            Leave
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-4 overflow-y-auto px-6 py-4">
          {messages.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-muted-foreground">No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((msg) => <ChatMessage key={msg.id} message={msg} isCurrentUser={msg.userId === userId} />)
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <MessageInput onSendMessage={handleSendMessage} disabled={connectionStatus !== "connected"} />
      </div>

      {/* Sidebar */}
      <div className="flex w-64 flex-col gap-4 rounded-2xl shadow-lg">
        <ConnectionStatus status={connectionStatus} username={username} room={room} />
        <div className="flex-1 overflow-y-auto rounded-lg">
          <UserList users={users} currentUserId={userId} />
        </div>
      </div>
    </div>
  )
}
