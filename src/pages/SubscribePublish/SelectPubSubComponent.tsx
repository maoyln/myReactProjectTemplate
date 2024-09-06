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

// 创建 PubSub 的单例
const pubSubInstance = new PubSub();

const SelectPubSubComponent: React.FC<SelectPubSubProps> = ({ selectOptions }) => {
  // 状态用于存储当前被选中的值
  const [selectedValue, setSelectedValue] = useState<string>('');

  // 当选项改变时，设置默认选中值
  useEffect(() => {
    if (selectOptions.length) {
      setSelectedValue(selectOptions[0].value);
    }
  }, [selectOptions]);

  // 设置监听器，当有 'change' 事件时更新状态
  useEffect(() => {
    const changeHandler = (newValue: string) => setSelectedValue(newValue);
    pubSubInstance.subscribe('change', changeHandler);

    return () => {
      // // 清理操作：取消订阅
      pubSubInstance.unsubscribe('change', changeHandler);
    };
  }, []);

  // 选择框变化时的处理函数
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    // 发布 'change' 事件，传递新的值
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
