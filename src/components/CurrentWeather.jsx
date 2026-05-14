import { Animated, View, StyleSheet } from 'react-native'
import { AppText } from './AppText'
/* import { useWeather } from '../../context/WeatherContext' */

export const CurrentWeather = ({ locationData, anim }) => {

    /* return (
        <View style={styles.container}>
            <AppText size={16} color={'#fff'}>
                MI UBICACIÓN
            </AppText>
            <AppText size={40} color={'#fff'}>
                {locationData.city}
            </AppText>
            <AppText size={100} color={'#fff'}>
                {locationData.temperature}
            </AppText>
            <AppText size={26} color={'#fff'}>
                {locationData.condition}
            </AppText>
            <AppText size={26} color={'#fff'}>
                Máxima: {locationData.maxTemp} Mínima {locationData.minTemp}
            </AppText>
        </View>
    ) */

    const {
        height,
        paddingTop,
        tempFontSize,
        conditionOpacity,
        conditionHeight,
        miniInfoOpacity
    } = anim

    return (
        <Animated.View style={[styles.container, { height: height, paddingTop: paddingTop }]}>
            <AppText size={17} color={'#fff'} style={styles.city}>
                {locationData.city}
            </AppText>
            <Animated.Text style={[styles.currentTemp, { fontSize: tempFontSize }]}>
                {locationData.temperature}
            </Animated.Text>
            <Animated.View style={{ opacity: conditionOpacity, height: conditionHeight, overflow: 'hidden' }}>
                <AppText size={15} color={'#fff'} style={styles.condition}>
                    {locationData.condition}
                </AppText>
            </Animated.View>
            <Animated.View style={{ opacity: conditionOpacity, overflow: 'hidden' }}>
                <AppText size={15} color={'#fff'} style={styles.temperatures}>
                    Máxima: {locationData.maxTemp} Mínima: {locationData.minTemp}
                </AppText>
            </Animated.View>

            <Animated.Text style={[styles.miniInfo, { opacity: miniInfoOpacity }]}>
                {locationData.condition} - Máx: {locationData.maxTemp} Mín: {locationData.minTemp}
            </Animated.Text>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 20,
        alignItems: 'center',
        paddingBottom: 12,
        paddingHorizontal: 16,
        backgroundColor: '#54abf3'
    },
    city: {
        fontWeight: '400',
        marginBottom: 4
    },
    currentTemp: {
        fontWeight: '200',
        lineHeight: undefined,
        color: '#fff'
    },
    condition: {
        textAlign: 'center',
        marginTop: 4
    },
    temperatures: {
        textAlign: 'center',
        marginTop: 2
    },
    miniInfo: {
        fontSize: 14,
        color: '#fff',
        textAlign: 'center',
        position: 'absolute',
        bottom: 12
    }
})