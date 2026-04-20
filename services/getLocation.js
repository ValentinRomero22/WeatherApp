import * as Location from 'expo-location'

import { getLocationPermissions } from "../helpers/getPermission"

export const getLocation = async () => {
    const hasPermission = await getLocationPermissions()

    if (!hasPermission) return null

    const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
    })

    return location
}