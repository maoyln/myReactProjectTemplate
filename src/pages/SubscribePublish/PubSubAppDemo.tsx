// AppDemo.tsx
import React from 'react';
import SelectPubSubComponent from './SelectPubSubComponent';

const AppDemo: React.FC = () => {
  const selectOptions: { label: string; value: string }[] = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  return (
    <div className="AppDemo">
      <h1>Select Component with PubSub</h1>
      <SelectPubSubComponent selectOptions={selectOptions} />
    </div>
  );
};

export default AppDemo;
