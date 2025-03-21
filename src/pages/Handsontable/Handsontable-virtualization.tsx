import { HotTable } from '@handsontable/react';
// import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';

// register Handsontable's modules
// registerAllModules();

// generate an array of arrays with dummy data
const data = new Array(1000) // number of rows
  .fill(null)
  .map((_, row) =>
    new Array(1000) // number of columns
      .fill(null)
      .map((_, column) => `${row}, ${column}`)
  );

const ExampleComponent = () => {
  return (
    data.length > 0 &&
    <HotTable
      data={data}
      colWidths={100}
      width="100%"
      height={320}
      rowHeaders={true}
      colHeaders={true}
      autoWrapRow={true}
      autoWrapCol={true}
      licenseKey="non-commercial-and-evaluation"
    />
  );
};

export default ExampleComponent;