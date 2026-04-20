export const toAbsoluteURL = (url) => {
    if (!url) return ''

    return url.startsWith('//')
        ? `https:${url}`
        : url
}

export const hourConverter = (date, hour) => {
    if (hour.toLowerCase().includes("no")) return null

    const [time, modifier] = hour.split(" ")
    let [hours, minutes] = time.split(":")

    if (modifier.toLowerCase() === "pm" && hours !== "12") {
        hours = String(parseInt(hours) + 12)
    }

    if (date !== null) return `${date} ${hours.padStart(2, "0")}:${minutes}`

    return `${hours.padStart(2, "0")}:${minutes}`
}

export const timeEpochConverter = (date, hour) => {
    const hour24 = hourConverter(null, hour)

    if (!isNaN(hour24)) return null

    return Math.floor(new Date(`${date}T${hour24}`).getTime() / 1000)
}

export const addDays = (forecastCollection, language) => {
    let dateToConvert, day

    for (let i = 0; i < forecastCollection.length; i++) {
        dateToConvert = new Date(forecastCollection[i].dateEpoch * 1000)

        day = dateToConvert.toLocaleDateString(language, {
            weekday: "short"
        })

        const capitalizedDay = capitalize(day)
        forecastCollection[i].day = capitalizedDay
    }

    return forecastCollection
}

export const capitalize = (word) => {
    const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1)
    return capitalizedWord
}

export const getColor = (temp, min, max) => {
    const ratio = (temp - min) / (max - min);

    if (ratio <= 0.25) return "#00ff88"
    if (ratio <= 0.75) return "#fff132"
    return "#ff6325"
}

export const getWindCompleteDirection = (direction) => {
    const windDirectionsMap = {
        N: "Norte",
        NNE: "Norte-Noreste",
        NE: "Noreste",
        ENE: "Este-Noreste",
        E: "Este",
        ESE: "Este-Sureste",
        SE: "Sureste",
        SSE: "Sur-Sureste",
        S: "Sur",
        SSW: "Sur-Suroeste",
        SW: "Suroeste",
        WSW: "Oeste-Suroeste",
        W: "Oeste",
        WNW: "Oeste-Noroeste",
        NW: "Noroeste",
        NNW: "Norte-Noroeste"
    }

    return windDirectionsMap[direction].toLowerCase()
}

export const getWindDirection = (direction) => {
    const windDirectionsMap = {
        N: "N",
        NNE: "NNE",
        NE: "NE",
        ENE: "ENE",
        E: "E",
        ESE: "ESE",
        SE: "SE",
        SSE: "SSE",
        S: "S",
        SSW: "SSO",
        SW: "SO",
        WSW: "OSO",
        W: "O",
        WNW: "ONO",
        NW: "NO",
        NNW: "NNO"
    }

    return windDirectionsMap[direction]
}

export const getMoonPhase = (moonPhase) => {
    const mapedMoonPhase = {
        "New Moon": "LUNA NUEVA",
        "Waxing Crescent": "CUARTO CRECIENTE",
        "First Quarter": "PRIMER CUARTO",
        "Waxing Gibbous": "LUNA GIBOSA CRECIENTE",
        "Full Moon": "LUNA LLENA",
        "Waning Gibbous": "LUNA GIBOSA MENGUANTE",
        "Last Quarter": "ÚLTIMO CURTO",
        "Waning Crescent": "LUNA MENGUANTE"
    }

    return mapedMoonPhase[moonPhase]
}