import { BackendStatus } from "../hooks/use-backend"
import clsx from "clsx"

export interface BackendStatusTagProps {
  status: BackendStatus
  customMessage?: string
  showBackground?: boolean
}

const DEFAULT_MESSAGES: Record<BackendStatus, string> = {
  healthy: "Backend operacional",
  error: "Erro no backend",
  loading: "Testando backend...",
}

export function BackendStatusTag({ status, ...props }: BackendStatusTagProps) {
  const message = props.customMessage ?? DEFAULT_MESSAGES[status]
  const showBackground = props.showBackground ?? true

  return (
    <div
      className={clsx(
        "flex w-max items-center gap-2 rounded-full px-4 py-2",
        showBackground && "border border-slate-800 bg-slate-900",
      )}
    >
      <div className="relative">
        <div
          className={clsx(
            "absolute h-[10px] w-[10px] animate-ping rounded-full transition-colors",
            {
              "bg-teal-500": status === "healthy",
              "bg-rose-500": status === "error",
              "bg-gray-500": status === "loading",
            },
          )}
        ></div>

        <div
          className={clsx("h-[10px] w-[10px] rounded-full transition-colors", {
            "bg-teal-500": status === "healthy",
            "bg-rose-500": status === "error",
            "bg-gray-500": status === "loading",
          })}
        ></div>
      </div>

      <span
        className={clsx("text-sm font-semibold", {
          "text-teal-500": status === "healthy",
          "text-rose-500": status === "error",
          "text-gray-500": status === "loading",
        })}
      >
        {message}
      </span>
    </div>
  )
}
