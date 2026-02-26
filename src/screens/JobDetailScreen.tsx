import React, { useContext, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Header from '../components/Header';
import { ThemeContext } from '../context/ThemeContext';
import { JobsContext } from '../context/JobsContext';

export default function JobDetailScreen({ route, navigation }: any) {
    const { job } = route.params;
    const { colors } = useContext(ThemeContext);
    const { savedJobs, saveJob, removeJob } = useContext(JobsContext);

    const isSaved = savedJobs.some(j => j.id === job.id);
    const toggleSave = () => {
        if (isSaved) removeJob(job.id);
        else saveJob(job);
    };

    const paragraphs = useMemo(
        () => (job.description || '')
            .split(/\n+/)
            .map(p => p.trim())
            .filter(Boolean),
        [job.description],
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Header
                showBack
                onBackPress={() => navigation.goBack()}
                showHome
                onHomePress={() => navigation.reset({ index: 0, routes: [{ name: 'JobFinder' }] })}
            />
            <ScrollView contentContainerStyle={[styles.content, { paddingBottom: 40 }]}>
                <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, shadowColor: colors.shadow }]}>
                    <View style={styles.titleRow}>
                        <Text style={[styles.title, { color: colors.text }]}>{job.title}</Text>
                        <TouchableOpacity onPress={toggleSave} style={styles.iconBtn} activeOpacity={0.85}>
                            <Feather name={isSaved ? 'heart' : 'heart'} size={18} color={isSaved ? colors.primary : colors.subtext} />
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.company, { color: colors.subtext }]}>{job.company}</Text>
                    <View style={styles.metaRow}>
                        {job.salary ? (
                            <View style={[styles.metaChip, { backgroundColor: colors.primaryMuted }]}>
                                <Feather name="dollar-sign" size={13} color={colors.primary} />
                                <Text style={[styles.metaText, { color: colors.primary }]}>{job.salary}</Text>
                            </View>
                        ) : null}
                        {job.location ? (
                            <View style={styles.metaChip}>
                                <Feather name="map-pin" size={13} color={colors.subtext} />
                                <Text style={[styles.metaText, { color: colors.subtext }]}>{job.location}</Text>
                            </View>
                        ) : null}
                    </View>
                    {paragraphs.length ? (
                        <View style={styles.descriptionBlock}>
                            <Text style={[styles.sectionHeading, { color: colors.text }]}>Role details</Text>
                            {paragraphs.map((p: string, idx: number) => (
                                <Text
                                    key={idx}
                                    style={[styles.description, { color: colors.subtext }]}
                                >
                                    {p}
                                </Text>
                            ))}
                        </View>
                    ) : null}
                    <View style={styles.actionsRow}>
                        <TouchableOpacity
                            style={[styles.primaryBtn, { backgroundColor: colors.primary }]}
                            onPress={() => navigation.navigate('Apply', { job })}
                            activeOpacity={0.9}
                        >
                            <Text style={styles.primaryText}>Quick Apply</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.outlineBtn,
                                { borderColor: isSaved ? colors.primary : colors.border, backgroundColor: isSaved ? colors.primaryMuted : 'transparent' },
                            ]}
                            onPress={toggleSave}
                            activeOpacity={0.9}
                        >
                            <Text style={[styles.outlineText, { color: isSaved ? colors.primary : colors.text }]}>{isSaved ? 'Saved' : 'Save'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { paddingHorizontal: 16, paddingTop: 12 },
    card: {
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 18,
        elevation: 2,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 8,
    },
    title: { fontSize: 20, fontWeight: '800', flex: 1 },
    company: { marginTop: 4, fontSize: 14, fontWeight: '700' },
    metaRow: { flexDirection: 'row', gap: 10, marginTop: 10, flexWrap: 'wrap' },
    metaChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 10,
        backgroundColor: '#F5F0E9',
    },
    metaText: { fontSize: 12, fontWeight: '700' },
    description: { marginTop: 12, fontSize: 14, lineHeight: 20 },
    descriptionBlock: { marginTop: 14, gap: 8 },
    sectionHeading: { fontSize: 16, fontWeight: '800' },
    actionsRow: { flexDirection: 'row', gap: 12, marginTop: 16 },
    primaryBtn: { flex: 1, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    primaryText: { color: '#fff', fontWeight: '700', fontSize: 15 },
    outlineBtn: { paddingHorizontal: 18, height: 48, borderRadius: 12, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
    outlineText: { fontWeight: '700', fontSize: 15 },
    iconBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
});
