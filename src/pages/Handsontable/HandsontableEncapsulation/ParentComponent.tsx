import React, { useRef, useState } from "react";
import HandsontableWrapper, { HandsontableWrapperRef } from "./compontents/HandsontableWrapper";

const ParentComponent: React.FC = () => {
  const tableRef = useRef<HandsontableWrapperRef>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const initialData = [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 },
    { id: 3, name: "Charlie", age: 35 },
  ];

  const columns = [
    { data: "id", type: "numeric" },
    { data: "name", type: "text" },
    { data: "age", type: "numeric" },
  ];

  const colHeaders = ["ID", "Name", "Age"];

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
      <button onClick={handleGetData}>Get Data</button>
      <button onClick={handleSetData}>Set Data</button>
      <button onClick={handleLoading}>loading</button>
    </div>
  );
};

export default ParentComponent;
