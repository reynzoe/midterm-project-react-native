import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps {
    title: string;
    onPress: () => void;
    color?: string;
}

export default function Button({ title, onPress, color }: ButtonProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, { backgroundColor: color || '#0A66C2' }]}
        >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 6,
        marginVertical: 5,
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontWeight: '600',
    },
});
