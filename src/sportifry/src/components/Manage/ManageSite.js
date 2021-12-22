import { MusicNav } from '../Music/MusicNav';
import ManageMain from './ManageMain';

export default function ManageSite() {
  return (
    <div className="music-site">
      <MusicNav />
      <div id="music-container">
        <ManageMain />
        {/* <MusicPlayer /> */}
      </div>
    </div>
  );
}
