import React, { useEffect, useState } from 'react';

const WorkerComponent: React.FC = () => {
  const [worker, setWorker] = useState<Worker | null>(null);
  const [data, setData] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (typeof Worker !== 'undefined') {
      // 创建 Worker
      const newWorker = new Worker(new URL('./worker.ts', import.meta.url));
      setWorker(newWorker);

      // 监听 Worker 返回的消息
      newWorker.onmessage = (e) => {
        const { action, result } = e.data;
        if (action === 'processedData') {
          setData(result);
          setLoading(false);
        }
      };

      // 清理 Worker
      return () => {
        newWorker.terminate();
      };
    } else {
      console.error('Web Workers are not supported in your browser.');
    }
  }, []);

  const handleStartProcessing = () => {
    if (worker) {
      setLoading(true);
      const data = [1, 2, 3, 4, 5];  // 要处理的数据
      worker.postMessage({ action: 'processData', data });
    }
  };

  return (
    <div>
      <h1>Web Worker with React</h1>
      {loading && <p>Loading...</p>}
      <button onClick={handleStartProcessing} disabled={loading}>
        Start Processing
      </button>
      <div>
        <h2>Processed Data:</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
};

export default WorkerComponent;
