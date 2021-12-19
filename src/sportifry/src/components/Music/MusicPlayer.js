import '../css/MusicSite.css';
import '../css/gg-button-o.css';
import { useState } from 'react';

const thumbnailURL = 'https://www.pngall.com/wp-content/uploads/9/Spotify-Logo.png';

function MusicPlayer() {
  const [isPlay, setPlay] = useState(true);
  const [isLoop, setLoop] = useState(false);
  const handlePlay = () => {
    if (document.getElementById('playing-src').src !== '') {
      document.getElementById('playing-src').play();
    }
    setPlay(true);
  };
  const handlePause = () => {
    if (document.getElementById('playing-src').src !== '') {
      document.getElementById('playing-src').pause();
    }
    setPlay(false);
  };
  const handleLoop = () => {
    if (document.getElementById('playing-src').loop) {
      setLoop(false);
    } else {
      setLoop(true);
    }
  };
  return (
    <div className="music-site-player">
      <div className="music-site-player-controller">
        <img alt="thumbnail" src={thumbnailURL} id="playing-img" />
        <audio id="playing-src" autoPlay loop={isLoop} />
        <div id="progress-container">
          <div id="playing-progress"> </div>
        </div>
        <div className="controller-btn-container">
          <i id="playing-pre" className="gg-play-track-prev-o"></i>
          {isPlay ? (
            <i id="playing-pause" className="gg-play-pause-o" onClick={handlePause}></i>
          ) : (
            <i id="playing-play" className="gg-play-button-o" onClick={handlePlay}></i>
          )}
          <i id="playing-next" className="gg-play-track-next-o"></i>
          <i
            id="playing-loop"
            className="gg-repeat"
            onClick={handleLoop}
            style={isLoop ? { color: '#1ed760' } : {}}
          ></i>
        </div>
        <div id="playing-title">You made my day!</div>
        <div id="playing-author">Simp</div>
      </div>
      <hr style={{ border: '1px #1ed760 solid' }} />
      <div id="playing-lyric"></div>
    </div>
  );
}

export { MusicPlayer };
