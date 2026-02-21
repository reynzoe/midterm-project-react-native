import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ToggleSwitch from '../ui/ToggleSwitch';
import { ThemeContext } from '../../context/ThemeContext';

export default function Header() {
    const { isDark, toggleTheme, colors } = useContext(ThemeContext);

    return (
        <View style={[styles.container, {
            backgroundColor: colors.card,
            borderBottomColor: colors.border,
            shadowColor: colors.shadow,
        }]}> 
            <View>
                <Text style={[styles.title, { color: colors.text }]}>Job Finder</Text>
                <Text style={[styles.subtitle, { color: colors.subtext }]}>Find your next move faster</Text>
            </View>
            <ToggleSwitch value={isDark} onValueChange={toggleTheme} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 18,
        elevation: 2,
    },
    title: {
        fontSize: 20,
        fontWeight: '800',
        letterSpacing: 0.2,
    },
    subtitle: {
        fontSize: 12,
        marginTop: 2,
    },
});
