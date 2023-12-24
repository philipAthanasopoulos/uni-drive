import React, { useEffect } from 'react';
import { FirebaseApp } from "firebase/app";
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";

interface UploadSectionProps {
    app: FirebaseApp;
}

export const UploadsList: React.FC<UploadSectionProps> = ({ app }) => {

    type File = {
        name: string;
        url: string;
    };

    const storage = getStorage(app);
    const storageRef = ref(storage, 'files/');
    const [fileNames, setFileNames] = React.useState<File[]>([]);
    
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
    
    useEffect(() => {
        const interval = setInterval(() => {
            getFileNames();
        }, 5000); // Check every 5 seconds

        return () => clearInterval(interval); // Clean up on component unmount
    }, []);

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
        <div className='space-y-5'>
            <h1 className='text-3xl font-bold'>Files</h1>
            <ul className='rounded '>
                {fileNames.map((file, index) => (
                    <li className="transform bg-cyan-400 text-left text-white pr-5 transition duration-100 ease-out hover:bg-cyan-500" key={index}>
                        <a href={file.url} target = "_blank" download={file.name}>
                            {getFileIcon(file.name)}{file.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}