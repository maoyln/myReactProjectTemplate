import React, { useState, useEffect, useRef } from 'react';

// 定义树形节点的接口
interface TreeNode {
  id: string;
  name: string;
  level: number;
  __children: TreeNode[];
}

const App: React.FC = () => {
  const [treeData, setTreeData] = useState<TreeNode[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const workerRef = useRef<Worker | null>(null);

  // 初始化 Web Worker
  useEffect(() => {
    if (typeof Worker !== 'undefined') {
      workerRef.current = new Worker(new URL('./worker.ts', import.meta.url));
    } else {
      console.error('Your browser does not support Web Workers');
    }

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate(); // 清理 Worker
      }
    };
  }, []);

  // 生成树形数据
  const generateTreeData = () => {
    if (workerRef.current) {
      setLoading(true);
      const depth = 6; // 树的深度
      const nodesPerLevel = 5; // 每层节点数

      // 发送消息给 Worker
      workerRef.current.postMessage({ depth, nodesPerLevel, startId: 0 });

      // 监听 Worker 返回的数据
      workerRef.current.onmessage = (e) => {
        const data = e.data;
        setTreeData(data);
        setLoading(false);
      };
    }
  };

  // 递归渲染树形数据
  const renderTree = (nodes: TreeNode[]): JSX.Element[] => {
    return nodes.map((node) => (
      <div key={node.id}>
        <div>{node.name} (Level {node.level})</div>
        {node.__children.length > 0 && (
          <div style={{ marginLeft: '20px' }}>
            {renderTree(node.__children)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Tree Data with Web Worker</h1>
      {loading && <p>Loading tree data...</p>}
      <div>{renderTree(treeData)}</div>
      <button onClick={generateTreeData} disabled={loading}>
        Generate Tree Data
      </button>
    </div>
  );
};

export default App;
