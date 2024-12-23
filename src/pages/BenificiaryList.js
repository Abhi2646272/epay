import React from 'react';
import './Bene.css';

const BeneficiaryList = () => {
  const recent = [
    { name: 'Samvrant Rajbans', upi: 'samvrant@bank' },
    { name: 'Ashish Pradhan', upi: 'ashish946@bank' },
  ];

  const beneficiaries = [
    { name: 'Amar Khanna', upi: 'meamarhu@bank' },
    { name: 'Akbar Illhabadi', upi: 'meakbarhu@bank' },
    { name: 'Anthony Gonsalves', upi: 'meanthonyhu@bank' },
  ];

  return (
    <div>
      <h4>Suggestions</h4>
      <div className="suggestions">
        <h5>Recents</h5>
        {recent.map((item, index) => (
          <div className="beneficiary" key={index}>
            <div className="icon">{item.name[0]}</div>
            <div>
              <p>{item.name}</p>
              <small>{item.upi}</small>
            </div>
          </div>
        ))}
        <h5>Your Beneficiaries</h5>
        {beneficiaries.map((item, index) => (
          <div className="beneficiary" key={index}>
            <div className="icon">{item.name[0]}</div>
            <div>
              <p>{item.name}</p>
              <small>{item.upi}</small>
            </div>
          </div>
        ))}
      </div>
      <button className="next-button">Next</button>
    </div>
  );
};

export default BeneficiaryList;
