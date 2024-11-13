// index
import React from 'react';
import { useImmer } from 'use-immer';
// import Learning from './compontents/01LearningStart'; // 开始
import Learning from './compontents/03LearningBindingData'; // 数据绑定

import './index.css';

interface IProps {}

interface IState {
}

const Index: React.FC<IProps> = () => {
  const [state, updateState] = useImmer<IState>({
  });

  return (
    <div className='hand-son-table'>
      <Learning />
    </div>
  )
};

export default Index;
