// 引入 React 和 Provider 组件，以及 store 和 TodoList 组件
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import TodoList from './TodoList';

// 定义 ReduxDemo 组件，使用 Provider 包装整个应用，使其可以访问 store
const ReduxDemo: React.FC = () => {
  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
};

// 导出 ReduxDemo 组件
export default ReduxDemo;
