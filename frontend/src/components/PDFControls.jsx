import React from 'react';
import {setRotation} from '../actions';
import {store} from '../index';

const PDFControls = () => {
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          let rotation = store.getState().rotation - 90;
          if(rotation < 0) rotation = 270;
          store.dispatch(setRotation(rotation));
        }}
      >
        <i className="fas fa-redo-alt rotate-left"></i>
      </button>
      &nbsp;
      <button
        type="button"
        onClick={() => {
          let rotation = store.getState().rotation + 90;
          if(rotation > 270) rotation = 0;
          store.dispatch(setRotation(rotation));
        }}
      >
        <i className="fas fa-redo-alt rotate-right"></i>
      </button>
    </div>
  );
}

export default PDFControls;
