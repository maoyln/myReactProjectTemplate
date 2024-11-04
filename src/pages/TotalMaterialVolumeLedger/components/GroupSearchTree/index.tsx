// 可分组搜索的树GroupSearchTree
import React, { useEffect } from 'react';
import { Tree, Select, Empty } from 'antd';


import styles from './index.module.scss';

interface IOption {
  id: string;
  value: string;
}

interface IProps<T extends IOption, U> {
  searchKeys: string; // 当前选择下拉选
  selectedTreeKeys: string[]; // 当前选择树
  optionList: T[];
  treeList: U[];
  defaultExpandAll?: boolean; // 默认展开
  onOptionChange: (value: string) => void;
  onTreeSelectChange: (
    selectedKeys: string[],
    info: { node: U; selected: boolean }
  ) => void;
  style?: React.CSSProperties;
}

const Option = Select.Option;

const GroupSearchTree: <T extends IOption, U>(
  props: IProps<T, U>
) => JSX.Element = <T extends IOption, U>(props: IProps<T, U>) => {
  const {
    searchKeys,
    selectedTreeKeys,
    optionList,
    treeList,
    style,
    defaultExpandAll = false,
    onOptionChange,
    onTreeSelectChange,
  } = props;

  /**
   * 切换工区列表树
   * @param value 当前选中
   */
  const handleOptionChange = (value: string) => {
    onOptionChange?.(value);
  };

  /**
   * 过滤
   * @param inputValue 输入值
   * @param option  选项
   */
  function filterOption(inputValue: any, option: any) {
    return option.children.includes(inputValue);
  }

  /**
   * 变更工点
   * @param selectedKeys
   * @param info
   */
  const handleTreeSelectChange = (selectedKeys: any, info: any) => {
    if (info?.node?.isLeaf) {
      onTreeSelectChange?.(selectedKeys, info);
    }
  };

  /**
   * Tree自定义名称
   * @param node
   * @returns
   */
  const renderTitle = (node: any) => {
    if (node.isLeaf && !node.hasRelation) {
      return `${node.name}(未关联)`;
    }
    return node.name;
  };

  return (
    <div className={styles['group-search-tree']} style={style}>
      <div className={styles['group-search-tree-select']}>
        <Select
          showSearch
          style={{ width: '100%' }}
          value={searchKeys}
          placeholder="请选择"
          onChange={handleOptionChange}
          filterOption={filterOption}
        >
          {optionList.map((item) => (
            <Option key={item.id} value={item.id}>
              {item.value}
            </Option>
          ))}
        </Select>
      </div>
      <div className={styles['group-search-tree-tree']}>
          {/* <Tree
            treeData={treeList}
            selectedKeys={selectedTreeKeys}
            defaultExpandAll={defaultExpandAll}
            fieldNames={{ key: 'id', title: 'name' }}
            onSelect={handleTreeSelectChange}
            titleRender={renderTitle}
          /> */}
      </div>
    </div>
  );
};

export default GroupSearchTree;
