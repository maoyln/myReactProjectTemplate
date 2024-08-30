import React, { useState, useEffect, useMemo, useCallback } from 'react';

// 定义数据项的类型
interface Item {
  id: number;
  name: string;
}

// 定义排序函数的类型
type SortFunction = (a: Item, b: Item) => number;

// DataDisplay 组件
const DataDisplay: React.FC<{ data: Item[]; sortFunction?: SortFunction }> = ({
  data,
  sortFunction,
}) => {
  // 使用 useMemo 来缓存排序后的数据
  const sortedData = useMemo(() => {
    if (!sortFunction) return data;
    return [...data].sort(sortFunction);
  }, [data, sortFunction]);

  return (
    <div>
      <ul>
        {sortedData.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

// 主应用组件
const App: React.FC = () => {
  // 状态和初始化数据
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: "Item 2" },
    { id: 2, name: "Item 3" },
    { id: 3, name: "Item 4" },
    { id: 4, name: "Item 5" },
    { id: 5, name: "Item 6" },
    { id: 6, name: "Item 7" },
    // 更多数据...
  ]);

  // 使用 useCallback 来创建排序函数
  const sortByNameAsc = useCallback<SortFunction>(
    (a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    },
    []
  );

  const sortByNameDesc = useCallback<SortFunction>(
    (a, b) => {
      if (a.name < b.name) return 1;
      if (a.name > b.name) return -1;
      return 0;
    },
    []
  );

  useEffect(() => {
    // 从API获取数据并设置到状态中
    // setItems(apiFetch());
  }, []);

  return (
    <div>
      <button onClick={() => setItems([...items].reverse())}>Reverse Order</button>
      <button onClick={() => setItems([...items].sort(sortByNameAsc))}>Sort A-Z</button>
      <button onClick={() => setItems([...items].sort(sortByNameDesc))}>Sort Z-A</button>
      <DataDisplay data={items} sortFunction={sortByNameAsc} />
    </div>
  );
};

export default App;
