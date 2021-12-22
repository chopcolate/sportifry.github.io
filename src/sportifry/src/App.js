import MusicSite from './components/Music/MusicSite';
import './App.css';
import './components/css/MusicSite.css';
import Footer from './components/Item/Footer';
import { Route, Routes } from 'react-router-dom';
import TodoSite from './components/Todo/TodoSite';
import ManageSite from './components/Manage/ManageSite';
import Chatbox from './components/Item/Chatbox';
import { useState } from 'react/cjs/react.development';
import { MusicPlaylist } from './components/Music/MusicPlaylist';
import { MusicPlayer } from './components/Music/MusicPlayer';

function App() {
  const [isChatboxOn, setChatboxOn] = useState(false);
  const handleChatboxOn = () => {
    if (isChatboxOn) {
      setChatboxOn(false);
    } else {
      setChatboxOn(true);
    }
  };
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MusicSite />} />
        <Route path="/todo" element={<TodoSite />} />
        <Route path="/manage" element={<ManageSite />} />
        <Route path="/playlist" element={<MusicPlaylist />} />
      </Routes>
      {isChatboxOn ? (
        <Chatbox on={isChatboxOn} />
      ) : (
        <i className="fas fa-comment chaticon" onClick={handleChatboxOn}></i>
      )}
      <i className="fas fa-comment chaticon" onClick={handleChatboxOn}></i>
      <MusicPlayer />
      <Footer />
    </div>
  );
}

export default App;
