// TodoList.tsx
// 引入 React hooks 和 Redux hooks，以及类型定义和动作生成器
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from './types';
import { addTodo } from './actions';

// 定义 TodoList 组件，使用 hooks 管理状态和分发动作
const TodoList: React.FC = () => {
  const [value, setValue] = useState<string>(''); // 输入框的值
  const dispatch = useDispatch(); // 分发动作的方法
  const todos = useSelector((state: AppState) => state.todos); // 从 store 获取 todos

  // 处理提交事件，当用户点击按钮时执行
  const handleSubmit = () => {
    if (value !== '') {
      // 如果输入框不为空，分发 addTodo 动作，然后清空输入框
      dispatch(addTodo(value) as any);
      setValue('');
    }
  };

  return (
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={handleSubmit}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;