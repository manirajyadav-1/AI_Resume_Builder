package com.resume.backend.Resume.Builder.Dto;

import java.util.List;
import java.util.Map;

public class ResumeDTO {
    private String templateType;
    private Map<String, Object> personalInformation;
    private String summary;
    private List<Skill> skills;
    private List<Experience> experience;
    private List<Education> education;
    private List<Certification> certifications;
    private List<Project> projects;
    private List<Achievement> achievements;
    private List<Language> languages;
    private List<Interest> interests;


    public String getTemplateType() {
        return templateType;
    }

    public void setTemplateType(String templateType) {
        this.templateType = templateType;
    }

    public Map<String, Object> getPersonalInformation() {
        return personalInformation;
    }

    public void setPersonalInformation(Map<String, Object> personalInformation) {
        this.personalInformation = personalInformation;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public List<Skill> getSkills() {
        return skills;
    }

    public void setSkills(List<Skill> skills) {
        this.skills = skills;
    }

    public List<Experience> getExperience() {
        return experience;
    }

    public void setExperience(List<Experience> experience) {
        this.experience = experience;
    }

    public List<Education> getEducation() {
        return education;
    }

    public void setEducation(List<Education> education) {
        this.education = education;
    }

    public List<Certification> getCertifications() {
        return certifications;
    }

    public void setCertifications(List<Certification> certifications) {
        this.certifications = certifications;
    }

    public List<Project> getProjects() {
        return projects;
    }

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }

    public List<Achievement> getAchievements() {
        return achievements;
    }

    public void setAchievements(List<Achievement> achievements) {
        this.achievements = achievements;
    }

    public List<Language> getLanguages() {
        return languages;
    }

    public void setLanguages(List<Language> languages) {
        this.languages = languages;
    }

    public List<Interest> getInterests() {
        return interests;
    }

    public void setInterests(List<Interest> interests) {
        this.interests = interests;
    }


    public static class Skill {
        private String title;
        private String level;

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getLevel() {
            return level;
        }

        public void setLevel(String level) {
            this.level = level;
        }
    }

    public static class Experience {
        private String jobTitle;
        private String company;
        private String location;
        private String duration;
        private String responsibility;

        public String getJobTitle() {
            return jobTitle;
        }

        public void setJobTitle(String jobTitle) {
            this.jobTitle = jobTitle;
        }

        public String getCompany() {
            return company;
        }

        public void setCompany(String company) {
            this.company = company;
        }

        public String getLocation() {
            return location;
        }

        public void setLocation(String location) {
            this.location = location;
        }

        public String getDuration() {
            return duration;
        }

        public void setDuration(String duration) {
            this.duration = duration;
        }

        public String getResponsibility() {
            return responsibility;
        }

        public void setResponsibility(String responsibility) {
            this.responsibility = responsibility;
        }
    }

    public static class Education {
        private String degree;
        private String university;
        private String location;
        private String graduationYear;

        public String getDegree() {
            return degree;
        }

        public void setDegree(String degree) {
            this.degree = degree;
        }

        public String getUniversity() {
            return university;
        }

        public void setUniversity(String university) {
            this.university = university;
        }

        public String getLocation() {
            return location;
        }

        public void setLocation(String location) {
            this.location = location;
        }

        public String getGraduationYear() {
            return graduationYear;
        }

        public void setGraduationYear(String graduationYear) {
            this.graduationYear = graduationYear;
        }
    }

    public static class Certification {
        private String title;
        private String issuingOrganization;
        private String year;

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getIssuingOrganization() {
            return issuingOrganization;
        }

        public void setIssuingOrganization(String issuingOrganization) {
            this.issuingOrganization = issuingOrganization;
        }

        public String getYear() {
            return year;
        }

        public void setYear(String year) {
            this.year = year;
        }
    }

    public static class Project {
        private String title;
        private String description;
        private List<String> technologiesUsed;
        private String githubLink;

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public List<String> getTechnologiesUsed() {
            return technologiesUsed;
        }

        public void setTechnologiesUsed(List<String> technologiesUsed) {
            this.technologiesUsed = technologiesUsed;
        }

        public String getGithubLink() {
            return githubLink;
        }

        public void setGithubLink(String githubLink) {
            this.githubLink = githubLink;
        }
    }

    public static class Achievement {
        private String title;
        private String year;
        private String extraInformation;

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getYear() {
            return year;
        }

        public void setYear(String year) {
            this.year = year;
        }

        public String getExtraInformation() {
            return extraInformation;
        }

        public void setExtraInformation(String extraInformation) {
            this.extraInformation = extraInformation;
        }
    }

    public static class Language {
        private int id;
        private String name;

        public int getId() {
            return id;
        }

        public void setId(int id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }

    public static class Interest {
        private int id;
        private String name;

        public int getId() {
            return id;
        }

        public void setId(int id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }

}

