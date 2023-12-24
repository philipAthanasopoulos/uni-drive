import React, { useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useState } from 'react';
import { upload } from '@testing-library/user-event/dist/upload';
import Dropzone from './Dropzone';
import { FirebaseApp } from 'firebase/app';

interface UploadSectionProps {
  app: FirebaseApp;
}

export const UploadSection: React.FC<UploadSectionProps> = ({ app }) => {

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
      }, 4900);
    }
  }, [success]);

  const HandleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if(files) {
      setError(null);
      setFile(files[0]);
    }
  }

  const HandleDrop = (acceptedFiles: File[]) => {
    if(acceptedFiles.length > 0){
      setError(null);
      setFile(acceptedFiles[0]);
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
    { success && (
      <div className="w-screen absolute top-10 left-0 flex justify-center">
        <div className="animate-fadeIn">
          <div className="transition ease-out duration-[250ms] p-2 bg-cyan-800 items-center leading-none lg:rounded-full flex lg:inline-flex" role="alert">
            <span className="flex rounded-full bg-green-500 uppercase px-2 py-1 text-xs font-bold mr-3">Uploaded</span>
            <span className="font-semibold mr-2 text-left flex-auto">{file?.name} was uploaded</span>
          </div>
        </div>
      </div>
    )}
    <div className="flex flex-col items-center justify-center space-y-5">
      {error && (
        <div className="bg-red-100/75 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
          <p className="font-bold">No file selected</p>
          <p>Please select a file to upload 📂</p>
        </div>
      )}
      <Dropzone onDrop={HandleDrop} />
      <button className="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow" onClick={UploadFile}>
        <div className="absolute inset-0 w-3 bg-cyan-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
        <span className="relative text-black group-hover:text-white">Upload</span>
      </button>
    </div>
  </div>
 );
}

