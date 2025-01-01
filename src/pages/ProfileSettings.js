import React, { useState } from "react";

const ProfileSettings = () => {
  // Hardcoded user data
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phoneNumber: "123-456-7890",
  });

  // Hardcoded bank account data
  const [selectedBankAccount, setSelectedBankAccount] = useState(null);

  const bankAccounts = [
    {
      name: "Bank of America",
      logoUrl: "https://via.placeholder.com/50",
      accountNumber: "123456789",
      balance: "$5,000",
      debitCard: "4111 1111 1111 1111",
      ifsc: "BOFA12345",
    },
    {
      name: "Chase Bank",
      logoUrl: "https://via.placeholder.com/50",
      accountNumber: "987654321",
      balance: "$10,000",
      debitCard: "4111 2222 3333 4444",
      ifsc: "CHAS67890",
    },
    {
      name: "Wells Fargo",
      logoUrl: "https://via.placeholder.com/50",
      accountNumber: "456789123",
      balance: "$2,000",
      debitCard: "4111 5555 6666 7777",
      ifsc: "WELF12345",
    },
  ];

  const handleUpdate = () => {
    alert("Profile updated successfully!");
  };

  // Styling
  const styles = {
    container: {
      display: "flex",
      maxWidth: "850px",
      // justifyContent: "space-between",
      margin: "20px",
      marginLeft: "50px",
      padding: "20px",
      backgroundColor: "#e0e5ec",
      borderRadius: "15px",
      boxShadow: "6px 6px 10px #b8b9be, -6px -6px 10px #ffffff",
    },
    column: {
      flex: 1,
      padding: "20px",
      margin: "10px",
      borderRadius: "10px",
      backgroundColor: "#ffffff",
      maxWidth: "400px",
      boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
    },
    title: {
      fontSize: "1.5em",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "10px",
      textAlign: "center",
    },
    section: {
      marginBottom: "15px",
      width: "100%",
      // maxWidth: "400px",
    },
    label: {
      display: "block",
      fontWeight: "bold",
      marginBottom: "5px",
    },
    input: {
      width: "40%",
      padding: "10px",
      marginBottom: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    bankContainer: {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "column",
      gap: "6px",
    },
    bankCard: {
      display: "flex",
      alignItems: "center",
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      backgroundColor: "#f9f9f9",
      cursor: "pointer",
      boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
    },
    bankLogo: {
      width: "50px",
      height: "50px",
      marginRight: "10px",
    },
    bankName: {
      fontWeight: "bold",
      fontSize: "1em",
    },
    bankDetails: {
      marginTop: "20px",
      padding: "15px",
      backgroundColor: "#f1f1f1",
      borderRadius: "5px",
      boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
    },
    detailLabel: {
      fontWeight: "bold",
    },
  };

  const handleBankCardClick = (bank) => {
    setSelectedBankAccount(bank);
  };

  const closeBankDetails = () => {
    setSelectedBankAccount(null);
  };

  return (
    <div style={styles.container}>
      {/* Left Column: Profile Settings */}
      <div style={styles.column}>
        <h2 style={styles.title}>Profile Settings</h2>
        <div style={styles.section}>
          <label style={styles.label}>Name:</label>
          <input
            type="text"
            style={styles.input}
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />

          <label style={styles.label}>Email:</label>
          <input
            type="email"
            style={styles.input}
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />

          <label style={styles.label}>Phone Number:</label>
          <input
            type="text"
            style={styles.input}
            value={userData.phoneNumber}
            onChange={(e) =>
              setUserData({ ...userData, phoneNumber: e.target.value })
            }
          />
          <button style={styles.button} onClick={handleUpdate}>
            Update Profile
          </button>
        </div>
      </div>

      {/* Right Column: Bank Accounts */}
      <div style={styles.column}>
        <h2 style={styles.title}>Linked Bank Accounts</h2>
        <div style={styles.bankContainer}>
          {bankAccounts.map((bank, index) => (
            <div
              style={styles.bankCard}
              key={index}
              onClick={() => handleBankCardClick(bank)}
            >
              <img src={bank.logoUrl} alt={bank.name} style={styles.bankLogo} />
              <span style={styles.bankName}>{bank.name}</span>
            </div>
          ))}
        </div>

        {/* Display Selected Bank Account Details */}
        {selectedBankAccount && (
          <div style={styles.bankDetails}>
            <h4>{selectedBankAccount.name} - Account Details</h4>
            <p>
              <span style={styles.detailLabel}>Account Number:</span>{" "}
              {selectedBankAccount.accountNumber}
            </p>
            <p>
              <span style={styles.detailLabel}>Balance:</span>{" "}
              {selectedBankAccount.balance}
            </p>
            <p>
              <span style={styles.detailLabel}>Debit Card:</span>{" "}
              {selectedBankAccount.debitCard}
            </p>
            <p>
              <span style={styles.detailLabel}>IFSC Code:</span>{" "}
              {selectedBankAccount.ifsc}
            </p>
            <button style={styles.button} onClick={closeBankDetails}>
              Close Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSettings;
