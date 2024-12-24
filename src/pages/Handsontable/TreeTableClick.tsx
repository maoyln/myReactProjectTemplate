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
      value1: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      value2: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      value3: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      value4: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      value5: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      value6: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      value7: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      value8: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      value9: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      value10: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      value11: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      value12: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      value13: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
      value14: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : null,
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
    Handsontable.renderers.TextRenderer(
      instance,
      td,
      row,
      col,
      prop,
      value,
      cellProperties
    );

    // 获取可视行列
    const hotInstance = tableRef.current?.hotInstance;
    if (hotInstance && highlightedCell) {
      const { row: highlightedRow, col: highlightedCol } = highlightedCell;
      const visualRow = hotInstance.toVisualRow(highlightedRow);
      const visualCol = hotInstance.toVisualColumn(highlightedCol);

      // 仅修改被点击单元格背景颜色
      if (visualRow === row && visualCol === col) {
        td.style.backgroundColor = "yellow";
      } else {
        td.style.backgroundColor = ""; // 恢复默认背景颜色
      }
    }

    // 条件 2: 固定列字体颜色为蓝色
    if (col === 2) {
      // td.style.color = "blue"; // 使用下面方法进行着色，该方法可以暂时不用
      td.style.setProperty("color", "blue", "important"); // 确保着色成功 
      td.style.cursor = "pointer";
    }
  };

  useEffect(() => {
    // 初始化 Handsontable 的树状结构
    if (tableRef.current) {
      const hotInstance: any = tableRef.current.hotInstance;
      hotInstance.updateSettings({
        nestedRows: true,
        data: transformToTree(data), // 确保树状结构数据
      });
    }
  }, [data]);

  console.log(highlightedCell, 'highlightedCell');

  return (
    <div>
      <HotTable
        ref={tableRef}
        data={transformToTree(data)} // 转换为树状结构的数据
        // colHeaders={["Name", "Value"]}
        readOnly
        rowHeaders={true}
        colWidths={100}
        columns={[
          { data: "id" },
          { data: "name" },
          { data: "value", renderer: getRenderer },
          { data: "value1" },
          { data: "value2" },
          { data: "value3" },
          { data: "value4" },
          { data: "value5" },
          { data: "value6" },
          { data: "value7" },
          { data: "value8" },
          { data: "value9" },
          { data: "value10" },
          { data: "value11" },
          { data: "value12" },
          { data: "value13" },
          { data: "value14" },
        ]}
        nestedRows={true} // 启用树状结构
        manualRowMove={true}
        manualColumnMove={true}
        filters={true} // 支持过滤
        afterOnCellMouseDown={(event, coords, td) => {
          const { row, col } = coords;
          if (row >= 0 && col >= 0) {
            const rowData: any = tableRef.current?.hotInstance?.getSourceDataAtRow(row);
            const colProp: any =  (tableRef.current?.hotInstance?.getSettings()?.columns as any)?.[col]?.data; // 当前列对应的key
            console.log(colProp, 'colProp');
            if (colProp === 'value') {
              const value = rowData?.value;
  
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
