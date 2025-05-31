import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react'
import { Alert, FlatList, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import ChatBubble from '../components/ChatBubble';
import { ChatBotService } from '../services/Chatbot.service';

export default function ChatBotContainer() {
    const [messages, setMessages] = useState([
        { id: '1', text: 'Hai, aku Thera AI. Apa ada yang mau kamu ceritakan?', isUser: false },
    ]);
    const [channelId, setChannelId] = useState<string | null>(null)
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false)
    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMsg = {
            id: Date.now().toString(),
            text: input,
            isUser: true,
        };
        let botMsg;
        try {
            setLoading(true)
            const data = await ChatBotService.postChat(input)
            setChannelId(data.channel?.id ?? "")

            if (!data.message?.content) {
                throw new Error("Bot response invalid or missing content.");
            }

            botMsg = {
                id: Date.now().toString(),
                text: data.message.content,
                isUser: false,
            };
        } catch (error: any) {
            console.error("Chatbot error:", error.message); // Ini penting untuk debugging
            Alert.alert("Error", error.message ?? "Terjadi kesalahan");
        }

        if (botMsg) {
            setMessages([...messages, newMsg, botMsg]);
        } else {
            setMessages([...messages, newMsg]);
        }
        setInput('');
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                data={messages}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <ChatBubble message={item.text} isUser={item.isUser} />}
                contentContainerStyle={styles.chat}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={input}
                    onChangeText={setInput}
                    placeholder="Type your message..."
                />
                <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                    <Ionicons name="send" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#fff',
    },
    chat: {
        padding: 10,
        paddingBottom: 80,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderTopColor: '#ccc',
        borderTopWidth: 1,
    },
    input: {
        flex: 1,
        height: 40,
        backgroundColor: '#eee',
        borderRadius: 20,
        paddingHorizontal: 15,
    },
    sendButton: {
        marginLeft: 10,
        backgroundColor: '#0066FF',
        padding: 10,
        borderRadius: 50,
    },
});