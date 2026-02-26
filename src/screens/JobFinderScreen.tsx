import React, { useEffect, useState, useContext } from 'react';
import { View, FlatList, Text, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { fetchJobs } from '../services/jobService';
import { ThemeContext } from '../context/ThemeContext';
import JobCard from '../components/JobCard';
import { Job } from '../types/job';
import ToggleSwitch from '../components/ui/ToggleSwitch';
import styles from './JobFinderScreen.styles';

export default function JobFinderScreen({ navigation }: any) {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [search, setSearch] = useState('');
    const { colors, isDark, toggleTheme } = useContext(ThemeContext);

    useEffect(() => {
        fetchJobs().then(setJobs);
    }, []);

    const filtered = jobs.filter(job =>
        job.title?.toLowerCase().includes(search.toLowerCase()) ||
        job.company?.toLowerCase().includes(search.toLowerCase())
    );

    const recentSearches = [
        { title: 'UX/UI Designer', location: 'California, USA' },
        { title: 'Product Designer', location: 'Remote' },
        { title: 'Frontend Engineer', location: 'New York, USA' },
    ];

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <FlatList
                data={filtered}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 28 }}
                ListHeaderComponent={
                    <View>
                        <View style={styles.hero}>
                            <View style={styles.facetOne} />
                            <View style={styles.facetTwo} />
                            <View style={styles.facetThree} />
                            <View style={styles.heroContent}>
                                <View style={styles.heroTopRow}>
                                    <View>
                                        <Text style={styles.heroKicker}>Browse curated roles</Text>
                                        <Text style={styles.heroTitle}>find your dream job</Text>
                                    </View>
                                    <View style={styles.heroActions}>
                                        <ToggleSwitch value={isDark} onValueChange={toggleTheme} />
                                        <TouchableOpacity
                                            style={styles.heroIconBtn}
                                            onPress={() => navigation.navigate('SavedJobs')}
                                            activeOpacity={0.85}
                                        >
                                            <Feather name="bookmark" size={18} color="#FFFFFF" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.heroSubtitleRow}>
                                    <Text style={styles.heroSubtitle}>Clean, modern picks refreshed hourly.</Text>
                                </View>
                                <View style={styles.searchRow}>
                                    <View style={[styles.searchField, { shadowColor: colors.shadow }]}>
                                        <Ionicons name="search" size={18} color={colors.primary} />
                                        <TextInput
                                            value={search}
                                            onChangeText={setSearch}
                                            placeholder="Job title, keywords..."
                                            placeholderTextColor="#94A3B8"
                                            style={styles.searchInput}
                                            returnKeyType="search"
                                            onSubmitEditing={() => {}}
                                        />
                                    </View>
                                    <TouchableOpacity
                                        style={[styles.searchButton, { backgroundColor: colors.primary, shadowColor: colors.primary }]}
                                        onPress={() => Keyboard.dismiss()}
                                        activeOpacity={0.9}
                                    >
                                        <Text style={styles.searchButtonText}>Search</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={styles.section}>
                            <View style={styles.sectionHeaderRow}>
                                <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent searches</Text>
                                <TouchableOpacity>
                                    <Text style={[styles.sectionLink, { color: colors.primary }]}>Clear</Text>
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                data={recentSearches}
                                keyExtractor={(item, index) => `${item.title}-${index}`}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
                                contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
                                renderItem={({ item }) => (
                                    <View style={[styles.recentCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                                        <Text style={[styles.recentTitle, { color: colors.text }]}>{item.title}</Text>
                                        <View style={styles.recentMetaRow}>
                                            <Ionicons name="location-outline" size={14} color={colors.subtext} />
                                            <Text style={[styles.recentMeta, { color: colors.subtext }]} numberOfLines={1}>
                                                {item.location}
                                            </Text>
                                        </View>
                                    </View>
                                )}
                            />
                        </View>

                        <View style={[styles.sectionHeaderRow, { paddingHorizontal: 16, marginTop: 4, marginBottom: 10 }]}>
                            <Text style={[styles.sectionTitle, { color: colors.text }]}>Job recommendations</Text>
                            <TouchableOpacity style={styles.filterRow} activeOpacity={0.8}>
                                <Text style={[styles.sectionLink, { color: colors.primary }]}>Filters</Text>
                                <Feather name="sliders" size={16} color={colors.primary} />
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                renderItem={({ item }) => (
                    <JobCard
                        job={item}
                        onApply={() => navigation.navigate('Apply', { job: item })}
                        onPress={() => navigation.navigate('JobDetail', { job: item })}
                    />
                )}
            />
        </View>
    );
}
