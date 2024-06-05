import { useDropzone } from "react-dropzone"
import clsx from "clsx"

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
          "flex h-[50vh] max-h-[400px] w-full cursor-pointer items-center justify-center gap-3 p-10",
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

      <ul>
        {acceptedFiles.map((file) => (
          <li key={file.name}>
            {file.name} - {file.size} bytes
          </li>
        ))}
      </ul>
    </div>
  )
}
