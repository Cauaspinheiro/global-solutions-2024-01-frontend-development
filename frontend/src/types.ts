export interface PredictionResponse {
  prediction: "healthy" | "bleached"
  confidence: number
}

export interface ImagesResponse {
  classification: "healthy" | "bleached"
  date: string
  url: string
}
