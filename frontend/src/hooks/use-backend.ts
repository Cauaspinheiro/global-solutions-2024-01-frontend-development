import { useEffect } from "react"
import { create } from "zustand"

export type BackendStatus = "loading" | "healthy" | "error"

interface BackendStore {
  backendUrl: string
  backendStatus?: BackendStatus
  setBackendStatus: (status: BackendStatus) => void
  setBackendUrl: (url: string) => void
}

const useBackendStore = create<BackendStore>((set) => ({
  backendUrl: localStorage.getItem("backendUrl") ?? "http://localhost:5001",
  setBackendStatus: (status: BackendStatus) => set({ backendStatus: status }),
  setBackendUrl: (url: string) => set({ backendUrl: url }),
}))

export function useBackend() {
  const { backendUrl, setBackendUrl, backendStatus, setBackendStatus } =
    useBackendStore()

  function onBackendChange(newBackendUrl: string) {
    localStorage.setItem("backendUrl", newBackendUrl)
    setBackendUrl(newBackendUrl)
  }

  async function testBackend(url: string): Promise<BackendStatus> {
    try {
      const res = await fetch(`${url}/health`)

      if (!res.ok) {
        return "error"
      }

      return "healthy"
    } catch (error) {
      return "error"
    }
  }

  useEffect(() => {
    if (!backendUrl) {
      return
    }

    setBackendStatus("loading")

    testBackend(backendUrl).then((status) => {
      setBackendStatus(status)
    })
  }, [backendUrl])

  return {
    backendUrl,
    onBackendChange,
    testBackend,
    backendStatus,
  }
}
