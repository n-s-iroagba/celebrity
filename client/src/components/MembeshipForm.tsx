// MembershipForm.tsx
import React, { useState } from 'react';
import { MembershipFormData, MembershipTier } from './types';
import TierNumberForm from './TierNumberForm';
import TierDetailsForm from './TierDetailsForm';
import ReviewForm from './ReviewForm';

const MembershipForm: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<MembershipFormData>({
    numberOfTiers: 0,
    tiers: []
  });

  const handleTierNumberSubmit = (numberOfTiers: number) => {
    setFormData({
      numberOfTiers,
      tiers: Array(numberOfTiers).fill({
        id: '',
        name: '',
        price: 0,
        description: '',
        benefits: []
      })
    });
    setStep(2);
  };

  const handleTierDetailsSubmit = (tiers: MembershipTier[]) => {
    setFormData(prev => ({
      ...prev,
      tiers
    }));
    setStep(3);
  };

  const handleSubmit = async () => {
    try {
      // Send data to server
      const response = await fetch('/api/memberships', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData.tiers),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      
      // Handle success
      console.log('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="membership-form-container">
      {step === 1 && (
        <TierNumberForm onSubmit={handleTierNumberSubmit} />
      )}
      {step > 1 && step < formData.tiers.length-1 && (
        <TierDetailsForm 
          numberOfTiers={formData.numberOfTiers} 
          onSubmit={handleTierDetailsSubmit}
        />
      )}
      {step === formData.tiers.length-1 && (
        <ReviewForm 
          tiers={formData.tiers} 
          onSubmit={handleSubmit}
          onBack={() => setStep(2)}
        />
      )}
    </div>
  );
};

export default MembershipForm;