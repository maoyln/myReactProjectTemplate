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
        settings={settings}/>
    </div>
  );
}

export default App