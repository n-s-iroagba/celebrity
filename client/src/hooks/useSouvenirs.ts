import { useState, useEffect } from 'react';
import { Souvenir } from '../types/Souvenir';

export function useSouvenirs() {
  const [souvenirs, setSouvenirs] = useState<Souvenir[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSouvenirs() {
      try {
        const response = await fetch('/api/souvenirs'); // Adjust endpoint as needed
        if (!response.ok) throw new Error('Failed to fetch souvenirs');
        const data: Souvenir[] = await response.json();
        setSouvenirs(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchSouvenirs();
  }, []);

  return { souvenirs, loading, error };
}
