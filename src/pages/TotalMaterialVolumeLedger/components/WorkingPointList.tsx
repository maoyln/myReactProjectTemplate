// WorkingPointList
import React, { useEffect } from 'react';
import { useImmer } from 'use-immer';

// import { isNotEmptyArray } from '@/utils';

import { treeData } from './generateMockData';
import GroupSearchTree from './GroupSearchTree';
import styles from './WorkingPointList.module.css';

interface IProps<T, U> {
  onChange: (value: string) => void;
}

interface IState {
  searchKeys: string; // 当前选择下拉选
  selectedTreeKeys: string[]; // 当前选择树
  optionList: { id: string; value: string }[];
  treeList: any[];
  filterTreeList: any[];
}

const optionList: { id: string; value: string }[] = [
  { id: 'all', value: '全部工区' },
  { id: '446366804109107200', value: '工区1' },
  { id: '492635456253501440', value: '工区2' },
  { id: '501797071508389888', value: '工区3' },
  { id: '4', value: '4' },
];

const WorkingPointList: <U, T>(props: IProps<T, U>) => JSX.Element = <T, U>(
  props: IProps<T, U>
) => {
  const { onChange } = props;

  const [state, updateState] = useImmer<IState>({
    searchKeys: 'all',
    selectedTreeKeys: [], // 当前选择树
    optionList: optionList,
    treeList: treeData,
    filterTreeList: [],
  });

  // useEffect(() => {
  //   if (isNotEmptyArray(state.filterTreeList)) {
  //     const leafNodeKey = findFirstLeafId(state.filterTreeList, 'isLeaf', 'id');
  //     updateState((draft) => {
  //       draft.selectedTreeKeys = [leafNodeKey];
  //     });
  //   } else {
  //     updateState((draft) => {
  //       draft.selectedTreeKeys = [];
  //     });
  //   }
  // }, [state.filterTreeList]);

  // useEffect(() => {
  //   if (isNotEmptyArray(state.treeList) && state.searchKeys) {
  //     const newTree = filterNodesByWorkAreaId(state.treeList, state.searchKeys);
  //     updateState((draft) => {
  //       draft.filterTreeList = newTree;
  //     });
  //   }
  // }, [state.treeList, state.searchKeys]);

  useEffect(() => {
    onChange?.(state.selectedTreeKeys?.[0]);
  }, [state.selectedTreeKeys]);

  /**
   * 查找第一个叶子节点的函数
   * @param treeData 树节点
   * @param hasKey 关键字段
   * @param rnKey 返回的节点
   * @returns
   */
  const findFirstLeafId = (treeData: any, hasKey: any, rnKey: any) => {
    // for (const node of treeData) {
    //   if (node?.[hasKey] && node?.[rnKey]) {
    //     return node?.[rnKey];
    //   } else if (isNotEmptyArray(node.children)) {
    //     return findFirstLeafId(node.children, hasKey, rnKey);
    //   }
    // }
    return null;
  };

  /**
   * 切换工区列表树
   * @param value 当前选中
   */
  const handleOptionChange = (value: string) => {
    updateState((draft) => {
      draft.searchKeys = value;
    });
  };

  /**
   * 选择工点
   * @param value
   * @param info
   */
  const handleTreeSelectChange = (value: any, info: any) => {
    if (info.selected) {
      updateState((draft) => {
        draft.selectedTreeKeys = value;
      });
    }
  };

  function filterNodesByWorkAreaId(data: any, workAreaId: any) {
    // 递归函数，用于根据工区 ID 进行过滤
    // function filterNodes(node) {
    //   if (node?.isLeaf) {
    //     // 如果是叶子节点，检查工区 ID 是否匹配
    //     return node?.attributes?.workAreaId === workAreaId ? node : null;
    //   } else if (node?.children?.length > 0) {
    //     // 如果有子节点，递归过滤子节点
    //     const filteredChildren = node.children
    //       ?.map(filterNodes)
    //       ?.filter(Boolean);
    //     if (filteredChildren?.length > 0) {
    //       // 如果有符合条件的子节点，则保留该节点并更新子节点
    //       return { ...node, children: filteredChildren };
    //     }
    //   }
    //   // 如果不是叶子节点，且没有符合条件的子节点，返回 null
    //   return null;
    // }

    // 如果未提供工区 ID，返回原始数据
    if (workAreaId === 'all') {
      return data;
    }

    // 深拷贝数据，避免修改原始数据
    // const filteredData = JSON.parse(JSON.stringify(data));

    // 对数据进行过滤，并移除空值
    // return filteredData.map(filterNodes).filter(Boolean);
  }

  return (
    <div className={styles['working-point-list']}>
      <GroupSearchTree
        searchKeys={state.searchKeys} // 当前选择下拉选
        selectedTreeKeys={state.selectedTreeKeys} // 当前选择树
        optionList={state.optionList}
        treeList={state.filterTreeList}
        defaultExpandAll
        onOptionChange={handleOptionChange}
        onTreeSelectChange={handleTreeSelectChange}
      />
    </div>
  );
};

export default WorkingPointList;
