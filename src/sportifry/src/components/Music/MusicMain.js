import '../css/MusicSite.css';
import { MusicPlaylist } from './MusicPlaylist';
import { MusicSearch } from './MusicSearch';

export default function MusicMain(prop) {
  return (
    <div className="music-site-main">
      <MusicSearch />
      <MusicPlaylist username={prop.username} />
    </div>
  );
}
