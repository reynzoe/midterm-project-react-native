import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import { JobsContext } from '../context/JobsContext';
import { ThemeContext } from '../context/ThemeContext';

export default function AppliedJobsScreen({ navigation }: any) {
    const { appliedJobs } = useContext(JobsContext);
    const { colors } = useContext(ThemeContext);

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
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, shadowColor: colors.shadow }]}
                        activeOpacity={0.9}
                        onPress={() => navigation.navigate('JobDetail', { job: item.job })}
                    >
                        <Text style={[styles.jobTitle, { color: colors.text }]} numberOfLines={2}>{item.job.title}</Text>
                        <Text style={[styles.company, { color: colors.primary }]} numberOfLines={1}>{item.job.company}</Text>
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
                            <Text style={[styles.metaValue, { color: colors.text, flex: 1 }]} numberOfLines={3}>{item.why}</Text>
                        </View>
                        <Text style={[styles.time, { color: colors.subtext }]}>
                            {new Date(item.submittedAt).toLocaleString()}
                        </Text>
                    </TouchableOpacity>
                )}
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
    jobTitle: { fontSize: 16, fontWeight: '800', marginBottom: 4 },
    company: { fontSize: 14, fontWeight: '700', marginBottom: 8 },
    metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 },
    metaLabel: { fontSize: 12, fontWeight: '700' },
    metaValue: { fontSize: 12, flexShrink: 1 },
    time: { marginTop: 8, fontSize: 11 },
    empty: { alignItems: 'center', marginTop: 60, gap: 8, paddingHorizontal: 20 },
    emptyTitle: { fontSize: 18, fontWeight: '700' },
    emptySubtext: { fontSize: 13, textAlign: 'center', lineHeight: 18 },
});
