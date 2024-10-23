import React, { useEffect, useLayoutEffect, useState } from 'react';
import './TextOverflow.css';

const TextOverflow = () => {

  return (
    <div style={{ padding: '20px' }}>
      <div className='text-overflow'>在CSS中，如果你想让一个文本元素在超出容器宽度时以省略号（...）的形式显示，你可以使用 overflow, text-overflow, 和 white-space 属性来实现这一效果</div>
    </div>
  );
};

export default TextOverflow;
