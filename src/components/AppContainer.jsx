import { View, Text, ActivityIndicator, ScrollView, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useWeather } from '../../context/WeatherContext'
import { CurrentWeather } from './CurrentWeather'
import { HourlyWeatherContainer } from './HourlyWeatherContainer'
import { AppText } from './AppText'
import { ForecastContainer } from './ForecastContainer'
import { DetailsWeatherContainer } from './DetailsWeatherContainer'

export const AppContainer = () => {
    const insets = useSafeAreaInsets()

    const { weatherData, loadingWeather, error } = useWeather()

    if (error) {
        return (
            <View>
                <Text>Error: {error.message}</Text>
            </View>
        )
    }

    if (loadingWeather || !weatherData) return (
        <View>
            <ActivityIndicator />
        </View>
    )

    if (error) {
        return (
            < View >
                <AppText>Se produjo un error...</AppText>
            </ View >
        )
    }

    return (
        <View style={{
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingHorizontal: 5
        }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <CurrentWeather />
                <HourlyWeatherContainer />
                <ForecastContainer />
                <DetailsWeatherContainer />
                <View style={styles.footerContainer}>
                    <AppText size={16} color={'#fff'}>Desarrollado por Valentín Romero</AppText>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    footerContainer: {
        marginTop: 20
    }
})