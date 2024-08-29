import localforage from 'localforage';

// 初始化 localForage 实例
const store = localforage.createInstance({
  name: 'MyAppStorage',
});

// 存储登录信息
store.setItem('user', {
  id: 1,
  username: 'JohnDoe',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
}).then(() => {
  console.log('User data saved.');
});

// 读取登录信息
store.getItem('user').then(user => {
  console.log('Retrieved user:', user);
});

// 删除登录信息
store.removeItem('user').then(() => {
  console.log('User data removed.');
});
