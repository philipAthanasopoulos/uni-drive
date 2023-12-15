import illustration from './illustrations/undraw_reading_time_re_phf7.svg';
import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import {useState, useEffect} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "unidrive-f8149.firebaseapp.com",
  databaseURL: "https://unidrive-f8149-default-rtdb.firebaseio.com",
  projectId: "unidrive-f8149",
  storageBucket: "unidrive-f8149.appspot.com",
  messagingSenderId: "630180175743",
  appId: "1:630180175743:web:6a39ea24129107690b444a",
  measurementId: "G-2Q5RKJV1FC"
}

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return(
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
} 

function deleteAllFilesInStorage() {
  const storageRef = firebase.storage().ref('myFile');

  storageRef.listAll().then((result) => {
    const promises = result.items.map((item) => item.delete());
    return Promise.all(promises);
  }).then(() => {
    console.log("All files deleted successfully");
  }).catch((error) => {
    console.log(error);
  });
}

function DeleteAllFilesInStorage() {
  return (
    <div>
      <h1>Delete All Files</h1>
      <button onClick={deleteAllFilesInStorage}>Delete All Files</button>
    </div>
  );
}

function ListAllFilesInStorage() {
  const [fileNames, setFileNames] = useState([]);
  useEffect(() => {
    const storageRef = firebase.storage().ref('myFile');
    storageRef.listAll().then((result) => {
      const promises = result.items.map((item) => item.getDownloadURL().then((url) => ({ url, name: item.name })));
      return Promise.all(promises);
    }).then((urls) => {
      setFileNames(urls);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <div>
      <h2>Files</h2>
      <ul>
        {fileNames.map(({ url, name }) => {
          const extension = name.toLowerCase().split('.').pop();
          const className = `${extension}`;
          return (
            <li key={url} className={className}>
              <a href={url} download target='_blank'>{name} </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function UploadFile() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [url, setURL] = useState('');

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const handleUpload = () => {
    const storageRef = firebase.storage().ref(`myFile/${file.name}`);
    const uploadTask = storageRef.put(file);
  };

  return (
    <div>
      <h1>Upload File</h1>
      <input type="file" onChange={handleChange} className='fileInput' />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header className="App-header">
        <h1>UniDrive</h1>
        <div className='illustration'>
          <img className='illustration-img'   src={illustration} alt='illustration'  />
          <p className='illustration'>UniDrive is a cloud storage service for students. It allows you to upload and download files from anywhere.</p>            
        </div>
        {user ? <SignOut /> : <SignIn />}
      </header>
        <div className='fileList-container'>
          <section className='fileList'>
            {user ? <UploadFile /> : null}
            {user ? <ListAllFilesInStorage /> : null}
          </section>
        </div>
    </div>
  );
}

export default App;
