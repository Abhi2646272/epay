import React, { useState, useEffect } from "react";
import { getTransactionHistory } from "./api"; // Import API function
import { useSelector, useDispatch } from 'react-redux';
import { generatePdf } from "./downloadPdf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons"; // Import the specific icon
const styles = {
  container: {
    margin: "20px",
    marginLeft: "50px",
    padding: "20px",
    backgroundColor: "#e0e5ec",
    maxWidth: "800px",
    borderRadius: "15px",
    boxShadow: "6px 6px 10px #b8b9be, -6px -6px 10px #ffffff",
    fontFamily: "Arial, sans-serif", 
  },
  title: {
    marginBottom: "20px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
  },
  downloadButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
    transition: "all 0.3s ease",
  },
  downloadIcon: {
    marginRight: "10px",
    fontSize: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "center",
  },
  th: {
    padding: "14px",
    border: "1px solid #d9dee3",
    backgroundColor: "#f0f2f5",
    color: "#333",
    fontWeight: "bold",
    fontSize: "15px",
  },
  td: {
    padding: "10px 10px",
    fontSize: "14px",
    border: "1px solid #d9dee3",
  },
  negative: {
    color: "red",
  },
  positive: {
    color: "green",
  },
  loading: {
    textAlign: "center",
    fontSize: "1.2em",
    color: "#555",
  },
  error: {
    color: "red",
    textAlign: "center",
    fontSize: "1.2em",
  },
};

const Transactions = () => {
  const walletId1 = useSelector((state) => state.auth.walletId); // Get walletId from Redux

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // For now, we'll use dummy data, replace with real API call later
        const dummyData = [
          {
            date: "2024-12-01",
            time: "10:30 AM",
            description: "Grocery Shopping",
            amount: "-45.00",
            currency: "USD",
            senderWalletId: "wallet123",
            receiverWalletId: "wallet456",
            transactionMode: "UPI",
            status: "Completed",
          },
          {
            date: "2024-12-02",
            time: "02:00 PM",
            description: "Salary",
            amount: "+1200.00",
            currency: "USD",
            senderWalletId: "wallet789",
            receiverWalletId: "wallet123",
            transactionMode: "Bank Transfer",
            status: "Completed",
          },
          {
            date: "2024-12-03",
            time: "01:15 PM",
            description: "Electricity Bill",
            amount: "-75.00",
            currency: "USD",
            senderWalletId: "wallet456",
            receiverWalletId: "wallet123",
            transactionMode: "Card Payment",
            status: "Completed",
          },
          {
            date: "2024-12-04",
            time: "11:45 AM",
            description: "Gym Membership",
            amount: "-50.00",
            currency: "USD",
            senderWalletId: "wallet789",
            receiverWalletId: "wallet123",
            transactionMode: "UPI",
            status: "Completed",
          },
          {
            date: "2024-12-05",
            time: "09:30 AM",
            description: "Freelance Payment",
            amount: "+200.00",
            currency: "USD",
            senderWalletId: "wallet123",
            receiverWalletId: "wallet789",
            transactionMode: "Bank Transfer",
            status: "Completed",
          },
          
        ];
        const response = await getTransactionHistory(walletId1);

        // Combine API data and dummy data
        const combinedData = [...response, ...dummyData];
  
        setTransactions(combinedData); // Set combined data to state
        setLoading(false);
      } catch (err) {
        setError("Failed to load transaction history.");
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return <div style={styles.loading}>Loading transactions...</div>;
  }

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  return (
    <>
    <div style={styles.container}>
      <h2 style={styles.title}>Transaction History</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Time</th>
            <th style={styles.th}>Description</th>
            <th style={styles.th}>Amount</th>
            <th style={styles.th}>Sender</th>
            <th style={styles.th}>Receiver</th>
            <th style={styles.th}>Transaction Mode</th>
            <th style={styles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td style={styles.td}>{transaction.date}</td>
              <td style={styles.td}>{transaction.time}</td>
              <td style={styles.td}>{transaction.description}</td>
              <td
                style={{
                  ...styles.td,
                  ...(transaction.senderWalletId === walletId1 ? styles.negative : styles.positive),
                }}
              >
                {transaction.amount} {transaction.currency}
              </td>
              <td style={styles.td}>{transaction.senderWalletId}</td>
              <td style={styles.td}>{transaction.receiverWalletId}</td>
              <td style={styles.td}>{transaction.transactionMode}</td>
              <td style={styles.td}>{transaction.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
       
    </div>
    <div style={styles.buttonContainer}>
        <button
          style={styles.downloadButton}
          onClick={() => generatePdf(transactions)}
        >
          <FontAwesomeIcon icon={faDownload} style={styles.downloadIcon} />
          Download PDF
        </button>
      </div>
 
  </>
  );
};

export default Transactions;
