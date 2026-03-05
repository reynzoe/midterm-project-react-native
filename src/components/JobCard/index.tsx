import React, { useContext, useMemo, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { JobsContext } from '../../context/JobsContext';
import { ThemeContext } from '../../context/ThemeContext';
import { Job } from '../../types/job';
import styles from './styles';

interface JobCardProps {
    job: Job;
    onApply: () => void;
    onPress?: () => void;
    variant?: 'feed' | 'saved';
    hideSaveToggle?: boolean;
    showQuickApply?: boolean;
    showMeta?: boolean;
    showDescription?: boolean;
    showRemoveAction?: boolean;
    onRemove?: () => void;
}

export default function JobCard({
    job,
    onApply,
    onPress,
    variant = 'feed',
    hideSaveToggle = false,
    showQuickApply = false,
    showMeta = true,
    showDescription = true,
    showRemoveAction = false,
    onRemove,
}: JobCardProps) {
    const { saveJob, removeJob, savedJobs } = useContext(JobsContext);
    const { colors } = useContext(ThemeContext);

    const isSaved = savedJobs.find(j => j.id === job.id);
    const pulse = useRef(new Animated.Value(1)).current;

    const handleSaveToggle = () => {
        if (isSaved) {
            removeJob(job.id);
        } else {
            saveJob(job);
            Animated.sequence([
                Animated.timing(pulse, {
                    toValue: 1.3,
                    duration: 140,
                    easing: Easing.out(Easing.quad),
                    useNativeDriver: true,
                }),
                Animated.spring(pulse, {
                    toValue: 1,
                    friction: 6,
                    tension: 140,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    };

    const initials = useMemo(() => {
        const trimmed = (job.company ?? '').trim();
        if (!trimmed) return '?';
        // Use first two letters of company name for a clearer badge
        const firstTwo = trimmed.slice(0, 2);
        return firstTwo.toUpperCase();
    }, [job.company]);

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
                    {showMeta && (
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
                    )}
                </View>
                {!hideSaveToggle && (
                    <TouchableOpacity onPress={handleSaveToggle} style={styles.saveIconBtn} activeOpacity={0.85}>
                        <Animated.View style={{ transform: [{ scale: pulse }] }}>
                            <Ionicons
                                name={isSaved ? 'heart' : 'heart-outline'}
                                size={20}
                                color={isSaved ? colors.primary : colors.subtext}
                            />
                        </Animated.View>
                    </TouchableOpacity>
                )}
            </View>

            {showDescription && job.description ? (
                <Text style={[styles.description, { color: colors.subtext }]} numberOfLines={2}>
                    {job.description}
                </Text>
            ) : null}

            <View style={styles.actionsRow}>
                {showQuickApply && (
                    <TouchableOpacity
                        style={[styles.quickApplyBtn, { backgroundColor: colors.primary }]}
                        onPress={onApply}
                        activeOpacity={0.9}
                    >
                        <Text style={styles.quickApplyText}>Quick Apply</Text>
                    </TouchableOpacity>
                )}
                {onPress ? (
                    <TouchableOpacity
                        style={[
                            styles.learnMoreBtn,
                            { borderColor: colors.border, backgroundColor: colors.card },
                        ]}
                        onPress={onPress}
                        activeOpacity={0.85}
                    >
                        <Text style={[styles.learnMoreText, { color: colors.primary }]}>Learn more</Text>
                        <Feather name="arrow-right" size={14} color={colors.primary} />
                    </TouchableOpacity>
                ) : null}
                {showRemoveAction && onRemove ? (
                    <TouchableOpacity
                        style={[
                            styles.removeInlineBtn,
                            { borderColor: colors.primary, backgroundColor: colors.primaryMuted },
                        ]}
                        onPress={onRemove}
                        activeOpacity={0.85}
                    >
                        <Feather name="trash-2" size={14} color={colors.primary} />
                        <Text style={[styles.learnMoreText, { color: colors.primary }]}>Remove</Text>
                    </TouchableOpacity>
                ) : null}
            </View>
        </TouchableOpacity>
    );
}
