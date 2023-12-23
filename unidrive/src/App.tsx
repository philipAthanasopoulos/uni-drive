import React from 'react';
import logo from './logo.svg';
import { UploadSection } from './components/UploadSection';
import { UploadsList } from './components/UploadsList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className='text-3xl font-bold'>UniDrive</h1>
        <div className="flex flex-row h-screen w-screen bg-gradient-to-b from-cyan-500 to-white justify-center">
          <div className='flex flex-row space-x-10 items-center'>
            <UploadSection />
            <UploadsList />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
