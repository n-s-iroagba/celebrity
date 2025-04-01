// ReviewForm.tsx
import React from 'react';
import { MembershipTier } from './types';

interface ReviewFormProps {
  tiers: MembershipTier[];
  onSubmit: () => void;
  onBack: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ tiers, onSubmit, onBack }) => {
  return (
    <div>
      <h2>Step 3: Review Your Membership Tiers</h2>
      <div className="tiers-review">
        {tiers.map((tier, index) => (
          <div key={tier.id} className="tier-review">
            <h3>Tier {index + 1}: {tier.name}</h3>
            <p>Price: ${tier.price}</p>
            <p>Description: {tier.description}</p>
            <ul>
              {tier.benefits.map((benefit, i) => (
                <li key={i}>{benefit}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="form-actions">
        <button type="button" onClick={onBack}>Back</button>
        <button type="button" onClick={onSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default ReviewForm;