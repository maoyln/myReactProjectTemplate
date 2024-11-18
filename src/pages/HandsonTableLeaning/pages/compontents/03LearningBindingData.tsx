import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { HotTable } from '@handsontable/react';
import Handsontable from 'handsontable';

const App = () => {
  const [settings, setSettings] = useState(() => {
     // Handsontable.GridSettings类型需要加，不然会报错
    const initialState: Handsontable.GridSettings = {
      // 01
      // 对象数据源
      // data: [
      //   { id: 1, name: 'Ted Right', address: '' },
      //   { id: 2, name: 'Frank Honest', address: '地址' },
      //   { id: 3, name: 'Joan Well', address: '' },
      //   { id: 4, name: 'Gail Polite', address: '' },
      //   { id: 5, name: 'Michael Fair', address: '' },
      // ],

      // columns: [
      //   { data: 0 },
      //   // skip the second column
      //   { data: 2 },
      //   { data: 3 },
      //   { data: 4 },
      //   { data: 5 },
      //   { data: 6 }
      // ],

      // 02
      // // Array类型
      data: [
        { id: 1, name: {first: 'Ted', last: 'Right'}, address: '', address12: '附加字段' },
        { id: 2, address: '地址' },// HOT will create missing properties on demand
        { id: 3, name: {first: 'Joan', last: 'Well'}, address: '' }
      ],
      // // 于上述Array类型配合使用
      // columns: function(column) {
      //   let columnMeta: any = {};
    
      //   if (column === 0) {
      //     columnMeta.data = 'id';
      //   } else if (column === 1) {
      //     columnMeta.data = 'name.first';
      //   } else if (column === 2) {
      //     columnMeta.data = 'name.last';
      //   } else if (column === 3) {
      //     columnMeta.data = 'address';
      //   } else {
      //     columnMeta = null;
      //   }
    
      //   return columnMeta;
      // },

      // 03 自定义列，与dataSchema相比较，columns为主要顺序结构
      // columns: [
      //   { data: 'id' },
      //   { data: 'name.first' },
      //   { data: 'name.last' },
      //   { data: 'address' }
      // ],


      // 04 控数据
      // data: [],
      dataSchema: { name: { first: null, last: null }, address: null, id: null,  }, // 使用这个字段可以确定数据的对应字段
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