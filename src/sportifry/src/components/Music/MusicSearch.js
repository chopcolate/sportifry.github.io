import { useEffect } from 'react';
import '../css/MusicSite.css';
import '../css/SongCard.css';
import { DisplaySong, SearchSong } from '../util/Utilities';

export function MusicSearch() {
  useEffect(() => {
    const callback = async () => {
      await DisplaySong();
    };
    callback();
  }, []);
  return (
    <div className="music-search">
      <input
        type="text"
        placeholder="Search your songs..."
        onChange={async (e) => {
          await SearchSong(e.target.value);
        }}
      />
      <div id="songbox"></div>
    </div>
  );
}
