import { StyleSheet } from 'react-native'
import { BlurView } from 'expo-blur'

export const CardBody = ({ children, style }) => {
    return (
        <BlurView
            intensity={70}
            tint='dark'
            style={styles.blurView}>
            <BlurView style={[styles.tint, style]}>
                {children}
            </BlurView>
        </BlurView>
    )
}

const styles = StyleSheet.create({
    blurView: {
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        overflow: 'hidden',
        width: '100%'
    },
    tint: {
        backgroundColor: 'rgba(28, 46, 74, 0.13)',
        width: '100%'
    }
})