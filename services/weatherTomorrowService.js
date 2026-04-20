const baseUrlTomorrow = process.env.EXPO_PUBLIC_BASE_URL_TOMORROW
const apiKeyTomorrow = process.env.EXPO_PUBLIC_TOMORROW_API_KEY

const baseUrlOpenCage = process.env.EXPO_PUBLIC_BASE_URL_OPENCAGE
const apiKeyOpenCage = process.env.EXPO_PUBLIC_OPENCAGE_API_KEYs

import forecastTomorrowMock from '../TomorrowIO.json'

export const getWeatherTomorrowData = async (location, language) => {
    const { coords } = location

    // LLAMADA A LA API
    /* const res = await fetch(`${baseUrlTomorrow}forecast?location=${coords.latitude},${coords.longitude}&apikey=${apiKeyTomorrow}`)
    const data = await res.json()
    const geoRes = await fetch(`${baseUrlOpenCage}?q=${coords.latitude}%2C+${coords.longitude}&key=${apiKeyOpenCage}`)
    const geoData = await geoRes.json() */

    // UTILIZACIÓN DEL MOCK
    const data = forecastTomorrowMock
    const geoData = geoDataTomorrowMock

    const locationData = {
        city: geoData.components.city,
        suburb: geoData.components.suburb,
        temperature: Math.round(data.timelines.minutely.values.temperature),
        condition: data.current.condition.text,
        maxTemp: Math.round(data.forecast.forecastday[0].day.maxtemp_c),
        minTemp: Math.round(data.forecast.forecastday[0].day.mintemp_c)
    }

    const weatherData = {
        locationData,
        hourlyForecast,
        isDay,
        forecastCollection,
        currentConditions,
        barData,
        generalData
    }

    return weatherData
}