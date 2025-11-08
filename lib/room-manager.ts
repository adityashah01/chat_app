export const AVAILABLE_ROOMS = ["general", "random", "tech", "gaming"]

export interface RoomStats {
  name: string
  userCount: number
  messageCount: number
}

export class RoomManager {
  private static rooms: Map<string, RoomStats> = new Map()

  static initialize() {
    AVAILABLE_ROOMS.forEach((room) => {
      this.rooms.set(room, {
        name: room,
        userCount: 0,
        messageCount: 0,
      })
    })
  }

  static getRoomStats(room: string): RoomStats | undefined {
    return this.rooms.get(room)
  }

  static getAllRooms(): RoomStats[] {
    return Array.from(this.rooms.values())
  }

  static updateUserCount(room: string, delta: number) {
    const stats = this.rooms.get(room)
    if (stats) {
      stats.userCount = Math.max(0, stats.userCount + delta)
    }
  }

  static incrementMessageCount(room: string) {
    const stats = this.rooms.get(room)
    if (stats) {
      stats.messageCount++
    }
  }
}

RoomManager.initialize()
