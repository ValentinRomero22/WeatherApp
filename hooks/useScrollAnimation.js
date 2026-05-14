import { useRef } from 'react'
import { Animated } from 'react-native'

import { HERO_FULL_HEIGHT, HERO_MIN_HIGHT, HERO_COLLAPSE_RANGE } from '../constants/layout'

export const useScrollAnimation = () => {
    const scrollY = useRef(new Animated.Value(0)).current

    const height = scrollY.interpolate({
        inputRange: [0, HERO_COLLAPSE_RANGE],
        outputRange: [HERO_FULL_HEIGHT, HERO_MIN_HIGHT],
        extrapolate: 'clamp'
    })

    const paddingTop = scrollY.interpolate({
        inputRange: [0, HERO_COLLAPSE_RANGE],
        outputRange: [48, 16],
        extrapolate: 'clamp'
    })

    const tempFontSize = scrollY.interpolate({
        inputRange: [0, HERO_COLLAPSE_RANGE],
        outputRange: [72, 28],
        extrapolate: 'clamp'
    })

    const conditionOpacity = scrollY.interpolate({
        inputRange: [0, HERO_COLLAPSE_RANGE * 0.5],
        outputRange: [1, 0],
        extrapolate: 'clamp'
    })

    const conditionHeight = scrollY.interpolate({
        inputRange: [0, HERO_COLLAPSE_RANGE * 0.5],
        outputRange: [20, 0],
        extrapolate: 'clamp',
    })

    const miniInfoOpacity = scrollY.interpolate({
        inputRange: [HERO_COLLAPSE_RANGE * 0.5, HERO_COLLAPSE_RANGE],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    })

    const onScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false },
    )

    return {
        scrollY,
        onScroll,
        height,
        paddingTop,
        tempFontSize,
        conditionOpacity,
        conditionHeight,
        miniInfoOpacity
    }
}