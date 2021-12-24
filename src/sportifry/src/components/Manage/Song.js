import { useEffect, useState } from 'react/cjs/react.development';
import '../css/ManageSite.css';
import { AddManageSong, DeleteManageSong, DisplayManageSong } from '../util/Utilities';

export default function Song() {
  const [song, setSong] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [link, setLink] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [singer, setSinger] = useState('');
  useEffect(() => {
    const callback = async () => {
      await DisplayManageSong();
    };
    callback();
  }, []);
  return (
    <div className="manage-song">
      <div className="manage-display-song"></div>
      <div className="manage-handle-song">
        <label>Song</label>
        <input
          type="text"
          value={song}
          onChange={(e) => {
            setSong(e.target.value);
          }}
        />
        <label>Thumbnail URL</label>
        <input
          type="text"
          value={thumbnail}
          onChange={(e) => {
            setThumbnail(e.target.value);
          }}
        />
        <label>Link</label>
        <input
          type="text"
          value={link}
          onChange={(e) => {
            setLink(e.target.value);
          }}
        />
        <label>Singer</label>
        <input
          type="text"
          value={singer}
          onChange={(e) => {
            setSinger(e.target.value);
          }}
        />
        <label>Lyrics</label>
        <input
          type="text"
          value={lyrics}
          onChange={(e) => {
            setLyrics(e.target.value);
          }}
        />
        <button
          onClick={() => {
            AddManageSong({ song, thumbnail, link, lyrics, singer });
          }}
        >
          Add
        </button>
        {localStorage.getItem('role') === 'admin' ? (
          <button
            onClick={() => {
              DeleteManageSong(song);
            }}
          >
            Delete
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
