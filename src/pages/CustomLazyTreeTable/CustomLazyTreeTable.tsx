import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { DataNode, workingPointList, baseColumns, dynamicColumn } from './generateMockData';
import { findAllChildIds, handleFetchData, addDefaultWidth } from './utils';
export type { DataNode } from './generateMockData'

const TreeTable: React.FC = () => {
  const [data, setData] = useState<DataNode[]>(workingPointList);
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [columns, setColumns] = useState(baseColumns);
  
  useEffect(() => {
    if (data?.[0]) {
      handleLoadData(data?.[0])
    }
  }, []);

  /**
   * 展开折叠
   * @param expanded 
   * @param record 
   */
  const handleExpand = (expanded: boolean, record: DataNode) => {
    if (expanded) {
      if (record?.type === 'workingPoint' && (record?.children || []).length === 0) {
        handleLoadData(record);
      } else {
        setExpandedRowKeys([...expandedRowKeys, record?.key]);
      }
    } else {
      setExpandedRowKeys(expandedRowKeys.filter(key => key !== record.key));
    }
  };

  /**
   * 数据结构处理
   */
  const handleLoadData = async (record: DataNode) => {
    setLoading(true);
    const newData = await handleFetchData(record?.key); // 获取数据
    const newColumn: any = await handleDynamicColumn(record?.key)// 获取动态列
    setLoading(false);
    setColumns(newColumn);
    setData(prevData =>
      prevData.map(item =>
        item.key === record.key ? { ...newData } : {...item, children: []}
      )
    );
    const ids = findAllChildIds(data.map(item =>
      item.key === record.key ? { ...newData } : item
    ), record.key)
    setExpandedRowKeys([...ids, record?.key]);
  }

  /**
   * 获取动态列
   * @param key
   */
  const handleDynamicColumn = (key?: string) => {
    const currentDynamicColumn = dynamicColumn.filter(item => item.key === key);
    // addDefaultWidth
    return [...baseColumns, ...addDefaultWidth(currentDynamicColumn) ]
  }

  return (
    <Table
      columns={columns as any}
      dataSource={data}
      pagination={false}
      bordered
      loading={loading}
      expandable={{
        expandedRowKeys,
        onExpand: handleExpand,
      }}
      scroll={{ x: 1300 }} // 根据需要设置宽度
    />
  );
};

export default TreeTable;
