import React from 'react';
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";

export const UploadsList: React.FC = () => {
    type File = {
        name: string;
        url: string;
    };

    const [fileNames, setFileNames] = React.useState<File[]>([]);

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
        const files = await Promise.all(
            res.items.map(async item => {
                const url = await getDownloadURL(item);
                return { name: item.name, url };
            })
        );
        setFileNames(files);
    };

    const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.')[1];
    const icon: { [key: string]: string } = {
            pdf: '',
            doc: '📄',
            docx: '📄',
            xls: '📄',
            xlsx: '📄',
            ppt: '📄',
            pptx: '📄',
            jpg: '📷',
            jpeg: '📷',
            png: '📷',
            gif: '📷',
            svg: '📷',
            mp4: '🎥',
            mov: '🎥',
            mp3: '🎵',
            wav: '🎵',
        };
        return icon[ext] ? icon[ext] : '📄';
    }

    React.useEffect(() => {
        getFileNames();
    }, []);

    return (
        <div className=''>
            <h1 className='text-2xl font-bold'>Files</h1>
            <ul className='bg-white rounded-lg'>
                {fileNames.map((file, index) => (
                    <li className="text-black hover:bg-gray-200 rounded-lg text-left" key={index}>
                        <a href={file.url} target = "_blank" download={file.name}>
                            {getFileIcon(file.name)}{file.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}