import React, { useState, useRef, useEffect} from 'react';
import { createPortal } from 'react-dom';
import CreatePortalDom from './reactPortalDom';

// 测试更新state是否刷新页面
/**
 * useState 只要改变则会出发render，执行 useState 会触发 render。 
 * 这个与函数组件的state有所不同;参考对比组件<UpdateState />
 */

const UpdateState2: React.FC = () => {
  const [text, setText] = useState<any>(1);
  const spanRef = useRef(null);
  const spanRef1: any = useRef(null);

  useEffect(() => {
    if (spanRef.current && spanRef1.current) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      spanRef1.current.appendChild(spanRef.current)
    }
  }, []); // []可以尝试依赖text和spanRef.current，看下效果有什么不同

  const CreatePortalRender = () => {
    console.log(document.getElementById('root'));
    return (
      createPortal(
        <div id='children' className="children">
          孩子节点1
        </div>,
        document.getElementById('root') as any
      )
    );
  }

  const incrementTwice = () => {
    setText(text + 1);
    setText(text + 2);
    // 由于 setState 是异步的，this.state.text 在第二次 setState 调用时可能并未更新。因此，在没有合并的情况下，this.state.text 仍然是原始值
    // 最终两次结果合并，最终以setText为准
  }
  
  console.log(spanRef.current);
  console.log('render');
  return (
    <React.Fragment>
      <p ref={ spanRef }>{ text }</p>
      <p ref={ spanRef1 }>{ text }</p>
      {/* 下面代码会报错 */}
      {/* <p ref={ spanRef }>{ spanRef.current }</p> */}
      <button
        onClick={() => {
          setText(1); // 这里并没有改变 a 的值.但是也做了更新
        }}
      >
        Click me
      </button>
      <button onClick={() =>setText(null)}>useState null</button> 
      <button onClick={() => setText(text + 1)}>a+1</button>
      <button onClick={incrementTwice}>两次加1</button>
      {/* <button onClick={() => createPortalRender()}>createPortalRender</button> */}

      <div id="father">
        <CreatePortalDom />
        <CreatePortalRender />
      </div>
    </React.Fragment>
  );
};

export default UpdateState2;
