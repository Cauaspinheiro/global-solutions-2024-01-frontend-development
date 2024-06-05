import { Link } from "react-router-dom"

export function LandingPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-blue-900">
      <h1 className="text-5xl font-semibold text-white">
        Global Solutions 2024
      </h1>
      <span className="mt-4 text-xl font-medium text-white">Blue Ocean</span>

      <Link
        to="/dashboard"
        className="mt-8 rounded-md bg-white px-4 py-2 font-medium text-blue-900 transition-colors hover:bg-blue-100"
      >
        Ir para o Dashboard
      </Link>
    </div>
  )
}
