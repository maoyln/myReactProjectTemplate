import React from 'react';
import { Table, Tooltip } from 'antd';
import { data } from './data'
import { columns } from './columns'

// 定义列的类型
interface ColumnType {
  title: string;
  dataIndex: string;
  key: string;
  ellipsis: boolean;
  width: number;
  render: (text: string) => JSX.Element;
}

// 定义数据项的类型
interface DataType {
  key: number;
  [key: string]: string | number;
}

const fixedList: string[] = ['Name', 'Age', 'Address'];

// 生成 500 列的函数
// const generateColumns = (fixedList: string[], totalColumns: number): ColumnType[] => {
//   const columns: ColumnType[] = [];
//   for (let i = 0; i < totalColumns; i++) {
//     const index = i % fixedList.length;
//     const title = fixedList[index];
//     const dataIndex = `${title.toLowerCase()}${i}`;
//     const key = `${title.toLowerCase()}${i}`;

//     columns.push({
//       title: title,
//       dataIndex: dataIndex,
//       key: key,
//       ellipsis: true, // 启用省略号
//       width: 120,
//       render: (text: string) => (
//         <Tooltip placement="topLeft" title={text}>
//           {text}
//         </Tooltip>
//       ),
//     });
//   }
//   return columns;
// };

// 生成 500 列
// const columns: ColumnType[] = generateColumns(fixedList, 500);

// 动态生成数据
// const generateData = (fixedList: string[], totalColumns: number, numRows: number): DataType[] => {
//   const data: DataType[] = [];
//   for (let i = 0; i < numRows; i++) {
//     const row: DataType = { key: i + 1 };
//     for (let j = 0; j < totalColumns; j++) {
//       const index = j % fixedList.length;
//       const title = fixedList[index];
//       const dataIndex = `${title.toLowerCase()}${j}`;
//       row[dataIndex] = `${title} ${i + 1}-${j + 1}`;
//     }
//     data.push(row);
//   }
//   return data;
// };

// 生成 3 行数据
// const data: DataType[] = generateData(fixedList, 500, 100);

// virtual
const App: React.FC = () => (
  <Table<DataType> columns={columns} dataSource={data} pagination={false} scroll={{ x: 5000 }} />
);

export default App;
