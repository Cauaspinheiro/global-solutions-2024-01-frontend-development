import { BackendDialog } from "../../components/BackendDialog"
import { DropzoneInput } from "../../components/DropzoneInput"
import { PredictionsGallery } from "../../components/PredictionsGallery"
import { useQuery } from "@tanstack/react-query"
import { useBackend } from "../../hooks/use-backend"
import { ImagesResponse } from "../../types"
import { PredictionsPlot } from "../../components/PredictionsPlot"

export function DashboardPage() {
  const { api } = useBackend()

  const predictions = useQuery<ImagesResponse[]>({
    queryKey: ["predictions"],
    queryFn: async () => {
      const res = await api.get("/images")

      const data = res.data

      data.sort((a: ImagesResponse, b: ImagesResponse) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })

      return data
    },
  })

  return (
    <div className="min-h-screen w-full bg-gray-950 px-4 py-16 text-gray-50">
      <div className="container mx-auto flex flex-col gap-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Dashboard</h1>

          <BackendDialog />
        </div>

        <DropzoneInput />

        <PredictionsPlot query={predictions} />

        <PredictionsGallery query={predictions} />
      </div>
    </div>
  )
}
