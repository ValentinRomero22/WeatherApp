import { View, StyleSheet } from "react-native"
import { AppText } from "./AppText"

export const DetailsWeatherItem = ({ size,
    icon,
    title,
    subtitles,
    data,
    description,
    image }) => {

    const isHalf = size === 'half'

    return (
        <View style={[styles.item, isHalf ? styles.halfItem : styles.fullItem]}>
            <View style={styles.titleContainer}>
                {icon}
                <AppText size={16} color={'#fff'}>{title}</AppText>
            </View>
            {
                isHalf
                    ? <>
                        <View style={styles.dataHalfContainer}>
                            <AppText size={32} color={'#fff'} style={styles.dataFirstItem}>{data?.first ?? ''}</AppText>
                            <AppText size={16} color={'#fff'}>{data?.second ?? ''}</AppText>
                        </View>
                        <View style={styles.imageContainer}>
                        </View>
                        <View style={styles.descriptionContainer}>
                            <AppText size={15} color={'#fff'}>{description}</AppText>
                        </View>
                    </>
                    :
                    <View style={styles.dataFullContainer}>
                        <View style={styles.firstDataBox}>
                            <View style={styles.dataRow}>
                                <AppText size={16} color={'#fff'}>{subtitles?.first ?? ''}</AppText>
                                <AppText size={16} color={'#fff'}>{data?.first ?? ''}</AppText>
                            </View>
                            <View style={styles.dataRow}>
                                <AppText size={16} color={'#fff'}>{subtitles?.second ?? ''}</AppText>
                                <AppText size={16} color={'#fff'}>{data?.second ?? ''}</AppText>
                            </View>
                            <View style={styles.dataRow}>
                                <AppText size={16} color={'#fff'}>{subtitles?.third ?? ''}</AppText>
                                <AppText size={16} color={'#fff'}>{data?.third ?? ''}</AppText>
                            </View>
                        </View>
                        <View style={styles.secondDataBox}>
                            {image}
                        </View>
                    </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        /* backgroundColor: 'rgba(255,255,255,0.12)', */
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        padding: 10,
        justifyContent: 'space-between',
        height: 180,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    titleContainer: {
        height: '15%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    dataHalfContainer: {
        height: '35%',
        justifyContent: 'center',
    },
    dataFullContainer: {
        height: '85%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    dataFirstItem: {
        fontWeight: '500'
    },
    imageContainer: {
        height: '20%',
    },
    descriptionContainer: {
        height: '20%',
    },
    halfItem: {
        flexBasis: '47%',
        flexGrow: 1,
    },
    firstDataBox: {
        height: '85%',
        flexBasis: '54%',
        flexGrow: 1,
        justifyContent: 'space-between'
    },
    secondDataBox: {
        flexBasis: '40%',
        flexGrow: 1,
        alignItems: 'center'
    },
    dataRow: {
        marginTop: 10,
        height: '25%',
        paddingEnd: 5,
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.3)',
    },
    fullItem: {
        flexBasis: '100%'
    }
})