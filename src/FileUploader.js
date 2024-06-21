import React from 'react';

const FileUploader = ({ setSelectedFile, setFileType }) => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileType(file.type);
  };

  return (
    <div>
      <input type="file" accept="image/*,application/pdf" onChange={handleFileUpload} />
    </div>
  );
};

export default FileUploader;
