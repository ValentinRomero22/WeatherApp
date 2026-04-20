import { View, StyleSheet } from 'react-native'

import { AppText } from './AppText'
import { ForecastItem } from './ForecastItem'
import { Calendar } from './Icons'

import { useWeather } from '../../context/WeatherContext'
import { addDays } from '../../helpers/dataConverter'

export const ForecastContainer = () => {
    const { weatherData, language } = useWeather()

    const forecastCollection = addDays(weatherData.forecastCollection, language)

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Calendar size={14} color={'#fff'} />
                <AppText size={16} color={'#fff'} style={styles.header}>PRONÓSTICO PARA 3 DÍAS</AppText>
            </View>
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
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        paddingBottom: 15
    },
    header: {
        marginLeft: 5
    }
})