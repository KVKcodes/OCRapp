import React, { useState } from 'react';
import './App.css';
import FileUploader from './FileUploader';
import TextRecognition from './TextRecognision';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState('');

  return (
    <div className="App">
      <FileUploader setSelectedFile={setSelectedFile} setFileType={setFileType} />
      {selectedFile && <TextRecognition selectedFile={selectedFile} fileType={fileType} />}
    </div>
  );
}

export default App;
