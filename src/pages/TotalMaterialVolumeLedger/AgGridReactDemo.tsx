import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// 定义行数据类型
interface RowData {
  key: string;
  title: string;
  value?: string;
  children?: RowData[];
}

// 模拟数据
const rowData: RowData[] = [
  {
    key: '1',
    title: '父级 1',
    children: [
      {
        key: '1-1',
        title: '子级 1-1',
        value: '数据 1-1'
      },
      {
        key: '1-2',
        title: '子级 1-2',
        value: '数据 1-2'
      },
    ],
  },
  {
    key: '2',
    title: '父级 2',
    children: [
      {
        key: '2-1',
        title: '子级 2-1',
        value: '数据 2-1'
      },
      {
        key: '2-2',
        title: '子级 2-2',
        value: '数据 2-2'
      },
    ],
  },
];

// 列定义
const columnDefs = [
  {
    headerName: '标题',
    field: 'title',
    cellRenderer: 'agGroupCellRenderer', // 启用树形结构
  },
  {
    headerName: '值',
    field: 'value',
  },
];

const App: React.FC = () => {
  return (
    <div className="ag-theme-alpine" style={{ height: '600px', width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs as any}
        treeData={true} // 启用树形数据模式
        animateRows={true} // 启用行动画
        groupDefaultExpanded={-1} // 默认展开所有组
        getDataPath={(data: RowData) => data.key.split('-')} // 树形结构路径
        autoGroupColumnDef={{
          headerName: '分组',
          cellRendererParams: { suppressCount: true },
        }}
        domLayout='autoHeight' // 自动调整高度
      />
    </div>
  );
};

export default App;
