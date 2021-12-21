import { initializeApp } from 'firebase/app';
import { addDoc, arrayUnion, collection, doc, getDocs, getFirestore, query, setDoc, updateDoc, where } from 'firebase/firestore';

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
  if (msg === '') {
    return;
  }
  await setDoc(doc(db, 'chatbox', `${new Date().getTime()}`), {
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
  songsList.forEach((song, index) => {
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
    document.getElementsByClassName('song-card')[index].addEventListener('click', (e) => {
      PlaySong(song);
    });
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
  searchList.forEach((song, index) => {
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
    document.getElementsByClassName('song-card')[index].addEventListener('click', (e) => {
      PlaySong(song);
    });
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
  data.comment_array.forEach((cmt) => {
    document.getElementById('comment').insertAdjacentHTML(
      'beforeend',
      `<div class="chatbubble">
      <img alt="avatar" src=${avatarURL} />
      <div>
        <p>${cmt.username}</p>
        <div>${cmt.text}</div>
      </div>
    </div>`
    );
  });
};

const DisplayPlaylist = async (username) => {
  const plRef = collection(db, 'Playlist');
  const q = query(plRef, where('owner', '==', username));
  const qs = await getDocs(q);
  const plList = qs.docs.map((pl) => {
    return pl.data();
  });
  plList.forEach((pl) => {
    document.getElementsByClassName('playlist-list')[0].insertAdjacentHTML(
      'beforeend',
      `<div class="playlist-card">
          <img alt="thumbnail" src=${pl.playlist_image} />
          <h1>${pl.playlist_name}</h1>
        </div>`
    );
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
    `<div class="chatbubble">
      <img alt="avatar" src=${avatarURL} />
      <div>
        <p>${localStorage.getItem('username')}</p>
        <div>${msg}</div>
      </div>
    </div>`
  );
};

const GetTodo = async()=> {
    
  const userRef = collection(db, 'User');
  const q = query(userRef, where("username","==",localStorage.getItem('username')));
  const todocall = await getDocs(q);
  const todolist = todocall.docs[0].data().to_do_array;
  const todoRef = await getDocs(query(collection(db, 'TodoList')));
  
  todolist.forEach((todo)=>{
    var str = todo.replace(/ /g, '');
    todoRef.forEach((doc)=>{
      if (str===doc.id){
        document.getElementsByClassName("todo-main")[0].insertAdjacentHTML('beforeend',`
        <div class="todo-card">
          <form>
            <div>
              <h1>${doc.data().title}</h1>
            </div>
            <div>
              <h1>${doc.data().content}</h1>
            </div>
            <button class="todo-add-button">x</button>
          </form>
        </div>
        `)
      }
    })
  })
};
const SubmitTodo = async(titlestring, contentstring)=>{
const todoRef = collection(db,'TodoList');
if (titlestring ==='' || contentstring === '') {
  return false;
}
else{
  const docRef = await addDoc(todoRef, {
    content: contentstring,
    title: titlestring,
  });
  const userRef =  await getDocs(query(collection(db,'User'), where("username","==",localStorage.getItem('username'))));
  userRef.forEach(async (user)=>{
    const todoarrayRef = doc(db,'User',user.id);
    await updateDoc(todoarrayRef, {
      to_do_array: arrayUnion(docRef.id)
    } );  

 });
 document.getElementsByClassName("todo-main")[0].insertAdjacentHTML('beforeend',`
        <div class="todo-card">
          <form>
            <div>
              <h1>${titlestring}</h1>
            </div>
            <div>
              <h1>${contentstring}</h1>
            </div>
            <button class="todo-add-button">x</button>
          </form>
        </div>
        `)
  return true;
  }
};


export { SignIn, DisplaySong, SearchSong, SignUp, DisplayChat, AddChat, DisplayPlaylist, AddComment, GetTodo, SubmitTodo };
