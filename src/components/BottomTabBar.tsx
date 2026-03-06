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
    const pressScale = useRef(new Animated.Value(1)).current;
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
        const count = state.routes.length || 1;
        const segment = barWidth > 0 ? barWidth / count : 0;
        const target = segment * state.index;
        Animated.spring(pillX, { toValue: target, useNativeDriver: true, friction: 8, tension: 140 }).start();
    }, [state.index, barWidth, pillX, state.routes.length]);

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
                        backgroundColor: isDark ? 'rgba(12,18,28,0.6)' : 'rgba(255,255,255,0.55)',
                        shadowColor: colors.shadow,
                        borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.06)',
                    },
                ]}
            >
                <View style={styles.gloss} />
                <Animated.View
                    style={[
                        styles.pill,
                        {
                            transform: [{ translateX: pillX }],
                            backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.35)',
                            borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.22)',
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
                onPressIn={() => Animated.spring(pressScale, { toValue: 0.9, useNativeDriver: true }).start()}
                onPressOut={() => Animated.spring(pressScale, { toValue: 1, useNativeDriver: true, friction: 4 }).start()}
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
                <Animated.View style={{ transform: [{ translateX: dragX }, { scale: pressScale }] }}>
                    <Feather name="search" size={20} color={isDark ? '#0B1624' : '#FFFFFF'} />
                </Animated.View>
            </TouchableOpacity>

            <TabButton
                label="Applied"
                icon="check-circle"
                active={isActive('AppliedTab')}
                onPress={() => goTo('AppliedTab')}
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
        bottom: 10,
        alignItems: 'center',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: Platform.select({ ios: 14, android: 12, default: 12 }),
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: -6 },
        shadowRadius: 12,
        elevation: 12,
        overflow: 'hidden',
        borderRadius: 32,
        width: '92%',
        borderWidth: 1,
    },
    gloss: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.28)',
        zIndex: 2,
    },
    pill: {
        position: 'absolute',
        top: 6,
        bottom: 6,
        width: 96,
        borderRadius: 18,
        zIndex: 0,
        borderWidth: 1,
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
        width: 54,
        height: 54,
        borderRadius: 27,
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
