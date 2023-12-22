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
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if(success){
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    }
  }, [success]);

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
        setSuccess('File uploaded successfully');
      });
    } else {
      setError('Please select a file');
    }
  }

 return (
  <div className='flex'>
    <div className="flex flex-col items-center justify-center space-y-5">
      {error && (
        <div className="bg-red-100/75 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
          <p className="font-bold">No file selected</p>
          <p>Please select a file to upload 📂</p>
        </div>
      )}
      { success && (
        <div className=" text-center">
          <div className="transition ease-out duration-[250ms] p-2 bg-cyan-800 items-center leading-none lg:rounded-full flex lg:inline-flex" role="alert">
            <span className="flex rounded-full bg-green-500 uppercase px-2 py-1 text-xs font-bold mr-3">Uploaded</span>
            <span className="font-semibold mr-2 text-left flex-auto">Your file was uploaded</span>
          </div>
        </div>
      )}
      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-60 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">PDF, IMG, DOCX (MAX 500 MB)</p>
          </div>
          <input id="dropzone-file" type="file" className="hidden" onChange={HandleFileChange} />
      </label>
      <button className="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow" onClick={UploadFile}>
        <div className="absolute inset-0 w-3 bg-cyan-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
        <span className="relative text-black group-hover:text-white">Upload</span>
      </button>
    </div>
  </div>
 );
}

