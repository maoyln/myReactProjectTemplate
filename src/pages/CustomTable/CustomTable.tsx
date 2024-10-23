import React, { useState, useEffect } from 'react';
import { Table, Pagination, Drawer, Button, Tag, Space } from 'antd';
import { generateMockData } from './generateMockData';
import axios from 'axios';

interface DataItem {
  id: number;
  mixingStationName: string;
  timeStamp: string;
  plateVolume: string;
  workPointName: string;
  strengthGrade: string;
  [key: string]: any; // 动态字段
}

const CustomTable: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [dynamicColumns, setDynamicColumns] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<DataItem | null>(null);


  function fetchData() {
    console.log("Fetching data...");
    setTimeout(() => {
        const mockData: any = generateMockData();
        console.log("Data fetched successfully!");
        console.log(mockData);
        setData(mockData.result.materials.map((item: any) => {
          return {...item,  attr_designAmount: '12', attr_productionValue: '13', attr_rate: '14', name_designAmount: '12', name_productionValue: '13', name_rate: '14'
           }
        }));
        setTotal(106);
        setDynamicColumns(generateDynamicColumns([{title: '水',code: 'attr'}, {title: '碎石',code: 'name'}]));
    }, 100); // 模拟网络延迟
}

  // const fetchData = async (page: number, pageSize: number) => {
  //   setLoading(true);
  //   try {

  //     const { data, total, dynamicHeaders } = response.data;
  //     setData(data);
  //     setTotal(total);
  //     setDynamicColumns(generateDynamicColumns(dynamicHeaders));
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const generateDynamicColumns = (dynamicHeaders: {title: string; code: string}[]) => {
    return dynamicHeaders.map((item) => ({
      title: item.title,
      dataIndex: item.code,
      children: [
        { title: '设计值', dataIndex: `${item.code}_designAmount` },
        { title: '实际生产值', dataIndex: `${item.code}_productionValue` },
        {
          title: '偏差百分比',
          dataIndex: `${item.code}_rate`,
          render: (value: number) => (
            <Tag color={getDeviationColor(value)}>{value}</Tag>
          ),
        },
      ],
    }));
  };

  const getDeviationColor = (value: number) => {
    if (value > 10) return 'red';
    if (value > 5) return 'orange';
    return 'default';
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
    fetchData();
  };

  const handleReportDetail = (record: DataItem) => {
    setSelectedRow(record);
    setDrawerVisible(true);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize]);

  const columns = [
    { title: '拌合站名称', dataIndex: 'mixingStationName', fixed: 'left' },
    { title: '采集时间', dataIndex: 'timeStamp', fixed: 'left' },
    { title: '盘方量', dataIndex: '盘方量', fixed: 'left' },
    { title: '工程名称', dataIndex: 'workPointName', fixed: 'left' },
    { title: '强度等级', dataIndex: '强度等级', fixed: 'left' },
    ...dynamicColumns,
    {
      title: '实验数据',
      key: 'action',
      fixed: 'right',
      render: (_: string, record: any) => (
        <Button type="link" onClick={() => handleReportDetail(record)}>
          报告详情
        </Button>
      ),
    },
  ];

  return (
    <>
      <Table
        dataSource={data}
        columns={columns}
        loading={loading}
        pagination={false}
        scroll={{ x: 1500 }}
      />
      <Pagination
        total={total}
        current={currentPage}
        pageSize={pageSize}
        onChange={handlePageChange}
        showTotal={(total) => `共 ${total} 条`}
        showSizeChanger
        onShowSizeChange={handlePageChange}
      />
      <Drawer
        title="报告详情"
        placement="right"
        closable={true}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        height="100%"
        width={450}
      >
        {selectedRow && (
          <div style={{ padding: '20px' }}>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <p><strong>拌合站名称:</strong> {selectedRow['mixingStationName']}</p>
              <p><strong>采集时间:</strong> {selectedRow['timeStamp']}</p>
              <p><strong>盘方量:</strong> {selectedRow['plateVolume']}</p>
              <p><strong>工程名称:</strong> {selectedRow['workPointName']}</p>
              <p><strong>强度等级:</strong> {selectedRow['strengthGrade']}</p>
              {Object.keys(selectedRow).map((key) => {
                if (
                  key !== 'mixingStationName' &&
                  key !== 'timeStamp' &&
                  key !== 'plateVolume' &&
                  key !== 'workPointName' &&
                  key !== 'strengthGrade'
                ) {
                  return (
                    <div key={key}>
                      <p><strong>{key}:</strong></p>
                      <ul>
                        <li><strong>设计值:</strong> {selectedRow[`${key}.designAmount`]}</li>
                        <li><strong>实际生产值:</strong> {selectedRow[`${key}.productionValue`]}</li>
                        <li>
                          <strong>偏差百分比:</strong>
                          <Tag color={getDeviationColor(selectedRow[`${key}.rate`])}>
                            {selectedRow[`${key}.rate`]}
                          </Tag>
                        </li>
                      </ul>
                    </div>
                  );
                }
                return null;
              })}
            </Space>
          </div>
        )}
      </Drawer>
    </>
  );
};

export default CustomTable;
