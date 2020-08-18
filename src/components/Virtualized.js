import React, { useState, useRef, useEffect } from 'react';
import './Virtualized.less';

const FAKE_ARR = Array(100).fill(1).map((i, idx) => (
  `This is item ${idx}`
));
const BUFFER_SIZE = 5;
const ITEM_HEIGHT = 90;
const Item = ({ onMount, children, index }) => {
  const ref = useRef(null);
  useEffect(() => {
    onMount(ref.current, index);
  }, []);
  return (
    <div className='virtualized-table-item' ref={(r)=>{ ref.current=r; }}>
      {children}
    </div>
  );
};
const Virtualized = () => {
  const [data, setData] = useState(FAKE_ARR);
  const childRefs = useRef([]);
  const [stageHeight, setStageHeight] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);
  const [visibleRange, setVisibleRange] = useState([0,0]);
  const [offsetRange, setOffsetRange] = useState([0,0]);

  const stageRef = useRef(null);
  const anchor = useRef(null);
  const _scrollTop = useRef(0);

  const updateRange = (scrollTop=0) => {
    const newAnchor = childRefs.current.find(i => i.bottom >= scrollTop);
    if (!newAnchor) return;
    anchor.current = newAnchor;
    setVisibleRange([newAnchor.index, newAnchor.index+visibleCount]);
  };

  const handleItemMount = (ref, index) => {
    const rect = ref.getBoundingClientRect();
    const top = rect.top - stageRef.current.getBoundingClientRect().top;
    childRefs.current.push({ index, top, bottom: top+ITEM_HEIGHT });
    // childRefs.push
  };
  const handleScroll = (e, _anchor) => {
    console.log(_anchor)
    console.log(offsetRange)
    const scrollTop = e.target.scrollTop || 0;
    if (scrollTop > _scrollTop.current) {
      if (scrollTop > _anchor.bottom) {
        updateRange(scrollTop);
        setData(FAKE_ARR.slice(visibleRange[0], visibleRange[1]));
        setOffsetRange([_anchor.top, (data.length-visibleRange[1])*ITEM_HEIGHT]);
      }
    } else if (scrollTop < _scrollTop.current) {
      if (scrollTop < _anchor.top) {
        updateRange(scrollTop);
        setData(FAKE_ARR.slice(visibleRange[0], visibleRange[1]));
        setOffsetRange([_anchor.top, (data.length-visibleRange[1])*ITEM_HEIGHT]);
      }
    }
    _scrollTop.current = scrollTop;
  };
  useEffect(() => {
    const height = stageRef.current.clientHeight;
    const count = Math.ceil(height / ITEM_HEIGHT) + BUFFER_SIZE;
    const newRange = [visibleRange[0], visibleRange[0] + count];
    const newOffset = [0, (data.length-newRange[1])*ITEM_HEIGHT];
    setData(FAKE_ARR.slice(...newRange));
    setVisibleCount(count);
    setVisibleRange(newRange);
    setOffsetRange(newOffset);

    stageRef.current.addEventListener('scroll', (e) => {handleScroll(e, anchor.current)});
  }, []);

  return (
    <div className='virtualized-table-container'>
      {/* <button onClick={()=>{ setData(FAKE_ARR); }}>
        {'click to render'}
      </button> */}
      <div className='virtualized-table-stage' style={{ paddingTop: offsetRange[0], paddingBottom:  offsetRange[1] }} ref={(r)=>{ stageRef.current=r; }}>
        {data.map((i, idx) => (
          <Item onMount={handleItemMount} key={idx} index={idx}>
            <p>
              {i}
            </p>
            <p>
              {'this is item description'}
            </p>
          </Item>
        ))}
      </div>
    </div>
  );
};

export default Virtualized;