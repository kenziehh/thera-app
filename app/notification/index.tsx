import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function NotificationScreen() {
    return (
        <SafeAreaView className='flex-1 bg-white-300'>
            <View>
                <Text>Notofication Screen</Text>
            </View>
        </SafeAreaView>
    )
}
