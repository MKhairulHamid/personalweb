// components.js
import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Linkedin, 
  Github, 
  ChevronDown, 
  Download, 
  ExternalLink, 
  Calendar,
  MapPin
} from 'lucide-react';
import { profileData } from '../config/profileData';
import '../styles/index.css'


const Card = ({ className = "", children }) => (
  <div className={`bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg ${className}`}>
    {children}
  </div>
);

export const Section = ({ id, className = "", children }) => (
  <section id={id} className={`py-20 ${className}`}>
    <div className="max-w-6xl mx-auto px-4">
      {children}
    </div>
  </section>
);

export const SectionTitle = ({ children }) => (
  <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
    {children}
  </h3>
);

export const ProjectCard = ({ children, className = "" }) => (
  <Card className={`p-6 transition-colors hover:border-blue-300 ${className}`}>
    {children}
  </Card>
);

export const SkillTag = ({ color, children }) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    purple: "bg-purple-100 text-purple-800",
    pink: "bg-pink-100 text-pink-800"
  };

  return (
    <span className={`px-4 py-2 rounded-full ${colorClasses[color] || colorClasses.blue}`}>
      {children}
    </span>
  );
};

export const Header = ({ name }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            {name}
          </h1>
          <nav className="flex gap-4">
            {['about', 'experience', 'education', 'skills', 'projects', 'certifications'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`nav-link ${isScrolled ? 'nav-link-scrolled' : 'nav-link-top'}`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export const Hero = ({ name, role, tagline, email, location, social }) => (
  <section className="min-h-screen pt-32 pb-20 bg-gradient-to-br from-indigo-600 to-purple-600">
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center">
        <h2 className="text-5xl font-bold text-white mb-6">{role}</h2>
        <p className="text-xl text-indigo-100 mb-4">{tagline}</p>
        <p className="flex items-center justify-center text-indigo-100 mb-8">
          <MapPin size={20} className="mr-2" />
          {location}
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a 
            href={`mailto:${email}`}
            className="flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            <Mail size={20} />
            Contact Me
          </a>
          <a 
            href={social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <Linkedin size={20} />
            LinkedIn
          </a>
          <a 
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <Github size={20} />
            GitHub
          </a>
          <a 
            href="/resume.pdf" 
            download
            className="flex items-center gap-2 px-6 py-3 bg-indigo-700 text-white rounded-lg hover:bg-indigo-800 transition-colors"
          >
            <Download size={20} />
            Download Resume
          </a>
        </div>
      </div>
    </div>
    <div className="flex justify-center mt-16">
      <ChevronDown 
        size={40} 
        className="text-white animate-bounce cursor-pointer" 
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      />
    </div>
  </section>
);

export const About = ({ about }) => (
  <Section id="about">
    <SectionTitle>About Me</SectionTitle>
    <ProjectCard>
      {about.description.map((paragraph, index) => (
        <p key={index} className="text-lg text-gray-600 mb-6 last:mb-0">
          {paragraph}
        </p>
      ))}
    </ProjectCard>
  </Section>
);

export const Experience = ({ experience }) => (
  <Section id="experience" className="bg-gradient-to-br from-purple-50 to-pink-50">
    <SectionTitle>Experience</SectionTitle>
    <div className="space-y-6">
      {experience.map((job, index) => (
        <ProjectCard key={index}>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">
            {job.title} - {job.company}
          </h4>
          <p className="text-purple-600 mb-4">{job.period} | {job.location}</p>
          <ul className="space-y-2">
            {job.points.map((point, idx) => (
              <li key={idx} className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-purple-400 mt-2 mr-3" />
                <span className="text-gray-600">{point}</span>
              </li>
            ))}
          </ul>
        </ProjectCard>
      ))}
    </div>
  </Section>
);

export const Skills = ({ skills }) => (
  <Section id="skills" className="bg-gradient-to-br from-blue-50 to-indigo-50">
    <SectionTitle>Technical Skills</SectionTitle>
    <div className="grid md:grid-cols-2 gap-6">
      {skills.map((category, index) => (
        <ProjectCard key={index}>
          <h4 className="text-xl font-semibold text-gray-900 mb-4">{category.title}</h4>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill, idx) => (
              <SkillTag key={idx} color={category.color}>
                {skill}
              </SkillTag>
            ))}
          </div>
        </ProjectCard>
      ))}
    </div>
  </Section>
);

export const Projects = ({ projects }) => (
  <Section id="projects" className="bg-gradient-to-br from-indigo-50 to-blue-50">
    <SectionTitle>Featured Projects</SectionTitle>
    <div className="grid md:grid-cols-2 gap-6">
      {projects.map((project, index) => (
        <ProjectCard key={index}>
          <h4 className="text-xl font-semibold text-gray-900 mb-4">{project.title}</h4>
          <p className="text-gray-600 mb-6">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech, idx) => (
              <SkillTag key={idx} color="blue">{tech}</SkillTag>
            ))}
          </div>
          <div className="flex gap-4">
            {project.url && (
              <a 
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
              >
                <ExternalLink size={16} />
                Reference
              </a>
            )}
          </div>
        </ProjectCard>
      ))}
    </div>
  </Section>
);

export const Certifications = ({ certifications }) => (
  <Section id="certifications" className="bg-gradient-to-br from-green-50 to-blue-50">
    <SectionTitle>Professional Certifications</SectionTitle>
    <div className="grid md:grid-cols-2 gap-6">
      {certifications.map((cert, index) => (
        <ProjectCard key={index}>
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">{cert.title}</h4>
              <p className="text-gray-600 mb-2">{cert.issuer}</p>
              <p className="text-green-600 text-sm mb-4 flex items-center">
                <Calendar size={16} className="mr-2" />
                {cert.date}
              </p>
              <a 
                href={cert.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                <ExternalLink size={16} className="mr-1" />
                View Certificate
              </a>
            </div>
            {cert.badge && (
              <img 
                src={cert.badge} 
                alt={`${cert.title} badge`}
                className="w-40 h-40 object-contain"
              />
            )}
          </div>
        </ProjectCard>
      ))}
    </div>
  </Section>
);

export const Footer = ({ name, email, social }) => (
  <footer className="bg-gradient-to-br from-gray-900 to-indigo-900 text-white py-12">
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center">
        <h4 className="text-2xl font-bold mb-4">Let's Connect</h4>
        <div className="flex justify-center gap-4 mb-8">
          <a 
            href={`mailto:${email}`}
            className="hover:text-indigo-300 transition-colors"
            aria-label="Email"
          >
            <Mail size={24} />
          </a>
          <a 
            href={social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-300 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={24} />
          </a>
          <a 
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-300 transition-colors"
            aria-label="GitHub"
          >
            <Github size={24} />
          </a>
        </div>
        <p className="text-indigo-200">&copy; {new Date().getFullYear()} {name}. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 antialiased">
      <div className="flex flex-col min-h-screen">
        <Header name={profileData.name} />
        
        <main className="flex-grow">
          <Hero 
            name={profileData.name}
            role={profileData.role}
            tagline={profileData.tagline}
            email={profileData.email}
            location={profileData.location}
            social={profileData.social}
          />

          <About 
            about={profileData.about} 
          />

          <Experience 
            experience={profileData.experience} 
          />

          <Skills 
            skills={profileData.skills} 
          />

          <Projects 
            projects={profileData.projects} 
          />

          <Certifications 
            certifications={profileData.certifications} 
          />
        </main>

        <Footer 
          name={profileData.name}
          email={profileData.email}
          social={profileData.social}
        />
      </div>
    </div>
  );
};

export default Home;