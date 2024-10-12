import React from 'react';
import { CustomEventMessageType } from '../types'
import { emitCustomEvent } from '../EmitCustomEvent'

const ChildComponent: React.FC = () => {
  const sendMessage = () => {
    const customEvent = new CustomEvent(CustomEventMessageType.MyEventMessageType, {
      detail: {
        message: Math.random()
      }
    });
    window.dispatchEvent(customEvent);

    emitCustomEvent(CustomEventMessageType.MyEventMessageType, {
      message: Math.random()
    });
  };



  return (
    <div>
      <button onClick={sendMessage}>Send Message to Parent</button>
    </div>
  );
};

export default ChildComponent;
