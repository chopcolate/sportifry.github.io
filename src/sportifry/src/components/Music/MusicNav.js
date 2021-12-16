import { useState } from 'react';
import '../css/MusicSite.css';
import '../css/ChatBubble.css';
import { AddChat, DisplayChat, SignIn, SignUp } from '../util/Utilities';
import { useEffect } from 'react/cjs/react.development';

const logoURL = 'https://www.pngall.com/wp-content/uploads/9/Spotify-Logo.png';
const avatarURL = 'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png';

function MusicNav(prop) {
  const [role, setRole] = useState('');
  useEffect(() => {
    DisplayChat();
  }, []);
  useEffect(() => {
    setRole(localStorage.getItem('role'));
  }, []);
  return (
    <div className="music-site-nav">
      <div className="logo">
        <img alt="logo" src={logoURL} />
        <p>Sportifry</p>
      </div>

      <nav>
        <h1>Music</h1>
        <h1>To do list</h1>
        {role !== 'user' ? <h1>Manage</h1> : ''}
        <h1
          onClick={() => {
            localStorage.removeItem('username');
            prop.onLogout();
          }}
        >
          Logout
        </h1>
      </nav>

      <div className="user">
        <img alt="avatar" src={avatarURL} />
        <p>Hi, {localStorage.getItem('username')}</p>
      </div>

      <div className="chatbox-container">
        <div className="chatbox"></div>
        <input
          id="chatbox-input"
          type="text"
          placeholder="Enter to say something..."
          onKeyPress={async (e) => {
            if (e.key === 'Enter') {
              await AddChat(e.target.value);
              e.target.value = '';
            }
          }}
        />
      </div>
    </div>
  );
}

function MusicNavNonUser(prop) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="music-site-nav-nonuser">
      <div className="logo">
        <img alt="logo" src={logoURL} />
        <p>Sportifry</p>
      </div>

      <nav>
        <h1>Music</h1>
      </nav>

      <div className="auth-form">
        <form className="auth-input">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </form>
        <div id="auth-notice" style={{ color: 'red', textAlign: 'center', display: 'none' }}>
          Input invalid
        </div>
        <div className="auth-button">
          <button
            onClick={async () => {
              if (await SignIn({ username, password })) {
                localStorage.setItem('username', username);
                document.getElementById('auth-notice').style.display = 'none';
                prop.onLogin();
              } else {
                document.getElementById('auth-notice').style.display = 'block';
              }
            }}
          >
            Sign In
          </button>
          <button
            onClick={async () => {
              if (await SignUp({ username, password })) {
                localStorage.setItem('username', username);
                document.getElementById('auth-notice').style.display = 'none';
                prop.onLogin();
              } else {
                document.getElementById('auth-notice').style.display = 'block';
              }
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export { MusicNav, MusicNavNonUser };
