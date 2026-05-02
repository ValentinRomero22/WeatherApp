import { View, StyleSheet, ScrollView } from 'react-native'

import { ForecastItem } from './ForecastItem'

/* import { useWeather } from '../../context/WeatherContext' */
import { addDays } from '../../helpers/dataConverter'

export const ForecastContainer = ({ item }) => {
    /* const { weatherData, language } = useWeather() */

    /* const forecastCollection = addDays(weatherData.forecastCollection, language) */
    const forecastCollection = addDays(item.forecastCollection, item.language)

    return (
        <View style={styles.container}>
            <ScrollView
                stickyHeaderIndices={[0]}
                nestedScrollEnabled={true}>
                {
                    forecastCollection.map((item, index) => {
                        return (
                            <ForecastItem
                                key={item.date}
                                item={item}
                                day={index === 0 ? 'Hoy' : item.day}
                            />
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        paddingHorizontal: 10,
        paddingTop: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 10
    }
})