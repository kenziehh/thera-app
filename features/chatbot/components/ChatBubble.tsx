import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChatBubble({ message, isUser }: { message: string, isUser: boolean }) {
    return (
        <View style={[styles.container, isUser ? styles.user : styles.bot]}>
            <Text style={styles.text}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        maxWidth: '80%',
        padding: 10,
        marginVertical: 5,
        borderRadius: 12,
    },
    user: {
        backgroundColor: '#0066FF',
        alignSelf: 'flex-end',
        borderBottomRightRadius: 0,
    },
    bot: {
        backgroundColor: '#FFFFFF',
        alignSelf: 'flex-start',
        borderBottomLeftRadius: 0,
    },
    text: {
        color: '#000',
    },
});
