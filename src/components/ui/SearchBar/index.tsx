import React, { useContext } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { ThemeContext } from '../../../context/ThemeContext';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
}

export default function SearchBar({ value, onChangeText }: SearchBarProps) {
    const { colors } = useContext(ThemeContext);

    return (
        <View style={styles.container}>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder="Search roles, companies..."
                placeholderTextColor={colors.subtext}
                style={[styles.input, {
                    backgroundColor: colors.card,
                    color: colors.text,
                    borderColor: colors.border,
                    shadowColor: colors.shadow,
                }]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    input: {
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 12,
        elevation: 1,
        fontSize: 14,
    },
});
