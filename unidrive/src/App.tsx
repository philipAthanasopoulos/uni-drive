import React from 'react';
import logo from './logo.svg';
import { UploadSection } from './components/UploadSection';
import { UploadsList } from './components/UploadsList';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="flex flex-col h-screen w-screen bg-gradient-to-r from-teal-500 to-white pt-20 pl-20">
          <div className='flex flex-row justify-right items-center'>
            <div className='flex flex-row justify-center items-center'>
              <UploadSection />
            </div>
            <div className='flex flex-row justify-center items-center'>
              <UploadsList />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
