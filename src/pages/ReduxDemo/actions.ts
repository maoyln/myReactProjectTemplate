import { Todo } from './types';

// 定义 ADD_TODO 常量，作为 action 类型
export const ADD_TODO = 'ADD_TODO';

// 定义 AddTodoAction 接口，描述 ADD_TODO 动作的结构
export interface AddTodoAction {
  type: typeof ADD_TODO;
  payload: { text: string };
}

// 创建 addTodo 动作生成器
export const addTodo = (text: string): AddTodoAction => ({
  type: ADD_TODO,
  payload: { text }, // 动作负载，包含要添加的待办事项的文本
});