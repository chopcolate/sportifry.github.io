import '../css/MusicSite.css';

function MusicPlayer() {
  return (
    <div className="music-site-player">
      <div className="music-site-player-controller">
        <img alt="thumbnail" />
        <div>progress bar</div>
        <div>
          <button>play</button>
          <button>previous</button>
          <button>next</button>
          <button>pause</button>
        </div>
      </div>
      <div>playlist</div>
    </div>
  );
}

function MusicPlayerNonUser() {
  return (
    <div className="music-site-player">
      <div className="music-site-player-controller">
        <img alt="thumbnail" />
        <div>progress bar</div>
        <div>
          <button>play</button>
          <button>previous</button>
          <button>next</button>
          <button>pause</button>
        </div>
      </div>
    </div>
  );
}

export { MusicPlayer, MusicPlayerNonUser };
