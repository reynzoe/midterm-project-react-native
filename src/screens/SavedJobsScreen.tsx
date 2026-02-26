import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import JobCard from '../components/JobCard';
import { JobsContext } from '../context/JobsContext';
import { ThemeContext } from '../context/ThemeContext';

export default function SavedJobsScreen({ navigation }: any) {
    const { savedJobs } = useContext(JobsContext);
    const { colors } = useContext(ThemeContext);

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Header
                showHome
                onHomePress={() => navigation.reset({
                    index: 0,
                    routes: [{ name: 'JobFinder' }],
                })}
            />
            <FlatList
                data={savedJobs}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                ListHeaderComponent={
                    <View>
                        <TouchableOpacity
                            onPress={() => navigation.reset({
                                index: 0,
                                routes: [{ name: 'JobFinder' }],
                            })}
                            style={[styles.backBtn, { borderColor: colors.border }]}
                        >
                            <Text style={{ fontSize: 18, color: colors.text }}>‹</Text>
                            <Text style={[styles.backText, { color: colors.primary }]}>Back to search</Text>
                        </TouchableOpacity>

                        <View style={[styles.pageTitleRow, { borderBottomColor: colors.border }]}>
                            <View style={[styles.emojiCircle, { backgroundColor: colors.primaryMuted }]}>
                                <Text style={{ fontSize: 18 }}>🔖</Text>
                            </View>
                            <View>
                                <Text style={[styles.pageTitle, { color: colors.text }]}>Saved jobs</Text>
                                <Text style={[styles.pageSubtitle, { color: colors.subtext }]}>
                                    {savedJobs.length} saved • quick apply ready
                                </Text>
                            </View>
                        </View>
                    </View>
                }
                ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
                renderItem={({ item }) => (
                    <JobCard
                        job={item}
                        onApply={() => navigation.navigate('Apply', { job: item, fromSaved: true })}
                        onPress={() => navigation.navigate('JobDetail', { job: item })}
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={{ fontSize: 48 }}>🔖</Text>
                        <Text style={[styles.emptyTitle, { color: colors.text }]}>No saved jobs yet</Text>
                        <Text style={[styles.emptySubtext, { color: colors.subtext }]}>
                            Tap the bookmark on a job card to keep it here for later.
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.reset({
                                index: 0,
                                routes: [{ name: 'JobFinder' }],
                            })}
                            style={[styles.browseBtn, { backgroundColor: colors.primary }]}
                        >
                            <Text style={styles.browseBtnText}>Browse jobs</Text>
                        </TouchableOpacity>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    list: { paddingHorizontal: 14, paddingBottom: 40 },
    backBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingVertical: 12,
        borderBottomWidth: 1,
        marginBottom: 4,
    },
    backText: {
        fontSize: 14,
        fontWeight: '600',
    },
    pageTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 14,
        borderBottomWidth: 1,
        marginBottom: 8,
    },
    emojiCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pageTitle: {
        fontSize: 20,
        fontWeight: '800',
    },
    pageSubtitle: {
        fontSize: 13,
        marginTop: 2,
    },
    empty: {
        alignItems: 'center',
        marginTop: 80,
        gap: 10,
        paddingHorizontal: 30,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '700',
    },
    emptySubtext: {
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
    },
    browseBtn: {
        marginTop: 10,
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    browseBtnText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 14,
    },
});
