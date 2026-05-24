import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Background from './components/Background';
import './App.css';
import Resume from './assets/resume.pdf';
import emsAdminImg from './assets/ems-admin.png';

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ proj }) => {
  const cardRef = useRef(null);

  const handleTilt = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width;
    const yPct = (e.clientY - rect.top) / rect.height;
    const xRot = (0.5 - yPct) * 12;
    const yRot = (xPct - 0.5) * 12;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${xRot}deg) rotateY(${yRot}deg) scale(1.04)`;
  };

  const resetTilt = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
  };

  return (
    <div
      className="project-card"
      ref={cardRef}
      onMouseMove={handleTilt}
      onMouseLeave={resetTilt}
    >
      <div className="card-image">
        <img src={proj.img} alt={proj.title} />
      </div>
      <div className="card-content">
        <h3 className="card-title">{proj.title}</h3>
        <p className="card-desc">{proj.desc}</p>
        <div className="tech-stack">
          {proj.tech.map((t, i) => <span key={i}>{t}</span>)}
        </div>
        <div className="card-links">
          <a href="#"><i className="fab fa-github"></i> Code</a>
          <a href="#"><i className="fas fa-external-link-alt"></i> Demo</a>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [mousePos, setMousePos] = useState({ x: '50%', y: '50%' });
  const [showToast, setShowToast] = useState(false);

  const skills = [
    { name: "HTML5 & CSS3", percent: "95%" },
    { name: "JavaScript (ES6+)", percent: "70%" },
    { name: "React JS", percent: "85%" },
    { name: "Node.js", percent: "80%" },
    { name: "Python", percent: "75%" },
    { name: "UI/UX Design", percent: "85%" }
  ];

  const projects = [
    {
      title: "Tourism Website",
      desc: "ExploreWorld is a responsive tourism website developed using HTML, CSS, and JavaScript. The main goal of this project is to provide users with an engaging platform to discover popular travel destinations.",
      img: "https://res.cloudinary.com/dkswtjvfe/image/upload/f_auto,q_auto/Screenshot_2026-04-26_201955_fbnssw",
      tech: ["HTML", "CSS", "JavaScript", "Bootstrap"]
    },
    {
      title: "Employee System Management",
      desc: "The Employee Management System is a full-stack web application designed to simplify employee data handling, task tracking, and administrative control.",
      img: emsAdminImg,
      tech: ["React.js", "React Hooks", "JSON"]
    },
    {
      title: "Task Management",
      desc: "The system allows users to perform core operations such as creating tasks, updating task status, deleting tasks, and viewing categorized task lists.",
      img: "https://res.cloudinary.com/dkswtjvfe/image/upload/f_auto,q_auto/Screenshot_2026-04-25_164727_glb3vn",
      tech: ["Node.js", "Express"]
    },
    {
      title: "E-tunes",
      desc: "E-tunes is an intelligent music recommendation system that suggests songs based on the user's emotional state.",
      img: "https://res.cloudinary.com/dkswtjvfe/image/upload/f_auto,q_auto/Screenshot_2026-04-26_205915_gju2xg",
      tech: ["Python", "Keras Models", "Mediapipe", "numpy"]
    }
  ];

  const experiences = [
    {
      role: "Python AI",
      company: "Techonet pvt Ltd",
      date: "June 2025 - July 2025",
      desc: "Completed vocational training in Python programming focused on building strong fundamentals and applying them to real-world problem solving.",
      side: "left"
    },
    {
      role: "Web Developer",
      company: "CSDIE",
      date: "Sep 2024 - Oct 2024",
      desc: "Passionate front-end web developer with a strong foundation in HTML, CSS, and JavaScript. Building responsive, user-friendly websites.",
      side: "right"
    }
  ];

  const handleMouseMove = (e) => {
    setMousePos({ x: `${e.clientX}px`, y: `${e.clientY}px` });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    e.target.reset();
  };

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = Resume;
    link.setAttribute('download', 'Tannu_Resume.pdf');
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  useEffect(() => {
    // Section headers — fade in up
    gsap.utils.toArray('.section-header').forEach((header) => {
      gsap.fromTo(header,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out",
          scrollTrigger: { trigger: header, start: "top 80%" } }
      );
    });

    // Skill bars animate to stored width
    gsap.utils.toArray('.poll-fill').forEach((bar) => {
      gsap.to(bar, {
        width: bar.getAttribute('data-width'),
        duration: 1.5, ease: "power2.out",
        scrollTrigger: { trigger: bar, start: "top 85%" }
      });
    });

    // Skill cards — staggered fade in up
    gsap.utils.toArray('.skill-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, delay: i * 0.08, ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 85%" } }
      );
    });

    // Experience cards — staggered fade in up
    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, delay: i * 0.2, ease: "power2.out",
          scrollTrigger: { trigger: item, start: "top 80%" } }
      );
    });

    // Project cards — staggered fade in up
    gsap.utils.toArray('.project-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.8, delay: i * 0.15, ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 85%" } }
      );
    });

    // Intro text — fade in up
    const introText = document.querySelector('.intro-text');
    if (introText) {
      gsap.fromTo(introText,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out",
          scrollTrigger: { trigger: introText, start: "top 85%" } }
      );
    }
  }, []);

  return (
    <div className="App" onMouseMove={handleMouseMove}>
      <Background />

      <nav>
        <a href="#" className="logo">Tannu<span>Portfolio</span></a>
        <ul className="nav-links">
          <li><a href="#about">Home</a></li>
          <li><a href="#intro">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#resume">Resume</a></li>
        </ul>
        <button onClick={downloadResume} className="cv-btn-nav">Download CV</button>
      </nav>

      <section id="about">
        <div className="hero-content" style={{ '--x': mousePos.x, '--y': mousePos.y }}>
          <p className="hero-subtitle">Hello, I'm Tannu</p>
          <div className="hero-text">
            <h1><br /><span className="gradient-text">Full-Stack <br />Developer</span></h1>
            <p>I'm an aspiring Full-Stack Developer with experience in developing end-to-end web applications using React and Node.js.</p>
          </div>
          <a href="#projects" className="btn">View My Work</a>
        </div>
      </section>

      <section id="intro">
        <div className="intro-wrapper">
          <div className="section-header">
            <h2>Introduction</h2>
          </div>
          <div className="intro-text">
            <p>I'm a Full-Stack Developer focused on building scalable and user-friendly web applications. I have hands-on experience with React for frontend development and Node.js for backend services, along with integrating APIs and managing application logic. My work includes projects such as an emotion-based music recommendation system, demonstrating my ability to deliver practical and efficient solutions. I'm seeking an opportunity to contribute to a development team and continue growing my technical expertise.</p>
          </div>
        </div>
      </section>

      <section id="skills">
        <div className="section-header">
          <h2>My Skills</h2>
        </div>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div className="skill-card" key={index}>
              <div className="skill-info">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-percentage">{skill.percent}</span>
              </div>
              <div className="poll-bg">
                <div className="poll-fill" data-width={skill.percent}></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="experience">
        <div className="section-header">
          <h2>My Experience</h2>
        </div>
        <div className="timeline">
          {experiences.map((exp, index) => (
            <div className={`timeline-item ${exp.side}`} key={index}>
              <div className="content-box">
                <h3 className="exp-role">{exp.role}</h3>
                <span className="date">{exp.date}</span>
                <h3 className="exp-company">{exp.company}</h3>
                <p>{exp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="projects">
        <div className="section-header">
          <h2>Projects</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '10px' }}>
            A selection of my recent work showcasing my skills and experience.
          </p>
        </div>
        <div className="projects-container">
          {projects.map((proj, index) => (
            <ProjectCard proj={proj} key={index} />
          ))}
        </div>
      </section>

      <section id="resume">
        <div className="resume-container">
          <span className="resume-subtitle">RESUME</span>
          <h2 className="resume-main-heading">
            Engineer of Reliable, <br />
            Efficient Applications
          </h2>
          <div className="resume-badge">
            Open to internships or full time opportunities
          </div>
          <div className="resume-stats-grid">
            <div className="stat-item">
              <i className="fas fa-layer-group"></i>
              <p>Full-stack expertise</p>
            </div>
            <div className="stat-item">
              <i className="fas fa-rocket"></i>
              <p>2+ production-ready projects</p>
            </div>
            <div className="stat-item">
              <i className="fas fa-certificate"></i>
              <p>3+ Certifications</p>
            </div>
            <div className="stat-item">
              <i className="fas fa-graduation-cap"></i>
              <p>7.6 CPI academic excellence</p>
            </div>
          </div>
          <div className="resume-buttons">
            <button onClick={downloadResume} className="btn-download">
              <i className="fas fa-file-download"></i> Download Resume
            </button>
            <a href="https://www.linkedin.com/in/tannu-majumdar-6755a6373" target="_blank" rel="noreferrer" className="btn-connect">
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="section-header">
          <h2>Get In Touch</h2>
        </div>
        <div className="contact-wrapper">
          <div className="contact-inner">
            <form action="mailto:tannumajumdar4@gmail.com" method="post" encType="text/plain" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <input type="text" className="form-input" name="name" required placeholder=" " />
                <label className="form-label">Your Name</label>
              </div>
              <div className="form-group">
                <input type="email" className="form-input" name="email" required placeholder=" " />
                <label className="form-label">Your Email</label>
              </div>
              <div className="form-group">
                <textarea className="form-input" name="message" required placeholder=" "></textarea>
                <label className="form-label">Your Message</label>
              </div>
              <button type="submit" className="submit-btn">Send Message <i className="fas fa-paper-plane"></i></button>
            </form>
          </div>
        </div>
      </section>

      <footer>
        <p>Designed & Built with <i className="fas fa-heart"></i> by Future Developer</p>
        <div className="social-icons">
          <h3>Tannu Majumdar</h3>
          <a href="mailto:tannumajumdar4@gmail.com"><i className="fas fa-envelope"></i></a>
          <a href="https://www.linkedin.com/in/tannu-majumdar-6755a6373" target="_blank" rel="noreferrer"><i className="fab fa-linkedin"></i></a>
        </div>
      </footer>

      <div id="toast" className={showToast ? "show" : ""}>Opening Email Client...</div>
    </div>
  );
};

export default App;
