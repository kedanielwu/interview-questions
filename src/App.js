import React from 'react';
import Carousel from './components/Carousel';
import LazyImg from './components/LazyImg';
import CenterElement from './components/CenterElement';
import Timer from './components/Timer';
import LeftRightLayout from './components/LeftRightLayout';
import CopyText from './components/CopyText';
import AComponent from './components/AComponent';
import HoverTooltip from './components/HoverTooltip';
import Virtualized from './components/Virtualized';
import message from './components/message';
import Folder from './components/Folder';
import Three from './components/Three';

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

const FOLDER_PATH = [{
  'name': 'root',
  'children': [
    {
      'name': 'folder 1',
      'children': [],
    },
    {
      'name': 'folder 2',
      'children': [
        {
          'name': 'folder 2-1',
          'children': [
            {
              'name': 'folder 2-1-1',
              'children': []
            }
          ]
        }
      ],
    },
    {
      'name': 'folder 3',
      'children': []
    }
  ]
}];
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
            {'A Component'}
          </h4>
          <AComponent />
        </div>
        {/* <div className='item'>
          <h4>
            {'Hovertooltip'}
          </h4>
          <HoverTooltip />
        </div> */}
        <div className='item'>
          <h4>
            {'message'}
          </h4>
          <button onClick={() => { message('test message'); }}>
            {'click to show'}
          </button>
        </div>
        {/* <div className='item'>
          <h4>
            {'Virtualized Table'}
          </h4>
          <Virtualized />
        </div> */}
        <div className='item'>
          <h4>
            {'folder'}
          </h4>
          <Folder src={FOLDER_PATH} />
        </div>
        <div className='item'>
          <h4>
            {'three by three'}
          </h4>
          <Three />
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