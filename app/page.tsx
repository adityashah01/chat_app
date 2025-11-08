"use client"

import { useEffect, useState } from "react"
import { initSocket, type Socket } from "@/lib/socket-io"
import { JoinRoomDialog } from "@/components/join-room-dialog"
import { ChatContainer } from "@/components/chat-container"

export default function ChatPage() {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [hasJoined, setHasJoined] = useState(false)
  const [chatInfo, setChatInfo] = useState<{
    username: string
    room: string
    userId: string
  } | null>(null)

  useEffect(() => {
    // Initialize socket connection
    const newSocket = initSocket()
    setSocket(newSocket)

    return () => {
      // Cleanup
      newSocket.disconnect()
    }
  }, [])

  const handleJoinRoom = (username: string, room: string) => {
    if (socket) {
      setChatInfo({
        username,
        room,
        userId: socket.id,
      })
      setHasJoined(true)
    }
  }

  const handleDisconnect = () => {
    setHasJoined(false)
    setChatInfo(null)
  }

  if (!hasJoined || !chatInfo) {
    return <JoinRoomDialog onJoin={handleJoinRoom} />
  }

  return (
    <ChatContainer
      socket={socket}
      username={chatInfo.username}
      room={chatInfo.room}
      userId={chatInfo.userId}
      onDisconnect={handleDisconnect}
    />
  )
}
