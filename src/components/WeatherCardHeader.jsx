import { View, StyleSheet } from 'react-native'
import { AppText } from './AppText'

export const WeatherCardHeader = ({ icon, title }) => {
    return (
        <View style={styles.header}>
            <AppText size={13} color={'rgba(255,255,255,0.60)'}>
                {icon}
            </AppText>
            <AppText size={13} color={'rgba(255,255,255,0.60)'} style={styles.headerTitle}>
                {title}
            </AppText>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 14,
        paddingVertical: 9,
        backgroundColor: 'rgba(24, 31, 43, 0.08)',
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(255, 255, 255, 0.14)'
    },
    headerTitle: {
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: 0.4
    }
})