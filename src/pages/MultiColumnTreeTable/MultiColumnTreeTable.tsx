import React from 'react';
import { Tooltip } from 'antd';
import { FixedSizeGrid as Grid, GridChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { data } from './data';
import { columns } from './columns';

// 定义列的类型
interface ColumnType {
  title: string;
  dataIndex: string;
  key: string;
  ellipsis: boolean;
  width: number;
  render: (text: string | number) => JSX.Element;
}

// 定义数据项的类型
interface DataType {
  key: number;
  [key: string]: string | number;
}


const addRenderToNodes = (nodes: any[]): any[] => {
  return nodes.map(node => {
    // 为每个节点添加 render 方法
    const newNode = {
      ...node,
      render: (text: string | number) => <Tooltip title={text}>{text}</Tooltip>,
    };

    // 如果有子节点，递归添加
    if (node.children) {
      newNode.children = addRenderToNodes(node.children);
    }

    return newNode;
  });
}

const renderToNodes = addRenderToNodes(columns)


// 渲染单元格
const Cell: React.FC<{ columnIndex: number; rowIndex: number; style: React.CSSProperties }> = ({ columnIndex, rowIndex, style }) => {
  const column: ColumnType = renderToNodes[columnIndex];
  const row: DataType = data[rowIndex];

  if (!row || !column) {
    return null;
  }

  const value = row[column.dataIndex];

  return (
    <div style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'left', padding: '8px' }}>
      {column?.render?.(value)}
    </div>
  );
};

// 渲染表头
const HeaderCell: React.FC<{ columnIndex: number; style: React.CSSProperties }> = ({ columnIndex, style }) => {
  const column: ColumnType = renderToNodes[columnIndex];
  return (
    <div style={{ ...style, fontWeight: 'bold', padding: '8px', background: '#f0f0f0', borderBottom: '2px solid #ddd' }}>
      {column.title}
    </div>
  );
};

// 主应用组件
const App: React.FC = () => {
  return (
    <div style={{width: '100wh', height: '100vh'}}>
      <AutoSizer>
        {({ height=1000, width=1900 }: { height: number; width: number }) => (
          <div style={{ height, width }}>
            {/* 表头部分 */}
            <div style={{ display: 'flex', borderBottom: '1px solid #ddd', background: '#f0f0f0' }}>
              {renderToNodes.map((column, index) => (
                <HeaderCell key={column.key} columnIndex={index} style={{ width: column.width, height: 50 }} />
              ))}
            </div>
            {/* 内容区域 */}
            <div style={{ height: height - 50, overflowY: 'auto' }}>
              <Grid
                columnCount={renderToNodes.length}
                rowCount={data.length}
                columnWidth={100}
                rowHeight={50}
                width={width}
                height={height - 50}
              >
                {({ columnIndex, rowIndex, style }: GridChildComponentProps) => (
                  <Cell columnIndex={columnIndex} rowIndex={rowIndex} style={style} />
                )}
              </Grid>
            </div>
          </div>
        )}
      </AutoSizer>
    </div>
  );
};

export default App;
