import React, { FC } from 'react';
import { useDropzone, DropEvent, FileRejection, Accept } from 'react-dropzone';

interface DropzoneProps {
    onDrop: (acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => void;
    accept?: Accept;
}

const Dropzone: FC<DropzoneProps> = ({ onDrop, accept }) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept
    });

    return (
        <div {...getRootProps()}>
            <div className="flex items-center justify-center w-full">
                <input {...getInputProps()}/>
                    <label htmlFor="dropzone-file" className={` transition-colors duration-200 ease-out flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer ${isDragActive ? 'bg-gray-500' : 'bg-gray-700'}`}>
                    <div className="flex flex-col items-center justify-center pl-5 pr-5">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Documents and Images (MAX. 500MB)</p>
                    </div>
                </label>
            </div> 
        </div>
    );
};

export default Dropzone;