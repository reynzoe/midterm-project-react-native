import React, { createContext, useState, ReactNode } from 'react';
import { Alert } from 'react-native';
import { Job, JobApplication } from '../types/job';

interface JobsContextType {
    savedJobs: Job[];
    saveJob: (job: Job) => void;
    removeJob: (id: string) => void;
    appliedJobs: JobApplication[];
    addApplied: (application: JobApplication) => void;
    isApplied: (id: string) => boolean;
    removeApplied: (id: string) => void;
    toast: string | null;
    flash: (msg: string) => void;
}

export const JobsContext = createContext<JobsContextType>({} as JobsContextType);

export const JobsProvider = ({ children }: { children: ReactNode }) => {
    const [savedJobs, setSavedJobs] = useState<Job[]>([]);
    const [appliedJobs, setAppliedJobs] = useState<JobApplication[]>([]);
    const [toast, setToast] = useState<string | null>(null);

    const flash = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 1800);
    };

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
        flash('Job saved!');
    };

    const removeJob = (id: string) => {
        setSavedJobs(prev => prev.filter(job => job.id !== id));
    };

    const addApplied = (application: JobApplication) => {
        setAppliedJobs(prev => {
            const exists = prev.some(app => app.job.id === application.job.id);
            if (exists) return prev;
            return [application, ...prev];
        });
    };

    const isApplied = (id: string) => appliedJobs.some(app => app.job.id === id);

    const removeApplied = (id: string) => {
        setAppliedJobs(prev => prev.filter(app => app.job.id !== id));
    };

    return (
        <JobsContext.Provider value={{ savedJobs, saveJob, removeJob, appliedJobs, addApplied, isApplied, removeApplied, toast, flash }}>
            {children}
        </JobsContext.Provider>
    );
};
