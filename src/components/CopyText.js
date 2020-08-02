import React, { useRef } from 'react';

const CopyText = () => {
  const textRef = useRef(null);
  const handleClick = () => {
    const selection = window.getSelection();
    selection.removeAllRanges();
    const range = document.createRange();
    range.selectNodeContents(textRef.current);
    selection.addRange(range);
    document.execCommand('copy');
    selection.removeAllRanges();
    window.alert('text copied');
  };
  return (
    <div>
      <button onClick={handleClick}>
        {'click to copy'}
      </button>
      <p ref={(r) => { textRef.current = r; }}>
        {'This is a text box This is a text box This is a text box This is a text box This is a text box'}
      </p>
    </div>
  );
};

export default CopyText;