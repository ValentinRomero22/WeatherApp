const baseUrl = process.env.EXPO_PUBLIC_BASE_URL
const apiKey = process.env.EXPO_PUBLIC_WEATHER_API_KEY

import forecastMock from '../WeatherApi.json'

import {
    hourConverter,
    timeEpochConverter,
    getWindCompleteDirection,
    getWindDirection,
    getMoonPhase
} from '../helpers/dataConverter'

export const getWeatherData = async (location, language) => {
    const { coords } = location

    // LLAMADA A LA API
    /* const res = await fetch(`${baseUrl}forecast.json?key=${apiKey}&q=${coords.latitude},${coords.longitude}&lang=${language}&days=7`)
    const data = await res.json() */

    // UTILIZACIÓN DEL MOCK
    const data = forecastMock

    const currentDate = new Date()

    const locationData = {
        city: data.location.name,
        temperature: Math.round(data.current.temp_c),
        condition: data.current.condition.text,
        maxTemp: Math.round(data.forecast.forecastday[0].day.maxtemp_c),
        minTemp: Math.round(data.forecast.forecastday[0].day.mintemp_c)
    }

    const { hourlyForecast, isDay } = getHourlyWeatherData(data, currentDate)

    const { forecastCollection, currentConditions } = getForecastCollection(data)

    const barData = getBarData(forecastCollection)

    const generalData = getGeneralData(data, isDay, currentDate)

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

const getHourlyWeatherData = (data, currentDate) => {
    const hour = String(currentDate.getHours())

    const todayForecast = data.forecast.forecastday[0].hour.slice(hour)
    const tomorrowForecast = data.forecast.forecastday[1].hour.slice(0, Number(hour) + 1)

    const sunData = [{
        type: "sunrise",
        time_epoch: timeEpochConverter(data.forecast.forecastday[0].date, data.forecast.forecastday[0].astro.sunrise),
        time: hourConverter(data.forecast.forecastday[0].date, data.forecast.forecastday[0].astro.sunrise)
    }, {
        type: "sunset",
        time_epoch: timeEpochConverter(data.forecast.forecastday[0].date, data.forecast.forecastday[0].astro.sunset),
        time: hourConverter(data.forecast.forecastday[0].date, data.forecast.forecastday[0].astro.sunset)
    }, {
        type: "sunrise",
        time_epoch: timeEpochConverter(data.forecast.forecastday[1].date, data.forecast.forecastday[1].astro.sunrise),
        time: hourConverter(data.forecast.forecastday[1].date, data.forecast.forecastday[1].astro.sunrise),
    }, {
        type: "sunset",
        time_epoch: timeEpochConverter(data.forecast.forecastday[1].date, data.forecast.forecastday[1].astro.sunset),
        time: hourConverter(data.forecast.forecastday[1].date, data.forecast.forecastday[1].astro.sunset),
    }]

    const hourlyForecast = [
        ...todayForecast,
        ...tomorrowForecast
    ]

    const currentDateToEpoch = Math.floor(currentDate.getTime() / 1000)
    const maxEpochData = currentDateToEpoch + 86400

    /* const isDay = data.forecast.forecastday[0].astro.is_sun_up */
    let isDay = true

    for (let i = 0; i < sunData.length; i++) {
        if (sunData[i].time_epoch !== null) {
            if (sunData[i].time_epoch < maxEpochData && sunData[i].time_epoch > currentDateToEpoch) {
                hourlyForecast.push(sunData[i])
            }
        }

        if (sunData[i].type === 'sunset' && currentDateToEpoch > sunData[i].time_epoch) {
            isDay = false
        }
    }

    hourlyForecast.sort((a, b) => a.time_epoch - b.time_epoch)

    return { hourlyForecast, isDay }
}

const getForecastCollection = (data) => {
    const forecastCollection = []

    for (let i = 0; i < data.forecast.forecastday.length; i++) {
        const forecastItem = {
            date: data.forecast.forecastday[i].date,
            dateEpoch: data.forecast.forecastday[i].date_epoch,
            icon: data.forecast.forecastday[i].day.condition.icon,
            condition: data.forecast.forecastday[i].day.condition.text,
            maxTemp: data.forecast.forecastday[i].day.maxtemp_c,
            minTemp: data.forecast.forecastday[i].day.mintemp_c
        }

        forecastCollection[i] = forecastItem
    }

    const windDirection = getWindCompleteDirection(data.current.wind_dir)

    const currentConditions = {
        windChill: `Sensación térmica actual de ${Math.round(data.current.feelslike_c)}°`,
        windData: `Vientos del ${windDirection.toLowerCase()} a ${data.current.wind_kph} km/h`
    }

    return { forecastCollection, currentConditions }
}

const getBarData = (forecastCollection) => {
    const allTemperatures = forecastCollection.flatMap(i => [i.minTemp, i.maxTemp])

    const globalMin = Math.round(Math.min(...allTemperatures))
    const globalMax = Math.round(Math.max(...allTemperatures))

    const barData = { globalMin: globalMin, globalMax: globalMax }

    return barData
}

const getGeneralData = (data, isDay, currentDate) => {
    let windChillDescription, visibilityDescription, nextMoonEvent = []

    if (Math.round(data.current.windchill_c) > Math.round(data.current.temp_c)) {
        windChillDescription = 'Mayor a la temperatura actual'
    } else if (Math.round(data.current.windchill_c) === Math.round(data.current.temp_c)) {
        windChillDescription = 'Idéntica a la temperatura actual'
    } else {
        windChillDescription = 'Menor a la temperatura actual'
    }

    if (data.current.vis_km >= 30) {
        visibilityDescription = 'Visibildad óptima'
    } else if (data.current.vis_km >= 10 && data.current.vis_km < 30) {
        visibilityDescription = 'Visibilidad moderada'
    } else if (data.current.vis_km >= 1 && data.current.vis_km < 10) {
        visibilityDescription = 'Visibilidad baja'
    } else {
        visibilityDescription = 'Visibildad mala'
    }

    const moonData = [{
        type: "moonrise",
        time_epoch: timeEpochConverter(data.forecast.forecastday[0].date, data.forecast.forecastday[0].astro.moonrise),
        time: hourConverter(data.forecast.forecastday[0].date, data.forecast.forecastday[0].astro.moonrise)
    }, {
        type: "moonset",
        time_epoch: timeEpochConverter(data.forecast.forecastday[0].date, data.forecast.forecastday[0].astro.moonset),
        time: hourConverter(data.forecast.forecastday[0].date, data.forecast.forecastday[0].astro.moonset)
    }, {
        type: "moonrise",
        time_epoch: timeEpochConverter(data.forecast.forecastday[1].date, data.forecast.forecastday[1].astro.moonrise),
        time: hourConverter(data.forecast.forecastday[1].date, data.forecast.forecastday[1].astro.moonrise),
    }, {
        type: "moonset",
        time_epoch: timeEpochConverter(data.forecast.forecastday[1].date, data.forecast.forecastday[1].astro.moonset),
        time: hourConverter(data.forecast.forecastday[1].date, data.forecast.forecastday[1].astro.moonset),
    }]

    const currentDateToEpoch = Math.floor(currentDate.getTime() / 1000)

    for (let i = 0; i < moonData.length; i++) {
        if (moonData[i].time_epoch !== null) {
            if (moonData[i].time_epoch > currentDateToEpoch) {
                nextMoonEvent.push(moonData[i])

                if (nextMoonEvent.length === 2) {
                    break
                }
            }
        }
    }

    const tempAverage = Math.round((data.forecast.forecastday[0].day.maxtemp_c +
        data.forecast.forecastday[1].day.maxtemp_c +
        data.forecast.forecastday[2].day.maxtemp_c) / 3)

    let averageDescription, dataAverage

    if (Math.round(data.forecast.forecastday[0].day.maxtemp_c) > tempAverage) {
        dataAverage = `+${Math.round(data.forecast.forecastday[0].day.maxtemp_c) - tempAverage}°`
        averageDescription = 'Mayor al promedio diario'
    } else if (Math.round(data.forecast.forecastday[0].day.maxtemp_c) < tempAverage) {
        dataAverage = `-${tempAverage - Math.round(data.forecast.forecastday[0].day.maxtemp_c)}°`
        averageDescription = 'Menor al promedio diario'
    } else {
        dataAverage = '0°'
        averageDescription = 'Igual al promedio diario'
    }

    const maxHourUvEpoch = timeEpochConverter(data.forecast.forecastday[0].date, "05:00 pm")

    const generalData = {
        windChill: {
            windChill: `${Math.round(data.current.windchill_c)}°`,
            temperature: `${Math.round(data.current.temp_c)}°`,
            description: windChillDescription
        },
        uvIndex: {
            value: data.current.uv,
            description: maxHourUvEpoch >= currentDateToEpoch
                ? 'Usa protección solar hasta las 16:00'
                : 'Bajo el resto del día'
        },
        wind: {
            windKph: `${data.current.wind_kph} km/h`,
            gust: `${data.current.gust_kph} km/h`,
            windDir: `${data.current.wind_degree}° ${getWindDirection(data.current.wind_dir)}`,
        },
        sunData: {
            event: isDay ? 'ATARDECER' : 'AMANECER',
            eventData: isDay
                ? hourConverter(null, data.forecast.forecastday[0].astro.sunset)
                : hourConverter(null, data.forecast.forecastday[0].astro.sunrise),
            nextEvent: isDay
                ? `Amanecer ${hourConverter(null, data.forecast.forecastday[1].astro.sunrise)}`
                : `Atardecer ${hourConverter(null, data.forecast.forecastday[1].astro.sunset)}`
        },
        rain: {
            currentRainfall: `${data.current.precip_mm === 0
                ? '0'
                : data.current.precip_mm < 1
                    ? '< 1'
                    : data.current.precip_mm} mm`,
            tomorrowRainfall: `${data.forecast.forecastday[1].day.totalprecip_mm === 0
                ? '0'
                : data.forecast.forecastday[1].day.totalprecip_mm < 1
                    ? '< 1'
                    : data.forecast.forecastday[1].day.totalprecip_mm} mm`
        },
        visibility: {
            quality: `${data.current.vis_km} km`,
            description: visibilityDescription
        },
        humidity: {
            humidity: `${data.current.humidity}%`,
            dewPoint: `${data.current.dewpoint_c}°`
        },
        moon: {
            moonIllumination: `${data.forecast.forecastday[0].astro.moon_illumination}%`,
            soonMoonEventTitle: nextMoonEvent[0].type === 'moonset'
                ? 'Puesta de la luna'
                : 'Salida de la luna',
            soonMoonEventData: nextMoonEvent[0].time.slice(11),
            nextMoonEventTitle: nextMoonEvent[1].type === 'moonset'
                ? 'Puesta de la luna'
                : 'Salida de la luna',
            nextMoonEventData: nextMoonEvent[1].time.slice(11),
            moonPhase: getMoonPhase(data.forecast.forecastday[0].astro.moon_phase)
        },
        average: {
            value: dataAverage,
            description: averageDescription,
            maxTemp: Math.round(data.forecast.forecastday[0].day.maxtemp_c),
            average: tempAverage
        },
        pressure: {
            pressure: `${data.current.pressure_mb} hPa`
        }
    }

    return generalData
}