import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps {
    title: string;
    onPress: () => void;
    color?: string;
    textColor?: string;
    variant?: 'solid' | 'ghost';
}

export default function Button({ title, onPress, color, textColor, variant = 'solid' }: ButtonProps) {
    const isGhost = variant === 'ghost';

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.button,
                isGhost ? styles.ghost : styles.solid,
                isGhost ? { borderColor: color || '#1F6FEB' } : {},
                !isGhost && color ? { backgroundColor: color } : {},
            ]}
            activeOpacity={0.9}
        >
            <Text style={[
                styles.text,
                isGhost ? styles.ghostText : {},
                textColor ? { color: textColor } : isGhost && color ? { color } : {},
            ]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        paddingVertical: 12,
        marginVertical: 6,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    solid: {
        backgroundColor: '#1F6FEB',
    },
    ghost: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#1F6FEB',
    },
    text: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 14,
    },
    ghostText: {
        color: '#1F6FEB',
    },
});
