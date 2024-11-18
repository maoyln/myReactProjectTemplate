import React, { useEffect, useRef, useState } from 'react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';

const TreeTable: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hotInstance, setHotInstance] = useState<Handsontable | null>(null); // 存储 Handsontable 实例
  const [collapsedRows, setCollapsedRows] = useState<Set<number>>(new Set());

  const rawData = [
    {
      name: '桥梁关联算量02',
      typeName: '工点',
      level: 1,
      id: '640209441970503680',
      __children: [
        {
          name: '桩基',
          typeName: '形象项类型',
          id: '639742473744760833',
          level: 2,
          __children: [
            {
              name: '挖孔桩-1',
              typeName: '部位',
              id: '1974457',
              level: 3
            },
            {
              name: '墩身-1',
              typeName: '部位',
              id: '1974475',
              level: 3
            }
          ]
        },
        {
          name: '墩身',
          typeName: '形象项类型',
          id: '639742473744760836',
          level: 2,
          __children: [
            {
              name: '挖孔桩-1',
              typeName: '部位',
              id: '19744573',
              level: 3
            },
            {
              name: '墩身-1',
              typeName: '部位',
              id: '19744753',
              level: 3
            }
          ]
        }
      ]
    }
  ];

  const flattenData = (data: any) => {
    const transformedData: any = [];
    const rowIndexMap: { [key: number]: any } = {};
    let currentIndex = 0;

    const flattenNode = (node: any, parentLevel = 1) => {
      transformedData.push([node.name, node.typeName, parentLevel]);
      rowIndexMap[currentIndex] = node;
      currentIndex++;

      if (node?.__children) {
        node.__children.forEach((child: any) => flattenNode(child, parentLevel + 1));
      }
    };

    data.forEach((rootNode: any) => flattenNode(rootNode, 1));

    return { transformedData, rowIndexMap };
  };

  console.log(collapsedRows, 'collapsedRows11111');
  const { transformedData, rowIndexMap } = flattenData(rawData);

  // 更新折叠行的状态
  const toggleCollapsedRow = (row: number) => {
    console.log(row, 'row');
    setCollapsedRows(prev => {
      const newCollapsedRows = new Set(prev);
      console.log(newCollapsedRows, 'newCollapsedRows');
      if (newCollapsedRows.has(row)) {
        newCollapsedRows.delete(row);
      } else {
        newCollapsedRows.add(row);
      }
      return newCollapsedRows;
    });
  };

  const createHandsontable = () => {
    if (containerRef.current) {
      const hot = new Handsontable(containerRef.current, {
        data: transformedData,
        colHeaders: ['名称', '类型'],
        rowHeaders: true,
        columns: [
          {
            data: 0, // 'name' 列
            renderer: function (
              instance: Handsontable,
              td: HTMLTableCellElement,
              row: number,
              col: number,
              prop: string | number,
              value: any,
              cellProperties: Handsontable.CellProperties
            ) {
              const nestedRowsPlugin: any = instance.getPlugin('nestedRows');
              const originalRowData = rowIndexMap[row];
              // console.log(originalRowData, 'originalRowData');
              const hasChildren = originalRowData?.__children && originalRowData?.__children.length > 0;

              if (hasChildren) {
                // 获取当前的折叠状态
                const isCollapsed = collapsedRows.has(row);
                const arrowIcon = isCollapsed ? '▶' : '▼'; // 切换箭头图标

                td.innerHTML = `${arrowIcon} ${value}`;
                td.style.cursor = 'pointer';

                td.addEventListener('click', () => {
                  // 更新折叠行的状态
                  toggleCollapsedRow(row);
                  instance.render(); // 强制重新渲染 Handsontable
                });
              } else {
                td.innerHTML = value;
              }

              return td;
            }
          },
          {
            data: 1 // 'typeName' 列
          }
        ],
        nestedRows: true, // 启用 Nested Rows 插件
        contextMenu: true
      });

      setHotInstance(hot); // 保存实例以便后续使用

      console.log(hot); // 调试输出实例
    }
  };

  useEffect(() => {
    createHandsontable(); // 在组件挂载时初始化 Handsontable

    return () => {
      // 在组件卸载时销毁 Handsontable 实例
      if (hotInstance) {
        hotInstance.destroy();
      }
    };
  }, []); // 只运行一次

  useEffect(() => {
    // 监听 collapsedRows 的变化，确保表格重新渲染
    console.log(hotInstance, 'hotInstance');
    if (hotInstance) {
      hotInstance.render();
    }
  }, [collapsedRows]); // 监听 collapsedRows 的变化

  return <div ref={containerRef}></div>;
};

export default TreeTable;
