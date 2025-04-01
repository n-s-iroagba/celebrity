import { useState, useEffect } from 'react';
import { fetchFanJobsUrl } from '../data/urls';
import { Job } from '../types/Job';



const useFanJobs = (fanId: number) => {
  const [jobs, setjobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Make API call to your backend endpoint
        const response = await fetch(`${fetchFanJobsUrl}/${fanId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setjobs(data);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError(err instanceof Error ? err.message : 'Failed to load jobs');
      } finally {
        setLoading(false);
      }
    };

    if (fanId) {
      fetchJobs();
    }
  }, [fanId]);

  return { jobs, loading, error };
};

export default useFanJobs; 