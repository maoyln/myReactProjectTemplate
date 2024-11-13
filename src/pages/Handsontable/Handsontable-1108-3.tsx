import { HotTable } from '@handsontable/react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';


const ExampleComponent = () => {
  // Type the data array explicitly
  const data: (string | number)[][] = [
    ['', 'Tesla', 'Nissan', 'Toyota', 'Honda'],
    ['2017', -5, '', 12, 13],
    ['2018', '', -11, 14, 13],
    ['2019', '', 15, -12, 'readOnly'],
  ];

  // Add explicit types for the renderer function parameters
  const firstRowRenderer = (
    instance: any,
    td: HTMLTableCellElement,
    ...rest: any[]
  ) => {
    // console.log(instance, 'instance');
    // console.log(td, 'td');
    // console.log(rest, 'rest');
    // Handsontable.renderers.TextRenderer(instance, td, ...(rest);
    td.style.fontWeight = 'bold';
    td.style.color = 'green';
    td.style.background = '#CEC';
  };

  const negativeValueRenderer = (
    instance: any,
    td: HTMLTableCellElement,
    row: number,
    col: number,
    prop: string,
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

    // if the row contains a negative number
    if (parseInt(value, 10) < 0) {
      // add class 'make-me-red'
      td.className = 'make-me-red';
    }

    if (!value || value === '') {
      td.style.background = '#EEE';
    } else {
      if (instance.getDataAtCell(0, col) === 'Nissan') {
        td.style.fontStyle = 'italic';
      }

      td.style.background = '';
    }
  };


  return (
    <HotTable
      data={data}
      autoWrapRow={true}
      autoWrapCol={true}
      licenseKey="non-commercial-and-evaluation"
      height="auto"
      // afterSelection={function (_row: number, _col: number, row2: number, col2: number) {
      //   const meta = this.getCellMeta(row2, col2);

      //   if (meta.readOnly) {
      //     this.updateSettings({
      //       fillHandle: false,
      //     });
      //   } else {
      //     this.updateSettings({
      //       fillHandle: true,
      //     });
      //   }
      // }}
      cells={function (row: number, col: number) {
        const cellProperties: any = {};
        const data = this.instance.getData();
        console.log(data, 'data--12');
        if (row === 0 || (data[row] && data[row][col] === 'readOnly')) {
          cellProperties.readOnly = true; // make cell read-only if it is first row or the text reads 'readOnly'
        }

        if (row === 0) {
          cellProperties.renderer = firstRowRenderer; // uses function directly
        } else {
          // cellProperties.renderer = 'negativeValueRenderer'; // uses lookup map
        }

        return cellProperties;
      }}
    />
  );
};

export default ExampleComponent;
