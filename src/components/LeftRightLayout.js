import React from 'react';
import './LeftRightLayout.less';

const LeftRightLayout = () => {
  return (
    <div className='lr-container'>
      <div className='left-block'>
        {'Im Left'}
      </div>
      <div className='right-block'>
        {'Im Right'}
      </div>
    </div>
  );
};

export default LeftRightLayout;