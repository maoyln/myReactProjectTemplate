import React from 'react';
import { createPortal } from 'react-dom';

const CreatePortalDom: React.FC = () => {
  const clickChild = () => {
    console.log('点击孩子节点');
  }
  const createPortalRender = () => {
    return (
      <div onClick={clickChild} id='children' className="children">
        孩子节点
      </div>
    );
  }
  return (
    createPortal(
      <div>
        {
          createPortalRender()
        }
      </div>,
      document.getElementById('root') as any
    )
  );
}

export default CreatePortalDom;