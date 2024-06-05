import * as DialogPrimitive from "@radix-ui/react-dialog"
import clsx from "clsx"
import { X } from "@phosphor-icons/react"
import { useState } from "react"
import { BackendStatus, useBackend } from "../hooks/use-backend"
import { z } from "zod"
import { BackendStatusTag } from "./BackendStatusTag"

const backendUrlSchema = z.string().url()

export function BackendDialog() {
  const { testBackend, onBackendChange, backendUrl, backendStatus } =
    useBackend()

  const [inputMessage, setInputMessage] = useState("")
  const [validUrl, setValidUrl] = useState("")
  const [inputStatus, setInputStatus] = useState<BackendStatus>()
  const [open, setOpen] = useState(false)

  function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newBackendUrl = event.target.value

    try {
      backendUrlSchema.parse(newBackendUrl)

      setInputMessage("Testando backend...")
      setInputStatus("loading")

      testBackend(newBackendUrl).then((status) => {
        setInputMessage(
          status === "healthy" ? "Backend saudável" : "Erro no backend",
        )
        setInputStatus(status)

        if (status === "healthy") {
          setValidUrl(newBackendUrl)
        }
      })
    } catch (error) {
      setInputMessage("URL inválida")
      setInputStatus("error")
    }
  }

  async function handleSaveValidUrl() {
    onBackendChange(validUrl)
    setOpen(false)
  }

  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(newOpen) => {
        if (!newOpen) {
          setInputMessage("")
          setInputStatus(undefined)
        }

        setOpen(newOpen)
      }}
    >
      <DialogPrimitive.Trigger>
        <BackendStatusTag status={backendStatus} />
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={clsx(
            "fixed inset-0 z-50 bg-black/80",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
          )}
        />

        <DialogPrimitive.Content
          className={clsx(
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-xl translate-x-[-50%] translate-y-[-50%] gap-4",
            "border border-gray-900 bg-neutral-950 p-6 shadow-lg duration-200 sm:rounded-lg",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
          )}
        >
          <DialogPrimitive.Title className="text-lg font-semibold">
            Definir URL do Backend
          </DialogPrimitive.Title>

          <DialogPrimitive.Description className="text-sm font-medium text-gray-200">
            Precisamos que você defina a URL do backend para continuar. Isso
            serve para que possamos rodar o código do backend e fazer as
            requisições necessárias.
          </DialogPrimitive.Description>

          <div className="flex flex-col gap-3">
            <div className="flex w-full gap-2">
              <input
                type="text"
                className="bg-neutral w-full rounded-md border border-neutral-900 px-4 py-2 text-gray-200 outline-none transition-colors focus:border-blue-900"
                placeholder="URL do backend"
                onChange={onInputChange}
                defaultValue={backendUrl}
              />

              <button
                className="rounded-md bg-blue-800 px-6 py-2 font-medium text-white transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                onClick={handleSaveValidUrl}
                disabled={inputStatus !== "healthy" && !!inputMessage}
              >
                Definir
              </button>
            </div>

            {inputStatus && (
              <BackendStatusTag
                status={inputStatus}
                customMessage={inputMessage}
                showBackground={false}
              />
            )}
          </div>

          <DialogPrimitive.Close className="absolute right-4 top-4 text-gray-500 transition-colors hover:text-gray-400">
            <X className="w-4" weight="bold" />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
