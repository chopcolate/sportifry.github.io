import { useState } from 'react';
import '../css/MusicSite.css';
import MusicMain from './MusicMain';
import { MusicNav, MusicNavNonUser } from './MusicNav';
import { MusicPlayer } from './MusicPlayer';

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
      <MusicMain username={isLogin} />
      <MusicPlayer />
    </div>
  );
}