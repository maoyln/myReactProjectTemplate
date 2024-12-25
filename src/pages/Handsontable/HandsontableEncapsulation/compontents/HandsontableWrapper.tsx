import React, { useEffect, useState, useRef, useImperativeHandle, forwardRef } from "react";
import Handsontable from "handsontable";
import { HotTable } from "@handsontable/react";
import "handsontable/dist/handsontable.full.min.css";

/**
 * 测试二次封装的ref
 */

interface HandsontableWrapperProps {
  data: any[]; // 表格数据
  columns: Handsontable.ColumnSettings[]; // 列配置
  colHeaders: string[]; // 列标题
  rowHeaders?: boolean; // 是否显示行标题
  readOnly?: boolean; // 是否为只读模式
  nestedRows?: boolean; // 是否启用树状结构
  height?: number | string; // 表格高度
  width?: number | string; // 表格宽度
  licenseKey?: string; // Handsontable 许可证
}

export interface HandsontableWrapperRef {
  getData: () => any[]; // 获取表格数据
  setData: (newData: any[]) => void; // 更新表格数据
  getInstance: () => Handsontable | null; // 获取 Handsontable 实例
  hotInstance: Handsontable | null; // 直接暴露 Handsontable 实例
}

const HandsontableWrapper = forwardRef<HandsontableWrapperRef, HandsontableWrapperProps>(
  (
    {
      data,
      columns,
      colHeaders,
      rowHeaders = true,
      readOnly = false,
      nestedRows = false,
      height = 400,
      width = "100%",
      licenseKey = "non-commercial-and-evaluation",
    },
    ref
  ) => {
    const hotTableRef = useRef<HotTable>(null);
    const [hotInstance, setHotInstance] = useState<Handsontable | null>(null);

    // 在组件卸载时销毁 Handsontable 实例
    useEffect(() => {
      return () => {
        console.log(hotInstance, 'hotInstance', hotInstance?.isDestroyed);
        if (hotInstance && !hotInstance?.isDestroyed) {
          console.log('卸载');
          hotInstance?.destroy(); // 销毁 Handsontable 实例

          console.log(hotInstance?.isDestroyed, '卸载过后'); // 卸载之后不打印这里
        }
      };
    }, [hotInstance]); // 只有 hotInstance 变化时才会清理

    // 使用 useImperativeHandle 暴露方法给父组件
    useImperativeHandle(ref, () => ({
      getData: () => {
        return hotInstance?.getData() || [];
      },
      setData: (newData: any[]) => {
        hotInstance?.loadData(newData);
      },
      getInstance: () => hotInstance,
      hotInstance: hotInstance, // 直接暴露 hotInstance
    }));

    // afterInit 生命周期钩子确保 hotInstance 已经初始化
    const afterInit = () => {
      const instance = hotTableRef.current?.hotInstance;
      if (instance) {
        setHotInstance(instance); // 保存实例
      }
    };

    // 监听 hotTableRef 的变化，确保 hotInstance 在 HotTable 渲染后初始化
    useEffect(() => {
      if (hotTableRef.current) {
        const instance = hotTableRef.current.hotInstance;
        if (instance && !hotInstance) {
          setHotInstance(instance);
        }
      }
    }, [hotTableRef.current]); // 监听 hotTableRef.current 的变化

    return (
      <HotTable
        ref={hotTableRef}
        data={data}
        columns={columns}
        colHeaders={colHeaders}
        rowHeaders={rowHeaders}
        readOnly={readOnly}
        nestedRows={nestedRows}
        height={height}
        width={width}
        licenseKey={licenseKey}
        afterInit={afterInit} // 在初始化时获取 hotInstance
      />
    );
  }
);

export default HandsontableWrapper;
