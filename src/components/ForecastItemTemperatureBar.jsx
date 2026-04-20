import { View, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import { useWeather } from '../../context/WeatherContext'
import { getColor } from '../../helpers/dataConverter'

export const ForecstItemTemperatureBar = ({ day, item }) => {
    const { weatherData } = useWeather()

    const { globalMin, globalMax } = weatherData.barData
    const { temperature } = weatherData.locationData

    const range = globalMax - globalMin || 1

    const startRatio = (item.minTemp - globalMin) / range
    const endRatio = (item.maxTemp - globalMin) / range

    const safeStart = Math.max(0, Math.min(startRatio, 1))
    const safeEnd = Math.max(0, Math.min(endRatio, 1))

    const leftFlex = safeStart
    const barFlex = Math.max(safeEnd - safeStart, 0.02)
    const rightFlex = 1 - safeEnd

    const startColor = getColor(item.minTemp, globalMin, globalMax)
    const endColor = getColor(item.maxTemp, globalMin, globalMax)

    const currentPos = temperature
        ? (temperature - globalMin) / range
        : null

    const safePercent = Math.min(Math.max(currentPos, 0), 1);

    let leftPercent = safePercent * 100;

    if (safePercent === 0) {
        leftPercent = 0;
    } else if (safePercent === 1) {
        leftPercent = 100;
    }

    const isEdgeLeft = safePercent === 0;
    const isEdgeRight = safePercent === 1;

    return (
        <View style={styles.container}>
            <View style={styles.barContainer}>

                <View style={styles.bar}>

                    <View style={styles.flexRow}>
                        <View style={{ flex: leftFlex }}></ View>
                        <LinearGradient
                            colors={[startColor, endColor]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={[
                                styles.rangeBar, { flex: barFlex }
                            ]}>
                        </LinearGradient>
                        <View style={{ flex: rightFlex }}></View>
                    </View>

                    {/* {day === "Hoy" && currentPos !== null && (
                        <View style={[
                            styles.currentMarker,
                            {
                                left: `${leftPercent}%`,
                                transform:
                                    isEdgeLeft
                                        ? []
                                        : isEdgeRight
                                            ? [{ translateX: -6 }]
                                            : [{ translateX: -2 }]
                            },
                        ]} >
                        </View>
                    )} */}
                </View>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    barContainer: {
        flex: 1,
        height: 20,
        justifyContent: 'center'
    },
    bar: {
        height: 6,
        backgroundColor: '#b1b1b15e',
        borderRadius: 999,
    },
    flexRow: {
        flexDirection: 'row',
        flex: 1
    },
    rangeBar: {
        height: 6,
        borderRadius: 999
    },
    currentMarker: {
        position: 'absolute',
        width: 6,
        height: 6,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
        zIndex: 10
    }
})