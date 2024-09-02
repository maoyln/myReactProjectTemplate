import React, { useState, useMemo } from 'react';

const UseMemoDemo: React.FC = () => {
  const [value, setValue] = useState(0);
  const [trigger, setTrigger] = useState(false);

  // 在这个例子中，heavyComputation 只在value改变时重新计算，即使trigger改变也不会重新计算，从而节省了计算资源。
  // trigger变化的时候 heavyComputation 不会重新计算
  const heavyComputation = useMemo(() => {
    console.log('Performing heavy computation');
    return Array.from({ length: 100000 }, (_, index) => index);
  }, [value]); // 此处不是正常写法，因为value没有在useMemo中变动，不需要使用改依赖

  return (
    <div>
      <p>Current Value: {value}</p>
      <p>Current trigger: {String(trigger)}</p>
      <button onClick={() => setValue(value + 1)}>Change Value</button>
      <button onClick={() => setTrigger(!trigger)}>Toggle Trigger</button>
      <ul>
        {heavyComputation.slice(0, 10).map((num) => (
          <li key={num}>{num}</li>
        ))}
      </ul>
    </div>
  );
}

export default UseMemoDemo