import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom/client"
import WeatherCard from "../WeatherCard"
import {
  getStoredOptions,
  LocalStorageOptions,
} from "../utilities/storage/storage"
import { Card } from "@mui/material"
import "./contentScript.css"

const App: React.FC = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null)
  
  const [isActive, setIsActive] = useState<boolean>(false)

  useEffect(() => {
    getStoredOptions().then((options) => {
      setOptions(options)
      setIsActive(options.hasAutoOverlay)
    })
  }, [])

  if (!options) {
    return null
  }

  return (
    <>
      {isActive && (
        <Card className="overlayCard">
          <WeatherCard
            city={options.homeCity}
            tempScale={options.tempScale}
            onDelete={() => setIsActive(false)}
          />
        </Card>
      )}
    </>
  )
}

const rootElement = document.createElement("div")
document.body.appendChild(rootElement)

const root = ReactDOM.createRoot(rootElement) // ✅ React 18+
root.render(<App />)
