export interface Job {
    id: string;
    title: string;
    company: string;
    location?: string;
    salary?: string;
    description?: string;
}

export interface JobApplication {
    job: Job;
    name: string;
    email: string;
    phone: string;
    why: string;
    submittedAt: number;
}
