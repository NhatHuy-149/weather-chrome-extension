import React, { useState, useEffect } from "react"
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material"
import {
  getOpenWeatherData,
  OpenWeatherData,
  OpenWeatherTempScale,
} from "../utilities/weatherApi/api"

const WeatherCardContainer: React.FC<{
  children: React.ReactNode
  onDelete?: () => void
}> = ({ children, onDelete }) => {
  return (
    <Card>
      <CardContent>{children}</CardContent>
      {onDelete && (
        <CardActions>
          <Button onClick={onDelete}>Delete</Button>
        </CardActions>
      )}
    </Card>
  )
}

type WeatherCardState = "loading" | "error" | "ready"

const WeatherCard: React.FC<{
  city: string
  tempScale: OpenWeatherTempScale
  onDelete?: () => void
}> = ({ city, tempScale, onDelete }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null)
  const [cardState, setCardState] = useState<WeatherCardState>("loading")

  useEffect(() => {
    getOpenWeatherData(city, tempScale)
      .then((data) => {
        setWeatherData(data)
        setCardState("ready")
      })
      .catch((err) => {
        console.log({ err })
        setCardState("error")
      })
  }, [city, tempScale])

  if (!weatherData) return <div>loading ...</div>

  if (cardState === "loading" || cardState === "error") {
    return (
      <WeatherCardContainer>
        <Typography variant="body1">
          {cardState === "loading"
            ? "Loading..."
            : "Error: Could not retrive weather data for this city"}
        </Typography>
      </WeatherCardContainer>
    )
  }
  return (
    <WeatherCardContainer onDelete={onDelete} my="16px">
      <Typography variant="h5">{weatherData.name}</Typography>
      <Typography variant="body1">
        {Math.round(weatherData.main.temp)}
      </Typography>
      <Typography variant="body1">
        Feels like:{Math.round(weatherData.main.feels_like)}
      </Typography>
    </WeatherCardContainer>
  )
}

export default WeatherCard
