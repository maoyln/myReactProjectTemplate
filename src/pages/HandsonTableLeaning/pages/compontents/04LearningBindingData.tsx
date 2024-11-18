import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
import { HotTable } from '@handsontable/react';
import Handsontable from 'handsontable';

const App = () => {
  const hotTableRef = useRef<any>(null);
  function model(opts: any) {
    let _pub: any = {
      id: undefined,
      name: undefined,
      address: undefined
    };
    let _priv: any = {};
  
    for (const i in opts) {
      if (opts.hasOwnProperty(i)) {
        _priv[i] = opts[i];
      }
    }
  
    _pub.attr = function (attr: any, val: any) {
      if (typeof val === 'undefined') {
        // console.log('GET the', attr, 'value of', _pub);
  
        return _priv[attr];
      }
  
      // console.log('SET the', attr, 'value of', _pub);
      _priv[attr] = val;
  
      return _pub;
    };
  
    return _pub;
  }
  
  function property(attr: any): any {
    // console.log(attr, 'attr--12');
    return function (row: any, value: any) {

      // console.log(row, 'row');
      // console.log(value, 'value');
      return row.attr(attr, value);
    }
  }
  const [settings, setSettings] = useState(() => {
     // Handsontable.GridSettings类型需要加，不然会报错
    const initialState: Handsontable.GridSettings = {
      data: [
        model({ id: 1, name: 'Ted Right', address: '11', address1: '2' }),
        model({ id: 2, name: 'Frank Honest', address: '' }),
        model({ id: 3, name: 'Joan Well', address: '' }),
        model({ id: 4, name: 'Gail Polite', address: '' }),
        model({ id: 5, name: 'Michael Fair', address: '' })
      ],
      dataSchema: model,
      colHeaders: ['ID', 'Name', 'Address'],
      columns: [
        { data: property('id') },
        { data: property('name') },
        { data: property('address') },
        { data: property('address1') }
      ],
      startRows: 5, // 开始行。仅仅在没有data属性的时候有效，会显示空的5行
      startCols: 5, // 开始列。仅仅在没有data属性的时候有效，会显示空的5列
      height: '600px',
      width: '1000px',
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
    console.log(sourceData, 'sourceData');
    console.log(initialLoad, 'initialLoad');
    console.log(source, 'source');
  }

  return (
    <div>
      <Button onClick={changeValue}>修改值</Button>
      <HotTable ref={hotTableRef} settings={settings} afterLoadData={afterLoadData} />
    </div>
  );
}

export default App