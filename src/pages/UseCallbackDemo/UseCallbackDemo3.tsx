import { useCallback, useMemo, useState } from "react";

const UseCallbackDemo3 = () => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("点击了按钮");
    setCount((prev) => prev + 1);
  }, []);

  return (
    <div>
      {count}
      <button onClick={handleClick}>点击</button>
    </div>
  );
};

export default UseCallbackDemo3;