import React from 'react';
import logo from './logo.svg';
import { UploadSection } from './components/UploadSection';
import { UploadsList } from './components/UploadsList';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="flex space-x-10 bg-white">
          <UploadSection />
          <UploadsList />
        </div>
      </header>
    </div>
  );
}

export default App;
