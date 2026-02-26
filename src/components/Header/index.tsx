import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import ToggleSwitch from '../ui/ToggleSwitch';
import { ThemeContext } from '../../context/ThemeContext';

interface HeaderProps {
    showBack?: boolean;
    onBackPress?: () => void;
    showHome?: boolean;
    onHomePress?: () => void;
}

export default function Header({ showBack = false, onBackPress, showHome = false, onHomePress }: HeaderProps) {
    const { isDark, toggleTheme, colors } = useContext(ThemeContext);

    return (
        <View style={[styles.container, {
            backgroundColor: colors.card,
            borderBottomColor: colors.border,
            shadowColor: colors.shadow,
        }]}> 
            <View style={styles.leftRow}>
                {showBack && (
                    <TouchableOpacity onPress={onBackPress} style={styles.iconBtn}>
                        <Feather name="arrow-left" size={18} color={colors.text} />
                    </TouchableOpacity>
                )}
                <View>
                    <Text style={[styles.title, { color: colors.text }]}>Aspire</Text>
                    <Text style={[styles.subtitle, { color: colors.subtext }]}>Find your next move faster</Text>
                </View>
            </View>
            <View style={styles.rightRow}>
                {showHome && (
                    <TouchableOpacity onPress={onHomePress} style={styles.iconBtn}>
                        <Feather name="home" size={18} color={colors.text} />
                    </TouchableOpacity>
                )}
                <ToggleSwitch value={isDark} onValueChange={toggleTheme} />
            </View>
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
    leftRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    rightRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: '800',
        letterSpacing: 0.2,
    },
    subtitle: {
        fontSize: 12,
    },
    iconBtn: {
        width: 34,
        height: 34,
        borderRadius: 17,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
