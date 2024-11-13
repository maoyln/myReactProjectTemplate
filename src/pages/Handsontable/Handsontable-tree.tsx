import { HotTable } from '@handsontable/react';
import { transformTreeData, transformTreeData1, transformTreeKeys } from './utilsTest';
import { dynamicColumn } from './dynamicColum';
import { workingPointTree } from './data';
import 'handsontable/dist/handsontable.full.min.css';
import './TableStyles.css'; // 引入自定义样式

// register Handsontable's modules

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

  // console.log(nestedHeaders);
  console.log(dynamicColumn.length, '长度');

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
    <HotTable
      data={sourceDataObject}
      // preventOverflow="horizontal"  // 需要注释掉，不然不会触发虚拟
      rowHeaders={true}
      colHeaders={['Category', 'Artist', 'Title', 'Album', 'Label','Category1', 'Artist1', 'Title1', 'Album1', 'Label1','Category2', 'Artist2', 'Title2', 'Album2', 'Label2']}
      nestedHeaders={nestedHeaders}
      nestedRows={true}
      contextMenu={false}
      fixedColumnsLeft={2}
      colWidths={200}
      bindRowsWithHeaders={true}
      autoWrapRow={true}
      autoWrapCol={true}
      // height="90vh"
      height="calc(100vh - 100px)" // 高度可以计算
      renderAllRows={false} // 也要注释，不能全量加载，不然数据量过大会出现性能问题
      afterOnCellMouseDown={handleCellClick} // 点击事件
      afterChange={(change) => {console.log(change);}} // 该方法可以动态修改值
      licenseKey="9c354-55bab-4ae31-d4e38-ab404"
    />
  );
};

export default ExampleComponent;