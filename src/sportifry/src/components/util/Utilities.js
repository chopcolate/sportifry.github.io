import { initializeApp } from 'firebase/app';
import { addDoc, collection, doc, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCs5H90lC4gohqDtz0bJ-FkF6UD9O8Rkeo',
  authDomain: 'introse-project.firebaseapp.com',
  projectId: 'introse-project',
  storageBucket: 'introse-project.appspot.com',
  messagingSenderId: '248213164602',
  appId: '1:248213164602:web:81a4ea4748e8d3e65fdb03',
};
initializeApp(firebaseConfig);
const db = getFirestore();

const avatarURL = 'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png';

const SignIn = async (data) => {
  const { username, password } = data;
  const usersRef = collection(db, 'User');

  const q = query(usersRef, where('username', '==', username));

  const qs = await getDocs(q);
  if (qs.docs.length > 0) {
    if (qs.docs[0].data().password === password) {
      localStorage.setItem('role', qs.docs[0].data().role);
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

const SignUp = async (data) => {
  const { username, password } = data;
  if (username === '' || password === '') {
    return false;
  }
  const usersRef = collection(db, 'User');
  const q = query(usersRef, where('username', '==', username));
  const qs = await getDocs(q);
  if (qs.docs.length > 0) {
    return false;
  } else {
    await addDoc(usersRef, {
      username: username,
      password: password,
      playlist_array: [],
      role: 'user',
      to_do_array: [],
    });
    return true;
  }
};

const DisplayChat = async () => {
  const chatRef = collection(db, 'chatbox');
  const qs = await getDocs(chatRef);
  const chatList = qs.docs.map((msg) => {
    return msg.data();
  });
  chatList.forEach((msg) => {
    document.getElementsByClassName('chatbox')[0].insertAdjacentHTML(
      'beforeend',
      `<div class="chatbubble">
        <img alt="avatar" src=${avatarURL} />
        <div>
          <p>${msg.username}</p>
          <div>${msg.text}</div>
        </div>
      </div>`
    );
  });
};

const AddChat = async (msg) => {
  const chatRef = collection(db, 'chatbox');
  const qs = await getDocs(chatRef);
  const chatList = qs.docs.map((msg) => {
    return msg.data();
  });
  let count = chatList.length;
  await setDoc(doc(db, 'chatbox', `${count + 1}`), {
    username: localStorage.getItem('username'),
    text: msg,
  });
  document.getElementsByClassName('chatbox')[0].insertAdjacentHTML(
    'beforeend',
    `<div class="chatbubble">
      <img alt="avatar" src=${avatarURL} />
      <div>
        <p>${localStorage.getItem('username')}</p>
        <div>${msg}</div>
      </div>
    </div>`
  );
};

const DisplaySong = async () => {
  const songsRef = collection(db, 'Song');
  const qs = await getDocs(songsRef);
  const songsList = qs.docs.map((song) => {
    return song.data();
  });
  songsList.forEach((song) => {
    document.getElementById('songbox').insertAdjacentHTML(
      'beforeend',
      `<div class="song-card" >
        <img alt="thumbnail" src=${song.song_image} />
        <div>
          <h1>${song.song_name}</h1>
          <p> ${song.singer}</p>
        </div>
        <div>+</div>
      </div>`
    );
  });
};

const SearchSong = async (input) => {
  const songsRef = collection(db, 'Song');
  const qs = await getDocs(songsRef);
  const songsList = qs.docs.map((song) => {
    return song.data();
  });
  const searchList = songsList.filter((song) => song.singer.toLowerCase().includes(input.toLowerCase()));
  document.getElementById('songbox').innerHTML = '';
  searchList.forEach((song) => {
    document.getElementById('songbox').insertAdjacentHTML(
      'beforeend',
      `<div class="song-card" >
        <img alt="thumbnail" src=${song.song_image} />
        <div>
          <h1>${song.song_name}</h1>
          <p> ${song.singer}</p>
        </div>
        <div>+</div>
      </div>`
    );
  });
};

export { SignIn, DisplaySong, SearchSong, SignUp, DisplayChat, AddChat };
