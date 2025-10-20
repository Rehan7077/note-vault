import { useNavigate } from "react-router-dom";
import "./Landing.css";
export const Landing = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="hero-section">
        <h1 className="hero-logo">Note Vault</h1>
        <h1 className="landing-title">
          Secure Your Thoughts. Anytime, Anywhere.
        </h1>
        <button className="cta-button" onClick={()=>navigate('./login')}>Get Started</button>
      </div>

      <section className="features-section">
        <h2 className="section-title">Why Choose NoteVault?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>🔐 Secure Notes</h3>
            <p>
              Your data is protected with secure authentication and storage.
            </p>
          </div>
          <div className="feature-card"> 
            <h3>📱 Accessible Anywhere</h3>
            <p>
              Use NoteVault on mobile, tablet, or desktop – anytime, anywhere.
            </p>
          </div>
          <div className="feature-card">
            <h3>📝 Easy Note Editor</h3>
            <p>Rich text support, organized layout, and fast editing tools.</p>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      <section className="about-section">
        <div className="about-container">
          <h2 className="section-title">About This Project</h2>
          <p className="about-description">
            NoteVault is a secure and responsive note-taking web application
            designed for users who value privacy and accessibility. Whether
            you're a student, professional, or creative thinker, NoteVault keeps
            your thoughts safe and synced across devices.
          </p>
          <p className="about-description">
            This project demonstrates modern frontend development using React,
            Firebase for authentication and storage, and a clean user-first UI
            with responsive design.
          </p>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <p>Note Vault © {new Date().getFullYear()}</p>
          <div className="footer-links">
            <a href="https://github.com/rehan7077" target="_blank">
              GitHub
            </a>
            <a href="https://linkedin.com/in/rehan7077" target="_blank">
              LinkedIn
            </a>
            <a href="mailto:atif.rehan7077@gmail.com">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
