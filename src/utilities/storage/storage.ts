import { OpenWeatherTempScale } from "../weatherApi/api"

export interface LocalStorage {
  cities?: string[]
  options?: LocalStorageOptions
}

export interface LocalStorageOptions {
  tempScale: OpenWeatherTempScale
  homeCity: string
  hasAutoOverlay:boolean
}

export type LocalStorageKey = keyof LocalStorage

export function setStoredCities(cities: string[]): Promise<void> {
  const vals: LocalStorage = { cities }

  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve()
    })
  })
}

export function getStoredCities(): Promise<string[]> {
  const keys: LocalStorageKey[] = ["cities"]

  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.cities)
    })
  })
}

export function setStoredOptions(options: LocalStorageOptions): Promise<void> {
  const vals: LocalStorage = {
    options,
  }

  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve()
    })
  })
}

export function getStoredOptions(): Promise<LocalStorageOptions> {
  const keys: LocalStorageKey[] = ["options"]

  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res) => {
      resolve(res.options)
    })
  })
}
