import { View, StyleSheet, Image } from "react-native"

import { AppText } from "./AppText"

import { toAbsoluteURL } from '../../helpers/dataConverter'

export const HourlyWeatherItem = ({ item, hour }) => {
    return (
        <View
            style={styles.item}>
            <AppText size={18} color={'#fff'}>
                {hour}
            </AppText>
            {
                item.type
                    ? <>
                        <AppText color={'#fff'}>
                            {item.type.toUpperCase()}
                        </AppText>
                    </>
                    : <>
                        <Image source={{ uri: toAbsoluteURL(item.condition.icon) }}
                            style={{ width: 25, height: 25 }} />
                        <AppText size={18} color={'#fff'}>
                            {Math.round(item.temp_c)}°
                        </AppText>
                    </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        width: 45,
        height: 90,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    }
})