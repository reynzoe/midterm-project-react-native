import React, { useContext, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Header from '../components/Header';
import { JobsContext } from '../context/JobsContext';
import { ThemeContext } from '../context/ThemeContext';

export default function AppliedJobsScreen({ navigation }: any) {
    const { appliedJobs, removeApplied } = useContext(JobsContext);
    const { colors } = useContext(ThemeContext);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Header
                showHome
                onHomePress={() => navigation.navigate('Main', { screen: 'JobFinderTab' })}
            />
            <FlatList
                data={appliedJobs}
                keyExtractor={(item) => `${item.job.id}-${item.submittedAt}`}
                contentContainerStyle={[styles.list, { paddingBottom: 140 }]}
                ListHeaderComponent={
                    <View style={[styles.header, { borderBottomColor: colors.border }]}>
                        <Text style={[styles.title, { color: colors.text }]}>Applied jobs</Text>
                        <Text style={[styles.subtitle, { color: colors.subtext }]}>
                            {appliedJobs.length} submitted
                        </Text>
                    </View>
                }
                ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                renderItem={({ item }) => {
                    const expanded = expandedId === item.job.id;
                    return (
                    <TouchableOpacity
                        style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, shadowColor: colors.shadow }]}
                        activeOpacity={0.9}
                        onPress={() => setExpandedId(expanded ? null : item.job.id)}
                    >
                        <View style={styles.titleRow}>
                            <Text style={[styles.jobTitle, { color: colors.text }]} numberOfLines={2}>{item.job.title}</Text>
                            <View style={[styles.pendingPill, { backgroundColor: '#FEE2E2', borderColor: '#FECACA' }]}>
                                <Text style={styles.pendingText}>Pending</Text>
                            </View>
                        </View>
                        <Text style={[styles.company, { color: colors.primary }]} numberOfLines={1}>{item.job.company}</Text>
                        {expanded && (
                            <View style={{ marginTop: 8, gap: 4 }}>
                                <View style={styles.metaRow}>
                                    <Text style={[styles.metaLabel, { color: colors.subtext }]}>Name:</Text>
                                    <Text style={[styles.metaValue, { color: colors.text }]} numberOfLines={1}>{item.name}</Text>
                                </View>
                                <View style={styles.metaRow}>
                                    <Text style={[styles.metaLabel, { color: colors.subtext }]}>Email:</Text>
                                    <Text style={[styles.metaValue, { color: colors.text }]} numberOfLines={1}>{item.email}</Text>
                                </View>
                                <View style={styles.metaRow}>
                                    <Text style={[styles.metaLabel, { color: colors.subtext }]}>Phone:</Text>
                                    <Text style={[styles.metaValue, { color: colors.text }]} numberOfLines={1}>{item.phone}</Text>
                                </View>
                                <View style={[styles.metaRow, { alignItems: 'flex-start' }]}>
                                    <Text style={[styles.metaLabel, { color: colors.subtext }]}>Pitch:</Text>
                                    <Text style={[styles.metaValue, { color: colors.text, flex: 1 }]}>{item.why}</Text>
                                </View>
                                <Text style={[styles.time, { color: colors.subtext }]}>
                                    {new Date(item.submittedAt).toLocaleString()}
                                </Text>
                                <TouchableOpacity
                                    style={[styles.unsendBtn, { borderColor: colors.border, backgroundColor: colors.primaryMuted }]}
                                    activeOpacity={0.85}
                                    onPress={() => {
                                        Alert.alert(
                                            'Unsend application?',
                                            'Are you sure you want to unsend this application?',
                                            [
                                                { text: 'Cancel', style: 'cancel' },
                                                { text: 'Unsend', style: 'destructive', onPress: () => removeApplied(item.job.id) },
                                            ],
                                        );
                                    }}
                                >
                                    <Text style={[styles.unsendText, { color: colors.primary }]}>Unsend application</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.learnMoreBtn, { borderColor: colors.border, backgroundColor: colors.card, shadowColor: colors.shadow }]}
                                    activeOpacity={0.9}
                                    onPress={() => navigation.navigate('JobDetail', { job: item.job })}
                                >
                                    <Text style={[styles.learnMoreText, { color: colors.primary }]}>Learn more</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </TouchableOpacity>
                )}}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={{ fontSize: 40 }}>📨</Text>
                        <Text style={[styles.emptyTitle, { color: colors.text }]}>No applications yet</Text>
                        <Text style={[styles.emptySubtext, { color: colors.subtext }]}>Apply to a role to see it saved here.</Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    list: { paddingHorizontal: 14 },
    header: {
        paddingVertical: 14,
        borderBottomWidth: 1,
        marginBottom: 8,
    },
    title: { fontSize: 20, fontWeight: '800' },
    subtitle: { fontSize: 13 },
    card: {
        padding: 14,
        borderRadius: 14,
        borderWidth: 1,
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 10,
        elevation: 2,
    },
    jobTitle: { fontSize: 16, fontWeight: '800', marginBottom: 4, flexShrink: 1, minWidth: 0, flex: 1 },
    company: { fontSize: 14, fontWeight: '700', marginBottom: 8 },
    titleRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, flexWrap: 'wrap' },
    metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 },
    metaLabel: { fontSize: 12, fontWeight: '700' },
    metaValue: { fontSize: 12, flexShrink: 1 },
    time: { marginTop: 8, fontSize: 11 },
    pendingPill: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 10,
        borderWidth: 1,
        alignSelf: 'flex-start',
    },
    pendingText: { color: '#DC2626', fontSize: 11, fontWeight: '800', letterSpacing: 0.2 },
    unsendBtn: {
        marginTop: 10,
        paddingVertical: 10,
        borderRadius: 12,
        borderWidth: 1,
        alignItems: 'center',
    },
    unsendText: { fontWeight: '800', fontSize: 13 },
    learnMoreBtn: {
        marginTop: 8,
        paddingVertical: 10,
        borderRadius: 12,
        borderWidth: 1,
        alignItems: 'center',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 10,
        elevation: 2,
    },
    learnMoreText: { fontWeight: '800', fontSize: 13 },
    empty: { alignItems: 'center', marginTop: 60, gap: 8, paddingHorizontal: 20 },
    emptyTitle: { fontSize: 18, fontWeight: '700' },
    emptySubtext: { fontSize: 13, textAlign: 'center', lineHeight: 18 },
});
