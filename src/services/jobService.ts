import 'react-native-get-random-values';
import axios from 'axios';
import { v5 as uuidv5 } from 'uuid';

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

const makeDeterministicId = (title: string, company: string, location: string | null, salary: string | null, description: string) => {
    const fingerprint = [title, company, location ?? '', salary ?? '', description]
        .join('|')
        .toLowerCase()
        .trim();

    // v5 gives a stable UUID for identical fingerprints; keeps one ID per unique job
    return uuidv5(fingerprint, uuidv5.URL);
};

export const fetchJobs = async () => {
    const response = await axios.get('https://empllo.com/api/v1');

    const jobList = response.data.jobs ?? response.data;

    if (!Array.isArray(jobList)) {
        throw new Error('Unexpected API response shape');
    }

    const mapped = jobList.map((job: any) => {
        const title = job.title ?? job.jobTitle ?? 'Unknown Title';
        const company = job.company ?? job.companyName ?? 'Unknown Company';
        const location = job.location ?? job.jobLocation ?? null;
        const salary = job.salary ?? job.salaryRange ?? null;
        const description = stripHtmlDescription(job.description ?? job.jobDescription ?? '');
        const id = makeDeterministicId(title, company, location, salary, description);

        return { id, title, company, location, salary, description };
    });

    // Deduplicate by id in case the API returns exact duplicates
    const uniqueById = new Map<string, typeof mapped[number]>();
    mapped.forEach(job => {
        if (!uniqueById.has(job.id)) uniqueById.set(job.id, job);
    });

    return Array.from(uniqueById.values());
};
