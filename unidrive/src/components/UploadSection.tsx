import React, { useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useState } from 'react';
import { upload } from '@testing-library/user-event/dist/upload';


export const UploadSection: React.FC = () => {
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

  const app = initializeApp(firebaseConfig);
  console.log(app);
  const storage = getStorage(app);
  const storegeRef = ref(storage, 'files/');

  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const HandleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if(files){
      setError(null);
      setFile(files[0]);
    }
  }

  const UploadFile = () =>{
    if(file){
      const storageRef = ref(storage, 'files/' + file.name);
      uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
    } else {
      setError('Please select a file');
    }
  }

 return (
   <div className="flex">
    {error && (
      <div className="" role="alert">
        <p className="font-bold">Be Warned</p>
        <p>Something not ideal might be happening.</p>
      </div>
    )}
    <form className="">
      <div className="flex flex-col">
        <label className="" htmlFor="file">
          File:
        </label>
        <input className="" type="file" id="file" name="file" onChange={HandleFileChange}/>
      </div>

      <div className="flex justify-center">
      </div>
    </form>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" type="submit" onClick={UploadFile}>
        Upload
      </button>
    </div>
 );
}

