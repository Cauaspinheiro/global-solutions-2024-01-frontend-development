import { useDropzone } from "react-dropzone"
import clsx from "clsx"
import { PredictionItem } from "./PredictionItem"

export function DropzoneInput() {
  const {
    getRootProps,
    getInputProps,

    isDragAccept,
    isDragReject,

    acceptedFiles,
    fileRejections,
  } = useDropzone({
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
  })

  function getInputMessage() {
    if (isDragReject) {
      return "Arquivo inválido"
    }

    if (isDragAccept) {
      return "Solte o arquivo"
    }

    return "Arraste e solte as fotos de corais aqui, ou clique para selecionar os arquivos"
  }

  return (
    <div className="flex flex-col gap-4">
      <div
        className={clsx(
          "flex h-[40vh] max-h-[400px] min-h-max w-full cursor-pointer items-center justify-center gap-3 p-10",
          "group rounded-lg border-2 border-dashed transition-all duration-300 focus:border-2 focus:border-blue-900 focus:outline-none",
          {
            "border-teal-700 bg-teal-950 text-white": isDragAccept,
            "border-rose-700 bg-rose-950 text-rose-300": isDragReject,
            "border-slate-800 bg-gray-950 text-gray-500 opacity-75 hover:border-blue-900 hover:text-gray-400 hover:opacity-100":
              !isDragAccept && !isDragReject,
          },
        )}
        {...getRootProps()}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center justify-center gap-4">
          <img
            src="/coral.jpg"
            alt=""
            className={clsx(
              "w-64 rounded-lg border border-gray-700 opacity-40 grayscale filter transition duration-300",
              "group-hover:opacity-70 group-hover:grayscale-0",
              isDragAccept && "opacity-70 grayscale-0",
            )}
          />

          <p className="h-10 max-w-80 text-center font-medium leading-relaxed">
            {getInputMessage()}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-7">
        {!!acceptedFiles.length && (
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-gray-100">Arquivos aceitos:</h3>

            <div className="flex flex-col gap-3 text-sm font-medium">
              {acceptedFiles.map((file) => (
                <PredictionItem key={file.name} file={file} />
              ))}
            </div>
          </div>
        )}

        {!!fileRejections.length && (
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-gray-100">
              Arquivos rejeitados:
            </h3>

            <div className="flex flex-col gap-3 text-sm font-medium">
              {fileRejections.map(({ file }) => (
                <div className="flex items-center justify-between rounded-md border border-rose-900 px-4 py-3">
                  <p className="text-sm font-medium text-rose-500">
                    {file.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
