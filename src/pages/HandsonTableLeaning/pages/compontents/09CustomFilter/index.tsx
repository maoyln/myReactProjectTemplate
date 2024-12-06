import React from 'react';
import FilterableTable from './FilterableTable';

const App = () => {
  const columns = [
    { label: '姓名', data: 'name' },
    { label: '年龄', data: 'age' },
    { label: '地址', data: 'address' },
  ];

  const data = [
    { name: '张三', age: 25, address: '北京' },
    { name: '李四', age: 30, address: '上海' },
    { name: '王五', age: 28, address: '广州' },
  ];

  return (
    <div>
      <FilterableTable columns={columns} data={data} />
    </div>
  );
};

export default App;