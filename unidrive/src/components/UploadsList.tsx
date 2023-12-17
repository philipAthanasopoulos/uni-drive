import React from 'react';
import { initializeApp } from "firebase/app";
import { getStorage, listAll, ref } from "firebase/storage";

export const UploadsList: React.FC = () => {
    const [fileNames, setFileNames] = React.useState<string[]>([]);

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
    const storageRef = ref(storage, 'files/');

    const getFileNames = async () => {
        const res = await listAll(storageRef);
        const names = res.items.map(item => item.name);
        setFileNames(names);
    };

    React.useEffect(() => {
        getFileNames();
    }, []);

    return (
        <ul>
            {fileNames.map((name, index) => (
            <li key={index}>{name}</li>
            ))}
        </ul>
        );
    

   
}