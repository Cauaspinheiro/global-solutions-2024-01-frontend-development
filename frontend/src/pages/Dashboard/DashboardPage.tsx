import { BackendDialog } from "../../components/BackendDialog"

export function DashboardPage() {
  return (
    <div className="min-h-screen w-full bg-gray-950 py-16 text-gray-50">
      <div className="container mx-auto flex flex-col">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Dashboard</h1>

          <BackendDialog />
        </div>

        <div></div>
      </div>
    </div>
  )
}
