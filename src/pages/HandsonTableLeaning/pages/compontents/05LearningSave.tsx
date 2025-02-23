import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
import { HotTable } from '@handsontable/react';
import Handsontable from 'handsontable';

const App = () => {
  const hotTableRef = useRef<any>(null);
  const [settings, setSettings] = useState(() => {
    // Handsontable.GridSettings类型需要加，不然会报错
   const initialState: Handsontable.GridSettings = {
     data: [],
     columns: [
       { data: 0 },
       // 省略第二列数据
       { data: 2 },
       { data: 3 },
       { data: 4 },
       { data: 5 },
       { data: 6 }
     ],
     startRows: 5, // 开始行。仅仅在没有data属性的时候有效，会显示空的5行
     startCols: 5, // 开始列。仅仅在没有data属性的时候有效，会显示空的5列
     height: '600px',
     width: '1000px',
     colHeaders: true, // 显示列头
     stretchH: "all", // 'none'禁用拉伸 'last'仅拉伸最后一列; 'all'均匀拉伸所有列。
     minSpareRows: 10, // 最小空闲行，不管有无数据，都会有10(10为测试数据)行数据无数据
     licenseKey: '9c354-55bab-4ae31-d4e38-ab404'
   }

   return initialState;
 });

  let hotInstance: Handsontable | null = null;

  // 获取 Handsontable 实例
 

  // 修改数据
  const changeValue = () => {
    console.log(hotTableRef.current);
    // hotTableRef.current.setDataAtCell(0, 1, 'Ford')
    if (hotTableRef.current?.hotInstance) {
      // 假设我们要修改第二行、第三列的数据
      hotTableRef.current?.hotInstance.setDataAtCell?.(1, 2, 'New Address');
    }
  }

  const afterLoadData = (sourceData: Handsontable.CellValue[], initialLoad: boolean, source: string | undefined) => {
    // console.log(sourceData, 'sourceData');
    // console.log(initialLoad, 'initialLoad');
    // console.log(source, 'source');
  }

  // 修改值，在此处可以存库
  const handleAfterChange = (changes: Handsontable.CellChange[] | null, source: Handsontable.ChangeSource) => {
    console.log(changes, 'changes');
    console.log(source, 'source');
    
  }

  const handleLoadData = () => {
    hotTableRef.current?.hotInstance.loadData(
      [
        ['', 'Tesla', 'Nissan', 'Toyota', 'Honda', 'Mazda', 'Ford'],
        ['2017', 10, 11, 12, 13, 15, 16],
        ['2018', 10, 11, 12, 13, 15, 16],
        ['2019', 10, 11, 12, 13, 15, 16],
        ['2020', 10, 11, 12, 13, 15, 16],
        ['2021', 10, 11, 12, 13, 15, 16]
      ]
    );
  }

  const handleGetData = () => {
    const data = hotTableRef.current?.hotInstance.getData();
    const colData = hotTableRef.current?.hotInstance.getDataAtCol(1); // 获取一列的值
    const rowData = hotTableRef.current?.hotInstance.getDataAtRow(1); // 获取一行的值
    console.log(data);
    console.log(colData);
    console.log(rowData);
  }

  console.log(hotTableRef.current, 'hotTableRef.current');

  return (
    <div>
      <Button onClick={handleLoadData}>加载数据</Button>
      <Button onClick={handleGetData}>获取数据</Button>
      <Button onClick={changeValue}>修改值</Button>
      <HotTable ref={hotTableRef} settings={settings} afterChange={handleAfterChange} afterLoadData={afterLoadData} />
    </div>
  );
}

export default App