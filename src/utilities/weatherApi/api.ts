const OPEN_WEATHER_API_KEY = "3b3e27d8d76564557749a449fc3bd621"

export interface OpenWeatherData {
  name: string
  main: {
    feels_like: number
    humidity: number
    pressure: number
    temp: number
    temp_max: number
    temp_min: number
  }
  weather: {
    description: string
    icon: string
    id: number
    main: string
  }[]
  wind: {
    deg: number
    speed: string
  }
}

export type OpenWeatherTempScale = "metric" | "imperial"

export async function getOpenWeatherData(
  city: string,tempScale:OpenWeatherTempScale
): Promise<OpenWeatherData> {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${tempScale}&appid=${OPEN_WEATHER_API_KEY}`
  )

  console.log({ res })

  if (!res.ok) {
    throw new Error("City not found")
  }
  const data: OpenWeatherData = await res.json()
  return data
}
