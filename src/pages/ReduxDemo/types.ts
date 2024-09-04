
// 定义一个Todo接口，叙述单个代办项的结构
export interface Todo {
  id: number;
  text: string;
}

// 定义整个应用状态的接口，这里只有一个 todos 属性
export interface AppState {
  todos: Todo[];
}

// 初始状态定义
export const initialState: AppState = {
  todos: [], // 初始状态下，没有待办事项
};