import { useRef } from 'react'
import { View, StyleSheet, Animated } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { CurrentWeather } from './CurrentWeather'
import { HourlyWeatherContainer } from './HourlyWeatherContainer'
import { ForecastContainer } from './ForecastContainer'
import { DetailsWeatherContainer } from './DetailsWeatherContainer'
import { AppText } from './AppText'

import { useWeather } from '../../context/WeatherContext'
import { ForecastContainerHeader } from './ForecastContainerHeader'
import { HourlyWeatherContainerHeader } from './HourlyWeatherContainerHeader'

const headerMaxHeight = 300
const headerMinHeight = 100

export const AppContainerRender = () => {
    const { weatherData, language } = useWeather()

    /* console.log(weatherData) */

    const insets = useSafeAreaInsets()
    const scrollY = useRef(new Animated.Value(0)).current

    const headerHeight = scrollY.interpolate({
        inputRange: [0, headerMaxHeight - headerMinHeight],
        outputRange: [headerMaxHeight, headerMinHeight],
        extrapolate: 'clamp'
    })

    return (
        <View style={{
            flex: 1,
            paddingTop: insets.top
        }}>
            <Animated.View style={{
                height: headerHeight,
                overflow: 'hidden'
            }}>
                <CurrentWeather
                    scrollY={scrollY}
                    locationData={weatherData.locationData} />
            </Animated.View>

            <Animated.SectionList
                sections={[
                    {
                        key: 'hourly',
                        title: 'PRONOSTICO POR HORA',
                        data: [{
                            currentConditions: weatherData.currentConditions ?? {},
                            hourlyForecast: weatherData.hourlyForecast ?? []
                        }]
                    },
                    {
                        key: 'forecast',
                        title: 'PRONOSTICO PARA 3 DÍAS',
                        data: [{
                            forecastCollection: weatherData.forecastCollection ?? [],
                            language: language ?? null
                        }]
                    },
                    {
                        key: 'details',
                        title: 'DETALLES',
                        data: [{
                            generalData: weatherData.generalData ?? {}
                        }]
                    },
                    {
                        key: 'footer',
                        title: 'FOOTER',
                        data: [{}]
                    }
                ]}

                keyExtractor={(item, index) => index.toString()}

                renderItem={({ item, section, index }) => {
                    switch (section.key) {
                        case 'hourly':
                            return <HourlyWeatherContainer item={item} />

                        case 'forecast':
                            return <ForecastContainer item={item} />

                        case 'details':
                            return <DetailsWeatherContainer item={item} />

                        case 'footer':
                            return (
                                <View /* style={styles.footerContainer} */>
                                    <AppText size={16} color={'#fff'}>Desarrollado por Valentín Romero</AppText>
                                </View>
                            )

                        default:
                            return null
                    }
                }}

                renderSectionHeader={({ section }) => {
                    if (!section.title) return null

                    switch (section.key) {
                        case 'forecast':
                            return <ForecastContainerHeader />
                        case 'hourly':
                            return <HourlyWeatherContainerHeader />
                    }

                    /* return (
                        <View>
                            <AppText>
                                {section.title}
                            </AppText>
                        </View>
                    ) */
                }}

                stickySectionHeadersEnabled={true}
                showsVerticalScrollIndicator={false}

                contentContainerStyle={{
                    paddingTop: 10,
                    paddingHorizontal: 5,
                    paddingBottom: insets.bottom + 20
                }}

                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}

                scrollEventThrottle={16}
            >
            </Animated.SectionList>
        </View>
    )
}