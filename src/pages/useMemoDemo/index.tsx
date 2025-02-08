import React from 'react';

// import UseMemoDemo from "./UseMemoDemo1";
import UseMemoDemo2 from "./UseMemoDemo2";

// useMemo(() => expensiveValue, [deps]) → 只在 deps 变化时才重新计算。
const UseMemoDemo = () => {
  return (
    <div>
      <UseMemoDemo2 />
    </div>
  );
};

export default UseMemoDemo;