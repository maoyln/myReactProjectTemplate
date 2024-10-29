export interface DataNode {
  key: string;
  title?: string;
  type?: string;
  [key: string]: any; // 动态字段
  children?: DataNode[];
}

export const baseColumns = [
  {
    title: "工程部位",
    dataIndex: "title",
    key: "title",
    fixed: "left",
  },
  {
    title: "类型",
    dataIndex: "typeName",
    key: "typeName",
    fixed: "left",
  },
];

export const dynamicColumn = [
  {
    key: '1', // 过滤使用
    title: "热札圆盘条1",
    children: [
      {
        title: "HPP456(t)",
        children: [
          {
            title: "设计量",
            dataIndex: "HPP456_design",
            key: "HPP456_design",
          },
          {
            title: "应耗量",
            dataIndex: "HPP456_actual",
            key: "HPP456_actual",
          },
        ],
      },
      // 更多动态列定义...
    ],
  },
  {
    key: '2', // 过滤使用
    title: "热札圆盘条2",
    children: [
      {
        title: "HPP123(t)",
        children: [
          {
            title: "设计量",
            dataIndex: "HPP123_design",
            key: "HPP123_design",
          },
          {
            title: "应耗量",
            dataIndex: "HPP123_actual",
            key: "HPP123_actual",
          },
        ],
      },
      // 更多动态列定义...
    ],
  },
  {
    key: '3', // 过滤使用
    title: "热札圆盘条3",
    children: [
      {
        title: "HPP555(t)",
        children: [
          {
            title: "设计量",
            dataIndex: "HPP555_design",
            key: "HPP555_design",
          },
          {
            title: "应耗量",
            dataIndex: "HPP555_actual",
            key: "HPP555_actual",
          },
        ],
      },
      // 更多动态列定义...
    ],
  },
  {
    key: '1', // 过滤使用
    title: "砼",
    children: [
      {
        title: "C25(m)",
        children: [
          {
            title: "设计量",
            dataIndex: "C25_design",
            key: "C25_design",
          },
          {
            title: "应耗量",
            dataIndex: "C25_actual",
            key: "C25_actual",
          },
        ],
      },
      // 更多动态列定义...
    ],
  },
  {
    key: '2', // 过滤使用
    title: "水泥",
    children: [
      {
        title: "PO425(t)",
        children: [
          {
            title: "设计量",
            dataIndex: "PO425_design",
            key: "PO425_design",
          },
          {
            title: "应耗量",
            dataIndex: "PO425_actual",
            key: "PO425_actual",
          },
        ],
      },
      // 更多动态列定义...
    ],
  },
  {
    key: '3', // 过滤使用
    title: "钢筋",
    children: [
      {
        title: "PO425(t)",
        children: [
          {
            title: "设计量",
            dataIndex: "PO425_design",
            key: "PO425_design",
          },
          {
            title: "应耗量",
            dataIndex: "PO425_actual",
            key: "PO425_actual",
          },
        ],
      },
      // 更多动态列定义...
    ],
  },
];

// 列表数据
export const workingPointList: DataNode[] = [
  {
    key: "1",
    title: "川藏线雀儿隧道",
    typeName: "工点",
    type: 'workingPoint',
    children: [],
  },
  {
    key: "2",
    title: "京皖隧道",
    typeName: "工点",
    type: 'workingPoint',
    children: [],
  },
  {
    key: "3",
    title: "藏皖隧道",
    typeName: "工点",
    type: 'workingPoint',
    children: [],
  },
];

// 全量数据结构-可在这里模拟过滤筛选数据
export const workingPointTree: DataNode[] = [
  {
    key: "1",
    title: "川藏线雀儿隧道",
    typeName: "工点",
    type: 'workingPoint',
    children: [
      {
        key: `1-1`,
        title: "开挖及初支",
        typeName: "形象进度项",
        children: [
          {
            key: `1-1-1`,
            title: "开挖",
            typeName: "部位",
            HPP456_design: "122",
            HPP456_actual: "666",
            C25_design: "300",
            C25_actual: "250",
            PO425_design: "400",
            PO425_actual: "350",
          },
          {
            key: `1-1-2`,
            title: "初支",
            typeName: "部位",
            HPP456_design: "122",
            HPP456_actual: "666",
            C25_design: "200",
            C25_actual: "150",
            PO425_design: "300",
            PO425_actual: "250",
          },
        ],
      },
    ],
  },
  {
    key: "2",
    title: "京皖隧道",
    typeName: "工点",
    type: 'workingPoint',
    children: [
      {
        key: `2-1`,
        title: "二衬",
        typeName: "形象进度项",
        children: [
          {
            key: `2-1-1`,
            title: "小二衬",
            typeName: "部位",
            HPP456_design: "122",
            HPP456_actual: "666",
            C25_design: "100",
            C25_actual: "90",
            PO425_design: "200",
            PO425_actual: "180",
          },
          {
            key: `2-1-2`,
            title: "小开挖",
            typeName: "部位",
            HPP456_design: "122",
            HPP456_actual: "666",
            C25_design: "100",
            C25_actual: "90",
            PO425_design: "200",
            PO425_actual: "180",
          },
        ],
      },
      {
        key: `2-2`,
        title: "边沟",
        typeName: "形象进度项",
        children: [
          {
            key: `2-2-1`,
            title: "边沟一号",
            typeName: "部位",
            HPP456_design: "122",
            HPP456_actual: "666",
            C25_design: "100",
            C25_actual: "90",
            PO425_design: "200",
            PO425_actual: "180",
          },
          {
            key: `2-2-2`,
            title: "边沟二号",
            typeName: "部位",
            HPP456_design: "122",
            HPP456_actual: "666",
            C25_design: "100",
            C25_actual: "90",
            PO425_design: "200",
            PO425_actual: "180",
          },
        ],
      },
    ],
  },
  {
    key: "3",
    title: "藏皖隧道",
    typeName: "工点",
    type: 'workingPoint',
    children: [
      {
        key: `3-1`,
        title: "洞门",
        typeName: "形象进度项",
        children: [
          {
            key: `3-1-1`,
            title: "进口",
            typeName: "部位",
            HPP456_design: "122",
            HPP456_actual: "666",
            C25_design: "100",
            C25_actual: "90",
            PO425_design: "200",
            PO425_actual: "180",
          },
          {
            key: `3-1-2`,
            title: "出口",
            typeName: "部位",
            HPP456_design: "122",
            HPP456_actual: "666",
            C25_design: "100",
            C25_actual: "90",
            PO425_design: "200",
            PO425_actual: "180",
          },
        ],
      },
    ],
  },
];

/**
 * 根据节点 ID 查找其所有的子节点和孙节点的 ID
 * @param nodes - 树状数据节点
 * @param targetId - 要查找的节点 ID
 * @returns - 找到的所有子节点和孙节点的 ID
 */
export const findAllChildIds = (nodes: DataNode[], targetId: string): string[] => {
    let result: string[] = [];
  
    const findChildren = (currentNodes: DataNode[]) => {
      for (const node of currentNodes) {
        if (node.key === targetId) {
          // 找到目标节点，收集所有孩子的 ID
          const collectIds = (childNodes: DataNode[]) => {
            for (const child of childNodes) {
              result.push(child.key);
              if (child.children) {
                collectIds(child.children); // 递归收集孙节点 ID
              }
            }
          };
  
          if (node.children) {
            collectIds(node.children);
          }
          return; // 找到目标后，退出循环
        }
  
        // 继续在子节点中查找
        if (node.children) {
          findChildren(node.children);
        }
      }
    };
  
    findChildren(nodes);
    return result;
  };