import { AddComment, DisplayPlaylist } from '../util/Utilities';
import '../css/PlaylistCard.css';

function MusicPlaylist(prop) {
  return (
    <div className="music-playlist">
      <Playlist username={prop.username} />
      <Comment />
    </div>
  );
}

function Playlist(prop) {
  if (prop.username !== null) {
    const callback = async () => {
      await DisplayPlaylist(prop.username);
    };
    callback();
  } else {
    setTimeout(() => {
      document.getElementsByClassName('playlist-list')[0].innerHTML = '';
    }, 500);
  }
  return (
    <div className="playlist">
      <div className="playlist-header">
        <div style={{ fontSize: '2rem' }}>Playlist</div>
        <div style={{ fontSize: '2rem' }}>+</div>
      </div>
      <div className="playlist-list"></div>
    </div>
  );
}

function Comment() {
  localStorage.removeItem('song');
  localStorage.removeItem('author');
  return (
    <div className="comment-container">
      <div id="comment"></div>
      <input
        type="text"
        placeholder="Enter to comment..."
        onKeyPress={async (e) => {
          if (e.key === 'Enter') {
            await AddComment(e.target.value);
            e.target.value = '';
          }
        }}
      />
    </div>
  );
}

export { MusicPlaylist };
