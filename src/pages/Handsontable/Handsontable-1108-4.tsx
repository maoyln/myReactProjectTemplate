import React, { useRef, useState } from 'react';
import Handsontable from 'handsontable';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.min.css';

type TreeNode = {
  id: number;
  name: string;
  __children?: TreeNode[];
};

// 初始树状结构数据
const initialData: TreeNode[] = [
  {
    id: 1,
    name: '川藏线雀儿山隧道',
    __children: [
      {
        id: 2,
        name: '开挖级初支',
        __children: [
          { id: 3, name: '节点 1' },
          { id: 4, name: '节点 2' },
        ],
      },
      {
        id: 5,
        name: '二村',
        __children: [
          { id: 6, name: '节点 3' },
          { id: 7, name: '节点 4' },
        ],
      },
    ],
  },
];

// 递归查找节点并展开/收起
const toggleNodeById = (data: TreeNode[], id: number, initialData: TreeNode[]): TreeNode[] => {
  return data.map(node => {
    if (node.id === id) {
      // 如果子节点存在，收起子节点
      if (node.__children) {
        return { ...node, __children: undefined };
      } else {
        // 如果子节点不存在，则恢复初始数据的子节点
        const initialNode = findNodeById(initialData, id);
        return { ...node, __children: initialNode?.__children || [] };
      }
    } else if (node.__children) {
      // 递归处理嵌套子节点
      return { ...node, __children: toggleNodeById(node.__children, id, initialData) };
    }
    return node;
  });
};

// 辅助函数：根据 ID 查找节点（用于恢复初始子节点数据）
const findNodeById = (data: TreeNode[], id: number): TreeNode | undefined => {
  for (const node of data) {
    if (node.id === id) return node;
    if (node.__children) {
      const found = findNodeById(node.__children, id);
      if (found) return found;
    }
  }
  return undefined;
};

const TreeTable = () => {
  const hotTableRef = useRef<HotTable>(null);
  const [tableData, setTableData] = useState<TreeNode[]>(initialData);

  // 切换展开/收起
  const toggleNode = (id: number) => {
    const updatedData = toggleNodeById(tableData, id, initialData);
    setTableData(updatedData);
    hotTableRef.current?.hotInstance?.loadData(updatedData);
  };

  return (
    <div>
      <button onClick={() => toggleNode(1)}>展开/收起 川藏线雀儿山隧道</button>
      <button onClick={() => toggleNode(2)}>展开/收起 开挖级初支</button>
      <button onClick={() => toggleNode(5)}>展开/收起 二村</button>

      <HotTable
        ref={hotTableRef}
        data={tableData}
        colHeaders={['ID', 'Name']}
        columns={[
          { data: 'id', readOnly: true },
          { data: 'name' },
        ]}
        nestedRows={true}
        rowHeaders={true}
        width="600"
        height="400"
        licenseKey="non-commercial-and-evaluation"
      />
    </div>
  );
};

export default TreeTable;
