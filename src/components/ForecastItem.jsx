import { View, StyleSheet, Image } from "react-native"
import { AppText } from "./AppText"

import { toAbsoluteURL } from "../../helpers/dataConverter"
import { ForecstItemTemperatureBar } from "./ForecastItemTemperatureBar"

export const ForecastItem = ({ item, day }) => {
    return (
        <View style={styles.item}>
            <View style={styles.firstColumn}>
                <AppText size={20} color={'#fff'}>
                    {day}
                </AppText>
            </View>
            <View style={styles.column}>
                <Image source={{ uri: toAbsoluteURL(item.icon) }}
                    style={{ width: 25, height: 25 }}>
                </Image>
            </View>
            <View style={styles.column}>
                <AppText size={20} color={'#fff'}>
                    {Math.round(item.minTemp)}°
                </AppText>
            </View>
            <View style={styles.columnBar}>
                <ForecstItemTemperatureBar day={day} item={item} />
            </View>
            <View style={styles.column}>
                <AppText size={20} color={'#fff'}>
                    {Math.round(item.maxTemp)}°
                </AppText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 'auto',
        paddingVertical: 10,
        borderTopColor: '#b1b1b1',
        borderTopWidth: 1
    },
    column: {
        width: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    columnBar: {
        flex: 1
    },
    firstColumn: {
        width: 60,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    lastColumn: {
        width: 60,
        justifyContent: 'flex-start',
        alignItems: 'flex-end'
    }
})