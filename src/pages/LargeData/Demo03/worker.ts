// worker.ts
export interface WorkerData {
  action: string;
  data: number[];
}

// eslint-disable-next-line no-restricted-globals
self.onmessage = function (e) {
  const { data1, data2 } = e.data;

  // 数据比对的示例逻辑：检查两个数据数组的相同项
  const result = data1.filter((item: any) => data2.includes(item));

  // 将比对结果返回主线程
  // eslint-disable-next-line no-restricted-globals
  self.postMessage(result);
};
