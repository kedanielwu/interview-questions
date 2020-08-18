import React, { useState, useEffect } from 'react';

const Folder = ({ src }) => {
  const [path, setPath] = useState(['root']);
  const [folderToRender, setFolderToRender] = useState([]);
  useEffect(() => {
    let target = src;
    for (let node of path) {
      for (let child of target) {
        if (child.name === node) {
          parent = target;
          target = child.children;
          break;
        }
      }
    }
    setFolderToRender(target);
  }, [path]);
  const handleFolderClick = (e) => {
    const folderName = e.target.innerText;
    if (folderName === '..') {
      setPath(i => i.slice(0, i.length-1));
    } else {
      setPath(i => [...i, folderName]);
    }
  };
  return (
    <div className='folder-container'>
      <div className='folder-item parent' onClick={handleFolderClick}>
        {'..'}
      </div>
      {folderToRender.map(folder => {
        return (
          <div onClick={handleFolderClick} className='folder-item' key={folder.name}>
            {folder.name}
          </div>
        );
      })}
    </div>
  );
};

export default Folder;