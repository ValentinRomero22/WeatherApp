import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import Feather from '@expo/vector-icons/Feather';

export const Calendar = ({ size, color }) => {
    return (
        <FontAwesome6 name="calendar-week" size={size} color={color} />
    )
}

export const Umbrella = ({ size, color }) => {
    return (
        <FontAwesome6 name="umbrella" size={size} color={color} />
    )
}

export const Thermometer = ({ size, color }) => {
    return (
        <FontAwesome6 name="temperature-high" size={size} color={color} />
    )
}

export const Sun = ({ size, color }) => {
    return (
        <FontAwesome6 name="sun" size={size} color={color} />
    )
}

export const Wind = ({ size, color }) => {
    return (
        <FontAwesome6 name="wind" size={size} color={color} />
    )
}

export const Sunrise = ({ size, color }) => {
    return (
        <Feather name="sunrise" size={size} color={color} />
    )
}

export const Sunset = ({ size, color }) => {
    return (
        <Feather name="sunset" size={size} color={color} />
    )
}

export const Visibility = ({ size, color }) => {
    return (
        <FontAwesome6 name="eye" size={size} color={color} />
    )
}

export const Humidity = ({ size, color }) => {
    return (
        <FontAwesome6 name="water" size={size} color={color} />
    )
}

export const Moon = ({ size, color }) => {
    return (
        <FontAwesome6 name="moon" size={size} color={color} />
    )
}

export const AvgTemp = ({ size, color }) => {
    return (
        <FontAwesome6 name="chart-simple" size={size} color={color} />
    )
}

export const Pressure = ({ size, color }) => {
    return (
        <FontAwesome6 name="gauge" size={size} color={color} />
    )
}