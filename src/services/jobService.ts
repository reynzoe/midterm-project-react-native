import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';

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
        location: job.location ?? job.jobLocation ?? 'Not specified',
        salary: job.salary ?? job.salaryRange ?? 'Not disclosed',
        description: job.description ?? job.jobDescription ?? '',
    }));
};
