import React, { useState } from 'react';
import { Table } from 'antd';
import { DataNode, workingPointList, baseColumns, workingPointTree, dynamicColumn } from './generateMockData';
import { findAllChildIds } from './utils';
export type { DataNode } from './generateMockData'

const TreeTable: React.FC = () => {
  const [data, setData] = useState<DataNode[]>(workingPointList);
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [columns, setColumns] = useState(baseColumns);
  
  /**
   * 展开折叠
   * @param expanded 
   * @param record 
   */
  const onExpand = async (expanded: boolean, record: DataNode) => {
    if (expanded) {
      if (record?.type === 'workingPoint') {
        setLoading(true);
        const newData = await handleFetchData(record?.key); // 获取数据
        const newColumn: any = await handleDynamicColumn(record?.key)// 获取动态列
        setLoading(false);
        setColumns(newColumn);
        setData(prevData =>
          prevData.map(item =>
            item.key === record.key ? { ...newData } : item
          )
        );
        const ids = findAllChildIds(data.map(item =>
          item.key === record.key ? { ...newData } : item
        ), record.key)

        console.log(ids, 'ids--1212');
        setExpandedRowKeys([...ids, record?.key]);
      } else {
        setExpandedRowKeys([...expandedRowKeys, record?.key]);
      }
    } else {
      setExpandedRowKeys(expandedRowKeys.filter(key => key !== record.key));
    }
  };

  /**
   * 获取动态列
   * @param key
   */
  const handleDynamicColumn = (key?: string) => {
    const currentDynamicColumn = dynamicColumn.filter(item => item.key === key);
    return [...baseColumns, ...currentDynamicColumn ]
  }

  /**
   * 获取动态数据
   * @param key
   * @returns
   */
  const handleFetchData = (key?: string): Promise<DataNode> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const currentData = workingPointTree.find(item => item.key === key)
        let data: DataNode = {
          key: ''
        };
        if (currentData) {
          data= {...currentData};
        }
        resolve(data);
      }, 500);
    });
  };
  

  return (
    <Table
      columns={columns as any}
      dataSource={data}
      pagination={false}
      bordered
      loading={loading}
      expandable={{
        expandedRowKeys,
        onExpand,
      }}
      scroll={{ x: 1300 }} // 根据需要设置宽度
    />
  );
};

export default TreeTable;
