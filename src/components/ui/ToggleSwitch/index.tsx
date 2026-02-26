import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Animated, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useContext } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';

interface ToggleSwitchProps {
    value: boolean;
    onValueChange: () => void;
}

export default function ToggleSwitch({ value, onValueChange }: ToggleSwitchProps) {
    const { colors } = useContext(ThemeContext);
    const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(anim, {
            toValue: value ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [value, anim]);

    const translateX = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [2, 32],
    });

    const bgInterpolate = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [
            'rgba(255,107,107,0.9)', // coral for light
            'rgba(255,140,106,0.9)', // softened coral for dark
        ],
    });

    const iconName = value ? 'moon' : 'sunny';
    const iconColor = value ? '#FFC14D' : '#FF6B6B';

    return (
        <TouchableOpacity activeOpacity={0.9} onPress={onValueChange}>
            <Animated.View style={[styles.track, { backgroundColor: bgInterpolate }]}>
                <Animated.View style={[styles.knob, { transform: [{ translateX }], backgroundColor: colors.card }]}>
                    <Ionicons name={iconName as any} size={14} color={iconColor} />
                </Animated.View>
            </Animated.View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    track: {
        width: 64,
        height: 32,
        borderRadius: 16,
        padding: 2,
        justifyContent: 'center',
    },
    knob: {
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
});
