import '../css/MusicSite.css';
import MusicMain from './MusicMain';
import { MusicNavNonUser } from './MusicNav';
import { MusicPlayer } from './MusicPlayer';
export default function MusicSite() {
  return (
    <div className="music-site">
      <MusicNavNonUser />
      <MusicMain />
      <MusicPlayer />
    </div>
  );
}
