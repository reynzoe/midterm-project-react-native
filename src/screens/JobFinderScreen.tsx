import React, { useEffect, useState, useContext, useMemo, useRef } from 'react';
import { View, FlatList, Text, TouchableOpacity, TextInput, Keyboard, Animated, Easing } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { fetchJobs } from '../services/jobService';
import { ThemeContext } from '../context/ThemeContext';
import JobCard from '../components/JobCard';
import { Job } from '../types/job';
import ToggleSwitch from '../components/ui/ToggleSwitch';
import styles from './JobFinderScreen.styles';

type RecentSearch = { query: string };

export default function JobFinderScreen({ navigation }: any) {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [search, setSearch] = useState('');
    const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
    const [seniority, setSeniority] = useState<'any' | 'junior' | 'senior'>('any');
    const [sortBy, setSortBy] = useState<'company' | 'title'>('company');
    const [showFilters, setShowFilters] = useState(false);
    const filterAnim = useRef(new Animated.Value(0)).current;
    const { colors, isDark, toggleTheme } = useContext(ThemeContext);

    useEffect(() => {
        fetchJobs().then(setJobs);
    }, []);

    const seniorWords = useMemo(() => ['senior', 'sr', 'lead', 'principal', 'staff', 'manager'], []);
    const juniorWords = useMemo(() => ['junior', 'jr', 'entry', 'associate', 'assistant'], []);
    const collator = useMemo(() => new Intl.Collator(undefined, { sensitivity: 'base', numeric: false }), []);

    const containsWord = (text: string, words: string[]) =>
        words.some(w => new RegExp(`\\b${w.replace('.', '\\.')}\\b`, 'i').test(text));

    const matchesSeniority = (job: Job) => {
        if (seniority === 'any') return true;

        const title = (job.title ?? '').toLowerCase();
        const desc = (job.description ?? '').toLowerCase();

        const titleSenior = containsWord(title, seniorWords);
        const titleJunior = containsWord(title, juniorWords);
        const descJunior = containsWord(desc, juniorWords);

        if (seniority === 'senior') return titleSenior;

        // junior filter: prefer title signal; if absent, allow description junior only when title is not senior
        if (seniority === 'junior') {
            if (titleJunior) return true;
            if (titleSenior) return false;
            return descJunior;
        }
        return true;
    };

    const normalized = (val?: string | null) => (val ?? '').trim();
    const sortKey = (val?: string | null) => {
        const base = normalized(val).toLowerCase();
        const stripped = base.replace(/^[^a-z0-9]+/g, '');
        return stripped || base;
    };

    const filtered = jobs
        .filter(job =>
            job.title?.toLowerCase().includes(search.toLowerCase()) ||
            job.company?.toLowerCase().includes(search.toLowerCase())
        )
        .filter(matchesSeniority)
        .sort((a, b) => {
            switch (sortBy) {
                case 'company':
                    {
                        const compA = sortKey(a.company);
                        const compB = sortKey(b.company);
                        if (!compA && compB) return 1;  // push missing company down
                        if (compA && !compB) return -1;
                        const cmpCompany = collator.compare(compA, compB);
                        if (cmpCompany !== 0) return cmpCompany;

                        const titleA = sortKey(a.title);
                        const titleB = sortKey(b.title);
                        const cmpTitle = collator.compare(titleA, titleB);
                        if (cmpTitle !== 0) return cmpTitle;

                        return collator.compare(a.id, b.id);
                    }
                case 'title':
                    {
                        const titleA = sortKey(a.title);
                        const titleB = sortKey(b.title);
                        if (!titleA && titleB) return 1; // push missing title down
                        if (titleA && !titleB) return -1;
                        const cmpTitle = collator.compare(titleA, titleB);
                        if (cmpTitle !== 0) return cmpTitle;

                        const compA = sortKey(a.company);
                        const compB = sortKey(b.company);
                        const cmpCompany = collator.compare(compA, compB);
                        if (cmpCompany !== 0) return cmpCompany;

                        return collator.compare(a.id, b.id);
                    }
            }
        });

    const recordSearch = (query: string) => {
        const trimmed = query.trim();
        if (!trimmed) return;
        setRecentSearches(prev => {
            const deduped = prev.filter(item => item.query.toLowerCase() !== trimmed.toLowerCase());
            return [{ query: trimmed }, ...deduped].slice(0, 6);
        });
    };

    const handleSearchSubmit = () => {
        recordSearch(search);
        Keyboard.dismiss();
    };

    useEffect(() => {
        Animated.timing(filterAnim, {
            toValue: showFilters ? 1 : 0,
            duration: 220,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
        }).start();
    }, [showFilters, filterAnim]);

    const heroBg = isDark ? '#000000' : '#FF6B6B';
    const facetA = isDark ? '#111111' : '#FFB100';
    const facetB = isDark ? '#161616' : '#FF8C6A';
    const facetC = isDark ? '#1C1C1C' : '#FF7F50';

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <FlatList
                data={filtered}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 28 }}
                ListHeaderComponent={
                    <View>
                        <View style={[styles.hero, { backgroundColor: heroBg }]}>
                            <View style={[styles.facetOne, { backgroundColor: facetA }]} />
                            <View style={[styles.facetTwo, { backgroundColor: facetB }]} />
                            <View style={[styles.facetThree, { backgroundColor: facetC }]} />
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
                                            onSubmitEditing={handleSearchSubmit}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.section}>
                            <View style={styles.sectionHeaderRow}>
                                <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent searches</Text>
                                <TouchableOpacity onPress={() => setRecentSearches([])} disabled={!recentSearches.length}>
                                    <Text style={[
                                        styles.sectionLink,
                                        { color: recentSearches.length ? colors.primary : colors.subtext }
                                    ]}>
                                        Clear
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {recentSearches.length ? (
                                <FlatList
                                    data={recentSearches}
                                    keyExtractor={(item, index) => `${item.query}-${index}`}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
                                    contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            onPress={() => {
                                                setSearch(item.query);
                                                recordSearch(item.query);
                                            }}
                                            style={[styles.recentCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                                            activeOpacity={0.85}
                                        >
                                            <Text style={[styles.recentTitle, { color: colors.text }]} numberOfLines={1}>
                                                {item.query}
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            ) : (
                                <View style={{ paddingHorizontal: 16, paddingVertical: 10 }}>
                                    <Text style={{ color: colors.subtext, fontSize: 13 }}>Search to start building recents.</Text>
                                </View>
                            )}
                        </View>

                        <View style={[styles.sectionHeaderRow, { paddingHorizontal: 16, marginTop: 4, marginBottom: 10 }]}>
                            <Text style={[styles.sectionTitle, { color: colors.text }]}>Job recommendations</Text>
                            <TouchableOpacity
                                style={styles.filterRow}
                                activeOpacity={0.8}
                                onPress={() => setShowFilters(prev => !prev)}
                            >
                                <Text style={[
                                    styles.sectionLink,
                                    { color: colors.primary }
                                ]}>
                                    Filters
                                </Text>
                                <Feather name="sliders" size={16} color={colors.primary} />
                            </TouchableOpacity>
                        </View>
                        {showFilters && (
                            <Animated.View
                                style={[
                                    styles.filterPanel,
                                    {
                                        borderColor: colors.border,
                                        backgroundColor: colors.card,
                                        opacity: filterAnim,
                                        transform: [{
                                            translateY: filterAnim.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [-10, 0],
                                            }),
                                        }],
                                    },
                                ]}
                            >
                                <Text style={[styles.filterLabel, { color: colors.text }]}>Seniority</Text>
                                <View style={styles.chipRow}>
                                    {(['any', 'junior', 'senior'] as const).map(level => (
                                        <TouchableOpacity
                                            key={level}
                                            style={[
                                                styles.chip,
                                                seniority === level ? [styles.chipActive, { borderColor: colors.primary, backgroundColor: colors.primaryMuted }] : { borderColor: colors.border },
                                            ]}
                                            onPress={() => setSeniority(level)}
                                            activeOpacity={0.85}
                                        >
                                            <Text style={[
                                                styles.chipText,
                                                { color: seniority === level ? colors.primary : colors.text },
                                            ]}>
                                                {level === 'any' ? 'Any' : level === 'junior' ? 'Junior' : 'Senior'}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>

                                <Text style={[styles.filterLabel, { color: colors.text, marginTop: 10 }]}>Sort by</Text>
                                <View style={styles.chipRow}>
                                    {([
                                        { key: 'company', label: 'Company A→Z' },
                                        { key: 'title', label: 'Title A→Z' },
                                    ] as const).map(opt => (
                                        <TouchableOpacity
                                            key={opt.key}
                                            style={[
                                                styles.chip,
                                                sortBy === opt.key ? [styles.chipActive, { borderColor: colors.primary, backgroundColor: colors.primaryMuted }] : { borderColor: colors.border },
                                            ]}
                                            onPress={() => setSortBy(opt.key)}
                                            activeOpacity={0.85}
                                        >
                                            <Text style={[
                                                styles.chipText,
                                                { color: sortBy === opt.key ? colors.primary : colors.text },
                                            ]}>
                                                {opt.label}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </Animated.View>
                        )}
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
