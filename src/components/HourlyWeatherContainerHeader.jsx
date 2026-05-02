import { View, StyleSheet } from 'react-native'

import { AppText } from './AppText'

export const HourlyWeatherContainerHeader = () => {
    return (
        <View style={styles.headerContainer}>
            <AppText
                size={16}
                color={'#fff'}
                style={styles.header}>
                PRONÓSTICO POR HORA
            </AppText>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 10,
        paddingLeft: 5,
        paddingRight: 10,
        paddingTop: 10,
        flexDirection: 'row',
        alignContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden',
    },
    header: {
        marginLeft: 5
    }
})