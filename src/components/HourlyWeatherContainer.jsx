import { View, ScrollView, StyleSheet } from "react-native"

import { HourlyWeatherItem } from "./HourlyWeatherItem"
import { AppText } from "./AppText"

/* import { useWeather } from "../../context/WeatherContext" */

export const HourlyWeatherContainer = ({ item }) => {
    /* const { weatherData } = useWeather() */

    return (
        <View style={styles.container}>
            <AppText style={styles.header} size={16} color={'#fff'}>
                {/* {weatherData.currentConditions.windChill} */}
                {item.currentConditions.windChill}
            </AppText>
            <AppText style={styles.header} size={16} color={'#fff'}>
                {/* {weatherData.currentConditions.windData} */}
                {item.currentConditions.windData}
            </AppText>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.forecastScroll}
                contentContainerStyle={{ gap: 5 }}>
                {item.hourlyForecast.map((item, index) => {
                    return (
                        <HourlyWeatherItem
                            key={item.time}
                            item={item}
                            hour={item.type ? item.time.slice(11)
                                : index === 0 ? 'Ahora' : item.time.slice(11, 13)}
                        />
                    )
                })}
                {/* {weatherData.hourlyForecast.map((item, index) => {
                    return (
                        <HourlyWeatherItem
                            key={item.time}
                            item={item}
                            hour={item.type ? item.time.slice(11)
                                : index === 0 ? 'Ahora' : item.time.slice(11, 13)}
                        />
                    )
                })} */}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        /* marginTop: 10, */
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    header: {
        marginBottom: 10
    },
    forecastScroll: {
        borderTopColor: 'rgba(255, 255, 255, 0.3)',
        borderTopWidth: 1
    }
})