import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface InputProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    multiline?: boolean;
}

export default function Input({ value, onChangeText, placeholder, multiline }: InputProps) {
    return (
        <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            style={[styles.input, multiline ? { height: 100, textAlignVertical: 'top' } : {}]}
            multiline={multiline}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 6,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
});
