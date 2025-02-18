import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom/client"
import WeatherCard from "../WeatherCard"
import "@fontsource/roboto"
import { Box, Grid2, IconButton, InputBase, Paper } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import PictureInPictureIcon from '@mui/icons-material/PictureInPicture';
import {
  getStoredCities,
  getStoredOptions,
  LocalStorageOptions,
  setStoredCities,
  setStoredOptions,
} from "../utilities/storage/storage"

const App: React.FC = () => {
  const [cities, setCities] = useState<string[]>(["Toronto", "London"])
  const [cityInput, setCityInput] = useState<string>("")
  const [options, setOptions] = useState<LocalStorageOptions | null>(null)

  useEffect(() => {
    getStoredCities().then((cities) => setCities(cities))
    getStoredOptions().then((options) => setOptions(options))
  }, [])

  const handleCityButtonClick = () => {
    if (cityInput.length > 0) {
      const updateCities = [...cities, cityInput]
      setStoredCities(updateCities).then(() => {
        setCities(updateCities)
        setCityInput("")
      })
    }
  }

  const handleOverlayButtonClick = () => { 
    
   }

  const handleCityButtonDelete = (index: number) => {
    cities?.splice(index, 1)
    const updateCities = [...cities]
    setStoredCities(updateCities).then(() => {
      setCities(updateCities)
    })
  }

  const handleTempScaleButtonClick = () => {
    const updateOptions: LocalStorageOptions = {
      ...options,
      tempScale: options.tempScale === "metric" ? "imperial" : "metric",
    }

    setStoredOptions(updateOptions).then(() => {
      setOptions(updateOptions)
    })
  }

  if (!options) {
    return null
  }

  return (
    <Box mx="8px" my="16px" sx={{ minWidth: 275 }}>
      <Grid2 container>
        <Grid2>
          <Paper>
            <Box px="15px" py="5px">
              <InputBase
                placeholder="Add a city name"
                value={cityInput}
                onChange={(e: any) => setCityInput(e.target.value)}
              />
              <IconButton onClick={() => handleCityButtonClick()}>
                <AddIcon />
              </IconButton>
              <IconButton onClick={() => handleOverlayButtonClick()}>
                <PictureInPictureIcon />
              </IconButton>
            </Box>
          </Paper>
        </Grid2>
        <Grid2>
          <Box px="15px" py="5px">
            <IconButton onClick={() => handleTempScaleButtonClick()}>
              {options.tempScale === "metric" ? "\u2103" : "\u2109"}
            </IconButton>
          </Box>
        </Grid2>
      </Grid2>
      {options.homeCity && (
        <WeatherCard
          city={options.homeCity}
          tempScale={options.tempScale}
        />
      )}
      {cities.map((city: string, index: number) => (
        <WeatherCard
          key={index}
          city={city}
          tempScale={options.tempScale}
          onDelete={() => handleCityButtonDelete(index)}
        />
      ))}
    </Box>
  )
}

const rootElement = document.createElement("div")
document.body.appendChild(rootElement)

const root = ReactDOM.createRoot(rootElement) // ✅ React 18+
root.render(<App />)
