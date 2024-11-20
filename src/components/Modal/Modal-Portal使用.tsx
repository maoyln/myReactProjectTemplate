import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css'; // 引入样式文件

const Modal = ({ isOpen, onClose, title, children }: any) => {
  const modalRoot: any = document.getElementById('root');

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <header className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </header>
        <div className="modal-body">{children}</div>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
