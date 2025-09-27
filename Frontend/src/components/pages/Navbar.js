import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/navbar.css';

export default function Navbar({ profile, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  useEffect(() => {
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        if (window.google && window.google.translate) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              includedLanguages: 'en,kn,hi,te,ta,ml',
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false,
            },
            'google_translate_element'
          );
        }
      };
    } else {
      if (window.google && window.google.translate && !document.getElementById(':0.container')) {
        window.googleTranslateElementInit?.();
      }
    }
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <strong>Service Hire</strong>
        <div id="google_translate_element" style={{ color: 'black' }} />
      </div>

      <div className="navbar-right">
        <div className="nav-links">
          <span className="nav-link" onClick={() => navigate('/home')}>Home</span>
          <span className="nav-link" onClick={() => navigate('/workers')}>Workers</span>
          <a
            href="https://clone-chat-app-5h0j.onrender.com/chats"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
          >
            Chat
          </a>
        </div>

        {profile && (
          <div className="profile-section">
            <div className="profile-info" onClick={() => navigate('/profile')}>
              {profile.photo ? (
                <img
                  src={`data:${profile.contentType || 'image/jpeg'};base64,${profile.photo}`}
                  alt="Profile"
                  className="profile-img"
                />
              ) : (
                <div className="profile-placeholder" />
              )}
              <span>{profile.name}</span>
            </div>

            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}
