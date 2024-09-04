// 引入 createStore 方法，用于创建 Redux store
import { createStore } from 'redux';
import rootReducer from './reducers'; // 引入根减化器

// 创建并导出 store，这是应用的单一数据源
const store = createStore(rootReducer);
export default store;