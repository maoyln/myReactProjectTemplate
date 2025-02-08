import React, { useState, useCallback, memo } from "react";

// 普通子组件
const Button = memo(({ onClick }: { onClick: () => void }) => {
  console.log("Button 组件渲染");
  return <button onClick={onClick}>Click Me</button>;
});

const UseCallbackDemo2 = () => {
  const [count, setCount] = useState(0);

  // 用 useCallback 缓存函数，避免 Button 组件每次重新渲染
  const handleClick = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <Button onClick={handleClick} />
    </div>
  );
};

export default UseCallbackDemo2;
