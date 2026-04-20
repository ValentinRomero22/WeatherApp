import { Text } from 'react-native'

export const AppText = ({ size, color, style, children, ...props }) => {
    return (
        <Text style={[
            {
                fontFamily: 'System',
                fontWeight: '300',
                fontSize: size,
                color: color
            },
            style,
        ]}
            {...props}
        >
            {children}
        </Text>
    )
}