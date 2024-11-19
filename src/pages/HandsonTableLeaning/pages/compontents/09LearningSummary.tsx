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
    //  data: [],
   
     startRows: 5, // 开始行。仅仅在没有data属性的时候有效，会显示空的5行
     startCols: 5, // 开始列。仅仅在没有data属性的时候有效，会显示空的5列
     height: '600px',
     width: '1000px',
    //  colHeaders: true, // 显示列头
     stretchH: "all", // 'none'禁用拉伸 'last'仅拉伸最后一列; 'all'均匀拉伸所有列。
     minSpareRows: 10, // 最小空闲行，不管有无数据，都会有10(10为测试数据)行数据无数据
     licenseKey: '9c354-55bab-4ae31-d4e38-ab404',
     data: [
      {
        value: null,
        __children: [
          {value: 5},
          {value: 6},
          {value: 7},
        ]
      },
      {
        __children: [
          {value: 15},
          {value: 16},
          {value: 17},
        ]
      }
    ],
    columns: [
      { data: 'value' }
    ],
    nestedRows: true,
    rowHeaders: true,
    colHeaders: ['sum', 'min', 'max', 'count', 'average'],
    columnSummary: (): any => {
      const endpoints = [];
          const nestedRowsPlugin = hotTableRef.current?.hotInstance.getPlugin('nestedRows');
          const getRowIndex = nestedRowsPlugin?.dataManager?.getRowIndex?.bind?.(nestedRowsPlugin?.dataManager);
          const resultColumn = 0;
      
          let tempEndpoint: any = null;
          let nestedRowsCache = null;
      
          if (nestedRowsPlugin?.isEnabled()) {
            nestedRowsCache = hotTableRef.current?.hotInstance.getPlugin('nestedRows').dataManager.cache;
          } else {
            return;
          }
      
          for (let i = 0; i < nestedRowsCache.levels[0].length; i++) {
            tempEndpoint = {};
      
            if (!nestedRowsCache.levels[0][i].__children || nestedRowsCache.levels[0][i].__children.length === 0) {
              continue;
            }
      
            tempEndpoint.destinationColumn = resultColumn;
            tempEndpoint.destinationRow = getRowIndex(nestedRowsCache.levels[0][i]);
            tempEndpoint.type = 'sum';
            tempEndpoint.forceNumeric = true;
            tempEndpoint.ranges = [];
      
            tempEndpoint.ranges.push([
              getRowIndex(nestedRowsCache.levels[0][i].__children[0]),
              getRowIndex(nestedRowsCache.levels[0][i].__children[nestedRowsCache.levels[0][i].__children.length - 1])
            ]);
      
            endpoints.push(tempEndpoint);
            tempEndpoint = null;
          }
      
          return endpoints;
    }



   }

   return initialState;
 });


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