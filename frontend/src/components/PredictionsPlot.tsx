import { ImagesResponse } from "../types"
import { UseQueryResult } from "@tanstack/react-query"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

export interface PredictionsPlotProps {
  query: UseQueryResult<ImagesResponse[], Error>
}

export function PredictionsPlot({ query }: PredictionsPlotProps) {
  const data =
    query.data?.map((prediction) => ({
      date: new Date(prediction.date),
      prediction: prediction.classification,
    })) || []

  const days = data.reduce(
    (acc, curr) => {
      const date = curr.date.toISOString().split("T")[0]

      const value = curr.prediction

      const index = acc.findIndex((item) => item.date === date)

      if (index === -1) {
        acc.push({
          date: date,
          Saudável: value === "healthy" ? 1 : 0,
          Branqueado: value === "bleached" ? 1 : 0,
        })
      } else {
        acc[index]["Saudável"] += value === "healthy" ? 1 : 0
        acc[index]["Branqueado"] += value === "bleached" ? 1 : 0
      }

      return acc
    },
    [] as { date: string; Saudável: number; Branqueado: number }[],
  )

  days.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })

  return (
    <div className="flex h-96 w-full flex-col gap-6">
      <h2 className="text-xl font-semibold text-gray-200">Histórico</h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={days || []}>
          <XAxis
            dataKey="date"
            className="stroke-gray-400"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            className="stroke-gray-400"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />

          <CartesianGrid className="stroke-slate-800" strokeDasharray="5 5" />

          <Line type="natural" dataKey="Saudável" stroke="#14b8a6" />
          <Line type="natural" dataKey="Branqueado" stroke="#ec4899" />

          <Tooltip contentStyle={{ backgroundColor: "#0f172a" }} />

          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
