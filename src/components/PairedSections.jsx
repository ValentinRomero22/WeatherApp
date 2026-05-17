import { View, StyleSheet } from 'react-native'
import { BlurView } from 'expo-blur'

import { AppText } from './AppText'
import { CardBody } from './CardBody'

const HalfCard = ({ icon, title, data, Component }) => {
    <BlurView intensity={70} tint='dark' style={styles.halfBlur}>
        <View style={styles.halfTint}>
            <View style={styles.halfHeader}>
                <AppText size={12} color={'#fff'}>
                    {icon}
                </AppText>
                <AppText size={12} color={'#fff'} style={styles.halfHeaderTitle} numberOfLines={1}>
                    {title}
                </AppText>
            </View>
            <View style={styles.halfBody}>
                <Component data={data} />
            </View>
        </View>
    </BlurView>
}

/* const HalfBody = ({ data, Component }) => (
    <View style={styles.halfContainer}>
        <View style={styles.halfContent}>
            <Component data={data} />
        </View>
    </View>
) */

export const PairedSectionItem = ({ left, right }) => {
    return (
        <View style={styles.row}>
            <View style={styles.half}>
                <HalfCard {...left} />
            </View>
            <View style={styles.half}>
                <HalfCard {...right} />
            </View>
        </View>
    )
}

export const PairedSectionHeader = ({ leftIcon, leftTitle, rightIcon, rightTitle }) => {
    return (
        <View style={styles.pairedHeaderWrapper}>
            <BlurView intensity={70} tint='dark' style={styles.blurView}>
                <View style={styles.headerTint}>
                    <View style={styles.headerRow}>

                        <View style={styles.headerHalf}>
                            <AppText size={12} color={'rgba(255, 255, 255, 0.55)'}>
                                {leftIcon}
                            </AppText>
                            <AppText size={12} color={'rgba(255, 255, 255, 0.55)'} style={styles.headerTitle} numberOfLines={1}>
                                {leftTitle}
                            </AppText>
                        </View>

                        <View style={styles.headerDivider} />

                        <View style={styles.headerHalf}>
                            <AppText size={12} color={'rgba(255, 255, 255, 0.55)'}>
                                {rightIcon}
                            </AppText>
                            <AppText size={12} color={'rgba(255, 255, 255, 0.55)'} style={styles.headerTitle} numberOfLines={1}>
                                {rightTitle}
                            </AppText>
                        </View>

                    </View>
                </View>
            </BlurView>
        </View>
    )
}

const styles = StyleSheet.create({
    pairedHeaderWrapper: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        overflow: 'hidden'
    },
    blurView: {
        width: '100%'
    },
    headerTint: {
        backgroundColor: 'rgba(28, 46, 74, 0.13)'
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerHalf: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingHorizontal: 10,
        paddingVertical: 9,
        overflow: 'hidden'
    },
    headerTitle: {
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: 0.4,
        flexShrink: 1
    },
    headerDivider: {
        width: 0.5,
        alignItems: 'stretch',
        backgroundColor: 'rgba(255, 255, 255, 0.14)'
    },
    row: {
        flexDirection: 'row',
        gap: 8,
        paddingBottom: 8
    },
    half: {
        flex: 1,
        overflow: 'hidden',
        borderRadius: 16
    },
    halfBlur: {
        borderRadius: 16,
        overflow: 'hidden',
        flex: 1
    },
    halfTint: {
        backgroundColor: 'rgba(28, 46, 74, 0.13)',
        flex: 1
    },
    halfHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(255, 255, 255, 0.12)'
    },
    halfHeaderTitle: {
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: 0.4,
        flexShrink: 1
    },
    halfBody: {
        padding: 12
    }
})