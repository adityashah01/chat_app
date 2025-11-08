"use client"

import type { Message } from "@/lib/socket-io"
import { Download, FileIcon } from "lucide-react"

interface ChatMessageProps {
  message: Message
  isCurrentUser: boolean
}

export function ChatMessage({ message, isCurrentUser }: ChatMessageProps) {
  const date = new Date(message.timestamp)
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith("image/")) return "🖼️"
    if (mimeType === "application/pdf") return "📄"
    return "📎"
  }

  const downloadFile = () => {
    if (!message.file) return
    const link = document.createElement("a")
    link.href = message.file.data
    link.download = message.file.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className={`flex gap-3 ${isCurrentUser ? "flex-row-reverse" : "flex-row"}`}>
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
          isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
        }`}
      >
        {message.username.charAt(0).toUpperCase()}
      </div>
      <div className={`flex flex-col gap-1 ${isCurrentUser ? "items-end" : "items-start"}`}>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">{message.username}</span>
          <span className="text-xs text-muted-foreground">{time}</span>
        </div>

        {message.file && (
          <div
            className={`rounded-lg p-3 ${
              isCurrentUser ? "bg-primary text-primary-foreground" : "bg-card text-card-foreground"
            }`}
          >
            {message.file.type.startsWith("image/") ? (
              <img
                src={message.file.data || "/placeholder.svg"}
                alt={message.file.name}
                className="max-h-48 max-w-xs rounded object-cover"
              />
            ) : (
              <div className="flex items-center gap-2">
                <FileIcon className="h-5 w-5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{message.file.name}</p>
                  <p className="text-xs opacity-75">{(message.file.size / 1024).toFixed(2)} KB</p>
                </div>
                <button
                  onClick={downloadFile}
                  className={`rounded p-1 hover:opacity-75 ${
                    isCurrentUser ? "hover:bg-primary-foreground/20" : "hover:bg-foreground/10"
                  }`}
                  aria-label="Download file"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {message.content && (
          <div
            className={`rounded-lg px-3 py-2 ${
              isCurrentUser ? "bg-primary text-primary-foreground" : "bg-card text-card-foreground"
            }`}
          >
            <p className="text-sm">{message.content}</p>
          </div>
        )}
      </div>
    </div>
  )
}
