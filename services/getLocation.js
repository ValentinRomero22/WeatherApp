import * as Location from 'expo-location'
import * as Localization from 'expo-localization'

import { getLocationPermissions } from "../helpers/getPermission"

export const getLocation = async () => {
    const hasPermission = await getLocationPermissions()

    if (!hasPermission) return null

    const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
    })

    const timezone = Localization.getCalendars()[0].timeZone

    return { location, timezone }
}