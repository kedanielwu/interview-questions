import React from 'react';
import Carousel from './components/Carousel';
import LazyImg from './components/LazyImg';
import CenterElement from './components/CenterElement';
import Timer from './components/Timer';
import LeftRightLayout from './components/LeftRightLayout';
import CopyText from './components/CopyText';
import './App.less';

const IMG_LIST = [
  {
    src: 'https://picsum.photos/id/200/200',
    alt: 'image1'
  },
  {
    src: 'https://picsum.photos/id/201/200',
    alt: 'image2'
  },
  {
    src: 'https://picsum.photos/id/202/200',
    alt: 'image3'
  },
];
function App(){
  return (
    <div id="app">
      <div className='container'>
        <div className='item'>
          <h4>
            {'Carousel'}
          </h4>
          <Carousel imgs={IMG_LIST}></Carousel>
        </div>
        <div className='item'>
          <h4>
            {'Center Element'}
          </h4>
          <CenterElement />
        </div>
        <div className='item'>
          <h4>
            {'Timer'}
          </h4>
          <Timer />
        </div>
        <div className='item'>
          <h4>
            {'l-r layout, fixed left, responsive right'}
          </h4>
          <LeftRightLayout />
        </div>
        <div className='item'>
          <h4>
            {'Copy Text'}
          </h4>
          <CopyText />
        </div>
        <div className='item'>
          <h4>
            {'Lazy Loading Img'}
          </h4>
          <LazyImg />
        </div>
      </div>
    </div>

  );
}

export default App;