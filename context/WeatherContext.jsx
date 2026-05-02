import { createContext, use, useContext, useEffect, useState } from "react"

import { getWeatherData } from "../services/weatherService"

import { getLocation } from "../services/getLocation"

const WeatherContext = createContext()

export const WeatherProvider = ({ children }) => {
    const [location, setLocation] = useState('Montevideo')
    const [timezone, setTimezone] = useState(null)
    const [language, setLanguage] = useState('es')

    const [weatherData, setWeatherData] = useState(null)
    const [loadingWeather, setLoadingWeather] = useState(true)
    const [error, setError] = useState(null)

    const getCurrentLocation = async () => {
        const locationData = await getLocation()
        setLocation(locationData.location)
        setTimezone(locationData.timezone)
    }

    const fetchWeatherData = async (location, timezone, language) => {
        try {
            setLoadingWeather(true)

            const data = await getWeatherData(location, language)
            setWeatherData(data)
        } catch (error) {
            setError(error)
        } finally {
            setLoadingWeather(false)
        }
    }

    useEffect(() => {
        getCurrentLocation()
    }, [])

    useEffect(() => {
        if (!location) return

        fetchWeatherData(location, language)
    }, [location, language])

    return (
        <WeatherContext.Provider
            value={{
                weatherData,
                loadingWeather,
                error,
                location,
                timezone,
                language,
                setLocation
            }}>
            {children}
        </WeatherContext.Provider>
    )
}

export const useWeather = () => useContext(WeatherContext)