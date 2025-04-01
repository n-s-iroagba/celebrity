// TierDetailsForm.tsx
import React, { useState } from 'react';
import { MembershipTier } from './types';

interface TierDetailsFormProps {
  numberOfTiers: number;
  onSubmit: (tiers: MembershipTier[]) => void;
}

const TierDetailsForm: React.FC<TierDetailsFormProps> = ({ numberOfTiers, onSubmit }) => {
  const [tiers, setTiers] = useState<MembershipTier[]>(
    Array(numberOfTiers).fill(null).map((_, i) => ({
      id: `tier-${i + 1}`,
      name: '',
      price: 0,
      description: '',
      benefits: ['']
    }))
  );

  const handleTierChange = (index: number, field: keyof MembershipTier, value: string | number) => {
    const newTiers = [...tiers];
    newTiers[index] = {
      ...newTiers[index],
      [field]: value
    };
    setTiers(newTiers);
  };

  const handleBenefitChange = (tierIndex: number, benefitIndex: number, value: string) => {
    const newTiers = [...tiers];
    const newBenefits = [...newTiers[tierIndex].benefits];
    newBenefits[benefitIndex] = value;
    newTiers[tierIndex].benefits = newBenefits;
    setTiers(newTiers);
  };

  const addBenefit = (tierIndex: number) => {
    const newTiers = [...tiers];
    newTiers[tierIndex].benefits.push('');
    setTiers(newTiers);
  };

  const removeBenefit = (tierIndex: number, benefitIndex: number) => {
    const newTiers = [...tiers];
    newTiers[tierIndex].benefits.splice(benefitIndex, 1);
    setTiers(newTiers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(tiers);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Step 2: Define Your Membership Tiers</h2>
      {tiers.map((tier, tierIndex) => (
        <div key={tier.id} className="tier-form">
          <h3>Tier {tierIndex + 1}</h3>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={tier.name}
              onChange={(e) => handleTierChange(tierIndex, 'name', e.target.value)}
              required
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              value={tier.price}
              onChange={(e) => handleTierChange(tierIndex, 'price', parseFloat(e.target.value))}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              value={tier.description}
              onChange={(e) => handleTierChange(tierIndex, 'description', e.target.value)}
              required
            />
          </div>
          <div>
            <label>Benefits:</label>
            {tier.benefits.map((benefit:string, benefitIndex:number) => (
              <div key={benefitIndex}>
                <input
                  type="text"
                  value={benefit}
                  onChange={(e) => handleBenefitChange(tierIndex, benefitIndex, e.target.value)}
                  required
                />
                <button 
                  type="button" 
                  onClick={() => removeBenefit(tierIndex, benefitIndex)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button 
              type="button" 
              onClick={() => addBenefit(tierIndex)}
            >
              Add Benefit
            </button>
          </div>
        </div>
      ))}
      <button type="submit">Next</button>
    </form>
  );
};

export default TierDetailsForm;