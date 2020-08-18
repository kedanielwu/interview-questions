import React, { useState, useRef, useEffect } from 'react';
import './HoverTooltip.less';
const HoverTooltip = () => {
  const eleRef = useRef(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const handleMouseIn = () => {
    setTooltipVisible(true);
  };
  const handleMouseOut = () => {
    setTooltipVisible(false);
  };
  return (
    <div className='hover-tootip-container'>
      <a 
        href="https://picsum.photos/id/200/200"
        ref={(r) => { eleRef.current = r; }}
        onMouseEnter={handleMouseIn}
        onMouseLeave={handleMouseOut}
      >
        {'this is a link'}
      </a>
      <Tooltip anchor={eleRef.current} isVisible={tooltipVisible} />
    </div>
  );
};

const Tooltip = ({ src, isVisible, anchor }) => {
  const tooltipRef = useRef(null);
  const [tooltipContent, setTooltipContent] = useState(null);
  useEffect(() => {
    if (anchor && tooltipRef.current && isVisible) {
      const x = anchor?.getBoundingClientRect().left+document.documentElement.scrollLeft;
      const y = anchor?.getBoundingClientRect().top+document.documentElement.scrollTop;
      
    }
  }, [isVisible]);
  return (
    <div className='hover-tooltip' ref={(r) => { tooltipRef.current = r; }}>
      {'Tooltip Information'}
    </div>
  );
};

export default HoverTooltip;