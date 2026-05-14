import { useRef } from 'react'
import { View, StyleSheet, Animated, SectionList } from 'react-native'

import { BlurView } from 'expo-blur'

import { CardBody } from './CardBody'
import { CurrentWeather } from './CurrentWeather'
import { HourlyWeatherContainer } from './HourlyWeatherContainer'
import { ForecastContainer } from './ForecastContainer'

import { useWeather } from '../../context/WeatherContext'
import { DetailsWeatherItem } from './DetailsWeatherItem'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { WeatherCardHeader } from './WeatherCardHeader'

import { HERO_FULL_HEIGHT } from '../../constants/layout'
import { StickyCardHeader } from './StickyCardHeader'

const headerMaxHeight = 300
const headerMinHeight = 100

export const AppContainerRender = () => {
    const { weatherData, language } = useWeather()

    const {
        currentConditions,
        hourlyForecast,
        forecastCollection,
        generalData,
        locationData
    } = weatherData ?? {}

    const {
        windChill,
        uvIndex,
        wind,
        sunData,
        rain,
        visibility,
        humidity,
        moon,
        average,
        pressure
    } = generalData

    const anim = useScrollAnimation()

    const sections = [
        {
            id: 'hourly',
            headerIcon: '⌚',
            headerTitle: 'PRONÓSTICO POR HORA',
            data: [{
                key: 'hourly', value: [currentConditions, hourlyForecast]
            }],
            renderItem: ({ item }) => (
                <CardBody>
                    <HourlyWeatherContainer data={item.value} />
                </CardBody>
            )
        },
        {
            id: 'forecast',
            headerIcon: '📅',
            headerTitle: `PRONÓSTICO PARA LOS PRÓXIMOS ${forecastCollection.length} DÍAS`,
            data: [{
                key: 'forecast',
                value: [forecastCollection, language]
            }],
            renderItem: ({ item }) => (
                <CardBody>
                    <ForecastContainer data={item.value} />
                </CardBody>
            )
        },
        {
            id: 'windChill',
            headerIcon: '🌡',
            headerTitle: 'SENSACIÓN TÉRMICA',
            data: [{
                key: 'windChill',
                value: windChill
            }],
            renderItem: ({ item }) => (
                <CardBody>
                    <DetailsWeatherItem data={item.value} />
                </CardBody>
            )
        },
        {
            id: 'uvIndex',
            headerIcon: '☂',
            headerTitle: 'ÍNDICE UV',
            data: [{
                key: 'uvIndex',
                value: uvIndex
            }],
            renderItem: ({ item }) => (
                <CardBody>
                    <DetailsWeatherItem data={item.value} />
                </CardBody>
            )
        },
        {
            id: 'wind',
            headerIcon: '🌬',
            headerTitle: 'VIENTO',
            data: [{
                key: 'wind',
                value: uvIndex
            }],
            renderItem: ({ item }) => (
                <CardBody>
                    <DetailsWeatherItem data={item.value} />
                </CardBody>
            )
        },
        {
            id: 'sunData',
            headerIcon: '☀',
            headerTitle: 'AMANECER',
            data: [{
                key: 'sunData',
                value: sunData
            }],
            renderItem: ({ item }) => (
                <CardBody>
                    <DetailsWeatherItem data={item.value} />
                </CardBody>
            )
        },
        {
            id: 'rainFall',
            headerIcon: '🌧',
            headerTitle: 'PRECIPITACIÓN',
            data: [{
                key: 'rainFall',
                value: rain
            }],
            renderItem: ({ item }) => (
                <CardBody>
                    <DetailsWeatherItem data={item.value} />
                </CardBody>
            )
        },
        {
            id: 'visibility',
            headerIcon: '👁',
            headerTitle: 'VISIBILIDAD',
            data: [{
                key: 'visibility',
                value: visibility
            }],
            renderItem: ({ item }) => (
                <CardBody>
                    <DetailsWeatherItem data={item.value} />
                </CardBody>
            )
        },
        {
            id: 'humidity',
            headerIcon: '💧',
            headerTitle: 'HUMEDAD',
            data: [{
                key: 'humidity',
                value: humidity
            }],
            renderItem: ({ item }) => (
                <CardBody>
                    <DetailsWeatherItem data={item.value} />
                </CardBody>
            )
        },
        {
            id: 'moon',
            headerIcon: '🌙',
            headerTitle: moon.moonPhase,
            data: [{
                key: 'moon',
                value: moon
            }],
            renderItem: ({ item }) => (
                <CardBody>
                    <DetailsWeatherItem data={item.value} />
                </CardBody>
            )
        },
        {
            id: 'average',
            headerIcon: '📊',
            headerTitle: 'PROMEDIOS',
            data: [{
                key: 'average',
                value: average
            }],
            renderItem: ({ item }) => (
                <CardBody>
                    <DetailsWeatherItem data={item.value} />
                </CardBody>
            )
        }
    ]

    return (
        <>
            <CurrentWeather
                locationData={locationData}
                anim={anim}
            />
            <SectionList
                sections={sections}
                keyExtractor={(item) => item.key}

                renderSectionHeader={({ section }) => (
                    <StickyCardHeader
                        icon={section.headerIcon}
                        title={section.headerTitle}
                        fullWidth={section.fullWidth} />
                )}

                renderItem={({ item, section }) => (
                    <View style={section.fullWidth ? styles.itemFull : styles.itemHalf}>
                        {section.renderItem({ item })}
                    </View>
                )}

                /* SectionSeparatorComponent={() => <View style={styles.sectionGap} />} */

                stickySectionHeadersEnabled={true}

                onScroll={anim.onScroll}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            />
        </>
    )
}

const styles = StyleSheet.create({
    content: {
        paddingTop: HERO_FULL_HEIGHT,
        paddingBottom: 40,
        paddingHorizontal: 10
    },
    itemFull: {
        width: '100%'
    },
    itemHalf: {
        width: '50%'
    }
})