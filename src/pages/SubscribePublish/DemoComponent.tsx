import React, { useEffect, useState } from 'react';
import PureComponentSelectPubSub from './PureComponentSelectPubSub'; // 假设这个文件在同一个目录下

const DemoComponent = () => {
  const [selectData, setSelectData] = useState<any[]>([]);
  const [activeValue, setActiveValue] = useState('');
  const pubSub = new PureComponentSelectPubSub('testCode');

  useEffect(() => {
    // 初始化数据
    setSelectData([
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ]);

    pubSub.setSelectList(selectData);

    // 订阅事件
    const subscription = pubSub.on({
      cb: (value) => {
        console.log(`Selected value: ${value}`);
        setActiveValue(value);
      },
    });

    // 清理函数，当组件卸载时取消订阅
    return () => {
      subscription();
    };
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    pubSub.onChange(event.target.value);
  };

  return (
    <div>
      <select onChange={handleChange}>
        {selectData.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <p>Selected: {activeValue}</p>
    </div>
  );
};

export default DemoComponent;
