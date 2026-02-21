import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../ui/Button';
import { JobsContext } from '../../context/JobsContext';
import { ThemeContext } from '../../context/ThemeContext';
import { Job } from '../../types/job';

interface JobCardProps {
    job: Job;
    onApply: () => void;
}

export default function JobCard({ job, onApply }: JobCardProps) {
    const { saveJob, savedJobs } = useContext(JobsContext);
    const { colors } = useContext(ThemeContext);

    const isSaved = savedJobs.find(j => j.id === job.id);

    return (
        <View style={[styles.card, {
            backgroundColor: colors.card,
            borderColor: colors.border,
            shadowColor: colors.shadow,
        }]}> 
            <View style={styles.headerRow}>
                <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>{job.title}</Text>
                <View style={[styles.badge, { backgroundColor: colors.primaryMuted }]}> 
                    <Text style={[styles.badgeText, { color: colors.primary }]}>New</Text>
                </View>
            </View>

            <Text style={[styles.company, { color: colors.primary }]}>{job.company}</Text>

            <View style={styles.metaRow}>
                {job.location && (
                    <Text style={[styles.meta, { color: colors.subtext }]} numberOfLines={1}>
                        📍 {job.location}
                    </Text>
                )}
                {job.salary && (
                    <View style={[styles.chip, { backgroundColor: colors.primaryMuted }]}> 
                        <Text style={[styles.chipText, { color: colors.primary }]}>{job.salary}</Text>
                    </View>
                )}
            </View>

            {job.description ? (
                <Text style={[styles.description, { color: colors.subtext }]} numberOfLines={3}>
                    {job.description}
                </Text>
            ) : null}

            <View style={styles.actionsRow}>
                <Button
                    title={isSaved ? 'Saved' : 'Save'}
                    onPress={() => saveJob(job)}
                    color={colors.primaryMuted}
                    textColor={colors.primary}
                    variant="ghost"
                />
                <Button title="Apply" onPress={onApply} color={colors.primary} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 14,
        borderRadius: 12,
        marginVertical: 6,
        borderWidth: 1,
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 14,
        elevation: 2,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 8,
    },
    title: {
        fontWeight: '800',
        fontSize: 16,
        flex: 1,
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
    },
    badgeText: {
        fontSize: 11,
        fontWeight: '700',
    },
    company: {
        marginTop: 4,
        fontSize: 14,
        fontWeight: '700',
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 6,
    },
    meta: {
        fontSize: 13,
        flex: 1,
    },
    chip: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        marginLeft: 10,
    },
    chipText: {
        fontSize: 12,
        fontWeight: '700',
    },
    description: {
        marginTop: 8,
        fontSize: 13,
        lineHeight: 18,
    },
    actionsRow: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 12,
    },
});
