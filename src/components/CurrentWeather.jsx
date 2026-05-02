import { View, StyleSheet } from 'react-native'
import { AppText } from './AppText'
/* import { useWeather } from '../../context/WeatherContext' */


export const CurrentWeather = ({ locationData }) => {
    /* const { weatherData } = useWeather() */

    return (
        <View style={styles.container}>
            <AppText size={16} color={'#fff'}>
                MI UBICACIÓN
            </AppText>
            <AppText size={40} color={'#fff'}>
                {/* {weatherData.locationData.city} */}
                {locationData.city}
            </AppText>
            <AppText size={100} color={'#fff'}>
                {/* {weatherData.locationData.temperature} */}
                {locationData.temperature}
            </AppText>
            <AppText size={26} color={'#fff'}>
                {/* {weatherData.locationData.condition} */}
                {locationData.condition}
            </AppText>
            <AppText size={26} color={'#fff'}>
                {/* Máxima: {weatherData.locationData.maxTemp}° Mínima: {weatherData.locationData.minTemp}° */}
                Máxima: {locationData.maxTemp} Mínima {locationData.minTemp}
            </AppText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        /* height: 400, */
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'trasparent'
    }
})