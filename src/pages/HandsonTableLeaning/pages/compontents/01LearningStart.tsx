import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { HotTable } from '@handsontable/react';
import Handsontable from 'handsontable';

const App = () => {
  const hotTableComponent = useRef<HotTable>(null);

  const [settings, setSettings] = useState(() => {
    const initialState = {
      data: Handsontable.helper.createSpreadsheetData(15, 20),
      height: 220,
      licenseKey: 'non-commercial-and-evaluation'
    }

    return initialState;
  });

  const handleChange = (setting: any, states: any) => (event: any) => {
    setSettings(prevState => ({
      ...prevState,
      [setting]: states[event.target.checked ? 1 : 0],
    }))
  }

  // const handleMouseOver = (event: any, coords: any) => {
  //   if (hotTableComponent) {
  //     const hotInstance = hotTableComponent?.current?.hotInstance;
  //     if (coords.row >= 0) {
  //       // Highlight the row
  //       if (hotInstance) {
  //         for (let col = 0; col < hotInstance?.countCols?.(); col++) {
  //           hotInstance?.getCell?.(coords.row, col)?.style?.backgroundColor = 'lightblue';
  //         }
  //       }
  //     }

  //   }
  // }

  // const handleMouseOut = (event: any, coords: any) => {
  //   const hotInstance = hotTableComponent.current.hotInstance;
  //   if (coords.row >= 0) {
  //     // Reset the row background color
  //     for (let col = 0; col < hotInstance.countCols(); col++) {
  //       hotInstance.getCell(coords.row, col).style.backgroundColor = '';
  //     }
  //   }
  // };

  // // 选中的单元格横向纵向背景色
  // const handleSelection = (row, col, row2, col2) => {
  //   const hotInstance = hotTableComponent.current.hotInstance;

  //   // Clear any previous custom styles
  //   hotInstance.view.wt.wtTable.TBODY.querySelectorAll('td').forEach((cell) => {
  //     cell.style.backgroundColor = '';
  //   });

  //   // Highlight selected row and column
  //   if (row >= 0 && col >= 0) {
  //     for (let i = 0; i < hotInstance.countCols(); i++) {
  //       const rowCell = hotInstance.getCell(row, i);
  //       if (rowCell) rowCell.style.backgroundColor = 'lightgreen'; // Row background
  //     }
  //     for (let j = 0; j < hotInstance.countRows(); j++) {
  //       const colCell = hotInstance.getCell(j, col);
  //       if (colCell) colCell.style.backgroundColor = 'lightgreen'; // Column background
  //     }

  //     // Highlight the currently selected cell
  //     const currentCell = hotInstance.getCell(row, col);
  //     if (currentCell) {
  //       currentCell.style.backgroundColor = 'darkgreen'; // Selected cell background
  //     }
  //   }
  // };

  // const handleDeselect = () => {
  //   const hotInstance = hotTableComponent.current.hotInstance;

  //   // Reset all cell styles
  //   hotInstance.view.wt.wtTable.TBODY.querySelectorAll('td').forEach((cell) => {
  //     cell.style.backgroundColor = '';
  //   });
  // };

  return (
    <div>
      <div className="controllers">
        <label>
          <input onChange={handleChange('fixedRowsTop', [0, 2])} type="checkbox" />
          Add fixed rows
        </label>
        <br/>

        <label>
          <input onChange={handleChange('fixedColumnsLeft', [0, 2])} type="checkbox" />
          Add fixed columns
        </label>
        <br/>

        <label>
          <input onChange={handleChange('rowHeaders', [false, true])} type="checkbox" />
          Enable row headers
        </label>
        <br/>

        <label>
          <input onChange={handleChange('colHeaders', [false, true])} type="checkbox" />
          Enable column headers
        </label>
        <br/>
      </div>
      

      <HotTable
        ref={hotTableComponent}
        // afterOnCellMouseOver={handleMouseOver}
        // afterOnCellMouseOut={handleMouseOut}

        // afterSelection={handleSelection}
        // afterDeselect={handleDeselect}
        settings={settings}/>
    </div>
  );
}

export default App