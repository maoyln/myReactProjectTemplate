// TreeTable
import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useImmer } from 'use-immer';
import { VList } from 'virtuallist-antd';


import { findAllChildIds, addDefaultWidth } from './utils';
import {
  DataNode,
  baseColumns,
  dynamicColumn,
  workingPointTree,
} from './generateMockData';
import styles from './TreeTable.module.css';

interface IProps {
  workPointId: string | null;
}

interface IState {
  data: DataNode[];
  expandedRowKeys: string[];
  columns: any[];
  loading: boolean;
}


const TreeTable: React.FC<IProps> = (props) => {
  const { workPointId } = props;

  const [state, updateState] = useImmer<IState>({
    data: [],
    expandedRowKeys: [],
    columns: baseColumns,
    loading: false,
  });

  useEffect(() => {
    if (workPointId) {
      handleLoadData(workPointId);
    } else {
      handleInit();
    }
  }, [workPointId]);

  /**
   * 初始化数据表格
   */
  const handleInit = () => {
    updateState((draft) => {
      draft.data = [];
      draft.expandedRowKeys = [];
      draft.columns = baseColumns;
      draft.loading = false;
    });
  };

  /**
   * 展开折叠
   * @param expanded
   * @param record
   */
  const handleExpand = (expanded: boolean, record: DataNode) => {
    if (expanded) {
      updateState((draft) => {
        draft.expandedRowKeys = [...state.expandedRowKeys, record?.key];
      });
    } else {
      updateState((draft) => {
        draft.expandedRowKeys = state.expandedRowKeys.filter(
          (key) => key !== record.key
        );
      });
    }
  };

  /**
   * 数据结构处理
   * @param workPointId 工点Id
   */
  const handleLoadData = async (workPointId: string) => {
    updateState((draft) => {
      draft.loading = true;
    });
    const currentWorkPoint: any = workingPointTree
      .map((workPoint: DataNode) => {
        if (workPoint.workPointId === workPointId) {
          return workPoint;
        }
        return null;
      })
      .filter(Boolean);

    const ids = findAllChildIds(currentWorkPoint, currentWorkPoint?.[0]?.key);
    // 获取动态列
    const newColumn: any = await handleDynamicColumn(
      currentWorkPoint?.[0]?.key
    );

    updateState((draft) => {
      draft.loading = false;
      draft.columns = newColumn;
      draft.data = currentWorkPoint;
      draft.expandedRowKeys = ids;
    });
  };

  /**
   * 获取动态列
   * @param key
   */
  const handleDynamicColumn = (key?: string) => {
    const currentDynamicColumn = dynamicColumn.filter(
      (item) => item.key === key
    );
    // addDefaultWidth
    return [...baseColumns, ...addDefaultWidth(currentDynamicColumn)];
  };

  return (
    <div className={styles['tree-table']}>
      <Table
        dataSource={state.data}
        columns={state.columns as any[]}
        virtual
        rowKey="key"
        loading={state.loading}
        pagination={false}
        expandable={{
          expandedRowKeys: state.expandedRowKeys,
          onExpand: handleExpand,
        }}
        scroll={{ x: 200, y:  400}} // 根据需要设置宽度
      />
    </div>
  );
};

export default TreeTable;
