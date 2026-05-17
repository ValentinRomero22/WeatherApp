import { useRef } from 'react'
import { View, StyleSheet, Animated, SectionList } from 'react-native'

/* import { BlurView } from 'expo-blur' */

import { useWeather } from '../../context/WeatherContext'

import { useScrollAnimation } from '../../hooks/useScrollAnimation'

import { makePairedSection } from '../../helpers/makePairedSection'

import { CardBody } from './CardBody'
import { PairedSectionHeader } from './PairedSections'
import { CurrentWeather } from './CurrentWeather'
import { HourlyWeatherContainer } from './HourlyWeatherContainer'
import { ForecastContainer } from './ForecastContainer'
import { DetailsWeatherItem } from './DetailsWeatherItem'
/* import { WeatherCardHeader } from './WeatherCardHeader' */

import { HERO_FULL_HEIGHT } from '../../constants/layout'
import { StickyCardHeader } from './StickyCardHeader'

/* const headerMaxHeight = 300
const headerMinHeight = 100 */

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
        makePairedSection(
            {
                id: 'windChill',
                headerIcon: '🌡',
                headerTitle: 'SENSACIÓN TÉRMICA',
                data: windChill,
                Component: DetailsWeatherItem
            },
            {
                id: 'uvIndex',
                headerIcon: '☂',
                headerTitle: 'ÍNDICE UV',
                data: uvIndex,
                Component: DetailsWeatherItem
            }
        ),
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
        makePairedSection(
            {
                id: 'sunData',
                headerIcon: '☀',
                headerTitle: 'AMANECER',
                data: sunData,
                Component: DetailsWeatherItem
            },
            {
                id: 'rainFall',
                headerIcon: '🌧',
                headerTitle: 'PRECIPITACIÓN',
                data: rain,
                Component: DetailsWeatherItem
            }
        ),
        makePairedSection(
            {
                id: 'visibility',
                headerIcon: '👁',
                headerTitle: 'VISIBILIDAD',
                data: visibility,
                Component: DetailsWeatherItem
            },
            {
                id: 'humidity',
                headerIcon: '💧',
                headerTitle: 'HUMEDAD',
                data: humidity,
                Component: DetailsWeatherItem
            }
        ),
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
        makePairedSection(
            {
                id: 'average',
                headerIcon: '📊',
                headerTitle: 'PROMEDIOS',
                data: average,
                Component: DetailsWeatherItem
            },
            {
                id: 'pressure',
                headerIcon: '🎚',
                headerTitle: 'PRESIÓN',
                data: pressure,
                Component: DetailsWeatherItem
            }
        )
    ]

    return (
        <View style={styles.root}>
            <CurrentWeather
                locationData={locationData}
                anim={anim}
            />
            <SectionList
                sections={sections}
                keyExtractor={(item) => item.key}

                renderSectionHeader={({ section }) =>
                    section.isPaired
                        ? <PairedSectionHeader
                            leftIcon={section.leftIcon}
                            leftTitle={section.leftTitle}
                            rightIcon={section.rightIcon}
                            rightTitle={section.rightTitle}
                        />
                        : <StickyCardHeader
                            icon={section.headerIcon}
                            title={section.headerTitle}
                        />
                }

                renderItem={({ item, section }) => section.renderItem({ item })}

                /* SectionSeparatorComponent={() => <View style={styles.sectionGap} />} */

                stickySectionHeadersEnabled={true}

                onScroll={anim.onScroll}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    content: {
        paddingTop: HERO_FULL_HEIGHT,
        paddingBottom: 40,
        paddingHorizontal: 10
    }
})