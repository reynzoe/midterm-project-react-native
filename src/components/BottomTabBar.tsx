import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform, Animated, PanResponder, LayoutChangeEvent } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { ThemeContext } from '../context/ThemeContext';

export default function BottomTabBar({ state, navigation }: BottomTabBarProps) {
    const { colors, isDark } = useContext(ThemeContext);
    const [barWidth, setBarWidth] = useState(0);
    const pillX = useRef(new Animated.Value(0)).current;
    const dragX = useRef(new Animated.Value(0)).current;
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gesture) => {
                const clamped = Math.max(-30, Math.min(30, gesture.dx));
                dragX.setValue(clamped);
            },
            onPanResponderRelease: () => {
                Animated.spring(dragX, { toValue: 0, useNativeDriver: true, friction: 6, tension: 120 }).start();
            },
        })
    ).current;

    const goTo = (route: string, params?: any) => navigation.navigate(route as never, params as never);
    const isActive = (route: string) => state.routeNames[state.index] === route;

    useEffect(() => {
        const target =
            state.index === 0
                ? 0
                : barWidth > 0
                    ? barWidth - (barWidth / 3) // shift pill toward second tab area
                    : 0;
        Animated.spring(pillX, { toValue: target, useNativeDriver: true, friction: 8, tension: 140 }).start();
    }, [state.index, barWidth, pillX]);

    const onLayoutBar = (e: LayoutChangeEvent) => {
        setBarWidth(e.nativeEvent.layout.width - 32); // paddingHorizontal 16*2
    };

    return (
        <View style={styles.blurWrap}>
            <View
                onLayout={onLayoutBar}
                style={[
                    styles.container,
                    {
                        backgroundColor: isDark ? 'rgba(12,18,28,0.85)' : 'rgba(255,255,255,0.78)',
                        borderTopColor: colors.border,
                        shadowColor: colors.shadow,
                    },
                ]}
            >
                <Animated.View
                    style={[
                        styles.pill,
                        {
                            transform: [{ translateX: pillX }],
                            backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.5)',
                        },
                    ]}
                />

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
                    {...panResponder.panHandlers}
                >
                    <Animated.View style={{ transform: [{ translateX: dragX }] }}>
                        <Feather name="search" size={20} color={isDark ? '#0B1624' : '#FFFFFF'} />
                    </Animated.View>
                </TouchableOpacity>

                <TabButton
                    label="Browse"
                    icon="grid"
                    active={isActive('JobFinderTab')}
                    onPress={() => goTo('JobFinderTab')}
                    colors={colors}
                />
            </View>
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
    blurWrap: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
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
        overflow: 'hidden',
    },
    pill: {
        position: 'absolute',
        top: 6,
        bottom: 6,
        width: 96,
        borderRadius: 18,
        zIndex: 0,
    },
    tabBtn: {
        flex: 1,
        alignItems: 'center',
        gap: 4,
        zIndex: 1,
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
