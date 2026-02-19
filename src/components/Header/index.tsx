import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ToggleSwitch from '../ui/ToggleSwitch';
import { ThemeContext } from '../../context/ThemeContext';

export default function Header() {
    const { isDark, toggleTheme, colors } = useContext(ThemeContext);

    return (
        <View style={[styles.container, { backgroundColor: colors.card }]}>
            <Text style={{ color: colors.text, fontSize: 20, fontWeight: 'bold' }}>Job Finder</Text>
            <ToggleSwitch value={isDark} onValueChange={toggleTheme} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
