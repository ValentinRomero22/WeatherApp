import { View, StyleSheet } from 'react-native'
import { BlurView } from 'expo-blur'
import { WeatherCardHeader } from './WeatherCardHeader'

export const StickyCardHeader = ({ icon, title, fullWidth = true }) => {
    return (
        <View
            style={[styles.cardHeaderWrapper,
            !fullWidth && styles.halfWidth]}>
            <BlurView
                intensity={70}
                tint='dark'
                style={styles.blurView}>
                <View style={styles.blurTint}>
                    <WeatherCardHeader icon={icon} title={title} />
                </View>
            </BlurView>
        </View>
    )
}

const styles = StyleSheet.create({
    cardHeaderWrapper: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        overflow: 'hidden',
        marginTop: 10
    },
    halfWidth: {
        width: '50%'
    },
    blurView: {
        width: '100%'
    },
    blurTint: {
        backgroundColor: 'rgba(28, 46, 74, 0.13)'
    }
})