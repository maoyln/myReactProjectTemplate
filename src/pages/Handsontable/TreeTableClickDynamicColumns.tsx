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
import { nestedHeaders } from './nestedHeaders';
import { tableData } from './columnsData';
import { columns } from './columns';
import "handsontable/dist/handsontable.full.min.css";

interface RowData {
  id: number;
  parent: number | null;
  name: string;
  value: number | null;
  [key: string]: any;
}

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
  const [highlightedCell, setHighlightedCell] = useState<{ row: number; col: number } | null>(null);
   // 记录展开状态
   const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const tableRef = useRef<HotTable>(null);

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
    if (columnKey && (columnKey.includes("supplyAQuantity") || columnKey.includes("verificationQuantity"))) {
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
        // data: transformToTree(data), // 确保树状结构数据
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
  }, [expandedRows]);

  const addRendererToColumns = (data: Array<any>) => {
    return data.map(item => {
      // 检查 `data` 字符串是否包含 'supplyAQuantity' 或 'verificationQuantity'
      if (item.data.includes('supplyAQuantity') || item.data.includes('verificationQuantity')) {
        return {
          ...item,  // 保留原有属性
          renderer: getRenderer,  // 添加 renderer 属性
        };
      }
      return item;  // 不满足条件则返回原始对象
    });
  };


  return (
    <div>
      <HotTable
        ref={tableRef}
        data={tableData}
        // data={transformToTree(data)} // 转换为树状结构的数据
        colHeaders={false}
        nestedRows={true}
        nestedHeaders={nestedHeaders}
        readOnly
        rowHeaders={true}
        colWidths={100}
        fixedColumnsLeft={2}
        columns={addRendererToColumns(columns)}
        manualRowMove={true}
        manualColumnMove={true}
        filters={true} // 支持过滤
        height={`calc((100vh - 10px))`}
        afterOnCellMouseDown={(event, coords, td) => {
          const { row, col } = coords;
          if (row >= 0 && col >= 0) {
            // const rowData: any = tableRef.current?.hotInstance?.getSourceDataAtRow(row);
            const colProp: any =  (tableRef.current?.hotInstance?.getSettings()?.columns as any)?.[col]?.data; // 当前列对应的key
            // console.log(colProp, 'colProp');
            if (colProp.includes('supplyAQuantity') || colProp.includes('verificationQuantity')) {
              // const physicalRow = tableRef.current?.hotInstance?.toPhysicalRow(row);
              // console.log(row, 'row');
              // console.log(physicalRow, 'physicalRow');
              // const rowData: any = tableRef.current?.hotInstance?.getSourceData(physicalRow);
              
              // const rowData = getRowDataByCoords(tableRef.current?.hotInstance, row)
              // const value = rowData?.[colProp];
              const value = tableRef.current?.hotInstance?.getDataAtCell(row, col);  // 获取当前单元格的值

  
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
