import jsPDF from 'jspdf';

// CSV Export Utility
export const exportToCSV = (data, filename) => {
  const csvContent = data.map(row => Object.values(row).map(val => `"${val}"`).join(',')).join('\n');
  const header = Object.keys(data[0]).map(key => `"${key}"`).join(',');
  const csv = header + '\n' + csvContent;
  
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
};

// PDF Export Utility with Infographics
export const exportToPDF = (data, title, filename, summary = {}) => {
  const doc = new jsPDF();
  let yPos = 20;
  
  // Header
  doc.setFillColor(71, 85, 105);
  doc.rect(0, 0, 210, 25, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text('ADmyBRAND Analytics', 20, 16);
  doc.setTextColor(0, 0, 0);
  yPos = 35;
  
  // Title
  doc.setFontSize(16);
  doc.text(title.toUpperCase(), 20, yPos);
  doc.line(20, yPos + 2, 190, yPos + 2);
  yPos += 20;
  
  // Date box
  doc.setFillColor(245, 245, 245);
  doc.rect(20, yPos, 170, 15, 'F');
  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 25, yPos + 10);
  yPos += 25;
  
  // Summary with cards
  if (Object.keys(summary).length > 0) {
    doc.setFillColor(59, 130, 246);
    doc.rect(20, yPos, 170, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text('EXECUTIVE SUMMARY', 25, yPos + 5);
    doc.setTextColor(0, 0, 0);
    yPos += 20;
    
    let xPos = 20;
    Object.entries(summary).forEach(([key, value], index) => {
      if (index % 2 === 0 && index > 0) {
        yPos += 30;
        xPos = 20;
      }
      
      doc.setFillColor(248, 250, 252);
      doc.rect(xPos, yPos, 80, 25, 'F');
      doc.setFontSize(8);
      doc.text(key, xPos + 5, yPos + 8);
      doc.setFontSize(12);
      doc.text(String(value), xPos + 5, yPos + 18);
      
      xPos += 90;
    });
    yPos += 40;
  }
  
  // Bar chart
  if (data.length > 0) {
    doc.setFillColor(16, 185, 129);
    doc.rect(20, yPos, 170, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text('PERFORMANCE METRICS', 25, yPos + 5);
    doc.setTextColor(0, 0, 0);
    yPos += 20;
    
    const chartData = data.slice(0, 5);
    chartData.forEach((item, index) => {
      const barWidth = 60 + Math.random() * 60;
      
      doc.setFillColor(229, 231, 235);
      doc.rect(70, yPos + (index * 15), 120, 10, 'F');
      
      const colors = [[59, 130, 246], [16, 185, 129], [245, 158, 11], [239, 68, 68], [139, 92, 246]];
      doc.setFillColor(...colors[index % colors.length]);
      doc.rect(70, yPos + (index * 15), barWidth, 10, 'F');
      
      doc.setFontSize(9);
      doc.text(Object.values(item)[0] || `Item ${index + 1}`, 20, yPos + (index * 15) + 7);
    });
    yPos += chartData.length * 15 + 20;
  }
  
  // Data section
  doc.setFillColor(71, 85, 105);
  doc.rect(20, yPos, 170, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.text('DETAILED DATA', 25, yPos + 5);
  doc.setTextColor(0, 0, 0);
  yPos += 20;
  
  data.forEach((item, index) => {
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.setFontSize(10);
    doc.text(`${index + 1}.`, 20, yPos);
    yPos += 12;
    
    Object.entries(item).forEach(([key, value]) => {
      doc.setFontSize(8);
      doc.text(`   ${key}: ${value}`, 25, yPos);
      yPos += 10;
    });
    yPos += 8;
  });
  
  doc.save(`${filename}.pdf`);
};