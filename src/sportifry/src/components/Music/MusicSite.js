import { useState } from 'react/cjs/react.development';
import '../css/MusicSite.css';
import MusicMain from './MusicMain';
import { MusicNav, MusicNavNonUser } from './MusicNav';
import { MusicPlayer } from './MusicPlayer';

export default function MusicSite() {
  const [isLogin, setLogin] = useState(false);

  return (
    <div className="music-site">
      {isLogin ? (
        <MusicNav
          onLogout={() => {
            localStorage.removeItem('role');
            setLogin(false);
          }}
        />
      ) : (
        <MusicNavNonUser
          onLogin={() => {
            setLogin(true);
          }}
        />
      )}
      <MusicMain />
      <MusicPlayer />
    </div>
  );
}
