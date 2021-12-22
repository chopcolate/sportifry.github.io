import { useState } from 'react';
import '../css/MusicSite.css';
import MusicMain from './MusicMain';
import { MusicNav, MusicNavNonUser } from './MusicNav';

export default function MusicSite() {
  const [isLogin, setLogin] = useState(localStorage.getItem('username'));

  return (
    <div className="music-site">
      {isLogin !== null ? (
        <MusicNav
          onLogout={() => {
            localStorage.removeItem('role');
            setLogin(null);
          }}
        />
      ) : (
        <MusicNavNonUser
          onLogin={() => {
            setLogin(localStorage.getItem('username'));
          }}
        />
      )}
      <div id="music-container">
        <MusicMain username={isLogin} />
        {/* <MusicPlayer /> */}
      </div>
    </div>
  );
}
