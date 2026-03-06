import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

interface ToastProps {
    message: string | null;
}

export default function Toast({ message }: ToastProps) {
    const slide = useRef(new Animated.Value(120)).current;

    useEffect(() => {
        if (message) {
            Animated.spring(slide, {
                toValue: 0,
                useNativeDriver: true,
                friction: 8,
                tension: 120,
            }).start();
        } else {
            Animated.timing(slide, {
                toValue: 120,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }
    }, [message, slide]);

    if (!message) return null;

    return (
        <Animated.View style={[styles.container, { transform: [{ translateY: slide }] }]}>
            <View style={styles.toast}>
                <Text style={styles.text}>{message}</Text>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 24,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 99,
        pointerEvents: 'none',
    },
    toast: {
        paddingHorizontal: 18,
        paddingVertical: 12,
        backgroundColor: 'rgba(29,161,242,0.96)',
        borderRadius: 18,
        shadowOpacity: 0.18,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        elevation: 6,
        minWidth: '70%',
        maxWidth: '92%',
        alignItems: 'center',
    },
    text: {
        color: '#FFFFFF',
        fontWeight: '800',
        fontSize: 14,
        letterSpacing: 0.3,
    },
});
