import jsPDF from "jspdf";
import "jspdf-autotable";
import bhim from "../images/bhim.png";
export const generatePdf = (transactions) => {
  const doc = new jsPDF();

  // Add a logo
  const logoUrl = "https://via.placeholder.com/150"; // Replace with your logo URL
  doc.addImage(bhim, "PNG", 10, 10, 50, 30); // (image, format, x, y, width, height)

  // Add title and subtitle
  doc.setFontSize(18);
  doc.setTextColor("#333");
  doc.text("Transaction History", 70, 25);

  doc.setFontSize(12);
  doc.setTextColor("#555");
  doc.text("Detailed transaction record", 70, 35);

  // Define table columns and rows
  const tableColumn = [
    "Date",
    "Time",
    "Description",
    "Amount",
    "Currency",
    "Sender",
    "Receiver",
    "Mode",
    "Status",
  ];
  const tableRows = transactions.map((txn) => [
    txn.date,
    txn.time,
    txn.description,
    txn.amount,
    txn.currency,
    txn.senderWalletId,
    txn.receiverWalletId,
    txn.transactionMode,
    txn.status,
  ]);

  // Customize table styles
  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 50,
    headStyles: {
      fillColor: [41, 128, 185], // Blue color for header
      textColor: [255, 255, 255], // White text for header
      fontSize: 12,
    },
    bodyStyles: {
      fontSize: 10,
      textColor: [60, 60, 60],
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240], // Light gray for alternating rows
    },
    margin: { top: 50 },
    theme: "grid",
  });

  // Add a footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor("#888");
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.width - 20,
      doc.internal.pageSize.height - 10
    );
    doc.text("Thank you for using our service!", 10, doc.internal.pageSize.height - 10);
  }

  // Save the PDF
  doc.save("Transaction_History.pdf");
};
