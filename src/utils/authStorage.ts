
// authStorage.ts
import localforage from 'localforage';

// 初始化localForage实例，命名空间为'auth'
const authStorage = localforage.createInstance({
  name: 'auth',
});

/**
 * 保存token到localForage
 * @param {string} token - 用户的token字符串
 */
const saveStorage = async ({key, value}: {key: string; value: any}): Promise<void> => {
  console.log('保存key=>', key);
  console.log('保存value=>', value);
  await authStorage.setItem(key, value);
};

/**
 * 获取token从localForage
 * @returns {Promise<string>} - 返回token字符串
 */
const getStorageValue = async (key: string): Promise<any> => {
  return await authStorage.getItem(key);
};

/**
 * 删除token
 */
const removeStorage = async (key: string): Promise<any> => {
  return await authStorage.removeItem(key);

}

// 导出函数
export { saveStorage, getStorageValue, removeStorage};
