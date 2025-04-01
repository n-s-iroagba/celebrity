// MembershipManager.tsx
import React, { useState, useEffect } from 'react';
import { Membership } from './types';
import BulkMembershipEditor from './BulkMembershipEditor';

const MembershipManager: React.FC = () => {
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('active');

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/memberships?status=${filter}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch memberships');
        }
        
        const data = await response.json();
        setMemberships(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMemberships();
  }, [filter]);

  const handleSave = async (updates: BulkMembershipUpdate) => {
    try {
      const response = await fetch('/api/memberships/bulk-update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save changes');
      }
      
      // Refresh the list
      const updatedResponse = await fetch(`/api/memberships?status=${filter}`);
      const updatedData = await updatedResponse.json();
      setMemberships(updatedData);
    } catch (err) {
      throw err;
    }
  };

  if (loading) return <div>Loading memberships...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="membership-manager">
      <div className="filter-controls">
        <label>
          Filter by status:
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="active">Active</option>
            <option value="expired">Expired</option>
            <option value="cancelled">Cancelled</option>
            <option value="all">All</option>
          </select>
        </label>
      </div>
      
      {memberships.length > 0 ? (
        <BulkMembershipEditor 
          onSave={handleSave}
          initialMemberships={memberships}
        />
      ) : (
        <div>No memberships found</div>
      )}
    </div>
  );
};

export default MembershipManager;