import React, {useState} from 'react';
// 测试更新state是否刷新页面
/**
 * useState 只要改变则会出发render，执行 useState 会触发 render。 
 * 这个与函数组件的state有所不同;参考对比组件<UpdateState />
 */


const UpdateState2: React.FC = () => {
  const [text, setText] = useState<any>(1);

  console.log('render');
  return (
    <React.Fragment>
      <p>{ text }</p>
      <button
        onClick={() => {
          setText(1); // 这里并没有改变 a 的值.但是也做了更新
        }}
      >
        Click me
      </button>
      <button onClick={() =>setText(null)}>useState null</button> 
      <button onClick={() => setText(text + 1)}>a+1</button>
    </React.Fragment>
  );
};

export default UpdateState2;
