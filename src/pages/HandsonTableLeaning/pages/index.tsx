// index
import React from 'react';
import { useImmer } from 'use-immer';

import './index.css';

interface IProps {}

interface IState {
}

const Index: React.FC<IProps> = () => {
  const [state, updateState] = useImmer<IState>({
  });

  return (
    <div className='hand-son-table'>1212</div>
  )
};

export default Index;
