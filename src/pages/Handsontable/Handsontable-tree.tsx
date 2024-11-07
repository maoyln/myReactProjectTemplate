import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import { transformTreeData, transformTreeData1, transformTreeKeys } from './utils';
import { dynamicColumn } from './dynamicColum';
import { workingPointTree } from './data';
import 'handsontable/dist/handsontable.full.min.css';
import './TableStyles.css'; // 引入自定义样式

// register Handsontable's modules
registerAllModules();

const ExampleComponent = () => {
  // const sourceDataObject = [
  //   {
  //     category: '塔里木隧道',
  //     artist: '工点',
  //     title: null,
  //     label: null,
  //     title1: null,
  //     title2: null,
  //     title3: null,
  //     title4: null,
  //     title5: null,
  //     title6: null,
  //     title7: null,
  //     title8: null,
  //     title9: null,
  //     title10: null,
  //     title11: null,
  //     title12: null,
  //     title13: null,
  //     title14: null,
  //     title15: null,
  //     title16: null,
  //     title17: null,
  //     title18: null,
  //     title19: null,
  //     title20: null,
  //     title21: null,
  //     title22: null,
  //     title23: null,
  //     title24: null,
  //     title25: null,
  //     title26: null,
  //     title27: null,
  //     __children: [
  //       {
  //         title: "Don't Wanna Fight",
  //         artist: 'Alabama Shakes',
  //         label: 'ATO Records',
  //         category: '开挖及初支',
  //         title1: '121212',
  //         __children: [
  //           {
  //             title: "Don't Wanna Fight",
  //             artist: 'Alabama Shakes',
  //             label: 'ATO Records',
  //             category: '开挖',
  //             title1: '121212'
  //           },
  //           {
  //             title: "Don't Wanna Fight",
  //             artist: 'Alabama Shakes',
  //             label: 'ATO Records',
  //             category: '初支',
  //             title1: '121212'
  //           },
  //         ]
  //       },
  //       {
  //         title: 'What Kind Of Man',
  //         artist: 'Florence & The Machine',
  //         label: 'Republic',
  //       },
  //       {
  //         title: 'Something From Nothing',
  //         artist: 'Foo Fighters',
  //         label: 'RCA Records',
  //       },
  //       {
  //         title: "Ex's & Oh's",
  //         artist: 'Elle King',
  //         label: 'RCA Records',
  //       },
  //       {
  //         title: 'Moaning Lisa Smile',
  //         artist: 'Wolf Alice',
  //         label: 'RCA Records/Dirty Hit',
  //       },
  //     ],
  //   },
  //   {
  //     category: 'Best Metal Performance',
  //     __children: [
  //       {
  //         title: 'Cirice',
  //         artist: 'Ghost',
  //         label: 'Loma Vista Recordings',
  //       },
  //       {
  //         title: 'Identity',
  //         artist: 'August Burns Red',
  //         label: 'Fearless Records',
  //       },
  //       {
  //         title: '512',
  //         artist: 'Lamb Of God',
  //         label: 'Epic Records',
  //       },
  //       {
  //         title: 'Thank You',
  //         artist: 'Sevendust',
  //         label: '7Bros Records',
  //       },
  //       {
  //         title: 'Custer',
  //         artist: 'Slipknot',
  //         label: 'Roadrunner Records',
  //       },
  //     ],
  //   },
  //   {
  //     category: 'Best Rock Song',
  //     __children: [
  //       {
  //         title: "Don't Wanna Fight",
  //         artist: 'Alabama Shakes',
  //         label: 'ATO Records',
  //       },
  //       {
  //         title: "Ex's & Oh's",
  //         title1: "Ex's & Oh's111",
  //         artist: 'Elle King',
  //         label: 'RCA Records',
  //       },
  //       {
  //         title: 'Hold Back The River',
  //         artist: 'James Bay',
  //         label: 'Republic',
  //       },
  //       {
  //         title: 'Lydia',
  //         artist: 'Highly Suspect',
  //         label: '300 Entertainment',
  //       },
  //       {
  //         title: 'What Kind Of Man',
  //         artist: 'Florence & The Machine',
  //         label: 'Republic',
  //       },
  //     ],
  //   },
  //   {
  //     category: 'Best Rock Album',
  //     __children: [
  //       {
  //         title: 'Drones',
  //         artist: 'Muse',
  //         label: 'Warner Bros. Records',
  //       },
  //       {
  //         title: 'Chaos And The Calm',
  //         artist: 'James Bay',
  //         label: 'Republic',
  //       },
  //       {
  //         title: 'Kintsugi',
  //         artist: 'Death Cab For Cutie',
  //         label: 'Atlantic',
  //       },
  //       {
  //         title: 'Mister Asylum',
  //         artist: 'Highly Suspect',
  //         label: '300 Entertainment',
  //       },
  //       {
  //         title: '.5: The Gray Chapter',
  //         artist: 'Slipknot',
  //         label: 'Roadrunner Records',
  //       },
  //       {
  //         title: 'Drones',
  //         artist: 'Muse',
  //         label: 'Warner Bros. Records',
  //       },
  //       {
  //         title: 'Chaos And The Calm',
  //         artist: 'James Bay',
  //         label: 'Republic',
  //       },
  //       {
  //         title: 'Kintsugi',
  //         artist: 'Death Cab For Cutie',
  //         label: 'Atlantic',
  //       },
  //       {
  //         title: 'Mister Asylum',
  //         artist: 'Highly Suspect',
  //         label: '300 Entertainment',
  //       },
  //       {
  //         title: '.5: The Gray Chapter',
  //         artist: 'Slipknot',
  //         label: 'Roadrunner Records',
  //       },
  //       {
  //         title: 'Drones',
  //         artist: 'Muse',
  //         label: 'Warner Bros. Records',
  //       },
  //       {
  //         title: 'Chaos And The Calm',
  //         artist: 'James Bay',
  //         label: 'Republic',
  //       },
  //       {
  //         title: 'Kintsugi',
  //         artist: 'Death Cab For Cutie',
  //         label: 'Atlantic',
  //       },
  //       {
  //         title: 'Mister Asylum',
  //         artist: 'Highly Suspect',
  //         label: '300 Entertainment',
  //       },
  //       {
  //         title: '.5: The Gray Chapter',
  //         artist: 'Slipknot',
  //         label: 'Roadrunner Records',
  //       },
  //       {
  //         title: 'Drones',
  //         artist: 'Muse',
  //         label: 'Warner Bros. Records',
  //       },
  //       {
  //         title: 'Chaos And The Calm',
  //         artist: 'James Bay',
  //         label: 'Republic',
  //       },
  //       {
  //         title: 'Kintsugi',
  //         artist: 'Death Cab For Cutie',
  //         label: 'Atlantic',
  //       },
  //       {
  //         title: 'Mister Asylum',
  //         artist: 'Highly Suspect',
  //         label: '300 Entertainment',
  //       },
  //       {
  //         title: '.5: The Gray Chapter',
  //         artist: 'Slipknot',
  //         label: 'Roadrunner Records',
  //       },
  //       {
  //         title: 'Drones',
  //         artist: 'Muse',
  //         label: 'Warner Bros. Records',
  //       },
  //       {
  //         title: 'Chaos And The Calm',
  //         artist: 'James Bay',
  //         label: 'Republic',
  //       },
  //       {
  //         title: 'Kintsugi',
  //         artist: 'Death Cab For Cutie',
  //         label: 'Atlantic',
  //       },
  //       {
  //         title: 'Mister Asylum',
  //         artist: 'Highly Suspect',
  //         label: '300 Entertainment',
  //       },
  //       {
  //         title: '.5: The Gray Chapter',
  //         artist: 'Slipknot',
  //         label: 'Roadrunner Records',
  //       },
  //       {
  //         title: 'Drones',
  //         artist: 'Muse',
  //         label: 'Warner Bros. Records',
  //       },
  //       {
  //         title: 'Chaos And The Calm',
  //         artist: 'James Bay',
  //         label: 'Republic',
  //       },
  //       {
  //         title: 'Kintsugi',
  //         artist: 'Death Cab For Cutie',
  //         label: 'Atlantic',
  //       },
  //       {
  //         title: 'Mister Asylum',
  //         artist: 'Highly Suspect',
  //         label: '300 Entertainment',
  //       },
  //       {
  //         title: '.5: The Gray Chapter',
  //         artist: 'Slipknot',
  //         label: 'Roadrunner Records',
  //       },
  //       {
  //         title: 'Drones',
  //         artist: 'Muse',
  //         label: 'Warner Bros. Records',
  //       },
  //       {
  //         title: 'Chaos And The Calm',
  //         artist: 'James Bay',
  //         label: 'Republic',
  //       },
  //       {
  //         title: 'Kintsugi',
  //         artist: 'Death Cab For Cutie',
  //         label: 'Atlantic',
  //       },
  //       {
  //         title: 'Mister Asylum',
  //         artist: 'Highly Suspect',
  //         label: '300 Entertainment',
  //       },
  //       {
  //         title: '.5: The Gray Chapter',
  //         artist: 'Slipknot',
  //         label: 'Roadrunner Records',
  //       },
  //       {
  //         title: 'Drones',
  //         artist: 'Muse',
  //         label: 'Warner Bros. Records',
  //       },
  //       {
  //         title: 'Chaos And The Calm',
  //         artist: 'James Bay',
  //         label: 'Republic',
  //       },
  //       {
  //         title: 'Kintsugi',
  //         artist: 'Death Cab For Cutie',
  //         label: 'Atlantic',
  //       },
  //       {
  //         title: 'Mister Asylum',
  //         artist: 'Highly Suspect',
  //         label: '300 Entertainment',
  //       },
  //       {
  //         title: '.5: The Gray Chapter',
  //         artist: 'Slipknot',
  //         label: 'Roadrunner Records',
  //       },
  //       {
  //         title: 'Drones',
  //         artist: 'Muse',
  //         label: 'Warner Bros. Records',
  //       },
  //       {
  //         title: 'Chaos And The Calm',
  //         artist: 'James Bay',
  //         label: 'Republic',
  //       },
  //       {
  //         title: 'Kintsugi',
  //         artist: 'Death Cab For Cutie',
  //         label: 'Atlantic',
  //       },
  //       {
  //         title: 'Mister Asylum',
  //         artist: 'Highly Suspect',
  //         label: '300 Entertainment',
  //       },
  //       {
  //         title: '.5: The Gray Chapter',
  //         artist: 'Slipknot',
  //         label: 'Roadrunner Records',
  //       },
  //     ],
  //   },
  // ];

  // let nestedHeaders: any=[
  //   ['工程部位', `工点`, { label: '热札圆盘条', colspan: 2 }, { label: '热札圆盘条', colspan: 2 }, { label: '热札圆盘条', colspan: 2 }, { label: '水泥', colspan: 2 }],
  //   [null, null, { label: 'RZYP（m）', colspan: 2 }, { label: 'RZYP-1（m）', colspan: 2 }, { label: 'RZYP（m）', colspan: 2 }, { label: 'RZYP-1（m）', colspan: 2 }],
  //   [null, null, { label: '设计量', colspan: 1 },  { label: '应耗量', colspan: 1 }, { label: '设计量', colspan: 1},  { label: '应耗量', colspan: 1 }, { label: '设计量', colspan: 1 },  { label: '应耗量', colspan: 1 }, { label: '设计量', colspan: 1},  { label: '应耗量', colspan: 1 }],
  // ]

  const sourceDataObject = transformTreeKeys(workingPointTree);

  let nestedHeaders = transformTreeData1(dynamicColumn).map((item: any, index: number) => {
    if (index === 1) {
      return [{label: '工程部位', colspan: 1}, {label: '工点', colspan: 1}, ...item]
    } else {
      return [{label: null, colspan: 1}, {label: null, colspan: 1}, ...item]
    }
  });

  console.log(nestedHeaders);

  return (
    <HotTable
      data={sourceDataObject}
      preventOverflow="horizontal"
      rowHeaders={true}
      colHeaders={['Category', 'Artist', 'Title', 'Album', 'Label','Category1', 'Artist1', 'Title1', 'Album1', 'Label1','Category2', 'Artist2', 'Title2', 'Album2', 'Label2']}
      nestedHeaders={nestedHeaders}
      nestedRows={true}
      contextMenu={true}
      fixedColumnsStart={2}
      colWidths={200}
      bindRowsWithHeaders={true}
      autoWrapRow={true}
      autoWrapCol={true}
      height="90vh"
      licenseKey="non-commercial-and-evaluation"
    />
  );
};

export default ExampleComponent;