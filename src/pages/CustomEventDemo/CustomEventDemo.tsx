import React, {useState} from 'react';
import ChildComponent from './_components/ChildComponent';
import  useCustomEvent  from './useCustomEvent';

interface Props {}
const ParentComponent: React.FC<Props> = () => {
  const [message, setMessage] = useState<string>('空数据')
  const handleCustomMessage = (event: CustomEvent<{ message: string }>) => {
    console.log('Received message from child:', event.detail.message);
    setMessage(event.detail.message)
  };

  useCustomEvent('customMessage', handleCustomMessage);

  return (
    <div>
      <h1>Parent Component</h1>
      <div>子组件发出的信息: {message}</div>
      <ChildComponent />
    </div>
  );
};

export default ParentComponent;
