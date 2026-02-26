import React, { useContext, useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { JobsContext } from '../../context/JobsContext';
import { ThemeContext } from '../../context/ThemeContext';
import { Job } from '../../types/job';
import styles from './styles';

interface JobCardProps {
    job: Job;
    onApply: () => void;
    onPress?: () => void;
}

export default function JobCard({ job, onApply, onPress }: JobCardProps) {
    const { saveJob, removeJob, savedJobs } = useContext(JobsContext);
    const { colors } = useContext(ThemeContext);

    const isSaved = savedJobs.find(j => j.id === job.id);
    const handleSaveToggle = () => {
        if (isSaved) {
            removeJob(job.id);
        } else {
            saveJob(job);
        }
    };

    const initials = useMemo(() => {
        const first = job.company?.[0] ?? '';
        const second = job.title?.[0] ?? '';
        return (first + second).toUpperCase();
    }, [job.company, job.title]);

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
            style={[styles.card, {
            backgroundColor: colors.card,
            borderColor: colors.border,
            shadowColor: colors.shadow,
        }]}
        >
            <View style={styles.topRow}>
                <View style={[styles.logoCircle, { backgroundColor: colors.primaryMuted }]}>
                    <Text style={[styles.logoText, { color: colors.primary }]}>{initials}</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>{job.title}</Text>
                    <View style={styles.companyRow}>
                        <Feather name="briefcase" size={14} color={colors.subtext} />
                        <Text style={[styles.company, { color: colors.subtext }]} numberOfLines={1}>{job.company}</Text>
                    </View>
                    <View style={styles.metaRow}>
                        {job.salary ? (
                            <View style={styles.metaChip}>
                                <Feather name="dollar-sign" size={13} color="#16A34A" />
                                <Text style={[styles.metaText, { color: '#16A34A' }]} numberOfLines={1}>{job.salary}</Text>
                            </View>
                        ) : null}
                        {job.location ? (
                            <View style={styles.metaChip}>
                                <Feather name="map-pin" size={13} color={colors.subtext} />
                                <Text style={[styles.metaText, { color: colors.subtext }]} numberOfLines={1}>{job.location}</Text>
                            </View>
                        ) : null}
                    </View>
                </View>
                <TouchableOpacity onPress={handleSaveToggle} style={styles.saveIconBtn} activeOpacity={0.85}>
                    <Ionicons
                        name={isSaved ? 'heart' : 'heart-outline'}
                        size={20}
                        color={isSaved ? colors.primary : colors.subtext}
                    />
                </TouchableOpacity>
            </View>

            {job.description ? (
                <Text style={[styles.description, { color: colors.subtext }]} numberOfLines={2}>
                    {job.description}
                </Text>
            ) : null}

            <View style={styles.actionsRow}>
                <TouchableOpacity style={[styles.quickApplyBtn, { backgroundColor: colors.primary }]} onPress={onApply} activeOpacity={0.9}>
                    <Text style={styles.quickApplyText}>Quick Apply</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.saveBtn,
                        { borderColor: isSaved ? colors.primary : colors.border, backgroundColor: isSaved ? colors.primaryMuted : 'transparent' },
                    ]}
                    onPress={handleSaveToggle}
                    activeOpacity={0.9}
                >
                    <Text style={[styles.saveBtnText, { color: isSaved ? colors.primary : colors.text }]}>{isSaved ? 'Saved' : 'Save'}</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}
