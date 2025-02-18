import {
  Box,
  Button,
  Card,
  CardContent,
  Grid2,
  Switch,
  TextField,
  Typography,
} from "@mui/material"
import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom/client"
import {
  getStoredOptions,
  LocalStorageOptions,
  setStoredOptions,
} from "../utilities/storage/storage"

type FormState = "ready" | "saving"

const App: React.FC = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null)
  const [formState, setFormState] = useState<FormState>("ready")

  const handleHomeCityChange = (homeCity: string) => {
    const updatedOptions: LocalStorageOptions = {
      ...options,
      homeCity: homeCity,
    }
    setOptions(updatedOptions)
  }

  const handleOverlayToggleSwitch = (hasAutoOverlay: boolean) => {
    const updatedOptions: LocalStorageOptions = {
      ...options,
      hasAutoOverlay,
    }
    setOptions(updatedOptions)
  }

  const handleSaveButtonClick = () => {
    setFormState("saving")
    setStoredOptions(options).then(() => {
      setTimeout(() => {
        setFormState("ready")
      }, 1000)
    })
  }



  useEffect(() => {
    getStoredOptions().then((options) => setOptions(options))
  }, [])

  if (!options) {
    return null
  }

  const isFieldsDisabled = formState === "saving"

  return (
    <Box>
      <Card>
        <CardContent>
          <Grid2 container direction="column" spacing={4}>
            <Grid2>
              <Typography variant="h4">Weather Extension Options</Typography>
            </Grid2>
            <Grid2>
              <Typography variant="body1">Home city name</Typography>
              <TextField
                fullWidth
                placeholder="Enter a home city name"
                onChange={(e: any) => {
                  handleHomeCityChange(e.target.value)
                }}
                disabled={isFieldsDisabled}
              />
            </Grid2>
            <Grid2>
              <Typography variant="body1">
                Auto toggle overlay on webpage load
              </Typography>
              <Switch
                color="primary"
                checked={options.hasAutoOverlay}
                onChange={(e: any, checked: boolean) => {
                  handleOverlayToggleSwitch(checked)
                }}
                disabled={isFieldsDisabled}
              />
            </Grid2>
            <Grid2>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  handleSaveButtonClick()
                }}
              >
                {formState === "ready" ? "Save" : "Saving..."}
              </Button>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>
    </Box>
  )
}

const rootElement = document.createElement("div")
document.body.appendChild(rootElement)

const root = ReactDOM.createRoot(rootElement) // ✅ React 18+
root.render(<App />)
