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
        <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={{ color: colors.text, fontWeight: 'bold', fontSize: 16 }}>{job.title}</Text>
            <Text style={{ color: colors.text }}>{job.company}</Text>
            {job.salary && <Text style={{ color: colors.text }}>{job.salary}</Text>}

            <Button
                title={isSaved ? 'Saved' : 'Save Job'}
                onPress={() => saveJob(job)}
                color={colors.primary}
            />
            <Button title="Apply" onPress={onApply} color={colors.primary} />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 10,
        borderRadius: 8,
        marginVertical: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
});
