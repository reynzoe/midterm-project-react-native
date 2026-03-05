import React, { useContext } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { ThemeContext } from '../context/ThemeContext';

export default function BottomTabBar({ state, navigation }: BottomTabBarProps) {
    const { colors, isDark } = useContext(ThemeContext);

    const goTo = (route: string, params?: any) => navigation.navigate(route as never, params as never);
    const isActive = (route: string) => state.routeNames[state.index] === route;

    return (
        <View style={[
            styles.container,
            { backgroundColor: colors.card, borderTopColor: colors.border, shadowColor: colors.shadow },
        ]}>
            <TabButton
                label="Saved"
                icon="bookmark"
                active={isActive('SavedTab')}
                onPress={() => goTo('SavedTab')}
                colors={colors}
            />

            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => goTo('JobFinderTab', { triggerSearch: true })}
                style={[
                    styles.searchBtn,
                    {
                        backgroundColor: colors.primary,
                        shadowColor: colors.shadow,
                        borderColor: colors.border,
                    },
                ]}
            >
                <Feather name="search" size={20} color={isDark ? '#0B1624' : '#FFFFFF'} />
            </TouchableOpacity>

            <TabButton
                label="Browse"
                icon="grid"
                active={isActive('JobFinderTab')}
                onPress={() => goTo('JobFinderTab')}
                colors={colors}
            />
        </View>
    );
}

function TabButton({ label, icon, active, onPress, colors }: any) {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.85}
            style={styles.tabBtn}
        >
            <Feather name={icon} size={20} color={active ? colors.primary : colors.subtext} />
            <Text style={[
                styles.tabLabel,
                { color: active ? colors.primary : colors.subtext },
            ]}>
                {label}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: Platform.select({ ios: 14, android: 12, default: 12 }),
        borderTopWidth: 1,
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: -6 },
        shadowRadius: 12,
        elevation: 12,
    },
    tabBtn: {
        flex: 1,
        alignItems: 'center',
        gap: 4,
    },
    tabLabel: {
        fontSize: 12,
        fontWeight: '700',
    },
    searchBtn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
        borderWidth: 1,
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 12,
        elevation: 4,
    },
});
