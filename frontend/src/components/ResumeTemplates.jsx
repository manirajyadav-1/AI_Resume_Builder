import React, { useState, useRef } from "react";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import Template1 from "./templates/Template1";
import Template2 from "./templates/Template2";
import Template3 from "./templates/Template3";
import Template4 from "./templates/Template4";
import Template5 from "./templates/Template5";

const ResumeTemplates = ({ data }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const resumeRef = useRef(null);

  const handleDownloadPdf = () => {
    if (resumeRef.current) {
      toPng(resumeRef.current, { quality: 1.0 })
        .then((dataUrl) => {
          const pdf = new jsPDF("p", "mm", "a4");
          const imgProps = pdf.getImageProperties(dataUrl);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

          pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
          pdf.save(`${data.personalInformation.fullName || "resume"}.pdf`);
        })
        .catch((err) => {
          console.error("Error generating PDF", err);
        });
    }
  };

  const renderSelectedTemplate = () => {
    switch (selectedTemplate) {
      case 1:
        return <Template1 data={data} />;
      case 2:
        return <Template2 data={data} />;
      case 3:
        return <Template3 data={data} />;
      case 4:
        return <Template4 data={data} />;
      case 5:
        return <Template5 data={data} />;
      default:
        return <Template1 data={data} />;
    }
  };

  return (
    <div>
          <div className="flex justify-center gap-4 my-4 mt-10">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => setSelectedTemplate(num)}
                className={`btn ${selectedTemplate === num ? "btn-primary" : "btn-outline"}`}
              >
                Template {num}
              </button>
            ))}
          </div>

          <div ref={resumeRef} className="bg-white p-6 my-6">
            {renderSelectedTemplate()}
          </div>

          <section className="flex justify-center mt-4 gap-4">
            <button onClick={handleDownloadPdf} className="btn btn-primary">
              Download as PDF
            </button>
          </section>

    </div>
  );
};

export default ResumeTemplates;