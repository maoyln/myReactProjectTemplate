import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
import { HotTable, HotColumn } from '@handsontable/react';
import Handsontable from 'handsontable';
import "handsontable/dist/handsontable.full.css";
// import '../index.css'

const App = () => {
  const hotTableRef = useRef<any>(null);
  const [settings, setSettings] = useState(() => {
    // Handsontable.GridSettings类型需要加，不然会报错
   const initialState: Handsontable.GridSettings = {
     data: Handsontable.helper.createSpreadsheetData(10, 1000),
      // columns: [
      //   { data: 'id' },
      //   { data: 'name.first', wordWrap: true, },
      //   { data: 'name.last', wordWrap: false, },
      //   { data: 'address' }
      // ],
    // dataSchema: { name: { first: null, last: null }, address: null, id: null,  }, // 使用这个字段可以确定数据的对应字段
    contextMenu: true,
    // nestedHeaders: [['','','','4','5'], ['1','2','3','4','5']],

    allowInsertColumn: true, // 允许插入列 ， 需要配置contextMenu：true
    // allowInsertRow: true, // 允许插入行 ， 需要配置contextMenu：true
    allowRemoveColumn: false,  // 允许删除列 ， 需要配置contextMenu：true
    allowRemoveRow: false, // 允许删除行 ， 需要配置contextMenu：true
    autoWrapCol: true,
    autoWrapRow: true,
    // colWidths: 100,
    bindRowsWithHeaders: true,
    // autoColumnSize: { syncLimit: 700 },
    // 支持html
    // columns: [{
    //   type: 'autocomplete',
    //   // use HTML in the source list
    //   allowHtml: true,
    //   source: ['<strong>foo</strong>', '<strong>bar</strong>']
    // }],
     startRows: 5, // 开始行。仅仅在没有data属性的时候有效，会显示空的5行
     startCols: 5, // 开始列。仅仅在没有data属性的时候有效，会显示空的5列
     height: '600px',
     width: '1000px',
     colHeaders: true, // 显示列头
     stretchH: "all", // 'none'禁用拉伸 'last'仅拉伸最后一列; 'all'均匀拉伸所有列。
     minSpareRows: 10, // 最小空闲行，不管有无数据，都会有10(10为测试数据)行数据无数据
     minSpareCols: 3, // 最小空闲列
     activeHeaderClassName: 'ht__active_highlight',  // 需要进一步了解
     readOnlyCellClassName: 'is-readOnly',
     licenseKey: '9c354-55bab-4ae31-d4e38-ab404'
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
        { id: 1, name: {first: 'Ted', last: 'Right'}, address: '', address12: '附加字段' },
        { id: 2, address: '地址' },// HOT will create missing properties on demand
        { id: 3, name: {first: 'Joan', last: 'Well'}, address: '' }
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

  // 获取固定单元格的属性
  const getCellMeta = () => {
    const meta: any = hotTableRef.current?.hotInstance.getCellMeta(0, 1);
    // 设置单元格
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    
    console.log(meta, 'meta');
    console.log(meta?.readOnly);
    // {
    //     "visualRow": 0,
    //     "visualCol": 1,
    //     "row": 0,
    //     "col": 1,
    //     "prop": "name.last"
    // }
  }

  // 修改单元格
  const setCellMeta = () => {
    hotTableRef.current?.hotInstance.setCellMeta(2, 2,  'readOnly', true);
    // 设置单元格
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    
    // {
    //     "visualRow": 0,
    //     "visualCol": 1,
    //     "row": 0,
    //     "col": 1,
    //     "prop": "name.last"
    // }
    hotTableRef.current?.hotInstance?.render();
  }

  return (
    <div>
      <Button onClick={handleLoadData}>加载数据</Button>
      <Button onClick={handleGetData}>获取数据</Button>
      <Button onClick={changeValue}>修改值</Button>
      <Button onClick={getCellMeta}>获取单元格属性</Button>
      <Button onClick={setCellMeta}>设置单元格属性</Button>
      <HotTable
        ref={hotTableRef}
        settings={settings}
        colWidths={200}
        afterChange={handleAfterChange}
        afterLoadData={afterLoadData}
        autoWrapRow={true}
        autoWrapCol={true}

        // fixedColumnsLeft={2}
        // 设置固定单元格
        // cell={
        //   [{
        //     // cell options, apply only to a cell with coordinates (0, 0)
        //     row: 1,
        //     col: 1,
        //     readOnly: true,
        //   },
        //   {
        //     // cell options, apply only to a cell with coordinates (1, 1)
        //     row: 1,
        //     col: 2,
        //     readOnly: true,
        //   }]
        // }
        // 遍历设置所有个单元格
        // cells = {
        //   function(row, col, prop) {
        //     var cellProperties: any = {};

        //     console.log('start ----------');
        //     console.log(row, 'row');
        //     console.log(col, 'col');
        //     console.log(prop, 'prop');  // 该单元格的属性
        //     console.log('end ----------');
            
        //     if (row === 0 && col === 0) {
        //       cellProperties.readOnly = true; // 第一行第一列，设置只读
        //     }
        
        //     return cellProperties;
        //   }
        // }
        
      >
        <HotColumn cells = {
          function(row, col, prop) {
            var cellProperties: any = {};

            console.log('start ----------');
            console.log(row, 'row');
            console.log(col, 'col');
            console.log(prop, 'prop');  // 该单元格的属性
            console.log('end ----------');
            
            if (row === 0 && col === 0) {
              cellProperties.readOnly = true; // 第一行第一列，设置只读
            }
        
            return cellProperties;
          }
        } title='名称' data={'name.first'} > 
        </HotColumn>
        <HotColumn title='姓名' data={'name.last'}  />
        <HotColumn title='地址' data={'address12'}  />
      </HotTable>
    </div>
  );
}

export default App