import { useForm, useFieldArray } from "react-hook-form";
import { FaTrash, FaPlusCircle } from "react-icons/fa";

const ResumeForm = ({ initialData, onSubmit, onCancel }) => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: initialData,
  });

  const experienceFields = useFieldArray({ control, name: "experience" });
  const educationFields = useFieldArray({ control, name: "education" });
  const certificationsFields = useFieldArray({ control, name: "certifications" });
  const projectsFields = useFieldArray({ control, name: "projects" });
  const languagesFields = useFieldArray({ control, name: "languages" });
  const interestsFields = useFieldArray({ control, name: "interests" });
  const skillsFields = useFieldArray({ control, name: "skills" });

  const renderInput = (name, label, type = "text") => (
    <div className="form-control w-full mb-4">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type={type}
        {...register(name)}
        className="input input-bordered rounded-xl w-full"
      />
    </div>
  );

  const renderFieldArray = (fields, label, name, keys) => (
    <div className="form-control w-full mb-4">
      <h3 className="text-xl font-semibold">{label}</h3>
      {fields.fields.map((field, index) => (
        <div key={field.id} className="p-4 bg-base-100 rounded-lg mb-4">
          {keys.map((key) => (
            <div key={key}>{renderInput(`${name}.${index}.${key}`, key)}</div>
          ))}
          <button
            type="button"
            onClick={() => fields.remove(index)}
            className="btn btn-error btn-sm mt-2"
          >
            <FaTrash /> Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          fields.append(keys.reduce((acc, key) => ({ ...acc, [key]: "" }), {}))
        }
        className="btn btn-secondary btn-sm mt-2"
      >
        <FaPlusCircle className="mr-1" /> Add {label}
      </button>
    </div>
  );

  return (
    <div className="w-full p-10">
      <h1 className="text-4xl font-bold mb-6 text-center">Edit Resume</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6 bg-base-200 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderInput("personalInformation.fullName", "Full Name")}
          {renderInput("personalInformation.email", "Email", "email")}
          {renderInput("personalInformation.phoneNumber", "Phone Number", "tel")}
          {renderInput("personalInformation.location", "Location")}
          {renderInput("personalInformation.linkedin", "LinkedIn", "url")}
          {renderInput("personalInformation.gitHub", "GitHub", "url")}
          {renderInput("personalInformation.portfolio", "Portfolio", "url")}
        </div>

        <h3 className="text-xl font-semibold">Summary</h3>
        <textarea
          {...register("summary")}
          className="textarea textarea-bordered w-full bg-base-100"
          rows={4}
        ></textarea>

        {renderFieldArray(skillsFields, "Skills", "skills", ["title", "level"])}
        {renderFieldArray(experienceFields, "Experience", "experience", [
          "jobTitle",
          "company",
          "location",
          "duration",
          "responsibility",
        ])}
        {renderFieldArray(educationFields, "Education", "education", [
          "degree",
          "university",
          "location",
          "graduationYear",
        ])}
        {renderFieldArray(certificationsFields, "Certifications", "certifications", [
          "title",
          "issuingOrganization",
          "year",
        ])}
        {renderFieldArray(projectsFields, "Projects", "projects", [
          "title",
          "description",
          "technologiesUsed",
          "githubLink",
        ])}

        <div className="flex gap-3 mt-8">
          <div className="flex-1">
            {renderFieldArray(languagesFields, "Languages", "languages", ["name"])}
          </div>
          <div className="flex-1">
            {renderFieldArray(interestsFields, "Interests", "interests", ["name"])}
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button type="button" onClick={onCancel} className="btn btn-error">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResumeForm;
