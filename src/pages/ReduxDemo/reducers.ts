import { ADD_TODO, AddTodoAction, addTodo } from './actions';
import { AppState, Todo,  } from './types';
import { combineReducers } from 'redux';

const todosReducer = (state: AppState['todos'] = [], action: AddTodoAction): Todo[] => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, {id: state.length, text: action.payload.text}];
    default:
      return state;
  }
}

// 使用 combineReducers 将 todos 减化器组合成根减化器
const rootReducer = combineReducers({
  todos: todosReducer,
});

// 导出根减化器
export default rootReducer;