// TotalMaterialVolumeLedger
import React, { useEffect } from 'react';
import { useImmer } from 'use-immer';


import TreeTable from './components/TreeTable';
import WorkingPoint from './components/WorkingPointList';
import styles from './index.module.css';

interface IProps {}

interface IState {
  isFold: boolean;
  workPointId: string | null;
}

const TotalMaterialVolumeLedger: React.FC<IProps> = (props) => {

  const [state, updateState] = useImmer<IState>({
    isFold: false,
    workPointId: null,
  });

  const handleChangeFold = (isFold: boolean): void => {
    updateState((draft) => {
      draft.isFold = isFold;
    });
  };

  const handleChangeWorkPoint = (value: string) => {
    updateState((draft) => {
      draft.workPointId = value;
    });
  };

  return (
    <div className={styles['total-material-volume-ledger']}>
      <TreeTable workPointId={state.workPointId} />
    </div>
  );
};

export default TotalMaterialVolumeLedger;
