import React, { useState, useEffect, useRef } from 'react';

const BigDataWorkerComponent: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [matchedData, setMatchedData] = useState<number[]>([]);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    if (typeof Worker !== 'undefined') {
      // 创建 Web Worker
      workerRef.current = new Worker(new URL('./worker.ts', import.meta.url));
      
      // 监听 Worker 返回的消息
      workerRef.current.onmessage = (e) => {
        setMatchedData(e.data);
        setLoading(false);
      };
    } else {
      console.error('Web Workers are not supported in your browser.');
    }

    // 清理 Worker
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  // 生成模拟的大数据
  const generateBigData = () => {
    const data1 = Array.from({ length: 200000 }, (_, i) => i);  // 生成1-100000的数字
    const data2 = Array.from({ length: 100000 }, (_, i) => i * 2); // 生成2的倍数

    return { data1, data2 };
  };

  // 使用web worker
  const handleStartProcessing = () => {
    if (workerRef.current) {
      setLoading(true);
      const { data1, data2 } = generateBigData();
      
      // 发送数据到 Worker 进行比对
      workerRef.current.postMessage({ data1, data2 });
    }
  };

  // 不使用web worker


  // 不使用web worker
  const handleGetData = () => {
    setLoading(true);
    const { data1, data2 } = generateBigData();

    // 数据比对的示例逻辑：检查两个数据数组的相同项
    const result = data1.filter((item: any) => data2.includes(item));
    setLoading(false);
    setMatchedData(result);
    
    // 发送数据到 Worker 进行比对
  }
  

  //结论：

  /**
   * 结论：实际测试结果
   * 1、不使用web worker会出现假死状态，再处理数据的时候页面出现短暂卡死
   *    使用web worker会不会出现假死状态
   * 
   * 2、不使用web worker在页面渲染出数据的时间会短一些（本例子：2秒左右）
   *    使用web worker在页面渲染出数据的时间会长一些（本例子：10-14秒左右）
   */

  return (
    <div>
      <h1>Web Worker with Big Data</h1>
      <button onClick={handleStartProcessing} disabled={loading}>
        {loading ? 'Processing...' : 'Start Data Comparison'}
      </button>

      <button onClick={handleGetData} disabled={loading}>
        {loading ? '直接进行中...' : '直接数据对比'}
      </button>

      {loading && <p>Processing large datasets...</p>}

      <h2>Matched Data:</h2>
      <pre>{JSON.stringify(matchedData, null, 2)}</pre>
    </div>
  );
};

export default BigDataWorkerComponent;
