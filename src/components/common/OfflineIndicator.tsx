import { useState, useEffect } from "react"

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  if (isOnline) return null

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "#e74c3c",
        color: "white",
        textAlign: "center",
        padding: "8px",
        fontSize: "14px",
        zIndex: 9999,
      }}
    >
      ⚠ Mode hors ligne — les données locales sont utilisables
    </div>
  )
}
