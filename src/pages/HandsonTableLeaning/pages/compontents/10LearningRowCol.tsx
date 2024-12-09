import React, { useRef } from 'react';
import Handsontable from 'handsontable';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.min.css';
import './10RowCol.css'; // 引入自定义样式

// 工具函数：生成随机数据
const generateData = (rows: number, columns: number): any[][] => {
  const data: any[][] = [];
  for (let i = 0; i < rows; i++) {
    const row: any[] = [];
    for (let j = 0; j < columns; j++) {
      row.push(j === 0 ? `Row ${i + 1}` : Math.floor(Math.random() * 100)); // 第一列显示行号
    }
    data.push(row);
  }
  return data;
};

const App: React.FC = () => {
  const hotTableRef = useRef<HotTable>(null);

  const rowCount = 1000; // 数据行数
  const colCount = 10; // 数据列数
  const data = generateData(rowCount, colCount);

  const colHeaders = Array.from({ length: colCount }, (_, i) =>
    i === 0 ? 'Row ID' : `Col ${i}`
  );

  // 鼠标悬停行
  const handleMouseOver = (event: MouseEvent) => {
    const hotInstance: any = hotTableRef.current?.hotInstance;
    if (!hotInstance) return;

    const coords = hotInstance.getCoords(event.target as HTMLElement);
    const row = coords?.row;

    if (row !== undefined && row >= 0) {
      const tableRows: any = hotInstance.view.wt.wtTable.TBODY.rows;
      Array.from(tableRows).forEach((rowElement: any, index: any) => {
        rowElement.classList.toggle('hover-row', index === row);
      });
    }
  };

  // 鼠标选中单元格
  const handleSelection = (
    row: number,
    col: number,
    row2: number,
    col2: number
  ) => {
    const hotInstance: any = hotTableRef.current?.hotInstance;
    if (!hotInstance) return;

    // 清除之前的样式
    hotInstance.view.wt.wtTable.TBODY.querySelectorAll('td').forEach((cell: any) => {
      cell.classList.remove('selected-row', 'selected-col', 'selected-cell');
    });

    // 设置行和列样式
    for (let i = 0; i < hotInstance.countCols(); i++) {
      hotInstance.getCell(row, i)?.classList.add('selected-row');
    }
    for (let j = 0; j < hotInstance.countRows(); j++) {
      hotInstance.getCell(j, col)?.classList.add('selected-col');
    }

    // 设置选中单元格样式
    hotInstance.getCell(row, col)?.classList.add('selected-cell');
  };

  return (
    <HotTable
      ref={hotTableRef}
      data={data}
      colHeaders={colHeaders}
      rowHeaders={true}
      width="800"
      height="600"
      afterSelection={(row, col, row2, col2) =>
        handleSelection(row, col, row2, col2)
      }
      afterOnCellMouseOver={(event) => handleMouseOver(event as MouseEvent)}
      contextMenu={true}
      licenseKey="non-commercial-and-evaluation"
    />
  );
};

export default App;
