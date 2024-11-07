import React, { useEffect, useRef } from 'react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';

// 定义数据节点的接口
interface DataNode {
  id: number;
  name: string;
  parentId?: number; // 可选，表示父节点的 id
}

// 生成模拟数据
const generateData = (numRows: number): DataNode[] => {
  const data: DataNode[] = [];
  for (let i = 1; i <= numRows; i++) {
    const parentId: any = i > 1 && Math.random() < 0.5 ? Math.floor(Math.random() * (i - 1)) + 1 : null; // 随机生成父节点，确保有父节点
    data.push({ id: i, name: `节点 ${i}`, parentId });
  }
  return data;
};

// 创建树形数据
const createTreeData = (data: DataNode[]) => {
  const map: { [key: number]: any } = {};
  const treeData: any[] = [];

  data.forEach(item => {
    map[item.id] = { ...item, children: [] };
  });

  data.forEach(item => {
    if (item.parentId) {
      map[item.parentId].children.push(map[item.id]);
    } else {
      treeData.push(map[item.id]);
    }
  });

  return treeData;
};

// 生成 200 条数据
const data = generateData(200);

// 将数据转化为树形结构
const treeData = createTreeData(data);

// 生成 500 列的表头
const columns = Array.from({ length: 500 }, (_, index) => ({
  data: `col${index + 1}`,
  title: `列 ${index + 1}`,
  type: 'text',
}));

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hot = new Handsontable(containerRef.current!, {
      data: treeData.map(node => ({
        ...node,
        children: undefined, // Handsontable 不支持嵌套直接渲染
      })),
      colHeaders: columns.map(col => col.title),
      columns: columns.map(col => ({
        data: col.data,
        type: col.type,
      })),
      rowHeights: 23,
      height: 600,
      width: '100%',
      licenseKey: 'non-commercial-and-evaluation', // 使用许可证
      afterGetRowHeader: (row, TH) => {
        const rowData: any = hot.getSourceDataAtRow(row);
        if (rowData && rowData.parentId) {
          TH.style.paddingLeft = '20px'; // 向右缩进
        }
      },
    });

    return () => {
      hot.destroy();
    };
  }, []);

  return <div ref={containerRef} />;
};

export default App;
