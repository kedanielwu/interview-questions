import React, { useState, useEffect } from 'react';
import './Carousel.less';

const Items = ({ imgs=[], current=0 }) => {
  return (
    <div 
      className='carousel-stage'
      style={{ 
        transform: `translateX(${-(200 * current)}px)` ,
        transitionTimingFunction: 'ease',
        transitionProperty: 'all',
        transitionDuration: '.2s'
      }}
    >
      {imgs.map((i, idx) => (
        <img src={i.src} alt={i.alt} key={i.alt} />
      ))}
    </div>
  );
};

const Arrow = ({ dir='left', onClick=()=>{} }) => {
  if (dir === 'left') {
    return (
      <button onClick={onClick} className="carousel-arrow">
        {'<'}
      </button>
    );
  } else if (dir === 'right') {
    return (
      <button onClick={onClick} className="carousel-arrow">
        {'>'}
      </button>
    );
  }
};

const Carousel = (props) => {
  const [currentIndex, setIndex] = useState(0);
  const handleLeftClick = () => {
    setIndex(i => {
      if (i === 0) {
        return props.imgs.length - 1;
      } else {
        return i - 1;
      }
    });
  };
  const handleRightClick = () => {
    setIndex(i => {
      if (i === props.imgs.length - 1) {
        return 0;
      } else {
        return i + 1;
      }
    });
  };

  return (
    <div className='carousel-container'>
      <Arrow dir='left' onClick={handleLeftClick} />
      <div className='carousel-area'>
        <Items imgs={props.imgs} current={currentIndex} ></Items>
      </div>
      <Arrow dir='right' onClick={handleRightClick} />
    </div>
  );
};

export default Carousel;