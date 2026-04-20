import * as Location from 'expo-location'

export const getLocationPermissions = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()

    if (status !== 'granted') return false

    return true
}