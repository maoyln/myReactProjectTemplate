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
    width: '220px'
  },
  {
    title: "类型",
    dataIndex: "typeName",
    key: "typeName",
    fixed: "left",
    width: '120px'
  },
];

export const dynamicColumn = [
  {
    key: '1', // 过滤使用
    title: "热札圆盘条1",
    width: '180px',
    children: [
      {
        title: "HPP456(t)",
        children: [
          {
            title: "设计量",
            dataIndex: "HPP456_design",
            key: "HPP456_design",
            width: '90px',
          },
          {
            title: "应耗量",
            dataIndex: "HPP456_actual",
            key: "HPP456_actual",
            width: '90px',
          },
        ],
      },
      // 更多动态列定义...
    ],
  },
  {
    key: '2', // 过滤使用
    title: "热札圆盘条2",
    width: '180px',
    children: [
      {
        title: "HPP123(t)",
        children: [
          {
            title: "设计量",
            dataIndex: "HPP123_design",
            key: "HPP123_design",
            width: '90px',
          },
          {
            title: "应耗量",
            dataIndex: "HPP123_actual",
            key: "HPP123_actual",
            width: '90px',
          },
        ],
      },
      // 更多动态列定义...
    ],
  },
  {
    key: '3', // 过滤使用
    title: "热札圆盘条3",
    width: '180px',
    children: [
      {
        title: "HPP555(t)",
        children: [
          {
            title: "设计量",
            dataIndex: "HPP555_design",
            key: "HPP555_design",
            width: '90px',
          },
          {
            title: "应耗量",
            dataIndex: "HPP555_actual",
            key: "HPP555_actual",
            width: '90px',
          },
        ],
      },
      // 更多动态列定义...
    ],
  },
  {
    key: '1', // 过滤使用
    title: "砼",
    width: '180px',
    children: [
      {
        title: "C25(m)",
        children: [
          {
            title: "设计量",
            dataIndex: "C25_design",
            key: "C25_design",
            width: '90px',
          },
          {
            title: "应耗量",
            dataIndex: "C25_actual",
            key: "C25_actual",
            width: '90px',
          },
        ],
      },
      // 更多动态列定义...
    ],
  },
  {
    key: '2', // 过滤使用
    title: "水泥",
    width: '180px',
    children: [
      {
        title: "PO425(t)",
        children: [
          {
            title: "设计量",
            dataIndex: "PO425_design",
            key: "PO425_design",
            width: '90px',
          },
          {
            title: "应耗量",
            dataIndex: "PO425_actual",
            key: "PO425_actual",
            width: '90px',
          },
        ],
      },
      // 更多动态列定义...
    ],
  },
  {
    key: '3', // 过滤使用
    title: "钢筋",
    width: '180px',
    children: [
      {
        title: "PO425(t)",
        children: [
          {
            title: "设计量",
            dataIndex: "PO425_design",
            key: "PO425_design",
            width: '90px',
          },
          {
            title: "应耗量",
            dataIndex: "PO425_actual",
            key: "PO425_actual",
            width: '90px',
          },
        ],
      },
      // 更多动态列定义...
    ],
  },
  {
    key: '1', // 过滤使用
    title: "钢筋-1",
    width: '180px',
    children: [
      {
        title: "PO425(t)",
        children: [
          {
            title: "设计量",
            dataIndex: "PO425_design",
            key: "PO425_design",
            width: '90px',
          },
          {
            title: "应耗量",
            dataIndex: "PO425_actual",
            key: "PO425_actual",
            width: '90px',
          },
        ],
      },
      // 更多动态列定义...
    ],
  },
  {
    key: '1', // 过滤使用
    title: "钢筋-2",
    width: '180px',
    children: [
      {
        title: "PO425(t)",
        children: [
          {
            title: "设计量",
            dataIndex: "PO425_design",
            key: "PO425_design",
            width: '90px',
          },
          {
            title: "应耗量",
            dataIndex: "PO425_actual",
            key: "PO425_actual",
            width: '90px',
          },
        ],
      },
      // 更多动态列定义...
    ],
  },
  {
    key: '1', // 过滤使用
    title: "钢筋-3",
    width: '180px',
    children: [
      {
        title: "PO425(t)",
        children: [
          {
            title: "设计量",
            dataIndex: "PO425_design",
            key: "PO425_design",
            width: '90px',
          },
          {
            title: "应耗量",
            dataIndex: "PO425_actual",
            key: "PO425_actual",
            width: '90px',
          },
        ],
      },
      // 更多动态列定义...
    ],
  },
  {
    key: '1', // 过滤使用
    title: "钢筋-1",
    width: '180px',
    children: [
      {
        title: "PO425(t)",
        children: [
          {
            title: "设计量",
            dataIndex: "PO425_design",
            key: "PO425_design",
            width: '90px',
          },
          {
            title: "应耗量",
            dataIndex: "PO425_actual",
            key: "PO425_actual",
            width: '90px',
          },
        ],
      },
      // 更多动态列定义...
    ],
  },
  {
    key: '1', // 过滤使用
    title: "钢筋-2",
    width: '180px',
    children: [
      {
        title: "PO425(t)",
        children: [
          {
            title: "设计量",
            dataIndex: "PO425_design",
            key: "PO425_design",
            width: '90px',
          },
          {
            title: "应耗量",
            dataIndex: "PO425_actual",
            key: "PO425_actual",
            width: '90px',
          },
        ],
      },
      // 更多动态列定义...
    ],
  },
  {
    key: '1', // 过滤使用
    title: "钢筋-3",
    width: '180px',
    children: [
      {
        title: "PO425(t)",
        children: [
          {
            title: "设计量",
            dataIndex: "PO425_design",
            key: "PO425_design",
            width: '90px',
          },
          {
            title: "应耗量",
            dataIndex: "PO425_actual",
            key: "PO425_actual",
            width: '90px',
          },
        ],
      },
      // 更多动态列定义...
    ],
  },
  {
    key: '1', // 过滤使用
    title: "钢筋-1",
    width: '180px',
    children: [
      {
        title: "PO425(t)",
        children: [
          {
            title: "设计量",
            dataIndex: "PO425_design",
            key: "PO425_design",
            width: '90px',
          },
          {
            title: "应耗量",
            dataIndex: "PO425_actual",
            key: "PO425_actual",
            width: '90px',
          },
        ],
      },
      // 更多动态列定义...
    ],
  },
  {
    key: '1', // 过滤使用
    title: "钢筋-2",
    children: [
      {
        title: "PO425(t)",
        children: [
          {
            title: "设计量",
            dataIndex: "PO425_design",
            key: "PO425_design",
            width: '90px',
          },
          {
            title: "应耗量",
            dataIndex: "PO425_actual",
            key: "PO425_actual",
            width: '90px',
          },
        ],
      },
      // 更多动态列定义...
    ],
  },
  {
    key: '1', // 过滤使用
    title: "钢筋-3",
    width: '180px',
    children: [
      {
        title: "PO425(t)",
        children: [
          {
            title: "设计量",
            dataIndex: "PO425_design",
            key: "PO425_design",
            width: '90px',
          },
          {
            title: "应耗量",
            dataIndex: "PO425_actual",
            key: "PO425_actual",
            width: '90px',
          },
        ],
      },
      // 更多动态列定义...
    ],
  },
  {
    key: '1', // 过滤使用
    title: "钢筋-1",
    width: '180px',
    children: [
      {
        title: "PO425(t)",
        children: [
          {
            title: "设计量",
            dataIndex: "PO425_design",
            key: "PO425_design",
            width: '90px',
          },
          {
            title: "应耗量",
            dataIndex: "PO425_actual",
            key: "PO425_actual",
            width: '90px',
          },
        ],
      },
      // 更多动态列定义...
    ],
  },
  {
    key: '1', // 过滤使用
    title: "钢筋-2",
    width: '180px',
    children: [
      {
        title: "PO425(t)",
        children: [
          {
            title: "设计量",
            dataIndex: "PO425_design",
            key: "PO425_design",
            width: '90px',
          },
          {
            title: "应耗量",
            dataIndex: "PO425_actual",
            key: "PO425_actual",
            width: '90px',
          },
        ],
      },
      // 更多动态列定义...
    ],
  },
  {
    key: '1', // 过滤使用
    title: "钢筋-3",
    width: '180px',
    children: [
      {
        title: "PO425(t)",
        children: [
          {
            title: "设计量",
            dataIndex: "PO425_design",
            key: "PO425_design",
            width: '90px',
          },
          {
            title: "应耗量",
            dataIndex: "PO425_actual",
            key: "PO425_actual",
            width: '90px',
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
  {
    key: "4",
    title: "京上隧道",
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
            HPP123_design: '1212',
            HPP123_actual: '1212',
            HPP555_design: '555',
            HPP555_actual: '555',
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
            HPP123_design: '1212',
            HPP123_actual: '1212',
            HPP555_design: '555',
            HPP555_actual: '555',
            C25_design: "300",
            C25_actual: "250",
            PO425_design: "400",
            PO425_actual: "350",
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
            HPP123_design: '1212',
            HPP123_actual: '1212',
            HPP555_design: '555',
            HPP555_actual: '555',
            C25_design: "300",
            C25_actual: "250",
            PO425_design: "400",
            PO425_actual: "350",
          },
          {
            key: `2-1-2`,
            title: "小开挖",
            typeName: "部位",
            HPP456_design: "122",
            HPP456_actual: "666",
            HPP123_design: '1212',
            HPP123_actual: '1212',
            HPP555_design: '555',
            HPP555_actual: '555',
            C25_design: "300",
            C25_actual: "250",
            PO425_design: "400",
            PO425_actual: "350",
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
            HPP123_design: '1212',
            HPP123_actual: '1212',
            HPP555_design: '555',
            HPP555_actual: '555',
            C25_design: "300",
            C25_actual: "250",
            PO425_design: "400",
            PO425_actual: "350",
          },
          {
            key: `2-2-2`,
            title: "边沟二号",
            typeName: "部位",
            HPP456_design: "122",
            HPP456_actual: "666",
            HPP123_design: '1212',
            HPP123_actual: '1212',
            HPP555_design: '555',
            HPP555_actual: '555',
            C25_design: "300",
            C25_actual: "250",
            PO425_design: "400",
            PO425_actual: "350",
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
            HPP123_design: '1212',
            HPP123_actual: '1212',
            HPP555_design: '555',
            HPP555_actual: '555',
            C25_design: "300",
            C25_actual: "250",
            PO425_design: "400",
            PO425_actual: "350",
          },
          {
            key: `3-1-2`,
            title: "出口",
            typeName: "部位",
            HPP456_design: "122",
            HPP456_actual: "666",
            HPP123_design: '1212',
            HPP123_actual: '1212',
            HPP555_design: '555',
            HPP555_actual: '555',
            C25_design: "300",
            C25_actual: "250",
            PO425_design: "400",
            PO425_actual: "350",
          },
        ],
      },
    ],
  },
];
