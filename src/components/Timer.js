import React, { useEffect, useState } from 'react';

const Timer = () => {
  const [count, setCount] = useState(0);
  const [paused, setPaused] = useState(false);
  const [timer, setTimer] = useState(null);
  useEffect(() => {
    let _timer;
    if (!paused) {
      _timer = setInterval(() => {
        setCount(i => i + 1);
      }, 1000);
      setTimer(_timer);
    } else {
      if (timer) {
        clearInterval(timer);
        setTimer(null);
      }
    }
    return (() => {
      clearInterval(timer);
    });
  }, [paused]);
  return (
    <div>
      <button onClick={() => { setPaused(i => !i); }}>
        {'Flip'}
      </button>
      <span>
        {'Count: ' + count}
      </span>
    </div>
  );
};

export default Timer;