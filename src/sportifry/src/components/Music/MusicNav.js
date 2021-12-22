import { useState } from 'react';
import '../css/MusicSite.css';
import '../css/ChatBubble.css';
import { SignIn, SignUp } from '../util/Utilities';
import { useEffect } from 'react/cjs/react.development';
import { NavLink } from 'react-router-dom';

const logoURL = 'https://www.pngall.com/wp-content/uploads/9/Spotify-Logo.png';
const avatarURL = 'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png';

function MusicNav(prop) {
  const active = {
    textAlign: 'center',
    margin: '0.3rem 0',
    backgroundColor: '#282828',
    borderRadius: '10px',
    color: 'white',
    textDecoration: 'none',
  };
  const nonActive = {
    textAlign: 'center',
    margin: '0.3rem 0',
    color: 'white',
    textDecoration: 'none',
  };
  const [role, setRole] = useState('');
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
        <NavLink to="/" style={({ isActive }) => (isActive ? active : nonActive)}>
          Music
        </NavLink>
        <NavLink to="/todo" style={({ isActive }) => (isActive ? active : nonActive)}>
          To do list
        </NavLink>
        <NavLink to="/playlist" style={({ isActive }) => (isActive ? active : nonActive)}>
          Playlist
        </NavLink>
        <NavLink to="/manage" style={({ isActive }) => (isActive ? active : nonActive)}>
          {role !== 'user' ? 'Manage' : ''}
        </NavLink>
        <NavLink
          to="/"
          style={{
            textAlign: 'center',
            margin: '0.3rem 0',
            color: 'white',
            textDecoration: 'none',
          }}
          onClick={() => {
            localStorage.removeItem('username');
            prop.onLogout();
          }}
        >
          Logout
        </NavLink>
      </nav>

      <div className="user">
        <img alt="avatar" src={avatarURL} />
        <p>Hi, {localStorage.getItem('username')}</p>
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
      <h1 style={{ textAlign: 'center', margin: '1rem 0', fontSize: '2rem' }}>Welcome to Sportifry</h1>
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
