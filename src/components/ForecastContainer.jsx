import { View, StyleSheet, ScrollView } from 'react-native'

import { ForecastItem } from './ForecastItem'

/* import { useWeather } from '../../context/WeatherContext' */
import { addDays } from '../../helpers/dataConverter'

export const ForecastContainer = ({ data }) => {
    const forecastCollection = addDays(data[0], data[1])

    return (
        <View style={styles.container}>
            {/* <ScrollView
                    stickyHeaderIndices={[0]}
                    nestedScrollEnabled={true}> */}
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
            {/* </ScrollView> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10
        /* paddingHorizontal: 10,
        paddingTop: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16, */
    }
})