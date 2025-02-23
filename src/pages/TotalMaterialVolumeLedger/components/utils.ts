import {
  DataNode,
  workingPointTree,
  workingPointList,
} from './generateMockData';

/**
 * 获取动态数据
 * @param key
 * @returns
 */
export const handleFetchData = (
  workingPointTree: any,
  key?: string
): Promise<DataNode> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentData = workingPointTree.find((item: any) => item.key === key);
      let data: DataNode | any = {
        ...workingPointList.find((item) => item.key === key),
      };
      if (currentData) {
        data = { ...currentData };
      }
      resolve(data);
    }, 500);
  });
};

/**
 * 根据节点 ID 查找其所有的子节点和孙节点的 ID
 * @param nodes - 树状数据节点
 * @param targetId - 要查找的节点 ID
 * @returns - 找到的所有子节点和孙节点的 ID
 */
export const findAllChildIds = (
  nodes: DataNode[],
  targetId: string
): string[] => {
  let result: string[] = [];

  const findChildren = (currentNodes: DataNode[]) => {
    for (const node of currentNodes) {
      if (node.key === targetId) {
        // 找到目标节点，收集所有孩子的 ID
        const collectIds = (childNodes: DataNode[]) => {
          for (const child of childNodes) {
            result.push(child.key);
            if (child.children) {
              collectIds(child.children); // 递归收集孙节点 ID
            }
          }
        };

        if (node.children) {
          collectIds(node.children);
        }
        return; // 找到目标后，退出循环
      }

      // 继续在子节点中查找
      if (node.children) {
        findChildren(node.children);
      }
    }
  };

  findChildren(nodes);
  return [targetId, ...result];
};

export const addDefaultWidth = (columns: any, defaultWidth = 90) => {
  return columns.map((column: any) => {
    const newColumn = {
      ...column,
      width: column.width || defaultWidth,
      ellipsis: true,
    };
    if (column.children) {
      newColumn.children = addDefaultWidth(column.children, defaultWidth);
    }
    return newColumn;
  });
};

/**
 * 递归函数获取树的所有节点个数
 * @param node 
 * @returns 
 */
export const countNodes = (node: any): number => {
  if (!node) {
    return 0; // 如果节点不存在，返回 0
  }

  // 计算当前节点加上所有子节点的数量
  let count = 1; // 当前节点计数
  if (node.children) {
    // 如果有子节点，递归计数
    for (const child of node.children) {
      count += countNodes(child); // 递归调用
    }
  }

  return count; // 返回总计数
};