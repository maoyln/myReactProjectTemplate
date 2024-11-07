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
    const parentId: any = i > 1 && Math.random() < 0.5 ? Math.floor(Math.random() * (i - 1)) + 1 : null; // 随机生成父节点
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

// 定义表头
const columns = [
  {
    key: '1',
    title: '热札圆盘条1',
    width: 180,
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
    ],
  },
  {
    key: '2',
    title: '热札圆盘条2',
    width: 180,
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
    ],
  },
  {
    key: '3',
    title: '热札圆盘条3',
    width: 180,
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
    ],
  },
  // 可以继续添加更多的动态列定义...
];

// 将表头平铺为 Handsontable 可用的格式
const generateColumnDefs = (columns: any[]) => {
  const columnDefs: any[] = [];

  const flattenColumns = (colArray: any[], parentIndex: string = '') => {
    colArray.forEach((col) => {
      const newCol = {
        data: col.children ? undefined : col.key,
        title: col.title,
        width: col.width,
        colspan: col.children ? col.children.length : 1,
        ...col,
      };

      if (parentIndex) {
        newCol.title = `${parentIndex} - ${newCol.title}`; // 添加父级标题
      }

      columnDefs.push(newCol);

      if (col.children) {
        flattenColumns(col.children, col.title);
      }
    });
  };

  flattenColumns(columns);
  return columnDefs;
};

// 生成合并表头的列定义
const columnDefs = generateColumnDefs(columns);

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hot = new Handsontable(containerRef.current!, {
      data: treeData.map(node => ({
        ...node,
        children: undefined,
      })),
      colHeaders: columnDefs.map(col => col.title),
      columns: columnDefs.map(col => ({
        data: col.data,
        type: 'text',
      })),
      rowHeights: 23,
      height: 600,
      width: '100%',
      licenseKey: 'non-commercial-and-evaluation',
      readOnly: true,
      afterGetRowHeader: (row, TH) => {
        const rowData: any = hot.getSourceDataAtRow(row);
        if (rowData && rowData.parentId) {
          TH.style.paddingLeft = '20px';
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
