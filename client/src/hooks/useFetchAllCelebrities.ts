import { useState, useEffect } from 'react';
import { fetchAllCelebritiesUrl } from '../data/urls';


const useFetchAllCelebrities = () => {
  const [celebrities, setCelebrities] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCelebrities = async () => {
      try {
        const response = await fetch(fetchAllCelebritiesUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
          
        }
        const data = await response.json();
        setCelebrities(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCelebrities();
  }, []); // Re-run the effect if the URL changes

  return { celebrities, loading, error };
};

export default useFetchAllCelebrities;