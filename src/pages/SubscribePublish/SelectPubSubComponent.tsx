// components/SelectPubSubComponent.tsx
import React, { useState, useEffect } from 'react';
import PubSub from './PubSub';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectPubSubProps {
  selectOptions: SelectOption[];
}

const pubSubInstance = new PubSub();

const SelectPubSubComponent: React.FC<SelectPubSubProps> = ({ selectOptions }) => {
  const [selectedValue, setSelectedValue] = useState<string>('');

  useEffect(() => {
    if (selectOptions.length) {
      setSelectedValue(selectOptions[0].value);
    }
  }, [selectOptions]);

  useEffect(() => {
    const changeHandler = (newValue: string) => setSelectedValue(newValue);
    pubSubInstance.subscribe('change', changeHandler);

    return () => {
      pubSubInstance.unsubscribe('change', changeHandler);
    };
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    pubSubInstance.publish('change', newValue);
  };

  return (
    <div>
      <select value={selectedValue} onChange={handleSelectChange}>
        {selectOptions.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <p>Selected: {selectedValue}</p>
    </div>
  );
};

export default SelectPubSubComponent;
