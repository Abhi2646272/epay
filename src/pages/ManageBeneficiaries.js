import React, { useState, useEffect } from 'react';

const ManageBeneficiaries = () => {
  const [beneficiaries, setBeneficiaries] = useState([]);

  useEffect(() => {
    // Fetch beneficiaries from API
    const fetchBeneficiaries = async () => {
      try {
        const response = await fetch('/api/beneficiaries');
        const data = await response.json();
        setBeneficiaries(data);
      } catch (error) {
        // alert('Error fetching beneficiaries.');
      }
    };
    fetchBeneficiaries();
  }, []);

  return (
    <div>
      <h2>Manage Beneficiaries</h2>
      <ul>
        {beneficiaries.map((b) => (
          <li key={b.id}>{b.name} ({b.contact})</li>
        ))}
      </ul>
    </div>
  );
};

export default ManageBeneficiaries;
