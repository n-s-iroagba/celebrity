import { useEffect, useState } from 'react';
import { ClubMembership } from '../types/ClubMembership';

function useFanMemberships(id: number):{fanMemberships:ClubMembership[],loading:boolean,error:string|null} {
  const [fanMemberships, setFanMemberships] = useState<ClubMembership[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMemberships() {
      try {
        const response = await fetch(`/api/fan-memberships/${id}`);
        if (!response.ok) throw new Error('Failed to fetch fan memberships');
        const data = await response.json();
        setFanMemberships(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchMemberships();
  }, [id]);

  return { fanMemberships, loading, error };
}
export default useFanMemberships