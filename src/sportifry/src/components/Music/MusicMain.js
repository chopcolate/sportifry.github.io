import '../css/MusicSite.css';
import '../css/CommentBubble.css';
import { Comment } from './MusicPlaylist';
import { MusicSearch } from './MusicSearch';

export default function MusicMain(prop) {
  return (
    <div className="music-site-main">
      <MusicSearch />
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Comment />
        <div id="playing-lyric"></div>
      </div>
    </div>
  );
}
