import React, { useRef, useEffect } from 'react';
import { render } from 'react-dom';

const Message = ({ type, content }) => {
  return (
    <div 
      style={
        { 
          position: 'fixed', 
          top: 20,
          backgroundColor: 'rgba(0,0,0,0.4)',
          padding: 8,
          borderRadius: 8,
          transition: 'all .2s ease-in-out'
        }
      }
    >
      {'123'}
    </div>
  );
};
const message = (content) => {
  let anchor = document.createElement('div');
  document.body.appendChild(anchor);
  setTimeout(() => {
    document.body.removeChild(anchor);
  }, 5000);
  render(<Message content={content} />, anchor);
};

export default message;