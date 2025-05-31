import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import ChatBubble from '../components/ChatBubble';
import { ChatBotService } from '../services/Chatbot.service';

export default function ChatBotContainer() {
    const [messages, setMessages] = useState([
        { id: '1', text: 'Hai, aku Thera AI. Apa ada yang mau kamu ceritakan?', isUser: false },
    ]);
    const [channelId, setChannelId] = useState<string | null>(null);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMsg = {
            id: Date.now().toString(),
            text: input,
            isUser: true,
        };

        const thinkingMsg = {
            id: 'thinking',
            text: 'Sedang berpikir...',
            isUser: false,
            isThinking: true,
        };

        setMessages(prev => [...prev, newMsg, thinkingMsg]);
        setInput('');
        setLoading(true);

        try {
            const data = await ChatBotService.postChat(input);
            setChannelId(data.channel?.id ?? "");

            if (!data.message?.content) {
                throw new Error("Bot response invalid or missing content.");
            }

            const botMsg = {
                id: Date.now().toString(),
                text: data.message.content,
                isUser: false,
            };

            setMessages(prev => [...prev.filter(msg => msg.id !== 'thinking'), botMsg]);
        } catch (error: any) {
            Alert.alert("Error", error.message ?? "Terjadi kesalahan");
            setMessages(prev => prev.filter(msg => msg.id !== 'thinking'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            >
                <FlatList
                    data={messages}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <ChatBubble message={item.text} isUser={item.isUser} />
                    )}
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
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    chat: {
        padding: 10,
        paddingBottom: 80,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
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
