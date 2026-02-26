import React, { useEffect, useState, useContext } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { fetchJobs } from '../services/jobService';
import { ThemeContext } from '../context/ThemeContext';
import Header from '../components/Header';
import JobCard from '../components/JobCard';
import SearchBar from '../components/ui/SearchBar';
import { Job } from '../types/job';

export default function JobFinderScreen({ navigation }: any) {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [search, setSearch] = useState('');
    const { colors } = useContext(ThemeContext);

    useEffect(() => {
        fetchJobs().then(setJobs);
    }, []);

    const filtered = jobs.filter(job =>
        job.title?.toLowerCase().includes(search.toLowerCase()) ||
        job.company?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}> 
            <Header />
            <View style={styles.content}>
                <View style={styles.headingRow}>
                    <View>
                        <Text style={[styles.sectionTitle, { color: colors.text }]}>Discover roles</Text>
                        <Text style={[styles.sectionSubtitle, { color: colors.subtext }]}>Curated picks refreshed hourly.</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SavedJobs')}
                        style={[styles.savedLink, { borderColor: colors.border, backgroundColor: colors.card }]}
                    >
                        <Text style={[styles.savedLinkText, { color: colors.primary }]}>Saved jobs</Text>
                    </TouchableOpacity>
                </View>
                <SearchBar value={search} onChangeText={setSearch} />
                <FlatList
                    data={filtered}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
                    renderItem={({ item }) => (
                        <JobCard
                            job={item}
                            onApply={() => navigation.navigate('Apply', { job: item })}
                        />
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { flex: 1, paddingHorizontal: 16, paddingTop: 12 },
    headingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
    },
    sectionTitle: { fontSize: 18, fontWeight: '800', marginBottom: 4 },
    sectionSubtitle: { fontSize: 13, marginBottom: 8 },
    savedLink: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
        borderWidth: 1,
    },
    savedLinkText: {
        fontWeight: '700',
        fontSize: 13,
    },
});
