import { useState, useRef } from "react";
import { jsPDF } from "jspdf";
import { toPng } from "html-to-image";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import ResumeForm from "./ResumeForm";

import Template1 from "../components/templates/Template1";
import Template2 from "../components/templates/Template2";
import Template3 from "../components/templates/Template3";
import Template4 from "../components/templates/Template4";
import Template5 from "../components/templates/Template5";


const Dashboard = () => {
  const { userDetails, resumeData, saveResume, deleteResume } = useAuth();

  const parsedData = resumeData?.contentJson ? JSON.parse(resumeData.contentJson) : null;

  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(parsedData);
  const resumeRef = useRef(null);

  const renderSelectedTemplate = () => {
    switch (selectedTemplate) {
      case 1:
        return <Template1 data={formData} />;
      case 2:
        return <Template2 data={formData} />;
      case 3:
        return <Template3 data={formData} />;
      case 4:
        return <Template4 data={formData} />;
      case 5:
        return <Template5 data={formData} />;
      default:
        return <Template1 data={formData} />;
    }
  };

  const handleDownloadPdf = () => {
    if (resumeRef.current) {
      toPng(resumeRef.current, { quality: 1.0 })
        .then((dataUrl) => {
          const pdf = new jsPDF("p", "mm", "a4");
          const imgProps = pdf.getImageProperties(dataUrl);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
          pdf.save(`${formData?.personalInformation?.fullName || "resume"}.pdf`);
        })
        .catch((err) => {
          console.error("PDF generation error:", err);
          toast.error("Error generating PDF");
        });
    }
  };

  const handleEditSubmit = async (updatedData) => {
    try {
      await saveResume(updatedData, `template${selectedTemplate}`);
      setFormData(updatedData);
      toast.success("Resume updated successfully");
      setShowForm(false);
    } catch (error) {
      toast.error("Failed to update resume");
      console.error(error);
    }
  };

  const handleDelete = () => {
  if (window.confirm("Are you sure you want to delete your resume?")) {
    deleteResume();
  }
};

  return (
    <div className="px-6 py-24">
      {/* Profile Info */}
      <div className="p-6 rounded shadow w-full max-w-md mx-auto text-center mb-10">
        <img
          src={userDetails.picture || "https://randomuser.me/api/portraits/lego/5.jpg"}
          alt="profile"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <p className="text-xl font-semibold">{userDetails.name}</p>
        <p className="text-gray-400">{userDetails.email}</p>
      </div>

      {parsedData ? (
        <>
          {/* Template Selector */}
          <div className="flex justify-center gap-4 mb-6">
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

          {/* Resume Template Preview */}
          {!showForm ? (
            <>
              <div className="flex justify-center">
                <div ref={resumeRef} className="bg-white rounded">
                  {renderSelectedTemplate()}
                </div>
              </div>

              <div className="flex justify-center mt-6 gap-4">
                <button className="btn btn-primary" onClick={handleDownloadPdf}>
                  Download PDF
                </button>
                <button className="btn btn-secondary" onClick={() => setShowForm(true)}>
                  Edit Resume
                </button>
                <button className="btn btn-error" onClick={handleDelete}>
                  Delete Resume
                </button>
              </div>
            </>
          ) : (
            <ResumeForm initialData={formData} onSubmit={handleEditSubmit} onCancel={() => setShowForm(false)} />
          )}
        </>
      ) : (
        <p className="text-center text-gray-500">No resume data found.</p>
      )}
    </div>
  );
};

export default Dashboard;
