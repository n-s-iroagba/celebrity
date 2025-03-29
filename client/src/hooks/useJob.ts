import { useState, useEffect } from "react";
import axios from "axios";
import { Job } from "../types/Job";


export const useJob = (fanId:number, celebrityId:number) => {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await axios.get<Job>("/api/job");
        setJob(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    
    fetchJob();
  }, []);

  return { job, loading, error };
};
