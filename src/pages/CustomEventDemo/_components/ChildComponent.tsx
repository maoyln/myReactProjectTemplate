import React from 'react';
import { CustomEventMessageType } from '../types'

const ChildComponent: React.FC = () => {
  const sendMessage = () => {
    const customEvent = new CustomEvent(CustomEventMessageType.MyEventMessageType, {
      detail: {
        message: Math.random()
      }
    });
    window.dispatchEvent(customEvent);
  };

  return (
    <div>
      <button onClick={sendMessage}>Send Message to Parent</button>
    </div>
  );
};

export default ChildComponent;
