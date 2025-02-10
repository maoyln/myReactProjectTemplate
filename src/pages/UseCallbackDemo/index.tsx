import React from 'react';
import UseCallbackDemo1 from "./UseCallbackDemo1";
import UseCallbackDemo2 from "./UseCallbackDemo2";
import UseCallbackDemo3 from "./UseCallbackDemo3";

// useCallback(fn, [deps]) → 只在 deps 变化时才重新创建 fn。
const UseCallbackDemo = () => {
  return (
    <React.Fragment>
      <div>
        <UseCallbackDemo1 />
      </div>
      <div>
        <UseCallbackDemo2 />
      </div>
      <div>
        <UseCallbackDemo3 />
      </div>
    </React.Fragment>
  );
};

export default UseCallbackDemo;