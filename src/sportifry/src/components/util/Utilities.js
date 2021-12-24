import { initializeApp } from 'firebase/app';
import {
  addDoc,
  arrayUnion,
  arrayRemove,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';

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
let nowplaying = [];

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
      role: 'user',
      to_do_array: [],
    });
    return true;
  }
};

const DisplayChat = async () => {
  onSnapshot(collection(db, 'chatbox'), (querySnapshot) => {
    document.getElementsByClassName('chatbox')[0].innerHTML = '';
    querySnapshot.forEach((msg) => {
      document.getElementsByClassName('chatbox')[0].insertAdjacentHTML(
        'beforeend',
        `<div class="chatbubble">
          <img alt="avatar" src=${avatarURL} />
          <div>
            <p>${msg.data().username}</p>
            <div>${msg.data().text}</div>
          </div>
        </div>`
      );
    });
  });
};

const AddChat = async (msg) => {
  if (msg === '') {
    return;
  }
  await setDoc(doc(db, 'chatbox', `${new Date().getTime()}`), {
    username: localStorage.getItem('username'),
    text: msg,
  });
};

const DisplaySong = async () => {
  const songsRef = collection(db, 'Song');
  const qs = await getDocs(songsRef);
  const songsList = qs.docs.map((song) => {
    return song.data();
  });
  nowplaying = [];

  songsList.forEach((song, index) => {
    document.getElementById('songbox').insertAdjacentHTML(
      'beforeend',
      `<div class="song-card" >
        <img alt="thumbnail" src=${song.song_image} />
        <div>
          <p>${song.song_name}</p>
          <p> ${song.singer}</p>
        </div>
      </div>`
    );
    document.getElementsByClassName('song-card')[index].addEventListener('click', (e) => {
      PlaySong(song);
    });
    nowplaying.push(song);
  });
};

const SearchSong = async (input) => {
  const songsRef = collection(db, 'Song');
  const qs = await getDocs(songsRef);
  const songsList = qs.docs.map((song) => {
    return song.data();
  });
  const searchList = songsList.filter(
    (song) =>
      song.singer.toLowerCase().includes(input.toLowerCase()) ||
      song.song_name.toLowerCase().includes(input.toLowerCase())
  );
  document.getElementById('songbox').innerHTML = '';
  nowplaying = [];

  searchList.forEach((song, index) => {
    document.getElementById('songbox').insertAdjacentHTML(
      'beforeend',
      `<div class="song-card" >
        <img alt="thumbnail" src=${song.song_image} />
        <div>
          <p>${song.song_name}</p>
          <p> ${song.singer}</p>
        </div>
      </div>`
    );
    document.getElementsByClassName('song-card')[index].addEventListener('click', (e) => {
      PlaySong(song);
    });
    nowplaying.push(song);
  });
};

const PlaySong = async (data) => {
  localStorage.setItem('song', data.song_name);
  localStorage.setItem('author', data.singer);
  document.getElementById('playing-img').src = data.song_image;
  document.getElementById('playing-title').innerHTML = data.song_name;
  document.getElementById('playing-author').innerHTML = data.singer;
  document.getElementById('playing-src').src = data.link;
  document.getElementById('playing-src').addEventListener('timeupdate', (e) => {
    const { duration, currentTime } = e.srcElement;
    const progress = (currentTime / duration) * 100;
    document.getElementById('playing-progress').style.width = `${progress}%`;
  });
  document.getElementById('progress-container').addEventListener('click', (e) => {
    const width = document.getElementById('progress-container').offsetWidth;
    const clickX = e.offsetX;
    const duration = document.getElementById('playing-src').duration;
    document.getElementById('playing-src').currentTime = (clickX / width) * duration;
  });
  document.getElementById('playing-lyric').innerHTML = data.lyrics;
  document.getElementById('comment').innerHTML = '';
  data.comment_array.forEach((cmt) => {
    document.getElementById('comment').insertAdjacentHTML(
      'beforeend',
      `<div class="commentbubble">
      <img alt="avatar" src=${avatarURL} />
      <div>
        <p>${cmt.username}</p>
        <div>${cmt.text}</div>
      </div>
    </div>`
    );
  });
};

const NextSong = () => {
  const now = document.getElementById('playing-src').src;
  if (now === '') {
    return;
  }
  for (let i = 0; i < nowplaying.length; i++) {
    if (nowplaying[i].link === now) {
      if (i === nowplaying.length - 1) {
        PlaySong(nowplaying[0]);
      } else {
        PlaySong(nowplaying[i + 1]);
      }
    }
  }
};

const PrevSong = () => {
  const now = document.getElementById('playing-src').src;
  if (now === '') {
    return;
  }
  for (let i = 0; i < nowplaying.length; i++) {
    if (nowplaying[i].link === now) {
      if (i === 0) {
        PlaySong(nowplaying[nowplaying.length - 1]);
      } else {
        PlaySong(nowplaying[i - 1]);
      }
    }
  }
};

const DisplayPlaylist = async () => {
  const q = query(collection(db, 'Playlist'), where('owner', '==', localStorage.getItem('username')));
  onSnapshot(q, (querySnapshot) => {
    document.getElementsByClassName('playlist-list')[0].innerHTML = '';
    querySnapshot.forEach((doc) => {
      document.getElementsByClassName('playlist-list')[0].insertAdjacentHTML(
        'beforeend',
        `<div class="playlist-card" id='${doc.id}'>
            <img alt="thumbnail" src=${doc.data().playlist_image} />
            <h1>${doc.data().playlist_name}</h1>
            <p>Show more</p>
          </div>`
      );
      document.getElementById(`${doc.id}`).addEventListener('click', (e) => {
        localStorage.setItem('pl', e.target.id);
        DisplaySongPL();
      });
    });
  });
};

const DisplaySongPL = async () => {
  const pl = localStorage.getItem('pl');
  if (pl === '') {
    return;
  }
  onSnapshot(doc(db, 'Playlist', pl), async (querySnapshot) => {
    document.getElementById('playlist-song').innerHTML = '';
    if (querySnapshot.data() === undefined) {
      return;
    }
    const songarr = querySnapshot.data().song_array;
    const songRef = collection(db, 'Song');
    let count = 0;
    nowplaying = [];
    for (let song of songarr) {
      const q = query(songRef, where('song_name', '==', song));
      const qs1 = await getDocs(q);
      if (qs1.docs.length === 0) {
        continue;
      }
      const list = qs1.docs[0].data();
      document.getElementById('playlist-song').insertAdjacentHTML(
        'beforeend',
        `<div class="plsong" >
          <img alt="thumbnail" src=${list.song_image} />
          <div>
            <h1>${list.song_name}</h1>
            <p> ${list.singer}</p>
          </div>
        </div>`
      );
      document.getElementsByClassName('plsong')[count].addEventListener('click', () => {
        PlaySong(list);
      });
      nowplaying.push(list);
      count++;
    }
  });
};

const AddComment = async (msg) => {
  if (msg === '' || localStorage.getItem('song') === null || localStorage.getItem('author') === null) {
    return;
  }
  const song = localStorage.getItem('song');
  const author = localStorage.getItem('author');
  const cmtRef = collection(db, 'Song');
  const q = query(cmtRef, where('song_name', '==', song), where('singer', '==', author));
  const qs = await getDocs(q);
  let id;
  const cmtList = qs.docs.map((cmt) => {
    id = cmt.id;
    return cmt.data().comment_array;
  });
  const newCmtList = [
    ...cmtList[0],
    {
      username: localStorage.getItem('username'),
      text: msg,
    },
  ];
  const updateRef = doc(db, 'Song', id);
  await updateDoc(updateRef, {
    comment_array: newCmtList,
  });
  document.getElementById('comment').insertAdjacentHTML(
    'beforeend',
    `<div class="commentbubble">
      <img alt="avatar" src=${avatarURL} />
      <div>
        <p>${localStorage.getItem('username')}</p>
        <div>${msg}</div>
      </div>
    </div>`
  );
};

const AddPlaylist = async (input) => {
  const { name, img } = input;
  if (name === '' || img === '') {
    return;
  }
  await addDoc(collection(db, 'Playlist'), {
    playlist_name: name,
    playlist_image: img,
    owner: localStorage.getItem('username'),
    song_array: [],
  });
};

const DeletePlaylist = async (input) => {
  if (input === '') {
    return;
  }
  const plRef = collection(db, 'Playlist');
  const q = query(plRef, where('playlist_name', '==', input));
  const qs = await getDocs(q);
  const list = qs.docs.map((pl) => {
    return pl.id;
  });
  if (list.length > 0) {
    await deleteDoc(doc(db, 'Playlist', list[0]));
  }
};

const AddPlaylistSong = async (song) => {
  if (song === '') {
    return;
  }
  const pl = localStorage.getItem('pl');
  if (pl === null) {
    return;
  }
  const updateRef = doc(db, 'Playlist', pl);
  const docSnap = await getDoc(updateRef);

  if (docSnap.exists()) {
    const temp = [...docSnap.data().song_array, song];
    await updateDoc(updateRef, {
      song_array: temp,
    });
  }
};

const DeletePlaylistSong = async (song) => {
  if (song === '') {
    return;
  }
  const pl = localStorage.getItem('pl');
  if (pl === null) {
    return;
  }

  const updateRef = doc(db, 'Playlist', pl);
  const docSnap = await getDoc(updateRef);

  if (docSnap.exists()) {
    const temp = docSnap.data().song_array;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i] === song) {
        temp.splice(i, 1);
        i--;
      }
    }
    await updateDoc(updateRef, {
      song_array: temp,
    });
  }
};

const GetTodo = async () => {
  let count = 1;
  const userRef = collection(db, 'User');
  const q = query(userRef, where('username', '==', localStorage.getItem('username')));
  const todocall = await getDocs(q);
  const todolist = todocall.docs[0].data().to_do_array;
  const todoRef = await getDocs(query(collection(db, 'TodoList')));

  todolist.forEach((todo) => {
    var str = todo.replace(/ /g, '');
    todoRef.forEach((doc) => {
      if (str === doc.id) {
        document.getElementsByClassName('todo-main')[0].insertAdjacentHTML(
          'beforeend',
          `
        <div class="todo-card" id=${doc.id}>
            <div>
              <h1>Title: ${doc.data().title}</h1>
            </div>
            <div>
              <h1>Content: ${doc.data().content}</h1>
            </div>
            <p>click to remove this task</p>
        </div>
        `
        );
        document.getElementsByClassName('todo-card')[count].addEventListener(
          'click',
          (e) => {
            const todoid = e.target.id;
            if (todoid === '') {
              //ignore
            } else {
              DeleteTodo(todoid, FindClickedTodoCard(todoid));
              count--;
              localStorage.setItem('todocount', count);
            }
          },
          { passive: true }
        );
        count++;
      }
    });
  });
  localStorage.setItem('todocount', --count);
};
const SubmitTodo = async (titlestring, contentstring) => {
  const todoRef = collection(db, 'TodoList');
  if (titlestring === '' || contentstring === '') {
    return false;
  } else {
    const docRef = await addDoc(todoRef, {
      content: contentstring,
      title: titlestring,
    });
    const userRef = await getDocs(
      query(collection(db, 'User'), where('username', '==', localStorage.getItem('username')))
    );
    userRef.forEach(async (user) => {
      const todoarrayRef = doc(db, 'User', user.id);
      await updateDoc(todoarrayRef, {
        to_do_array: arrayUnion(docRef.id),
      });
    });
    document.getElementsByClassName('todo-main')[0].insertAdjacentHTML(
      'beforeend',
      `
        <div class="todo-card" id=${docRef.id}>
          <form>
            <div>
              <h1>Title: ${titlestring}</h1>
            </div>
            <div>
              <h1>Content: ${contentstring}</h1>
            </div>
            <p>click to remove this task</p>
          </form>
        </div>
        `
    );
    let tcount = parseInt(localStorage.getItem('todocount'));
    localStorage.setItem('todocount', ++tcount);
    document.getElementsByClassName('todo-card')[parseInt(localStorage.getItem('todocount'))].addEventListener(
      'click',
      (e) => {
        const todoid = e.target.id;
        if (todoid === '') {
          //ignore
        } else {
          DeleteTodo(todoid, FindClickedTodoCard(todoid));
          let count = localStorage.getItem('todocount');
          localStorage.setItem('todocount', --count);
        }
      },
      { passive: true }
    );
    return true;
  }
};
function FindClickedTodoCard(todoid) {
  const n = localStorage.getItem('todocount');
  let i = 1;
  for (i; i <= n; i++) {
    if (document.getElementsByClassName('todo-card')[i].id === todoid) {
      return i;
    }
  }
}

const DeleteTodo = async (todoid, currentcardid) => {
  if (currentcardid === 0) {
    // ignore;
  } else {
    await deleteDoc(doc(db, 'TodoList', todoid));
    const userRef = await getDocs(
      query(collection(db, 'User'), where('username', '==', localStorage.getItem('username')))
    );
    userRef.forEach(async (user) => {
      const todoarrayRef = doc(db, 'User', user.id);
      await updateDoc(todoarrayRef, {
        to_do_array: arrayRemove(todoid),
      });
    });
    var removehtml = document.getElementsByClassName('todo-card')[currentcardid];
    removehtml.remove();
  }
};

const DisplayAccount = async () => {
  onSnapshot(collection(db, 'User'), (querySnapshot) => {
    document.getElementsByClassName('display-account')[0].innerHTML = '';
    querySnapshot.forEach((acc) => {
      document.getElementsByClassName('display-account')[0].insertAdjacentHTML(
        'beforeend',
        `<div class="account-bubble">
          <img alt="avatar" src=${avatarURL} />
          <div>
            <p>Username: ${acc.data().username}</p>
            <div>Role: ${acc.data().role}</div>
          </div>
        </div>`
      );
    });
  });
};

const AddAccount = async ({ username, password, role }) => {
  if (username === '' || password === '' || role === '') {
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
      role: role,
      to_do_array: [],
    });
    return true;
  }
};

const DeleteAccount = async (username) => {
  if (username === '') {
    return;
  }
  const plRef = collection(db, 'User');
  const q = query(plRef, where('username', '==', username));
  const qs = await getDocs(q);
  const list = qs.docs.map((pl) => {
    return pl.id;
  });
  if (list.length > 0) {
    await deleteDoc(doc(db, 'User', list[0]));
  }
};

const DisplayManageSong = async () => {
  onSnapshot(collection(db, 'Song'), (querySnapshot) => {
    document.getElementsByClassName('manage-display-song')[0].innerHTML = '';
    querySnapshot.forEach((song) => {
      document.getElementsByClassName('manage-display-song')[0].insertAdjacentHTML(
        'beforeend',
        `<div class="manage-song-bubble">
          <img alt="avatar" src=${song.data().song_image} />
          <div>
            <p>${song.data().song_name}</p>
            <div>${song.data().singer}</div>
          </div>
        </div>`
      );
    });
  });
};

const AddManageSong = async ({ song, thumbnail, link, lyrics, singer }) => {
  if (song === '' || thumbnail === '' || link === '' || lyrics === '' || singer === '') {
    return false;
  }
  const usersRef = collection(db, 'Song');
  const q = query(usersRef, where('song_name', '==', song));
  const qs = await getDocs(q);
  if (qs.docs.length > 0) {
    return false;
  } else {
    await addDoc(usersRef, {
      song_name: song,
      song_image: thumbnail,
      link: link,
      lyrics: lyrics,
      comment_array: [],
      singer: singer,
    });
    return true;
  }
};

const DeleteManageSong = async (song) => {
  if (song === '') {
    return;
  }
  const plRef = collection(db, 'Song');
  const q = query(plRef, where('song_name', '==', song));
  const qs = await getDocs(q);
  const list = qs.docs.map((pl) => {
    return pl.id;
  });
  if (list.length > 0) {
    await deleteDoc(doc(db, 'Song', list[0]));
  }
};

export {
  SignIn,
  DisplaySong,
  SearchSong,
  SignUp,
  DisplayChat,
  AddChat,
  DisplayPlaylist,
  AddComment,
  NextSong,
  PrevSong,
  SubmitTodo,
  GetTodo,
  DeleteTodo,
  AddPlaylist,
  DeletePlaylist,
  AddPlaylistSong,
  DeletePlaylistSong,
  DisplayAccount,
  AddAccount,
  DeleteAccount,
  DisplayManageSong,
  AddManageSong,
  DeleteManageSong,
};
