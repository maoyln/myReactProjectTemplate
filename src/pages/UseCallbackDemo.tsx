import React, { useState, useCallback } from 'react';

const UseCallbackDemo: React.FC = () => {
  const [count, setCount] = useState(0);

  // callback函数只在组件首次渲染时创建一次，即使App组件重新渲染，Counter组件也不会因为callback的改变而重新渲染。
  // 但是有一个弊端，Counter不更新，其中的props的数据也不会重新渲染
  const callback = useCallback(() => {
    console.log('Callback called');
    setCount(count + 1)
  }, [count]); // 此处不是正常写法，因为count有变动使用的useCallback没有依赖count而触发

  return (
    <div>
      <Counter count={count} onIncrease={callback} />
    </div>
  );
}

function Counter({ count, onIncrease }: any) {
  console.log('render'); // 只重新渲染一次，哪怕count变化,Counter组件也不会因为callback的改变而重新渲染
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={onIncrease}>Increase Count</button>
    </div>
  );
}

export default UseCallbackDemo;