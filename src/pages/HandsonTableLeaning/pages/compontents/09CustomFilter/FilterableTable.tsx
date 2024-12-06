import React, { useState } from 'react';
import { HotTable } from '@handsontable/react';

interface Column {
  label: string;
  data: string;
}

interface Data {
  [key: string]: any;
}

interface FilterableTableProps {
  columns: Column[];
  data: Data[];
}

const FilterableTable: React.FC<FilterableTableProps> = ({ columns, data }) => {
  const [filterVisible, setFilterVisible] = useState<boolean[]>([]);
  const [filterValue, setFilterValue] = useState<string[]>([]);

  const toggleFilter = (index: number) => {
    setFilterVisible((prevFilterVisible) => {
      const newFilterVisible = [...prevFilterVisible];
      newFilterVisible[index] = !newFilterVisible[index];
      return newFilterVisible;
    });
  };

  const applyFilter = (index: number, value: string) => {
    setFilterValue((prevFilterValue) => {
      const newFilterValue = [...prevFilterValue];
      newFilterValue[index] = value;
      return newFilterValue;
    });
  };

  const resetFilter = (index: number) => {
    setFilterValue((prevFilterValue) => {
      const newFilterValue = [...prevFilterValue];
      newFilterValue[index] = '';
      return newFilterValue;
    });
  };

  const filteredData = data.filter((row) => {
    return filterValue.every((value, index) => {
      return value === '' || row[columns[index].data].includes(value);
    });
  });

  const hotSettings: any = {
    data: filteredData,
    licenseKey: '9c354-55bab-4ae31-d4e38-ab404',
    columns: columns.map((column) => ({
      data: column.data,
      renderer: (instance: any, td: any, row: any, col: any, prop: any, value: any, cellProperties: any) => {
        const filterButton = (
          <button onClick={() => toggleFilter(col)}>筛选</button>
        );

        if (filterVisible[col]) {
          return (
            <div>
              {value}
              <input
                type="text"
                value={filterValue[col]}
                onChange={(e) => applyFilter(col, e.target.value)}
              />
              <button onClick={() => resetFilter(col)}>重置</button>
              <button onClick={() => applyFilter(col, filterValue[col])}>
                应用
              </button>
            </div>
          );
        }

        return (
          <div>
            {value}
            {filterButton}
          </div>
        );
      },
    })),
  };

  return (
    <div>
      <HotTable settings={hotSettings} />
    </div>
  );
};

export default FilterableTable;