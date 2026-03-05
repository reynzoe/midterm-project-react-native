import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import styles from './StartScreen.styles';

export default function StartScreen({ navigation }: any) {
    const palette = useMemo(() => ({
        primary: '#1DA1F2',
        primaryDeep: '#0A8DDC',
        primarySoft: '#5CB8FF',
        accent: '#8CD6FF',
    }), []);

    return (
        <View style={[styles.container, { backgroundColor: palette.primary }]}>
            <StatusBar style="light" />

            <View style={[styles.facetOne, { backgroundColor: palette.accent }]} />
            <View style={[styles.facetTwo, { backgroundColor: palette.primarySoft }]} />
            <View style={[styles.facetThree, { backgroundColor: palette.primaryDeep }]} />
            <View style={[styles.wave, { backgroundColor: palette.primarySoft }]} />

            <View style={styles.content}>
                <Text style={styles.brand}>Aspire</Text>
                <Text style={styles.subtitle}>Already signed in. Begin exploring curated roles instantly.</Text>
                <Text style={styles.tagline}>Aspire. Apply. Achieve.</Text>
            </View>

            <TouchableOpacity
                style={styles.beginBtn}
                activeOpacity={0.9}
                onPress={() => navigation.replace('Main', { screen: 'JobFinderTab' })}
            >
                <Text style={[styles.beginText, { color: palette.primaryDeep }]}>Begin</Text>
                <Feather name="arrow-right" size={18} color={palette.primaryDeep} />
            </TouchableOpacity>
        </View>
    );
}
