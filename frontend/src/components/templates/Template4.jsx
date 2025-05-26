import React, { useRef } from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Template4 = ({ data }) => {
  const resumeRef = useRef(null);
  return (
    <div ref={resumeRef} className="max-w-4xl p-8 bg-white text-gray-900 font-sans space-y-6">
      <header className="text-center">
        <h1 className="text-4xl font-bold">{data.personalInformation.fullName}</h1>
        <p className="flex justify-center gap-4 mt-2 text-sm">
          <span><FaEnvelope className="inline mr-1" /> {data.personalInformation.email}</span>
          <span><FaPhone className="inline mr-1" /> {data.personalInformation.phoneNumber}</span>
          <span><FaMapMarkerAlt className="inline mr-1" /> {data.personalInformation.location}</span>
        </p>
      </header>
      {/* Summary */}
        <section>
          <h2 className="text-xl font-semibold">Summary</h2>
          <p>{data.summary}</p>
        </section>

        <div className="divider"></div>

        {/* Skills Section */}
        <section>
          <h2 className="text-2xl font-semibold text-secondary">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
            {data.skills.map((skill, index) => (
              <div
                key={index}
                className="badge badge-outline badge-lg px-4 py-2"
              >
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
              className="mb-4 p-4 rounded-lg shadow-md border border-gray-300"
            >
              <h3 className="text-xl font-bold">{exp.jobTitle}</h3>
              <p className="text-gray-900">
                {exp.company} | {exp.location}
              </p>
              <p className="text-gray-900">{exp.duration}</p>
              <p className="mt-2 text-gray-900">
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
              className="mb-4 p-4 rounded-lg shadow-md border border-gray-300"
            >
              <h3 className="text-xl font-bold">{edu.degree}</h3>
              <p className="text-gray-900">
                {edu.university}, {edu.location}
              </p>
              <p className="text-gray-400">
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
              className="mb-4 p-4 rounded-lg shadow-md border border-gray-300"
            >
              <h3 className="text-xl font-bold">{proj.title}</h3>
              <p className="text-gray-800">
                {proj.description}
              </p>
              <p className="text-gray-500">
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
          <h2 className="text-2xl font-semibold text-secondary">
            Achievements
          </h2>
          {data.achievements.map((ach, index) => (
            <div
              key={index}
              className="mb-4 p-4 rounded-lg shadow-md border border-gray-300"
            >
              <h3 className="text-xl font-bold">{ach.title}</h3>
              <p className="text-gray-900">{ach.year}</p>
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
              className="mb-4 p-4 rounded-lg shadow-md border border-gray-300 dark:border-gray-700"
            >
              <h3 className="text-xl font-bold">{cert.title}</h3>
              <p className="text-gray-500">
                {cert.issuingOrganization} - {cert.year}
              </p>
            </div>
          ))}
        </section>

        <div className="divider"></div>

        {/* Languages Section */}
        <section>
          <h2 className="text-2xl font-semibold text-secondary">Languages</h2>
          <ul className="list-disc pl-6 text-gray-900">
            {data.languages.map((lang, index) => (
              <li key={index}>{lang.name}</li>
            ))}
          </ul>
        </section>

        <div className="divider"></div>

        {/* Interests Section */}
        <section>
          <h2 className="text-2xl font-semibold text-secondary">Interests</h2>
          <ul className="list-disc pl-6 text-gray-900">
            {data.interests.map((interest, index) => (
              <li key={index}>{interest.name}</li>
            ))}
          </ul>
        </section>
    </div>
  );
}

export default Template4