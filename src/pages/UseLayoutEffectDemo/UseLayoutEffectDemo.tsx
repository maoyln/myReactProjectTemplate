import React, { useEffect, useLayoutEffect, useState } from 'react';

const UseLayoutEffectDemo = () => {
  const [count, setCount] = useState(0);
  const [showBox, setShowBox] = useState(false);

  // 使用 useEffect
  useEffect(() => {
    console.log('useEffect: Count updated', count);
  }, [count]);

  // 使用 useLayoutEffect
  useLayoutEffect(() => {
    console.log('useLayoutEffect: Count updated', count);
  }, [count]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>useEffect vs useLayoutEffect</h1>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
      <button onClick={() => setShowBox(!showBox)}>Toggle Box</button>

      <div style={{ marginTop: '20px' }}>
        <p>Count: {count}</p>
        {showBox && (
          <div
            style={{
              width: '100px',
              height: '100px',
              backgroundColor: 'blue',
              transition: 'opacity 0.5s',
              opacity: showBox ? 1 : 0,
            }}
          >
            Box
          </div>
        )}
      </div>
    </div>
  );
};

export default UseLayoutEffectDemo;
