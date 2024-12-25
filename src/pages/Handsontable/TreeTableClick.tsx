/**
 * @description: 树状表格 
 * 可点击列
 * 点击单元格该单元格背景色变化（高亮），其他单元格背景色恢复
 * 展开折叠不会影响单元格选中效果
 * 点击单元格更新数据，展开折叠保持现状
 */
import React, { useRef, useState, useEffect } from "react";
import Handsontable from "handsontable";
import { HotTable } from "@handsontable/react";
import "handsontable/dist/handsontable.full.min.css";

interface RowData {
  id: number;
  parent: number | null;
  name: string;
  value: number | null;
  [key: string]: any;
}

const generateMockData = (rowCount: number, columnCount: number): RowData[] => {
  const data: RowData[] = [];
  let id = 1;
  for (let i = 0; i < rowCount; i++) {
    const parent = i % 5 === 0 ? null : Math.floor(Math.random() * (id - 1)) + 1;
    data.push({
      id: id,
      parent: parent,
      name: `Row ${id}`,
      value: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      text1: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      value1: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      text2: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      value4: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      text5: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      value6: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      text7: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      value8: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      text9: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      value10: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      text11: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      value12: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      text13: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      value14: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,

      value0: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      text01: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      value01: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      text02: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      value04: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      text05: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      value06: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      text07: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      value08: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      text09: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      value010: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      text011: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      value012: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      text013: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      value014: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,

      value00: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      text001: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      value001: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      text002: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      value004: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      text005: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      value006: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      text007: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      value008: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      text009: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      value0010: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      text0011: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      value0012: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      text0013: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      value0014: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
    });
    id++;
  }
  return data;
};

/**
 * 获取当前行的完整数据对象（兼容树状结构的折叠/展开状态）
 * 根据可视区行获取物理行数据
 */
export const getRowDataByCoords = (hotInstance: any, visualRowIndex: any) => {
  const nestedRowsPlugin = hotInstance?.getPlugin?.('nestedRows');

  if (!nestedRowsPlugin) return null;

  // 获取完整数据源
  const sourceData = hotInstance.getSourceData();

  // 获取可见行数据索引映射
  const physicalRowIndex = hotInstance.toPhysicalRow(visualRowIndex);

  return sourceData[physicalRowIndex] || null;
};

const TreeTable: React.FC = () => {
  const [data, setData] = useState<RowData[]>(generateMockData(1000, 20));
  const [highlightedCell, setHighlightedCell] = useState<{ row: number; col: number } | null>(null);
   // 记录展开状态
   const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const tableRef = useRef<HotTable>(null);

  const transformToTree = (flatData: RowData[]): any[] => {
    const idMap = new Map<number, any>();
    const treeData: any[] = [];

    flatData.forEach((item) => {
      const newNode = { ...item, __children: [] };
      idMap.set(item.id, newNode);

      if (item.parent === null) {
        treeData.push(newNode);
      } else {
        const parent = idMap.get(item.parent);
        if (parent) {
          parent.__children.push(newNode);
        }
      }
    });

    return treeData;
  };

  const handleCellClick = (row: number, col: number, value: any) => {
    if (value !== null && value !== undefined && value !== "") {
      const hotInstance = tableRef.current?.hotInstance;
      if (hotInstance) {
        // 保存点击的物理行和列
        const physicalRow = hotInstance.toPhysicalRow(row);
        const physicalCol = hotInstance.toPhysicalColumn(col);
        const collapsingUI: any = hotInstance?.getPlugin?.('nestedRows')?.collapsingUI;
        setExpandedRows(collapsingUI?.collapsedRows as any)
        
        setHighlightedCell({ row: physicalRow, col: physicalCol }); // 保存物理行列
      }
    }
  };

  // const getRenderer = (
  //   instance: Handsontable,
  //   td: HTMLTableCellElement,
  //   row: number,
  //   col: number,
  //   prop: string | number,
  //   value: any,
  //   cellProperties: Handsontable.CellProperties
  // ) => {
  //   Handsontable.renderers.TextRenderer(
  //     instance,
  //     td,
  //     row,
  //     col,
  //     prop,
  //     value,
  //     cellProperties
  //   );

  //   // 获取可视行列
  //   const hotInstance = tableRef.current?.hotInstance;
  //   if (hotInstance && highlightedCell) {
  //     const { row: highlightedRow, col: highlightedCol } = highlightedCell;
  //     const visualRow = hotInstance.toVisualRow(highlightedRow);
  //     const visualCol = hotInstance.toVisualColumn(highlightedCol);

  //     // 仅修改被点击单元格背景颜色
  //     if (visualRow === row && visualCol === col) {
  //       td.style.backgroundColor = "yellow";
  //     } else {
  //       td.style.backgroundColor = ""; // 恢复默认背景颜色
  //     }
  //   }

  //   // 条件 2: 固定列字体颜色为蓝色
  //   if (col === 2) {
  //     // td.style.color = "blue"; // 使用下面方法进行着色，该方法可以暂时不用
  //     td.style.setProperty("color", "blue", "important"); // 确保着色成功 
  //     td.style.cursor = "pointer";
  //   }
  // };

  const getRenderer = (
    instance: Handsontable,
    td: HTMLTableCellElement,
    row: number,
    col: number,
    prop: string | number,
    value: any,
    cellProperties: Handsontable.CellProperties
  ) => {
    // 默认的文本渲染
    Handsontable.renderers.TextRenderer(
      instance,
      td,
      row,
      col,
      prop,
      value,
      cellProperties
    );
  
    // 获取列的数据键值
    // const columnKey = cellProperties?.column?.data;
    const columnKey: any = cellProperties?.prop;
  
    // 检查列的 key 是否包含 'value' 字符串
    if (columnKey && columnKey.toLowerCase().includes("value")) {
      td.style.color = "blue";  // 字体颜色为蓝色
      td.style.cursor = "pointer"; // 添加指针光标
      td.style.fontWeight = "bold";  // 可选：加粗字体
      
      // 使用 !important 强制覆盖任何默认样式
      td.style.setProperty("color", "blue", "important");
      td.style.setProperty("cursor", "pointer", "important");
    }
  
    // 处理高亮单元格背景颜色
    const hotInstance = tableRef.current?.hotInstance;
    if (hotInstance && highlightedCell) {
      const { row: highlightedRow, col: highlightedCol } = highlightedCell;
      const visualRow = hotInstance.toVisualRow(highlightedRow);
      const visualCol = hotInstance.toVisualColumn(highlightedCol);
  
      // 高亮单元格的背景颜色
      if (visualRow === row && visualCol === col) {
        td.style.backgroundColor = "yellow";
      } else {
        td.style.backgroundColor = "";  // 恢复默认背景颜色
      }
    }
  };  

  useEffect(() => {
    // 初始化 Handsontable 的树状结构
    if (tableRef.current) {
      const hotInstance: any = tableRef.current.hotInstance;
      // 更新设置
      hotInstance.updateSettings({
        nestedRows: true,
        data: transformToTree(data), // 确保树状结构数据
      });

      // 恢复展开状态
      const collapsingUI: any =
        tableRef.current?.hotInstance?.getPlugin?.(
          'nestedRows'
        )?.collapsingUI;
      if (expandedRows && collapsingUI) {
        collapsingUI?.collapseMultipleChildren?.(expandedRows);
      }
    }
  }, [data, expandedRows]);

  return (
    <div>
      <HotTable
        ref={tableRef}
        data={transformToTree(data)} // 转换为树状结构的数据
        colHeaders={true}
        readOnly
        rowHeaders={true}
        colWidths={100}
        columns={[
          { data: "id" },
          { data: "name" },
          { data: "value", renderer: getRenderer },
          { data: "text1", renderer: getRenderer  },
          { data: "value1", renderer: getRenderer },
          { data: "text2", renderer: getRenderer  },
          { data: "value4", renderer: getRenderer },
          { data: "text5", renderer: getRenderer },
          { data: "value6", renderer: getRenderer },
          { data: "text7", renderer: getRenderer },
          { data: "value8", renderer: getRenderer },
          { data: "text9", renderer: getRenderer },
          { data: "value10", renderer: getRenderer },
          { data: "text11", renderer: getRenderer },
          { data: "value12", renderer: getRenderer },
          { data: "text13", renderer: getRenderer },
          { data: "value14", renderer: getRenderer },

          { data: "value0", renderer: getRenderer },
          { data: "text01", renderer: getRenderer  },
          { data: "value01", renderer: getRenderer },
          { data: "text02", renderer: getRenderer  },
          { data: "value04", renderer: getRenderer },
          { data: "text05", renderer: getRenderer },
          { data: "value06", renderer: getRenderer },
          { data: "text07", renderer: getRenderer },
          { data: "value08", renderer: getRenderer },
          { data: "text09", renderer: getRenderer },
          { data: "value010", renderer: getRenderer },
          { data: "text011", renderer: getRenderer },
          { data: "value012", renderer: getRenderer },
          { data: "text013", renderer: getRenderer },
          { data: "value014", renderer: getRenderer },

          { data: "value00", renderer: getRenderer },
          { data: "text001", renderer: getRenderer  },
          { data: "value001", renderer: getRenderer },
          { data: "text002", renderer: getRenderer  },
          { data: "value004", renderer: getRenderer },
          { data: "text005", renderer: getRenderer },
          { data: "value006", renderer: getRenderer },
          { data: "text007", renderer: getRenderer },
          { data: "value008", renderer: getRenderer },
          { data: "text009", renderer: getRenderer },
          { data: "value0010", renderer: getRenderer },
          { data: "text0011", renderer: getRenderer },
          { data: "value0012", renderer: getRenderer },
          { data: "text0013", renderer: getRenderer },
          { data: "value0014", renderer: getRenderer },
        ]}
        nestedRows={true} // 启用树状结构
        manualRowMove={true}
        manualColumnMove={true}
        filters={true} // 支持过滤
        afterOnCellMouseDown={(event, coords, td) => {
          const { row, col } = coords;
          if (row >= 0 && col >= 0) {
            // const rowData: any = tableRef.current?.hotInstance?.getSourceDataAtRow(row);
            const colProp: any =  (tableRef.current?.hotInstance?.getSettings()?.columns as any)?.[col]?.data; // 当前列对应的key
            if (colProp.toLowerCase().includes("value")) {
              const physicalRow = tableRef.current?.hotInstance?.toPhysicalRow(row);
              console.log(row, 'row');
              console.log(physicalRow, 'physicalRow');
              // const rowData: any = tableRef.current?.hotInstance?.getSourceData(physicalRow);
              
              const rowData = getRowDataByCoords(tableRef.current?.hotInstance, row)
              console.log(rowData, 'rowData---1212');
              const value = rowData?.[colProp];
  
              handleCellClick(row, col, value);
            }
          }
        }}
        licenseKey="non-commercial-and-evaluation" // Handsontable 许可密钥
      />
    </div>
  );
};

export default TreeTable;
