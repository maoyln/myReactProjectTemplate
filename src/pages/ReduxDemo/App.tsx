// 引入 React 和 Provider 组件，以及 store 和 TodoList 组件
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import TodoList from './TodoList';

// 定义 App 组件，使用 Provider 包装整个应用，使其可以访问 store
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
};

// 导出 App 组件
export default App;
