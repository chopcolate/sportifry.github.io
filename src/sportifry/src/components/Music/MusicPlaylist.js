import {
  AddComment,
  DisplayPlaylist,
  AddPlaylist,
  DeletePlaylist,
  AddPlaylistSong,
  DeletePlaylistSong,
} from '../util/Utilities';
import '../css/PlaylistCard.css';
import '../css/MusicSite.css';
import { MusicNav } from '../Music/MusicNav';

function MusicPlaylist() {
  return (
    <div className="music-site">
      <MusicNav />
      <div id="music-container">
        <div className="music-playlist">
          <Playlist username={localStorage.getItem('username')} />
          <div className="add-playlist">
            <input type="text" id="addpl-name" placeholder="Name" />
            <input type="text" id="addpl-img" placeholder="Thumbnail URL" />
            <button
              onClick={() => {
                const name = document.getElementById('addpl-name').value;
                const img = document.getElementById('addpl-img').value;
                document.getElementById('addpl-name').value = '';
                document.getElementById('addpl-img').value = '';
                AddPlaylist({ name, img });
              }}
            >
              Add
            </button>
            <button
              onClick={() => {
                const name = document.getElementById('addpl-name').value;
                document.getElementById('addpl-name').value = '';
                document.getElementById('addpl-img').value = '';
                DeletePlaylist(name);
              }}
            >
              Delete
            </button>
          </div>
          <PLSong />
          <div className="add-playlist">
            <input type="text" id="addpls" placeholder="Song" />
            <button
              onClick={() => {
                const song = document.getElementById('addpls').value;
                document.getElementById('addpls').value = '';
                AddPlaylistSong(song);
              }}
            >
              Add
            </button>
            <button
              onClick={() => {
                const song = document.getElementById('addpls').value;
                document.getElementById('addpls').value = '';
                DeletePlaylistSong(song);
              }}
            >
              Delete
            </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Comment />
            <div id="playing-lyric"></div>
          </div>
        </div>
        {/* <MusicPlayer /> */}
      </div>
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
    <div>
      <div style={{ fontSize: '2rem' }}>Your playlists</div>
      <div className="playlist-list playlist"></div>
    </div>
  );
}

function PLSong() {
  return (
    <div>
      <h1>Songs</h1>
      <div className="playlist" id="playlist-song"></div>
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

export { MusicPlaylist, Comment };
