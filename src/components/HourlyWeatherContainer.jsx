import { View, ScrollView, StyleSheet } from "react-native"

import { HourlyWeatherItem } from "./HourlyWeatherItem"
import { AppText } from "./AppText"

/* import { useWeather } from "../../context/WeatherContext" */

export const HourlyWeatherContainer = ({ data }) => {
    /* const { weatherData } = useWeather() */

    const currentConditions = data[0]
    const hourlyForecast = data[1]

    return (
        <View style={styles.container}>
            <AppText style={styles.header} size={16} color={'#fff'}>
                {/* {weatherData.currentConditions.windChill} */}
                {currentConditions.windChill}
            </AppText>
            <AppText style={styles.header} size={16} color={'#fff'}>
                {/* {weatherData.currentConditions.windData} */}
                {currentConditions.windData}
            </AppText>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.forecastScroll}
                contentContainerStyle={{ gap: 5 }}>
                {hourlyForecast.map((item, index) => {
                    return (
                        <HourlyWeatherItem
                            key={item.time}
                            item={item}
                            hour={item.type ? item.time.slice(11)
                                : index === 0 ? 'Ahora' : item.time.slice(11, 13)}
                        />
                    )
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        /* backgroundColor: 'rgba(255, 255, 255, 0.3)', */
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    header: {
        marginBottom: 10
    },
    forecastScroll: {
        borderTopColor: 'rgba(255, 255, 255, 0.3)',
        borderTopWidth: 1
    }
})