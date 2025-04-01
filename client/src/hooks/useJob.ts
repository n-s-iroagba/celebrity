import { useState, useEffect } from "react";
import { Job } from "../types/Job";
import { BACKEND_SERVER_URL, fetchJobDetailsUrl } from "../data/urls";


export const useJob = (fanId:string, celebrityId:string) => {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

   useEffect(() => {
     const fetchJobs = async () => {
  
       try {
         setLoading(true);
         setError(null);
         
         // Make API call to your backend endpoint
         const response = await fetch(`${BACKEND_SERVER_URL}/jobs/fan/${fanId}/celeb/${celebrityId}`);
         
         if (!response.ok) {
           throw new Error(`HTTP error! status: ${response.status}`);
         }
 
         const data = await response.json();
         setJob(data);
       } catch (err) {
         console.error('Error fetching jobs:', err);
         setError(err instanceof Error ? err.message : 'Failed to load jobs');
       } finally {
         setLoading(false);
       }
     };
 
     if (fanId&&celebrityId) {
       fetchJobs();
     }
   }, [celebrityId, fanId]);
  return { job, loading, error };
};
