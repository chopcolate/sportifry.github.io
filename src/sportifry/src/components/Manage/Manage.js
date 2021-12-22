import { MusicNav } from '../Music/MusicNav';
import { MusicPlayer } from '../Music/MusicPlayer';

export default function Manage() {
  return (
    <div className="music-site">
      <MusicNav
        onLogout={() => {
          localStorage.removeItem('role');
        }}
      />
      asdasdasdsad
      <MusicPlayer />
    </div>
  );
}
