import { HotTable } from '@handsontable/react';
import { transformTreeData, transformTreeData1, transformTreeKeys, isNotEmptyArray } from './utilsTest';
import { dynamicColumn } from './dynamicColum';
import { workingPointTree } from './data';
import 'handsontable/dist/handsontable.full.min.css';
import './TableStyles.css'; // 引入自定义样式

// register Handsontable's modules

const ExampleComponent = () => {


  const sourceDataObject = [...transformTreeKeys(workingPointTree), ...transformTreeKeys(workingPointTree), ...transformTreeKeys(workingPointTree), ...transformTreeKeys(workingPointTree), ...transformTreeKeys(workingPointTree)];


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

  console.log(generateData(100), 'generateData-1212');
  let nestedHeaders = transformTreeData1(generateData(100)).map((item: any, index: number) => {
    if (index === 1) {
      return [{label: '工程部位', colspan: 1}, {label: '工点', colspan: 1}, ...item]
    } else {
      return [{label: null, colspan: 1}, {label: null, colspan: 1}, ...item]
    }
  });

  const handleCellClick = (event: any, coords: any) => {
    // Check if the clicked cell is in the fifth column (column index 4)
    console.log(event, 'event');
    console.log(coords, 'coords');
    if (coords.col === 4) {
      console.log(`Cell in fifth column clicked at row ${coords.row}`);
      // Add any additional logic you want to execute on click here
    }
  };

  return (
    <div>
      <div style={{height: '100px'}}>
        1212
      </div>
      <HotTable
        data={sourceDataObject}
        preventOverflow="horizontal"
        rowHeaders={true}
        colHeaders={['Category', 'Artist', 'Title', 'Album', 'Label','Category1', 'Artist1', 'Title1', 'Album1', 'Label1','Category2', 'Artist2', 'Title2', 'Album2', 'Label2']}
        nestedHeaders={nestedHeaders}
        nestedRows={true}
        contextMenu={true}
        fixedColumnsLeft={2}
        colWidths={200}
        bindRowsWithHeaders={true}
        autoWrapRow={true}
        autoWrapCol={true}
        height="calc(100vh - 100px)"
        // renderAllRows={true}
        // readOnly
        afterOnCellMouseDown={handleCellClick} // 点击事件
        afterScrollVertically={() => {console.log(111)}}
        afterChange={(change) => {console.log(change);}} // 该方法可以动态修改值
  
        licenseKey="9c354-55bab-4ae31-d4e38-ab404"
      />

    </div>
  );
};

export default ExampleComponent;