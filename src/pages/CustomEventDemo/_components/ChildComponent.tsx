import React from 'react';

const ChildComponent: React.FC = () => {
  const sendMessage = () => {
    const customEvent = new CustomEvent('customMessage', {
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
