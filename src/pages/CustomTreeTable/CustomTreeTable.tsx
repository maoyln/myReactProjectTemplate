import React, { useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataNode {
  key: string;
  title?: string;
  type?: string;
  [key: string]: any; // 动态字段
  children?: DataNode[];
}

const data: DataNode[] = [
  {
    key: '1',
    title: '川藏线雀儿隧道',
    type: '工点',
    children: [
      {
        key: '1-1',
        title: '开挖及初支',
        type: '形象进度项',
        children: [
          {
            key: '1-1-1',
            type: '部位',
            title: '开挖',
            HPP456_design: '122',
            HPP456_actual: '666',
            HPP123_design: '123',
            HPP123_actual: '333',
            HPP555_design: '555',
            HPP555_actual: '555',
            C25_design: '2533',
            C25_actual: '253',
            PO425_design: '888',
            PO425_actual: '888'
            
          },
          {
            key: '1-1-2',
            title: '初支',
            type: '部位',
            HPP456_design: '122',
            HPP456_actual: '666',
            HPP123_design: '123',
            HPP123_actual: '333',
            HPP555_design: '555',
            HPP555_actual: '555',
            C25_design: '2533',
            C25_actual: '253',
            PO425_design: '888',
            PO425_actual: '888'
          },
        ],
      },
      {
        key: '1-2',
        title: '二衬',
        type: '形象进度项',
        children: [
          {
            key: '1-2-1',
            type: '部位',
            title: '小二衬',
            HPP456_design: '122',
            HPP456_actual: '666',
            HPP123_design: '123',
            HPP123_actual: '333',
            HPP555_design: '555',
            HPP555_actual: '555',
            C25_design: '2533',
            C25_actual: '253',
            PO425_design: '888',
            PO425_actual: '888'
            
          },
          {
            key: '1-2-2',
            title: '小二衬',
            type: '部位',
            HPP456_design: '122',
            HPP456_actual: '666',
            HPP123_design: '123',
            HPP123_actual: '333',
            HPP555_design: '555',
            HPP555_actual: '555',
            C25_design: '2533',
            C25_actual: '253',
            PO425_design: '888',
            PO425_actual: '888'
          },
        ],
      },
    ],
  },
  {
    key: '2',
    title: '北京隧道001',
    type: '工点',
    children: [
      {
        key: '2-1',
        title: '开挖及初支',
        type: '形象进度项',
        children: [
          {
            key: '2-1-1',
            type: '部位',
            title: '开挖',
            HPP456_design: '122',
            HPP456_actual: '666',
            HPP123_design: '123',
            HPP123_actual: '333',
            HPP555_design: '555',
            HPP555_actual: '555',
            C25_design: '2533',
            C25_actual: '253',
            PO425_design: '888',
            PO425_actual: '888'
            
          },
          {
            key: '2-1-2',
            type: '部位',
            title: '初支',
            HPP456_design: '122',
            HPP456_actual: '666',
            HPP123_design: '123',
            HPP123_actual: '333',
            HPP555_design: '555',
            HPP555_actual: '555',
            C25_design: '2533',
            C25_actual: '253',
            PO425_design: '888',
            PO425_actual: '888'
          },
        ],
      },
      {
        key: '2-2',
        title: '二衬',
        type: '工点',
        children: [
          {
            key: '2-2-1',
            title: '二衬01',
            type: '部位',
            HPP456_design: '122',
            HPP456_actual: '666',
            HPP123_design: '123',
            HPP123_actual: '333',
            HPP555_design: '555',
            HPP555_actual: '555',
            C25_design: '2533',
            C25_actual: '253',
            PO425_design: '888',
            PO425_actual: '888'
            
          },
          {
            key: '2-2-2',
            title: '二衬02',
            type: '部位',
            HPP456_design: '122',
            HPP456_actual: '666',
            HPP123_design: '123',
            HPP123_actual: '333',
            HPP555_design: '555',
            HPP555_actual: '555',
            C25_design: '2533',
            C25_actual: '253',
            PO425_design: '888',
            PO425_actual: '888'
          },
        ],
      },
    ],
  },
];

const getColumns = (): ColumnsType<any> => [
  {
    title: '工程部位',
    dataIndex: 'title',
    key: 'title',
    fixed: 'left',
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    fixed: 'left',
  },
  {
    title: '热札圆盘条',
    children: [
      {
        title: 'HPP456(t)',
        children: [
          {
            title: '设计量',
            dataIndex: 'HPP456_design',
            key: 'HPP456_design',
          },
          {
            title: '应耗量',
            dataIndex: 'HPP456_actual',
            key: 'HPP456_actual',
          },
        ],
      },
      // 更多动态列定义...
    ],
  },
  {
    title: '热札圆盘条',
    children: [
      {
        title: 'HPP123(t)',
        children: [
          {
            title: '设计量',
            dataIndex: 'HPP123_design',
            key: 'HPP123_design',
          },
          {
            title: '应耗量',
            dataIndex: 'HPP123_actual',
            key: 'HPP123_actual',
          },
        ],
      },
      // 更多动态列定义...
    ],
  },
  {
    title: '热札圆盘条',
    children: [
      {
        title: 'HPP555(t)',
        children: [
          {
            title: '设计量',
            dataIndex: 'HPP555_design',
            key: 'HPP555_design',
          },
          {
            title: '应耗量',
            dataIndex: 'HPP555_actual',
            key: 'HPP555_actual',
          },
        ],
      },
      // 更多动态列定义...
    ],
  },
  {
    title: '砼',
    children: [
      {
        title: 'C25(m)',
        children: [
          {
            title: '设计量',
            dataIndex: 'C25_design',
            key: 'C25_design',
          },
          {
            title: '应耗量',
            dataIndex: 'C25_actual',
            key: 'C25_actual',
          },
        ],
      },
      // 更多动态列定义...
    ],
  },
  {
    title: '水泥',
    children: [
      {
        title: 'PO425(t)',
        children: [
          {
            title: '设计量',
            dataIndex: 'PO425_design',
            key: 'PO425_design',
          },
          {
            title: '应耗量',
            dataIndex: 'PO425_actual',
            key: 'PO425_actual',
          },
        ],
      },
      // 更多动态列定义...
    ],
  },
  // 更多父表头...
];

const TreeTable: React.FC = () => {
  const renderTreeData: any = (nodes: DataNode[]) => {
    return nodes.map(node => ({
      ...node,
      children: node.children ? renderTreeData(node.children) : null,
    }));
  };

  const treeData = renderTreeData(data);

  return (
    <Table
      columns={getColumns()}
      dataSource={treeData}
      pagination={false}
      bordered
      expandable={{
        defaultExpandAllRows: true,
        // onExpand,
        // expandedRowRender: record => <Table columns={getColumns()} dataSource={record.children} pagination={false} />,
      }}
      scroll={{ x: 1300 }} // 根据需要设置宽度
    />
  );
};

export default TreeTable;
