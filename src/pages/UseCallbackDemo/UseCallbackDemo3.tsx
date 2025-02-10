import { useCallback, useMemo, useState } from "react";

const UseCallbackDemo3 = () => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("点击了按钮");
  }, []);

  const handleClick1 = useMemo(() => {
    setCount(count + 1)
  }, [count]);

  return (
    <div>
      {count}
      <button onClick={() => handleClick1}>计算数量</button>
      <button onClick={handleClick}>点击</button>
    </div>
  );
};

export default UseCallbackDemo3;