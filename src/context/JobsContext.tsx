import React, { createContext, useState, ReactNode } from 'react';
import { Alert } from 'react-native';
import { Job } from '../types/job';

interface JobsContextType {
    savedJobs: Job[];
    saveJob: (job: Job) => void;
    removeJob: (id: string) => void;
}

export const JobsContext = createContext<JobsContextType>({} as JobsContextType);

export const JobsProvider = ({ children }: { children: ReactNode }) => {
    const [savedJobs, setSavedJobs] = useState<Job[]>([]);

    const saveJob = (job: Job) => {
        const isDuplicate = savedJobs.some(
            j =>
                j.id === job.id ||
                (j.title.toLowerCase().trim() === job.title.toLowerCase().trim() &&
                    j.company.toLowerCase().trim() === job.company.toLowerCase().trim())
        );

        if (isDuplicate) {
            Alert.alert(
                'Already Saved',
                `"${job.title}" at ${job.company} is already in your saved jobs. Each job can only be saved once.`,
                [{ text: 'Got it' }]
            );
            return;
        }

        setSavedJobs(prev => [...prev, job]);
    };

    const removeJob = (id: string) => {
        setSavedJobs(prev => prev.filter(job => job.id !== id));
    };

    return (
        <JobsContext.Provider value={{ savedJobs, saveJob, removeJob }}>
            {children}
        </JobsContext.Provider>
    );
};
