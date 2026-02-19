import React, { useEffect, useState, useContext } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
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
                <SearchBar value={search} onChangeText={setSearch} />
                <FlatList
                    data={filtered}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingBottom: 20 }}
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
    content: { flex: 1, paddingHorizontal: 12 },
});
