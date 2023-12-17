import React from 'react';
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

  const HandleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if(files){
      setFile(files[0]);
    }
    alert("File selected");
  }

  const UploadFile = () => {
    if(file){
      uploadBytes(storegeRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
    }
  }

 return (
  <div className="flex items-center h-screen bg-gray-100">
    <form className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 ">
      <div className="flex flex-col">
        <label className="font-bold mb-2 text-gray-700" htmlFor="file">
          File:
        </label>
        <input className="border border-gray-300 p-2 rounded-lg cursor-pointer" type="file" id="file" name="file" onChange={HandleFileChange}/>
      </div>

      <div className="flex justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" onClick={UploadFile}>
          Upload
        </button>
      </div>
    </form>
  </div>
 );
}

