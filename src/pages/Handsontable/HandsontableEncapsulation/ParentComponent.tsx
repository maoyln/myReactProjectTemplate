import React, { useRef, useState } from "react";
import HandsontableWrapper, { HandsontableWrapperRef } from "./compontents/HandsontableWrapper";

const ParentComponent: React.FC = () => {
  const tableRef = useRef<HandsontableWrapperRef>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const initialData = [
    { id: 1, name: "Alice", age: 25, address: "123 Main St" },
    { id: 2, name: "Bob", age: 30, address: "456 Elm St" },
    { id: 3, name: "Charlie", age: 35, address: "789 Oak St" },
  ];

  const columns = [
    { data: "id", type: "numeric" },
    { data: "name", type: "text" },
    { data: "age", type: "numeric" },
  ];

  const colHeaders = ["ID", "Name", "Age", "address"];

  const handleGetData = () => {
    const data = tableRef.current?.getData();
    console.log("Table Data:", data);
  };

  const handleSetData = () => {
    const newData = [
      { id: 4, name: "Diana", age: 40 },
      { id: 5, name: "Edward", age: 45 },
    ];
    tableRef.current?.setData(newData);
  };

  const handleLoading = () => {
    setLoading(!loading);
  }

  console.log(tableRef, 'tableRef--1212');

  const handleAccessInstance = () => {
    const hotInstance = tableRef.current?.hotInstance;
    if (hotInstance) {
      console.log("Accessing Handsontable instance:", hotInstance);
      // 使用 Handsontable 实例，例如获取某个表格单元格的数据
      console.log(hotInstance.getDataAtCell(0, 0)); // 获取第一个单元格的数据
    }
  };

  return (
    <div>
      <h1>Handsontable Wrapper Example</h1>
      {
        loading ? <div>Loading...</div> : 
        <HandsontableWrapper
          ref={tableRef}
          data={initialData}
          columns={columns}
          colHeaders={colHeaders}
          rowHeaders={true}
          height={300}
          width="100%"
        />
      }
      <button onClick={handleGetData}>获取数据</button>
      <button onClick={handleSetData}>设置数据</button>
      <button onClick={handleAccessInstance}>接入实例测试</button>
      <button onClick={handleLoading}>[切换]加载中...</button>
    </div>
  );
};

export default ParentComponent;
