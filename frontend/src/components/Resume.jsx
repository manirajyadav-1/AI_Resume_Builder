// import React from "react";
// import { FaGithub, FaLinkedin, FaPhone, FaEnvelope } from "react-icons/fa";
// import { toPng } from "html-to-image";
// import { jsPDF } from "jspdf";
// import { useRef } from "react";
// import { useReactToPrint } from "react-to-print";

// const Resume = ({ data }) => {
//   const resumeRef = useRef(null);

//   const handleDownloadPdf = () => {
//     toPng(resumeRef.current, { quality: 1.0 })
//       .then((dataUrl) => {
//         const pdf = new jsPDF("p", "mm", "a4");
//         pdf.addImage(dataUrl, "PNG", 10, 10, 190, 0);
//         pdf.save(`${data.personalInformation.fullName}.pdf`);
//       })
//       .catch((err) => {
//         console.error("Error generating PDF", err);
//       });
//   };
//   return (
   
//       <section className="flex justify-center mt-4 ">
//         <div onClick={handleDownloadPdf} className="btn btn-primary">
//           Print
//         </div>
//       </section>
//     </>
//   );
// };

// export default Resume;