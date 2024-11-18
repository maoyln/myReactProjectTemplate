import React, { useState } from 'react';
import { HotTable } from '@handsontable/react';
import Handsontable from 'handsontable';
import { transformTreeData, transformTreeData1, transformTreeKeys, isNotEmptyArray } from './utilsTest';
import { dynamicColumn } from './dynamicColum';
import { workingPointTree } from './data';
import { useLatest } from './useLatest';

import 'handsontable/dist/handsontable.full.min.css';
import './TableStyles.css'; // 引入自定义样式

// register Handsontable's modules

const flattenTreeData = (nodes: any[], level: number = 0): any[] => {
  return nodes.reduce((acc: any[], node: any) => {
    // 创建一个新对象，去除 __children 属性并添加 level 信息
    const { __children, ...rest } = node;
    acc.push({ ...rest, level });

    // 递归处理子节点
    if (__children && Array.isArray(__children)) {
      acc.push(...flattenTreeData(__children, level + 1)); // 将子节点展平，并递增层级
    }

    return acc;
  }, []);
};

  // sourceDataObject = flattenTreeData(sourceDataObject); // 拍平数据

  function generateData(count: number): any[] {
    const data: any[] = [];
  
    for (let i = 1; i <= count; i++) {
      const item: any = {
        key: i.toString(),
        title: `热札圆盘条${i}`,
        width: 180,
        children: [
          {
            title: `HPP${i}(t)`,
            children: [
              {
                title: '设计量',
                dataIndex: `HPP${i}_design`,
                key: `HPP${i}_design`,
              },
              {
                title: '应耗量',
                dataIndex: `HPP${i}_actual`,
                key: `HPP${i}_actual`,
              },
            ],
          },
        ],
      };
      data.push(item);
    }
  
    return data;
  }

let sourceDataObject = [...transformTreeKeys(workingPointTree)];

let nestedHeaders = transformTreeData1(generateData(100)).map((item: any, index: number) => {
  if (index === 0) {
    return [{label: '工程部位', colspan: 1, rowspan: 3}, {label: '工点', colspan: 1, rowspan: 3}, ...item]
  } else {
    return [{label: null, colspan: 1}, {label: null, colspan: 1}, ...item]
  }
});

const ExampleComponent = () => {
  // const firstRowRenderer = (
  //   instance: any,
  //   td: HTMLTableCellElement,
  //   ...rest: any[]
  // ) => {
  //   // console.log(instance, 'instance');
  //   // console.log(td, 'td');
  //   // console.log(rest, 'rest');
  //   // Handsontable.renderers.TextRenderer(instance, td, ...(rest);
  //   td.style.fontWeight = 'bold';
  //   td.style.color = 'green';
  //   td.style.background = '#CEC';
  // };

  const [tableData, setTableData] = useState<any>(sourceDataObject);
  const latestStatusParams = useLatest<any>(tableData);

  const handleCellClick = (event: any, coords: any) => {
    // 检查单击的单元格是否在第五列中（列索引为4）
    console.log(event, 'event');
    console.log(coords, 'coords');
    if (coords.col === 4) {
      console.log(`在行${coords .row}处单击第五列中的单元格`);
      // 添加您想要执行的任何附加逻辑
    }
  };

  // 递归查找节点并展开/收起
const toggleNodeById = (data: any, key: string, initialData: any): any => {
  return data.map((node: any) => {
    if (node.key === key) {
      // 如果子节点存在，收起子节点
      if (node.__children) {
        return { ...node, __children: null, isCollapse: true };
      } else {
        // 如果子节点不存在，则恢复初始数据的子节点
        const initialNode = findNodeById(initialData, key);
        return { ...node, __children: initialNode?.__children || [], isCollapse: false };
      }
    } else if (node.__children) {
      // 递归处理嵌套子节点
      return { ...node, __children: toggleNodeById(node.__children, key, initialData) };
    }
    return node;
  });
};

// 辅助函数：根据 ID 查找节点（用于恢复初始子节点数据）
const findNodeById = (data: any, key: string): any => {
  for (const node of data) {
    if (node.key === key) return node;
    if (node.__children) {
      const found = findNodeById(node.__children, key);
      if (found) return found;
    }
  }
  return undefined;
};

  const treeToggleRenderer = (
    instance: any,
    td: HTMLTableCellElement,
    row: number,
    col: number,
    prop: string | number,
    value: any,
    cellProperties: Handsontable.CellProperties
  ) => {
    // 使用显式参数传递，而不是直接传递 `arguments`
    Handsontable.renderers.TextRenderer(instance, td, row, col, prop, value, cellProperties);
  
    // 获取当前行数据
    const rowData = instance.getSourceDataAtRow(row);
    const colData = instance.getSourceDataAtCol(col);
    // console.log(rowData, 'rowData');
    // console.log(colData, 'colData');
    
    // console.log(instance, 'instance--1');
    // console.log(rowData, 'rowData--1');
    // 检查行是否有子节点
    if ((rowData?.__children && rowData.__children.length > 0) || rowData.isCollapse) {
      // 创建展开/折叠按钮
      const button = document.createElement('span');
      // console.log(rowData, 'rowData');
      button.innerHTML =  !rowData?.isCollapse ? ' - ' : ' + ';
      // button.className = 'expand-button';
  
      // 按钮点击事件，用于切换展开/折叠状态
      button.onclick = () => {
        const updatedData = toggleNodeById(latestStatusParams.current, rowData?.key, sourceDataObject);
        setTableData(updatedData);
        // if (instance?.isRowExpanded?.(row)) {
        //   instance?.collapseRow?.(row);
        // } else {
        //   instance?.expandRow?.(row);
        // }
        instance.render(); // 重新渲染以更新按钮状态
      };
  
      // 将按钮插入单元格的最前面
      td.insertBefore(button, td.firstChild);
      // 根据层级增加左边距
    }
    td.style.paddingLeft = `${(rowData.level -1) * 30}px`;
  };

  console.log(latestStatusParams.current, 'latestStatusParams.current---2222');

  return (
    <div>
      <div style={{height: '100px'}}>
        1212
      </div>
      <HotTable
        data={latestStatusParams.current}
        // preventOverflow="horizontal"
        rowHeaders={false}
        // colHeaders={['Category', 'Artist', 'Title', 'Album', 'Label','Category1', 'Artist1', 'Title1', 'Album1', 'Label1','Category2', 'Artist2', 'Title2', 'Album2', 'Label2']}
        nestedHeaders={nestedHeaders}
        nestedRows={true}
        contextMenu={false}
        fixedColumnsLeft={2}
        colWidths={200}
        bindRowsWithHeaders={true}
        autoWrapRow={true}
        autoWrapCol={true}
        height="calc(100vh - 100px)"
        // renderAllRows={true}
        readOnly
        afterOnCellMouseDown={handleCellClick} // 点击事件
        afterScrollVertically={() => {console.log(111)}}
        afterChange={(change, source) => {console.log(change, source, 'change111');}} // 该方法可以动态修改值
        // cells = {(row, column, prop) => {
        //   // console.log(row, column, prop);
        //   const cellProperties: any = {};
        //   return cellProperties;
        // }}
        cells={(row, col) => {
          const cellProperties: Handsontable.CellProperties | any = {};
          if (col === 0) {
            cellProperties.renderer = treeToggleRenderer;
          }
          return cellProperties;
        }}
        // cells={function (row: number, col: number) {
        //   const cellProperties: any = {};
        //   const data = this.instance.getData();
        //   if (row === 0 || (data[row] && data[row][col] === 'readOnly')) {
        //     cellProperties.readOnly = true; // make cell read-only if it is first row or the text reads 'readOnly'
        //   }
          
        //   if (row === 1) {
        //     console.log(data, 'data--12');
        //     cellProperties.renderer = firstRowRenderer; // uses function directly
        //   } else {
        //     // cellProperties.renderer = 'negativeValueRenderer'; // uses lookup map
        //   }
  
        //   return cellProperties;
        // }}
        licenseKey="9c354-55bab-4ae31-d4e38-ab404"
      />

    </div>
  );
};

export default ExampleComponent;