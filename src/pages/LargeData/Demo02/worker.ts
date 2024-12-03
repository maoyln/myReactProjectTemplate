// worker.ts
export interface WorkerData {
  action: string;
  data: number[];
}

// eslint-disable-next-line no-restricted-globals
self.onmessage = function (e) {
  const { action, data }: WorkerData = e.data;

  if (action === 'processData') {
    const processedData = data.map((item) => item * 2);  // 模拟计算任务
    // eslint-disable-next-line no-restricted-globals
    self.postMessage({ action: 'processedData', result: processedData });
  }
};
