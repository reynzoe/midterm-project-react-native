import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';

const stripHtmlDescription = (text: string = '') => {
    return text
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<\/li>/gi, '\n')
        .replace(/<li[^>]*>/gi, '• ')
        .replace(/<\/?(ul|ol|p|div|span|h[1-6])[^>]*>/gi, '\n')
        .replace(/<[^>]+>/g, ' ')
        .replace(/[ \t]+/g, ' ')
        .replace(/\n{2,}/g, '\n')
        .trim();
};

export const fetchJobs = async () => {
    const response = await axios.get('https://empllo.com/api/v1');

    const jobList = response.data.jobs ?? response.data;

    if (!Array.isArray(jobList)) {
        throw new Error('Unexpected API response shape');
    }

    return jobList.map((job: any) => ({
        id: uuidv4(),
        title: job.title ?? job.jobTitle ?? 'Unknown Title',
        company: job.company ?? job.companyName ?? 'Unknown Company',
        location: job.location ?? job.jobLocation ?? null,
        salary: job.salary ?? job.salaryRange ?? null,
        description: stripHtmlDescription(job.description ?? job.jobDescription ?? ''),
    }));
};
