import { useState } from "react"
import { useBackend } from "../../hooks/use-backend"
import { BackendDialog } from "../../components/BackendDialog"

export function DashboardPage() {
  const { backendUrl, backendStatus } = useBackend()

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="min-h-screen w-full bg-gray-950 py-16 text-gray-50">
      <div className="container mx-auto flex flex-col">
        <h1 className="text-2xl font-semibold">Dashboard</h1>

        <div className="mt-8">
          <h2 className="text-lg font-semibold">Backend</h2>
          <p>URL: {backendUrl}</p>

          <p>Status: {backendStatus}</p>

          <BackendDialog
            isOpen={isDialogOpen}
            onOpenChange={(open) => setIsDialogOpen(open)}
          />
        </div>
      </div>
    </div>
  )
}
