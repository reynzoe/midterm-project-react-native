import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
}

export default function SearchBar({ value, onChangeText }: SearchBarProps) {
    return (
        <View style={styles.container}>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder="Search jobs..."
                style={styles.input}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    input: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#ccc',
    },
});
