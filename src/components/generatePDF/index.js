import { createRoot } from "react-dom/client";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { flushSync } from "react-dom";
import { FacultyEvalStatusReport } from "./template";

const generatePdf = (componentRef) => {
  const pdf = new jsPDF();
  const component = componentRef.current;
  const tables = component.querySelectorAll(".table-grid-item");

  const addPageBreak = (index) => {
    if (index < tables.length - 1) {
      pdf.addPage();
    }
  };

  const promises = Array.from(tables).map((table, index) => {
    return html2canvas(table, { scale: 2, scrollY: -window.scrollY }).then(
      (canvas) => {
        // Calculate the aspect ratio of the PDF page
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const aspectRatio = canvas.width / canvas.height;

        // Calculate the dimensions to fit the image while maintaining aspect ratio
        let imgWidth = pdfWidth;
        let imgHeight = pdfWidth / aspectRatio;

        // Adjust if the calculated height exceeds the page height
        if (imgHeight > pdfHeight) {
          imgHeight = pdfHeight;
          imgWidth = pdfHeight * aspectRatio;
        }

        // Add the image to the PDF
        pdf.addImage(
          canvas.toDataURL("image/png"),
          "PNG",
          0,
          0,
          imgWidth,
          imgHeight
        );

        // Add page break after each table (except the last one)
        addPageBreak(index);
      }
    );
  });

  // Wait for all promises to resolve before saving the PDF
  Promise.all(promises).then(() => {
    // Save or display the PDF
    pdf.save("myPDF.pdf");
  });
};

export default generatePdf;
