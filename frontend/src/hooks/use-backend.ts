import { useEffect, useMemo } from "react"
import { create } from "zustand"
import axios from "axios"

export type BackendStatus = "loading" | "healthy" | "error"

interface BackendStore {
  backendUrl: string
  backendStatus: BackendStatus
  setBackendStatus: (status: BackendStatus) => void
  setBackendUrl: (url: string) => void
}

const useBackendStore = create<BackendStore>((set) => ({
  backendUrl: localStorage.getItem("backendUrl") ?? "http://localhost:5001",
  backendStatus: "loading",
  setBackendStatus: (status: BackendStatus) => set({ backendStatus: status }),
  setBackendUrl: (url: string) => set({ backendUrl: url }),
}))

export function useBackend() {
  const { backendUrl, setBackendUrl, backendStatus, setBackendStatus } =
    useBackendStore()

  function onBackendChange(newBackendUrl: string) {
    localStorage.setItem("backendUrl", newBackendUrl)

    setBackendUrl(newBackendUrl)
    setBackendStatus("loading")

    testBackend(newBackendUrl).then((status) => {
      setBackendStatus(status)
    })
  }

  const api = useMemo(() => axios.create({ baseURL: backendUrl }), [backendUrl])

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
    testBackend(backendUrl).then((status) => {
      setBackendStatus(status)
    })
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      testBackend(backendUrl).then((status) => {
        setBackendStatus(status)
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [backendUrl])

  return {
    backendUrl,
    onBackendChange,
    testBackend,
    backendStatus,
    api,
  }
}
