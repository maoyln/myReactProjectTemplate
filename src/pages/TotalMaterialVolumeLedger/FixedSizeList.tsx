// TreeTable
import React, { FC, useEffect } from 'react';
import { Table } from 'antd';
import { useImmer } from 'use-immer';
import { VariableSizeList as List } from 'react-window';
import { findAllChildIds, addDefaultWidth, countNodes } from './components/utils';
import { DataNode, baseColumns, dynamicColumn, workingPointTree } from './components/generateMockData';
import styles from './components/TreeTable.module.css';

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

  const handleInit = () => {
    updateState((draft) => {
      draft.data = [];
      draft.expandedRowKeys = [];
      draft.columns = baseColumns;
      draft.loading = false;
    });
  };

  const handleExpand = (expanded: boolean, record: DataNode) => {
    if (expanded) {
      updateState((draft) => {
        draft.expandedRowKeys.push(record.key);
      });
    } else {
      updateState((draft) => {
        draft.expandedRowKeys = draft.expandedRowKeys.filter(key => key !== record.key);
      });
    }
  };

  const handleLoadData = async (workPointId: string) => {
    updateState((draft) => { draft.loading = true; });
    const currentWorkPoint: any = workingPointTree.filter(workPoint => workPoint.workPointId === workPointId);

    const ids = findAllChildIds(currentWorkPoint, currentWorkPoint[0]?.key);
    const newColumn: any = await handleDynamicColumn(currentWorkPoint[0]?.key);

    updateState((draft) => {
      draft.loading = false;
      draft.columns = newColumn;
      draft.data = currentWorkPoint;
      draft.expandedRowKeys = ids;
    });
  };

  const handleDynamicColumn = (key?: string) => {
    const currentDynamicColumn = dynamicColumn.filter(item => item.key === key);
    return [...baseColumns, ...addDefaultWidth(currentDynamicColumn)];
  };

  const getRowHeight = (index: number) => {
    return 35; // 可以根据需要动态调整高度
  };

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      <Table
        bordered
        dataSource={[state.data[index]]}
        columns={state.columns}
        pagination={false}
        expandable={{
          expandedRowKeys: state.expandedRowKeys,
          onExpand: handleExpand,
        }}
        rowKey="key"
        // showHeader={false} // 确保这里不显示表头
      />
    </div>
  );

  const VirtualizedTable: FC = () => (
    <List
      height={600}
      itemCount={state.data.length}
      itemSize={getRowHeight}
      width="100%"
    >
      {Row}
    </List>
  );

  return (
    <div className={styles['tree-table']}>
      {/* <Table
        bordered
        dataSource={[]}
        columns={state.columns}
        pagination={false}
        showHeader // 这里显示表头
        rowKey="key"
        // style={{ position: 'sticky', top: 0, zIndex: 1 }}
      /> */}
      <div style={{ height: '600px', overflowY: 'auto' }}>
        <VirtualizedTable />
      </div>
    </div>
  );
};

export default TreeTable;
