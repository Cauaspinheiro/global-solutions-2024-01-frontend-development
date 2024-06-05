import { BackendDialog } from "../../components/BackendDialog"
import { DropzoneInput } from "../../components/DropzoneInput"

export function DashboardPage() {
  return (
    <div className="min-h-screen w-full bg-gray-950 px-4 py-16 text-gray-50">
      <div className="container mx-auto flex flex-col gap-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Dashboard</h1>

          <BackendDialog />
        </div>

        <DropzoneInput />
      </div>
    </div>
  )
}
