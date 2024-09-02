import React, { useRef, useImperativeHandle, forwardRef } from 'react';

interface InputWithFocusButtonProps {
  label: string;
}

// 定义组件并使用 forwardRef 将 ref 转发
const InputWithFocusButton = forwardRef<HTMLInputElement, InputWithFocusButtonProps>(
  ({ label }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    // 使用 useImperativeHandle 将内部的 inputRef 暴露给父组件
    useImperativeHandle(ref, (): any => ({
      focus: () => {
        inputRef.current?.focus();
      },
    }));

    return (
      <div>
        <label>{label}</label>
        <input ref={inputRef} type="text" />
      </div>
    );
  }
);


// 父组件使用 forwardRef 传递 ref
const ParentComponent: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocusClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div>
      <InputWithFocusButton ref={inputRef} label="Click the button to focus input" />
      <button onClick={handleFocusClick}>Focus Input</button>
    </div>
  );
};

export default ParentComponent;
