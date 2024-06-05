import { useQuery } from "@tanstack/react-query"
import { useBackend } from "../hooks/use-backend"
import { CircleNotch } from "@phosphor-icons/react"
import clsx from "clsx"
import { PredictionResponse } from "../types"

export interface PredictionItemProps {
  file: File
}

const classificationLabels = {
  healthy: "Saudável",
  bleached: "Branqueado",
}

export function PredictionItem({ file }: PredictionItemProps) {
  const { api } = useBackend()

  const { refetch } = useQuery({
    queryKey: ["predictions"],
  })

  const {
    data: queryData,
    isLoading,
    error,
  } = useQuery<PredictionResponse>({
    queryKey: ["predict", file.name],
    queryFn: async () => {
      const formData = new FormData()
      formData.append("image", file)

      const res = await api.post("/predict", formData)

      refetch()

      return res.data
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    retry: false,
  })

  return (
    <div
      className={clsx(
        "flex items-center justify-between gap-4 overflow-hidden rounded-md border border-slate-800 pr-10",
        "bg-gradient-to-r from-transparent from-50% to-[150%] duration-1000 animate-in fade-in slide-in-from-bottom-4",
        { "to-red-950": error },
        { "to-teal-950": queryData?.prediction === "healthy" },
        { "to-pink-950": queryData?.prediction === "bleached" },
      )}
    >
      <div className="flex items-center gap-6">
        <img
          src={URL.createObjectURL(file)}
          alt=""
          className="h-16 w-20 object-cover"
        />

        <p className="text-sm font-medium">{file.name}</p>
      </div>

      {isLoading && (
        <CircleNotch className="h-6 w-6 animate-spin" weight="bold" />
      )}

      {error && (
        <p className="text-sm font-medium text-red-500">Algo deu errado.</p>
      )}

      {queryData && (
        <div className="flex items-center gap-3">
          <p className="text-sm font-medium text-slate-500 duration-1000 animate-in fade-in">
            {queryData.confidence * 100}% de confiança
          </p>

          <p
            className={clsx(
              "text-base font-bold duration-700",
              "animate-in fade-in slide-in-from-right-4",
              queryData.prediction === "healthy"
                ? "text-teal-400"
                : "text-pink-400",
            )}
          >
            {classificationLabels[queryData.prediction] || queryData.prediction}
          </p>
        </div>
      )}
    </div>
  )
}
