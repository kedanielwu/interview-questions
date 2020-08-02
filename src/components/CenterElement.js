import React from 'react';
import './CenterElement.less';
const CenterElement = () => {
  return (
    <div className='ce-container'>
      <div className='ce-group-container'>
        {'parent:relative, child: known size, neg margin'}
        <div className='parent parent-relative'>
          <div className='child child-known-size'></div>
        </div>
      </div>
      <div className='ce-group-container'>
        {'parent:relative, child: unknown size, transform'}
        <div className='parent parent-relative'>
          <div className='child child-unknown-size'></div>
        </div>
      </div>
      <div className='ce-group-container'>
        {'parent:relative, child: unknown size, margin auto'}
        <div className='parent parent-relative'>
          <div className='child child-margin-auto'></div>
        </div>
      </div>
      <div className='ce-group-container'>
        {'parent:flex, child'}
        <div className='parent parent-flex'>
          <div className='child'></div>
        </div>
      </div>
      <div className='ce-group-container'>
        {'parent:grid, child: margin auto'}
        <div className='parent parent-grid'>
          <div className='child child-margin-auto-2'></div>
        </div>
      </div>
      <div className='ce-group-container'>
        {'parent:grid, child'}
        <div className='parent parent-grid'>
          <div className='child'></div>
        </div>
      </div>
    </div>
  );
};

export default CenterElement;