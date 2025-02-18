import { setStoredCities, setStoredOptions } from "../utilities/storage/storage";

chrome.runtime.onInstalled.addListener(() => { 
    setStoredCities([]),
    setStoredOptions({
        tempScale:'metric',
        homeCity:'',
        hasAutoOverlay:false
    })
 })