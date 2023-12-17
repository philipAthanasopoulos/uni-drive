import React from 'react';
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useState } from 'react';


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
  const storage = getStorage(app);
  const storegeRef = ref(storage, '');

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
    }
  };

  const UploadFile = () => {
    uploadBytes(storegeRef, file!).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
  }

 return (
  <div className="flex items-center justify-center h-screen bg-gray-100">
    <form className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
      <div className="flex flex-col">
        <label className="font-bold mb-2 text-gray-700" htmlFor="file">
          File:
        </label>
        <input className="border border-gray-300 p-2 rounded-lg" type="file" id="file" name="file" onChange={handleFileChange}/>
      </div>
      <div className="flex justify-center">
        <input className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-400" type="submit" value="Submit" onSubmit={UploadFile} />
      </div>
    </form>
  </div>
 );
}

