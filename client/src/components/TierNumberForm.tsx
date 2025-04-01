// TierNumberForm.tsx
import React, { useState } from 'react';

interface TierNumberFormProps {
  onSubmit: (numberOfTiers: number) => void;
}

const TierNumberForm: React.FC<TierNumberFormProps> = ({ onSubmit }) => {
  const [numberOfTiers, setNumberOfTiers] = useState<number>(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(numberOfTiers);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Step 1: How many membership tiers do you want?</h2>
      <div>
        <label htmlFor="tierCount">Number of Tiers:</label>
        <input
          id="tierCount"
          type="number"
          min="1"
          max="5"
          value={numberOfTiers}
          onChange={(e) => setNumberOfTiers(parseInt(e.target.value))}
          required
        />
      </div>
      <button type="submit">Next</button>
    </form>
  );
};

export default TierNumberForm;