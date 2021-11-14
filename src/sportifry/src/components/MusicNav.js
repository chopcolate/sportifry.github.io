import '../css/MusicSite.css';

function MusicNav() {
  return (
    <div className="music-site-nav">
      <img alt="logo" />
      <div>
        <img alt="avatar" />
        <p>hi, username</p>
        <p>setting</p>
      </div>
      <button>logout</button>
    </div>
  );
}

function MusicNavNonUser() {
  return (
    <div className="music-site-nav-nonuser">
      <img alt="logo" />
      <div>
        <form>
          <label>username</label>
          <input type="text" />
          <label>password</label>
          <input type="password" />
        </form>
        <div>
          <button>login</button>
          <button>signup</button>
        </div>
      </div>
    </div>
  );
}

export { MusicNav, MusicNavNonUser };
