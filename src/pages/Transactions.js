import React from "react";

const transactions = [
  { date: "2024-12-01", description: "Grocery Shopping", amount: "-$45.00", balance: "$955.00" },
  { date: "2024-12-02", description: "Salary", amount: "+$1,200.00", balance: "$2,155.00" },
  { date: "2024-12-03", description: "Electricity Bill", amount: "-$75.00", balance: "$2,080.00" },
  { date: "2024-12-04", description: "Gym Membership", amount: "-$50.00", balance: "$2,030.00" },
  { date: "2024-12-05", description: "Freelance Payment", amount: "+$200.00", balance: "$2,230.00" },
];

const styles = {
  container: {
    margin: "20px",
    marginLeft: "50px",
    padding: "20px",
    backgroundColor: "#e0e5ec",
    maxWidth: "800px",
    borderRadius: "15px",
    boxShadow: "6px 6px 10px #b8b9be, -6px -6px 10px #ffffff",
  },
  title: {
    marginBottom: "20px",
    fontSize: "1.8em",
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  }, 
  table: {
    width: "100%",
    // maxWidth: "800px",
    borderCollapse: "collapse",
    textAlign: "left",
  },
  th: {
    padding: "15px 20px",
    border: "1px solid #d9dee3",
    backgroundColor: "#f0f2f5",
    color: "#333",
    fontWeight: "bold",
    fontSize: "1.1em",
  },
  td: {
    padding: "15px 20px",
    border: "1px solid #d9dee3",
  },
  negative: {
    color: "red",
  },
  positive: {
    color: "green",
  },
};

const Transactions = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Transaction History</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Description</th>
            <th style={styles.th}>Amount</th>
            <th style={styles.th}>Balance</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td style={styles.td}>{transaction.date}</td>
              <td style={styles.td}>{transaction.description}</td>
              <td
                style={{
                  ...styles.td,
                  ...(transaction.amount.startsWith("-") ? styles.negative : styles.positive),
                }}
              >
                {transaction.amount}
              </td>
              <td style={styles.td}>{transaction.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
