import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { AppContainer } from './src/components/AppContainer'
import { WeatherProvider } from './context/WeatherContext'

export default function App() {

    return (
        <WeatherProvider>
            <SafeAreaProvider>
                <View style={styles.container}>
                    <StatusBar style="auto" />
                    <AppContainer />
                </View>
            </SafeAreaProvider>
        </WeatherProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#54abf3',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
