import React, { useContext } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { ThemeContext } from '../../../context/ThemeContext';

interface InputProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    multiline?: boolean;
}

export default function Input({ value, onChangeText, placeholder, multiline }: InputProps) {
    const { colors } = useContext(ThemeContext);

    return (
        <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={colors.subtext}
            style={[styles.input, {
                backgroundColor: colors.card,
                color: colors.text,
                borderColor: colors.border,
                shadowColor: colors.shadow,
            }, multiline ? { height: 100, textAlignVertical: 'top' } : {}]}
            multiline={multiline}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        padding: 12,
        borderRadius: 10,
        marginVertical: 6,
        borderWidth: 1,
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 14,
        elevation: 1,
        fontSize: 14,
    },
});
