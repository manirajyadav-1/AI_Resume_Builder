import React, { useRef } from "react";

const Template2 = ({ data }) => {
  const resumeRef = useRef(null);
  return (
    <div ref={resumeRef} className="max-w-5xl flex bg-white">
      {/* Sidebar */}
      <aside className="w-1/3 bg-gray-100 p-6 text-black">
        <h1 className="text-xl font-bold">
          {data.personalInformation.fullName}
        </h1>
        <p>{data.personalInformation.location}</p>
        <p>{data.personalInformation.email}</p>
        <p>{data.personalInformation.phoneNumber}</p>

        <section className="mt-6">
          <h2 className="text-xl font-semibold">Summary</h2>
          <p>{data.summary}</p>
        </section>

        {/* Skills Section */}
        <section className="mt-6">
          <h2 className="text-2xl font-semibold text-secondary">Skills</h2>
          <div className="grid grid-cols-1 gap-4 mt-2">
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
      </aside>

      {/* Main Content */}
      <main className="w-2/3 p-6">
      
        {/* Experience Section */}
        <section>
          <h2 className="text-2xl font-semibold text-secondary">Experience</h2>
          {data.experience.map((exp, index) => (
            <div
              key={index}
              className="mb-4 p-4 rounded-lg border"
            >
              <h3 className="text-xl text-gray-900 font-bold">{exp.jobTitle}</h3>
              <p className="text-gray-900">
                {exp.company} | {exp.location}
              </p>
              <p className="text-gray-800">{exp.duration}</p>
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
              className="mb-4 p-4 rounded-lg border"
            >
              <h3 className="text-xl text-gray-800 font-bold">{edu.degree}</h3>
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

        {/* Certifications Section */}
        <section>
          <h2 className="text-2xl font-semibold text-secondary">
            Certifications
          </h2>
          {data.certifications.map((cert, index) => (
            <div
              key={index}
              className="mb-4 p-4 rounded-lg border"
            >
              <h3 className="text-xl text-gray-800 font-bold">{cert.title}</h3>
              <p className="text-gray-800">
                {cert.issuingOrganization} - {cert.year}
              </p>
            </div>
          ))}
        </section>

        <div className="divider"></div>

        {/* Projects Section */}
        <section>
          <h2 className="text-2xl font-semibold text-secondary">Projects</h2>
          {data.projects.map((proj, index) => (
            <div key={index} className="mb-4 p-4 rounded-lg border"
            >
              <h3 className="text-xl text-gray-800 font-bold">{proj.title}</h3>
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
          <h2 className="text-2xl font-semibold text-secondary">
            Achievements
          </h2>
          {data.achievements.map((ach, index) => (
            <div
              key={index}
              className="mb-4 p-4 rounded-lg border"
            >
              <h3 className="text-xl text-gray-800 font-bold">{ach.title}</h3>
              <p className="text-gray-800">{ach.year}</p>
              <p className="text-gray-800">
                {ach.extraInformation}
              </p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Template2;
