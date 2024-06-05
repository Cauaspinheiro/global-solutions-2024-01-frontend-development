import { BackendStatus } from "../hooks/use-backend"
import clsx from "clsx"

export interface BackendStatusTagProps {
  status: BackendStatus
  customMessage?: string
}

const DEFAULT_MESSAGES: Record<BackendStatus, string> = {
  healthy: "Backend saudável",
  error: "Erro no backend",
  loading: "Testando backend...",
}

export function BackendStatusTag({
  status,
  customMessage,
}: BackendStatusTagProps) {
  const message = customMessage ?? DEFAULT_MESSAGES[status]

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div
          className={clsx(
            "absolute h-[10px] w-[10px] animate-ping rounded-full transition-colors",
            {
              "bg-green-500": status === "healthy",
              "bg-red-500": status === "error",
              "bg-gray-500": status === "loading",
            },
          )}
        ></div>

        <div
          className={clsx("h-[10px] w-[10px] rounded-full transition-colors", {
            "bg-green-500": status === "healthy",
            "bg-red-500": status === "error",
            "bg-gray-500": status === "loading",
          })}
        ></div>
      </div>

      <span
        className={clsx("text-sm font-semibold", {
          "text-green-500": status === "healthy",
          "text-red-500": status === "error",
          "text-gray-500": status === "loading",
        })}
      >
        {message}
      </span>
    </div>
  )
}
