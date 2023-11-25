import { createRoot } from "react-dom/client";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { flushSync } from "react-dom";
import { FacultyEvalStatusReport } from "./template";
const generatePdf = (template, data, filename) => {
  const options = {
    margin: 10,
    filename: filename,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };
  const pdf = new jsPDF();

  // Create a div element to render the component
  const div = document.createElement("div");
  // Create a root and render the component into the div
  const root = createRoot(div);
  flushSync(() => {
    root.render(<FacultyEvalStatusReport rows={data.rows} />);
  });

  // Get the HTML content from the div
  html2canvas(div, { scale: 2 })
    .then((canvas) => {
      // Convert the canvas image to data URL
      const imageData = canvas.toDataURL("image/jpeg", 0.98);

      // Add the image to the PDF
      pdf.addImage(
        imageData,
        "JPEG",
        options.jsPDF.margin,
        options.jsPDF.margin
      );

      // Save the PDF
      pdf.save(options.filename);
    })
    .catch((error) => {
      console.error("Error generating PDF:", error);
    });
};

export default generatePdf;
