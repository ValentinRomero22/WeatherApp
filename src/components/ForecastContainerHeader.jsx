import { View, StyleSheet } from "react-native"

import { AppText } from "./AppText"
import { Calendar } from './Icons'

export const ForecastContainerHeader = () => {
    return (
        <View style={styles.headerContainer}>
            <Calendar size={14} color={'#fff'} />
            <AppText size={16} color={'#fff'} style={styles.header}>PRONÓSTICO PARA 3 DÍAS</AppText>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        /* display: 'flex', */
        flexDirection: 'row',
        alignContent: 'center',
        paddingBottom: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    header: {
        marginLeft: 5
    }
})