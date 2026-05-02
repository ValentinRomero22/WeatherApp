import { View, StyleSheet } from 'react-native'

import {
    Umbrella,
    Thermometer,
    Sun,
    Wind,
    Sunrise,
    Sunset,
    Drop,
    Visibility,
    Humidity,
    Moon,
    AvgTemp,
    Pressure
} from './Icons'

import { useWeather } from '../../context/WeatherContext'

import { DetailsWeatherItem } from './DetailsWeatherItem'

export const DetailsWeatherContainer = ({ item }) => {
    /* const { weatherData } = useWeather() */

    /* const { windChill,
        uvIndex,
        wind,
        sunData,
        rain,
        visibility,
        humidity,
        moon,
        average,
        pressure
    } = weatherData.generalData */

    const { windChill,
        uvIndex,
        wind,
        sunData,
        rain,
        visibility,
        humidity,
        moon,
        average,
        pressure
    } = item.generalData

    return (
        <View style={styles.container}>
            <DetailsWeatherItem
                key={'windChill'}
                size='half'
                icon={<Thermometer size={14} color={'#fff'} />}
                title={'SENSACIÓN TÉRMICA'}
                subtitles={null}
                data={{ first: windChill.windChill, second: `Temperatura real: ${windChill.temperature}` }}
                description={windChill.description} />
            <DetailsWeatherItem
                key={'uvIndex'}
                size='half'
                icon={<Sun size={14} color={'#fff'} />}
                title={'ÍNDICE UV'}
                subtitles={null}
                data={{ first: uvIndex.value }}
                description={uvIndex.description} />
            <DetailsWeatherItem
                key={'wind'}
                size='full'
                icon={<Wind size={14} color={'#fff'} />}
                title={'VIENTO'}
                subtitles={{ first: 'Viento', second: 'Ráfagas', third: 'Dirección' }}
                data={{ first: wind.windKph, second: wind.gust, third: wind.windDir }}
                image={<Wind size={100} color={'#fff'} />}
                description={null} />
            <DetailsWeatherItem
                key={'sunData'}
                size='half'
                icon={sunData.event === 'AMANECER'
                    ? <Sunrise size={14} color={'#fff'} />
                    : <Sunset size={14} color={'#fff'} />
                }
                title={sunData.event}
                subtitles={null}
                data={{ first: sunData.eventData }}
                description={sunData.nextEvent} />
            <DetailsWeatherItem
                key={'rainFall'}
                size='half'
                icon={<Umbrella size={14} color={'#fff'} />}
                title={'PRECIPITACIÓN'}
                subtitles={null}
                data={{ first: rain.currentRainfall, second: 'Hoy' }}
                description={`Pronóstico: ${rain.tomorrowRainfall} para mañana`} />
            <DetailsWeatherItem
                key={'visibility'}
                size='half'
                icon={<Visibility size={14} color={'#fff'} />}
                title={'VISIBILIDAD'}
                subtitles={null}
                data={{ first: visibility.quality }}
                description={visibility.description} />
            <DetailsWeatherItem
                key={'humidity'}
                size='half'
                icon={<Humidity size={14} color={'#fff'} />}
                title={'HUMEDAD'}
                subtitles={null}
                data={{ first: humidity.humidity }}
                description={`El punto de rocío actual es de ${humidity.dewPoint}`} />
            <DetailsWeatherItem
                key={'moon'}
                size='full'
                icon={<Moon size={14} color={'#fff'} />}
                title={moon.moonPhase}
                subtitles={{ first: 'Luminosidad', second: moon.soonMoonEventTitle, third: moon.nextMoonEventTitle }}
                data={{ first: moon.moonIllumination, second: moon.soonMoonEventData, third: moon.nextMoonEventData }}
                image={<Moon size={100} color={'#fff'} />}
                description={null} />
            <DetailsWeatherItem
                key={'average'}
                size='half'
                icon={<AvgTemp size={14} color={'#fff'} />}
                title={'PROMEDIOS'}
                subtitles={null}
                data={{ first: average.value, second: average.description }}
                description={`Hoy: ${average.maxTemp} Promedio: ${average.average}°`} />
            <DetailsWeatherItem
                key={'pressure'}
                size='half'
                icon={<Pressure size={14} color={'#fff'} />}
                title={'PRESIÓN'}
                subtitles={null}
                data={{ first: pressure.pressure }}
                description={null} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12
    },
    boxData: {
        padding: 10,
        flex: 0.5,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 10
    }
})