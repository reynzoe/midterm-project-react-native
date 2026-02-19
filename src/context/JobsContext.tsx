import React, { createContext, useState, ReactNode } from 'react';
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
        const exists = savedJobs.find(j => j.id === job.id);
        if (!exists) {
            setSavedJobs(prev => [...prev, job]);
        }
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
