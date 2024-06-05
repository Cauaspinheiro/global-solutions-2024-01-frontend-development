import { ArrowDown, Waves } from "@phosphor-icons/react"
import { Link } from "react-router-dom"

export function LandingPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-950">
      <header className="fixed top-0 z-20 w-full bg-slate-900/75 py-4 shadow-sm shadow-black/30 backdrop-blur">
        <div className="container mx-auto flex items-stretch px-4">
          <div className="flex w-1/3">
            <a href="#" className="w-max">
              <Waves className="h-8 w-8 text-blue-200" />
            </a>
          </div>

          <div className="flex w-1/3 items-center justify-center gap-10">
            <a
              href="#blue-future"
              className="w-max px-2 text-sm font-semibold text-slate-50 transition-colors hover:text-slate-300"
            >
              Blue Future
            </a>

            <a
              href="#ocean-health"
              className="w-max px-2 text-sm font-semibold text-slate-50 transition-colors hover:text-slate-300"
            >
              Ocean Health
            </a>

            <a
              href="#dashboard"
              className="w-max px-2 text-sm font-semibold text-slate-50 transition-colors hover:text-slate-300"
            >
              Dashboard
            </a>
          </div>

          <div className="flex w-1/3 items-center justify-end">
            <Link
              to="/dashboard"
              className="flex h-full w-36 items-center justify-center rounded-md bg-slate-100 text-sm font-semibold text-slate-900 transition-colors duration-300 ease-in-out hover:bg-slate-300"
            >
              Entrar
            </Link>
          </div>
        </div>
      </header>

      <section className="relative flex h-dvh w-full flex-col justify-center">
        <img
          src="/landing.jpg"
          alt=""
          className="animate-bg-pulse absolute z-0 h-full w-full select-none object-cover brightness-75 filter"
        />

        <div className="container z-10 mx-auto flex flex-col gap-16 px-4">
          <div className="flex flex-col gap-2">
            <h1 className="max-w-48 text-6xl font-bold uppercase leading-tight text-slate-50 md:text-8xl">
              Global Solution
            </h1>

            <p className="text-2xl font-medium text-slate-100">
              Preservando os oceanos por meio da tecnologia
            </p>
          </div>

          <a
            href="#blue-future"
            className="flex w-max cursor-pointer items-center gap-4 transition-transform duration-300 ease-in-out hover:translate-y-1"
          >
            <div className="relative flex h-16 w-16">
              <div className="z-10 flex h-full w-full items-center justify-center rounded-full border-2 border-blue-500 bg-blue-700">
                <ArrowDown className="h-7 w-7 text-blue-100" />
              </div>

              <div className="absolute z-0 h-16 w-16 animate-ping rounded-full bg-blue-900 opacity-40"></div>
            </div>

            <span className="text-2xl font-medium text-slate-100">
              Descubra mais
            </span>
          </a>
        </div>
      </section>

      <section className="relative flex min-h-screen" id="blue-future">
        <img
          src="blue-future-bg.svg"
          alt=""
          className="absolute z-0 h-full w-full animate-pulse select-none object-cover"
        />
      </section>

      <section
        className="relative flex min-h-screen bg-slate-900"
        id="ocean-health"
      >
        <img
          src="ocean-health-bg.svg"
          alt=""
          className="absolute z-0 h-full w-full animate-pulse select-none object-cover"
        />
      </section>

      <section className="relative flex min-h-screen" id="dashboard">
        <img
          src="dashboard-bg.svg"
          alt=""
          className="absolute z-0 h-full w-full animate-pulse select-none object-cover"
        />
      </section>

      <footer className="w-full border-t border-slate-800 bg-slate-900 py-6">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Waves className="h-6 w-6 text-blue-200" />

            <span className="font-semibold text-slate-100">
              Copyright © {new Date().getFullYear()}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-100">
              Em colaboração com
            </span>

            <img src="fiap.svg" alt="FIAP" />
          </div>
        </div>
      </footer>
    </div>
  )
}
