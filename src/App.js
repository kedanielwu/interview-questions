import React from 'react';
import Carousel from './components/Carousel';
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
          <Carousel imgs={IMG_LIST}></Carousel>
        </div>
      </div>
    </div>
  );
}

export default App;