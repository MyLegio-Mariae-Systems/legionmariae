// utils/downloadContent.js
import {jsPDF} from 'jspdf';
import 'jspdf-autotable';
import { format, getDate } from 'date-fns';

export default async function downloadDivContent(year, tableColumns, tableData, divId, fileName, pathName) {
  const divElement = document.getElementById(divId);

  if (!divElement) {
    console.error(`Element with ID ${divId} not found.`);
    return;
  }

  try {
    const pdf = new jsPDF();

    pdf.setTextColor('red');
    pdf.setFont('bold');
    pdf.setFontSize(22);
    pdf.text('LEGION MARIA OF AFRICAN CHURCH MISSION', pdf.internal.pageSize.getWidth() / 2, 10, { align: 'center' });
    pdf.setTextColor('black'); // Reset text color
    pdf.setFontSize(16);
    pdf.text(`${year} LITURGICAL CALENDAR`, pdf.internal.pageSize.getWidth() / 2, 20, { align: 'center' });

    // pdf.setTextColor('#CCCCCC'); // Set text color for watermark
    // pdf.setFontSize(80);
    // pdf.textWithLink('LMACM', 40, pdf.internal.pageSize.getHeight() / 2, { url: 'https://legionmariae.com/calendar' });
    

    let yOffset = 30;

    tableData.forEach(({ month, details }) => {
      const dataArray=[]
      details.map(({ date, feast, saint, color }) => {

        if (feast.trim() !=='' || saint.trim() !=='') {
          const today = new Date(date)
          const dayName = format(today, 'EEEE')
          const dateOfMonth = getDate(today)

          const temp=[
            dayName, dateOfMonth, feast, saint, color
          ]
          dataArray.push(temp)
        }

      });

      pdf.setFontSize(14);
      pdf.setFont('bold');
      pdf.setTextColor('blue');
      pdf.text(`${month}`, pdf.internal.pageSize.getWidth() / 3, yOffset);
      pdf.setFont('normal');
      pdf.setTextColor('black');


      yOffset += 5;

      pdf.autoTable({
        startY: yOffset,
        head: [tableColumns],
        body: dataArray,
        theme: 'grid',
      });

      yOffset = pdf.previousAutoTable.finalY + 10;
    });

    // Add footer with page numbers
    const totalPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(10);
      pdf.text(`Page ${i} of ${totalPages}`, pdf.internal.pageSize.getWidth() - 5, pdf.internal.pageSize.getHeight() - 5, { align: 'right' });
      pdf.text(`Downloaded at: ${pathName}`, 10, pdf.internal.pageSize.getHeight() - 5);
    }

    pdf.save(fileName);
  } catch (error) {
    console.error('Error downloading content as PDF:', error);
  }
}
