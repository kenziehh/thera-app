import ChatBotContainer from '@/features/chatbot/containers/ChatBotContainer'
import { useNavigation } from 'expo-router';
import React, { useLayoutEffect } from 'react'
import { SafeAreaView, Text, View } from 'react-native';

export default function ChatbotScreen() {
    const navigation = useNavigation();
    useLayoutEffect(() => {

        navigation.setOptions({
            header: () => (
                <SafeAreaView>
                    <View style={{ height: 60, backgroundColor: '#FFFFFF', justifyContent: 'center', padding: 10 }}>
                        <Text
                            style={{
                                position: 'absolute',
                                left: 16,
                                top: '50%',
                                transform: [{ translateY: -12 }],
                                fontSize: 24,
                                color: '#007AFF',
                                zIndex: 1,
                            }}
                            onPress={() => navigation.goBack()}
                        >
                            {'<'}
                        </Text>
                        <Text style={{ color: 'black', fontSize: 18, textAlign: "center" }}>Thera AI</Text>
                    </View>
                </SafeAreaView>

            )
        });
    }, [navigation]);
    return (
        <ChatBotContainer />
    )
}
