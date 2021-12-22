import '../css/MusicSite.css';
import { TodoMain } from './TodoMain';
import { MusicNav } from '../Music/MusicNav';
import { MusicPlayer } from '../Music/MusicPlayer';

export default function TodoSite() {
  return (
    <div className="music-site">
      <MusicNav />
      <div id="music-container">
        <TodoMain />
        <MusicPlayer />
      </div>
    </div>
  );
}
