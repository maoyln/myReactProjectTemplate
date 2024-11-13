// 将树形结构转为分层数据并添加 colSpan 属性
export function transformTreeData(tree: any):any {
  const level1: any = [];
  const level2: any = [];
  const level3: any = [];

  tree.forEach((level1Node: any) => {
    // 处理一级节点
    level1.push({ label: level1Node.title, colspan: 2 });

    // 处理二级节点
    level1Node.children?.forEach((level2Node: any) => {
      level2.push({ label: level2Node.title, colspan: 2 });

      // 处理三级节点
      level2Node.children?.forEach((level3Node: any) => {
        level3.push({ label: level3Node.title, colspan: 1 });
      });
    });
  });

  return [level1, level2, level3];
}


// 转换树数据并填充缺失的节点
export function transformTreeData1(tree: any): any {
  const level1: any = [];
  const level2: any = [];
  const level3: any = [];

  tree.forEach((level1Node: any) => {
    // 如果一级节点没有子节点，colspan 设置为 1，否则为 2
    const level1Colspan = level1Node.children && level1Node.children.length > 0 ? 2 : 1;
    level1.push({ label: level1Node.title, colspan: level1Colspan });

    if (level1Node.children && level1Node.children.length > 0) {
      level1Node.children.forEach((level2Node: any) => {
        // 处理二级节点，默认设置 colspan 为 2
        level2.push({ label: level2Node.title, colspan: 2 });

        if (level2Node.children && level2Node.children.length > 0) {
          level2Node.children.forEach((level3Node: any) => {
            // 处理三级节点，设置 colspan 为 1
            level3.push({ label: level3Node.title, colspan: 1 });
          });
        } else {
          // 如果没有三级节点，则填充 null
          level3.push({ label: null, colspan: 1 });
        }
      });
    } else {
      // 如果没有二级节点和三级节点，则填充 null
      level2.push({ label: null, colspan: 1 });
      level3.push({ label: null, colspan: 1 });
    }
  });

  return [level1, level2, level3];
}

interface TreeNode {
  title: string;
  key: string;
  children?: TreeNode[];
  [key: string]: any; // 支持动态属性
}

export function transformTreeKeys(tree: TreeNode[], level=1): TreeNode[] {
  return tree.map(node => {
    // 深拷贝节点，防止修改原始数据
    const newNode = { ...node };
    newNode.level = level;
    // 如果存在 children，将其重命名为 __children，并递归处理其子节点
    if (newNode.children) {
      newNode.__children = transformTreeKeys(newNode.children, level + 1);
      delete newNode.children;
    }

    return newNode;
  });
}

export const isNotEmptyArray = (data: any) => {
  return Array.isArray(data) && data.length > 0;
};