export const isArrayEmpty = (ary: any[]) => {
  // return ary && ary.length > 0 && typeof ary !== 'string';
  // 为了防止对mobx的数据判断错误这里加上toJS
  return (Array.isArray(ary) || Array.isArray(ary)) && ary.length > 0;
};