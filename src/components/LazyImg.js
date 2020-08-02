import React, { useRef, useEffect } from 'react';
import throttle from '../utils/throttle';
import './LazyImg.less';

const LazyImg = () => {
  const imgRef = useRef(null);
  useEffect(()=>{
    const onScroll = throttle(() => {
      if (imgRef.current) {
        if (imgRef.current.getBoundingClientRect().top < document.documentElement.clientHeight) {
          imgRef.current.src = imgRef.current.dataset.src;
        }
      }
    }, 200);
    if (imgRef.current) {
      if (imgRef.current.getBoundingClientRect().top < document.documentElement.clientHeight) {
        imgRef.current.src = imgRef.current.dataset.src;
      }
    }
    window.addEventListener('scroll', onScroll);
    return (() => {
      window.removeEventListener('scroll', onScroll);
    });
  }, []);
  return (
    <div className='lazyimg-container'>
      <img ref={(ref) => { imgRef.current = ref; }} data-src="https://picsum.photos/id/200/200" alt="test" />
    </div>
  );
};

export default LazyImg;