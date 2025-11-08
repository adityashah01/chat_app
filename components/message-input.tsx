"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Paperclip, X } from "lucide-react"

interface MessageInputProps {
  onSendMessage: (message: string, file?: { name: string; type: string; size: number; data: string }) => void
  disabled?: boolean
}

export function MessageInput({ onSendMessage, disabled = false }: MessageInputProps) {
  const [message, setMessage] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSend = () => {
    if (message.trim() || selectedFile) {
      if (selectedFile) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const data = e.target?.result as string
          onSendMessage(message, {
            name: selectedFile.name,
            type: selectedFile.type,
            size: selectedFile.size,
            data,
          })
          setMessage("")
          setSelectedFile(null)
          setPreviewUrl(null)
        }
        reader.readAsDataURL(selectedFile)
      } else {
        onSendMessage(message)
        setMessage("")
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB")
        return
      }

      setSelectedFile(file)

      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
      }
    }
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="border-t border-border bg-background p-4">
      {selectedFile && (
        <div className="mb-3 flex items-center gap-2 rounded-lg border border-border bg-card p-3">
          {previewUrl ? (
            <img src={previewUrl || "/placeholder.svg"} alt="preview" className="h-12 w-12 rounded object-cover" />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded bg-muted">
              <Paperclip className="h-5 w-5 text-muted-foreground" />
            </div>
          )}
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">{selectedFile.name}</p>
            <p className="text-xs text-muted-foreground">{(selectedFile.size / 1024).toFixed(2)} KB</p>
          </div>
          <button onClick={handleRemoveFile} className="rounded p-1 hover:bg-muted" aria-label="Remove file">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      )}

      <div className="flex gap-2">
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          className="hidden"
          accept="image/*,.pdf,.doc,.docx,.txt,.zip"
        />
        <Button
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          variant="outline"
          size="icon"
          title="Attach file"
        >
          <Paperclip className="h-4 w-4" />
        </Button>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message... (Shift+Enter for new line)"
          disabled={disabled}
          className="flex-1 resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder-muted-foreground outline-none focus:border-ring focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
          rows={3}
        />
        <Button
          onClick={handleSend}
          disabled={disabled || (!message.trim() && !selectedFile)}
          className="h-fit self-end"
        >
          Send
        </Button>
      </div>
    </div>
  )
}
