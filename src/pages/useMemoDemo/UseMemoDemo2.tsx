import React, { useState, useMemo } from 'react';

type IProps = {}

const slowFunction = (num: number) => {
  console.log("执行慢计算...");
  return num * 2;
};

const UseMemoDemo2: React.FC<IProps> = (props: IProps) => {
  const [count, setCount] = useState(0);
  const [dark, setDark] = useState(false);

  // 使用 useMemo 缓存计算结果，只有 count 变化时才会重新计算
  const doubleCount = useMemo(() => slowFunction(count), [count]);
  return (
    <div>
      <p>Double Count: {doubleCount}</p>
      <p>黑色: {dark ? '是' : '否'}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setDark((prev) => !prev)}>Toggle Theme</button>
    </div>
  );
};

export default UseMemoDemo2;