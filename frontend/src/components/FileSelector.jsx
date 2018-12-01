import React from 'react';
import {setFile, setError} from '../actions';
import {store} from '../index';

const handleFile = () => {
  const file = document.getElementById('dropInput').files[0];
  if(file.type === 'application/pdf') {
    store.dispatch(setError(''));
    store.dispatch(setFile(file));
  } else {
    const message = 'Error: The file needs to be a PDF. Check if the file you selected is in a valid PDF format.'
    store.dispatch(setError(message));
    console.log(message);
    // This "resets" the dropInput element so the erroneous file will not be available
    // to upload and "No file selected" will be shown to the user.
    document.getElementById('dropInput').value = document.getElementById('dropInput').defaultValue;
  }
}

const FileSelector = () => {
  return (
    <input
      className="drop-input"
      type="file"
      accept="application/pdf"
      id="dropInput"
      onChange={handleFile}
    />
  );
}

export default FileSelector;
