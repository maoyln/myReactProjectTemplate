// worker.ts
export interface TreeNode {
  id: string;
  name: string;
  level: number;
  __children: TreeNode[];
}

// 生成树形数据的函数
const generateTreeData = (depth: number = 6, nodesPerLevel: number = 5, startId: number = 0): TreeNode[] => {
  let idCounter = startId;

  // 递归生成树形节点
  const createNode = (level: number): TreeNode | null => {
    if (level > depth) return null;

    const node: TreeNode = {
      id: `${idCounter++}`, // 唯一的id
      name: `Node ${idCounter}`,
      level,
      __children: [],
    };

    // 在每个节点下添加子节点
    for (let i = 0; i < nodesPerLevel; i++) {
      const childNode = createNode(level + 1);
      if (childNode) {
        node.__children.push(childNode);
      }
    }

    return node;
  };

  const rootNodes: TreeNode[] = [];
  for (let i = 0; i < nodesPerLevel; i++) {
    const node = createNode(0);
    if (node) rootNodes.push(node);
  }

  return rootNodes;
};

// 监听主线程消息，开始生成树形数据
// eslint-disable-next-line no-restricted-globals
self.onmessage = (e) => {
  const { depth, nodesPerLevel, startId } = e.data;
  const treeData = generateTreeData(depth, nodesPerLevel, startId);
  // 完成后将数据传回主线程
  // eslint-disable-next-line no-restricted-globals
  self.postMessage(treeData);
};
