import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { HotTable } from '@handsontable/react';
import Handsontable from 'handsontable';

const App = () => {
  const [settings, setSettings] = useState(() => {
     // Handsontable.GridSettings类型需要加，不然会报错
    const initialState: Handsontable.GridSettings = {
      data: [
        ['', 'Tesla', 'Nissan', 'Toyota', 'Honda', 'Mazda', 'Ford'],
        ['2017', 10, 11, 12, 13, 15, 16],
        ['2018', 10, 11, 12, 13, 15, 16],
        ['2019', 10, 11, 12, 13, 15, 16],
        ['2020', 10, 11, 12, 13, 15, 16],
        ['2021', 10, 11, 12, 13, 15, 16]
      ],
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

  return (
    <div>
      <HotTable settings={settings}/>
    </div>
  );
}

export default App