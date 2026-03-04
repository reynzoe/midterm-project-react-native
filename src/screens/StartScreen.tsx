import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import styles from './StartScreen.styles';

export default function StartScreen({ navigation }: any) {
    const palette = useMemo(() => ({
        coral: '#FF6B6B',
        coralDeep: '#FF5A5A',
        coralSoft: '#FF8C6A',
        gold: '#FFB100',
    }), []);

    return (
        <View style={[styles.container, { backgroundColor: palette.coral }]}>
            <StatusBar style="light" />

            <View style={[styles.facetOne, { backgroundColor: palette.coralSoft }]} />
            <View style={[styles.facetTwo, { backgroundColor: palette.gold }]} />
            <View style={[styles.facetThree, { backgroundColor: palette.coralDeep }]} />
            <View style={[styles.wave, { backgroundColor: palette.coralSoft }]} />

            <View style={styles.content}>
                <Text style={styles.brand}>Aspire</Text>
                <Text style={styles.subtitle}>Already signed in. Begin exploring curated roles instantly.</Text>
                <Text style={styles.tagline}>Aspire. Apply. Achieve.</Text>
            </View>

            <TouchableOpacity
                style={styles.beginBtn}
                activeOpacity={0.9}
                onPress={() => navigation.replace('JobFinder')}
            >
                <Text style={[styles.beginText, { color: palette.coral }]}>Begin</Text>
                <Feather name="arrow-right" size={18} color={palette.coral} />
            </TouchableOpacity>
        </View>
    );
}
