import { X } from "@phosphor-icons/react"
import { useBackend } from "../hooks/use-backend"
import { UseQueryResult } from "@tanstack/react-query"

import clsx from "clsx"
import { ImagesResponse } from "../types"

export interface PredictionsGalleryProps {
  query: UseQueryResult<ImagesResponse[], Error>
}

export function PredictionsGallery({ query }: PredictionsGalleryProps) {
  const { api, backendUrl } = useBackend()

  async function handleDelete(path: string) {
    await api.delete(path)
    query.refetch()
  }

  if (query.isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="flex h-64 w-full animate-pulse flex-col items-center justify-center rounded-lg bg-gray-900 sm:h-72 lg:h-80"
          ></div>
        ))}
      </div>
    )
  }

  if (query.error) {
    return (
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-gray-200">
          Predições recentes
        </h2>

        <span className="font-medium text-rose-500">
          Algo deu errado! Não foi possível carregar as predições.
        </span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-gray-200">
        Predições recentes
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {query.data?.map((prediction) => (
          <div
            key={prediction.url}
            className={clsx(
              "flex flex-col items-center justify-center rounded-lg bg-gray-900",
              "animate-in fade-in slide-in-from-bottom-4",
            )}
          >
            <img
              src={`${backendUrl}${prediction.url}`}
              alt={`Imagem de coral ${prediction.classification}`}
              className="h-64 w-full rounded-t-lg object-cover"
            />

            <div
              className={clsx(
                "relative w-full rounded-b-lg p-4",
                "bg-gradient-to-t from-transparent",
                { "to-teal-950": prediction.classification === "healthy" },
                { "to-pink-950": prediction.classification === "bleached" },
              )}
            >
              <h3
                className={clsx(
                  "text-lg font-semibold animate-in fade-in",
                  { "text-teal-400": prediction.classification === "healthy" },
                  { "text-pink-400": prediction.classification === "bleached" },
                )}
              >
                {prediction.classification === "healthy"
                  ? "Recife saudável"
                  : "Recife branqueado"}
              </h3>

              <span className="text-sm text-gray-400">
                {new Date(prediction.date).toLocaleString("pt-BR")}
              </span>

              <button
                className="absolute right-4 top-4 text-gray-500 transition-colors duration-300 hover:text-red-500"
                onClick={() => handleDelete(prediction.url)}
              >
                <X className="h-4 w-4" weight="bold" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
