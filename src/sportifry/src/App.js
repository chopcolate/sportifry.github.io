import MusicSite from './components/Music/MusicSite';
import './App.css';
import Footer from './components/Item/Footer';
import TodoSite from './components/Todo/TodoSite';

function App() {
  return (
    <div className="App">
      <MusicSite />
      <TodoSite />
      <Footer />
    </div>
  );
}

export default App;
