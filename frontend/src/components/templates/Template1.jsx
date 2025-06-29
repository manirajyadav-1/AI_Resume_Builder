import React, { useRef } from "react";
import { FaGithub, FaLinkedin, FaPhone, FaEnvelope } from "react-icons/fa";

const Template1 = ({ data }) => {
  const resumeRef = useRef(null);
  return (
    <div
      ref={resumeRef}
      className="max-w-5xl rounded-lg p-8"
    >
      {/* Header Section */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-black">
          {data.personalInformation.fullName}
        </h1>
        <p className="text-lg text-black">
          {data.personalInformation.location}
        </p>

        <div className="flex justify-center space-x-4 mt-2">
          {data.personalInformation.email && (
            <a
              href={`mailto:${data.personalInformation.email}`}
              className="flex items-center text-gray-800"
            >
              <FaEnvelope className="mr-2" /> {data.personalInformation.email}
            </a>
          )}
          {data.personalInformation.phoneNumber && (
            <p className="flex items-center text-gray-800">
              <FaPhone className="mr-2" />{" "}
              {data.personalInformation.phoneNumber}
            </p>
          )}
          {data.personalInformation.gitHub && (
            <a
              href={data.personalInformation.gitHub}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 flex items-center"
            >
              <FaGithub className="mr-2" /> GitHub
            </a>
          )}
          {data.personalInformation.linkedIn && (
            <a
              href={data.personalInformation.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-800 flex items-center"
            >
              <FaLinkedin className="mr-2" /> LinkedIn
            </a>
          )}
        </div>
      </div>

      {/* Summary Section */}
      <section>
        <h2 className="text-2xl font-semibold text-secondary">Summary</h2>
        <p className="text-gray-800">{data.summary}</p>
      </section>

      <div className="divider"></div>

      {/* Skills Section */}
      <section>
        <h2 className="text-2xl font-semibold text-secondary">Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2 text-gray-800">
          {data.skills.map((skill, index) => (
            <div key={index} className="badge badge-outline badge-lg px-4 py-2">
              {skill.title} -{" "}
              <span className="ml-1 font-semibold">{skill.level}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="divider"></div>

      {/* Experience Section */}
      <section>
        <h2 className="text-2xl font-semibold text-secondary">Experience</h2>
        {data.experience.map((exp, index) => (
          <div
            key={index}
            className="mb-4 p-4 rounded-lg border border-gray-300"
          >
            <h3 className="text-xl font-bold text-gray-800">{exp.jobTitle}</h3>
            <p className="text-gray-800">
              {exp.company} | {exp.location}
            </p>
            <p className="text-gray-700">{exp.duration}</p>
            <p className="mt-2 text-gray-800">
              {exp.responsibility}
            </p>
          </div>
        ))}
      </section>

      <div className="divider"></div>

      {/* Education Section */}
      <section>
        <h2 className="text-2xl font-semibold text-secondary">Education</h2>
        {data.education.map((edu, index) => (
          <div
            key={index}
            className="mb-4 p-4 rounded-lg border border-gray-300"
          >
            <h3 className="text-xl font-bold text-gray-900">{edu.degree}</h3>
            <p className="text-gray-800">
              {edu.university}, {edu.location}
            </p>
            <p className="text-gray-800">
              🎓 Graduation Year: {edu.graduationYear}
            </p>
          </div>
        ))}
      </section>

      <div className="divider"></div>

      {/* Projects Section */}
      <section>
        <h2 className="text-2xl font-semibold text-secondary">Projects</h2>
        {data.projects.map((proj, index) => (
          <div
            key={index}
            className="mb-4 p-4 rounded-lg border border-gray-300"
          >
            <h3 className="text-xl font-bold text-gray-900">{proj.title}</h3>
            <p className="text-gray-800">
              {proj.description}
            </p>
            <p className="text-gray-800">
              🛠 Technologies: {proj.technologiesUsed.join(", ")}
            </p>
            {proj.githubLink && (
              <a
                href={proj.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                🔗 GitHub Link
              </a>
            )}
          </div>
        ))}
      </section>

      <div className="divider"></div>

      {/* Achievements Section */}
      <section>
        <h2 className="text-2xl font-semibold text-secondary">Achievements</h2>
        {data.achievements.map((ach, index) => (
          <div
            key={index}
            className="mb-4 p-4 rounded-lg border border-gray-300"
          >
            <h3 className="text-xl font-bold text-gray-900">{ach.title}</h3>
            <p className="text-gray-800">{ach.year}</p>
            <p className="text-gray-800">
              {ach.extraInformation}
            </p>
          </div>
        ))}
      </section>

      <div className="divider"></div>

      {/* Certifications Section */}
      <section>
        <h2 className="text-2xl font-semibold text-secondary">
          Certifications
        </h2>
        {data.certifications.map((cert, index) => (
          <div
            key={index}
            className="mb-4 p-4 rounded-lg border border-gray-300"
          >
            <h3 className="text-xl font-bold text-gray-800">{cert.title}</h3>
            <p className="text-gray-800">
              {cert.issuingOrganization} - {cert.year}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Template1;
