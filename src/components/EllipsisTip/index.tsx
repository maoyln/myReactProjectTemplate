import React, { useEffect } from 'react';
import { throttle } from 'lodash';
import { useSetState } from 'ahooks';

import './index.css';

interface IProps {
  className?: string;
  tipStyle?: React.CSSProperties;
}
interface IState {
  text: string | null;
  isOpen: boolean;
  style: React.CSSProperties;
}

const EllipsisTip: React.FC<IProps> = ({ className, tipStyle }) => {
  const [state, setState] = useSetState<IState>({
    text: null,
    isOpen: false,
    style: {},
  });

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', mouseleave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', mouseleave);
    };
  }, []);
  // 鼠标事件处理程序
  const mouseMove = (e: MouseEvent | any) => {
    // 获取事件目标元素的 innerHTML 和 innerText 属性
    const innerHTML = e.target?.['innerHTML'] || '';
    const innerText = e.target?.['innerText'];

    // 检查 innerText 是否为字符串且 innerHTML 不是 HTML 标签
    if (innerText && typeof innerText === 'string' && !isHtmlTag(innerHTML)) {
      // 获取 clientWidth、scrollWidth、clientHeight 和 scrollHeight 属性的值
      const clientWidth = e.target?.['clientWidth'] || 0;
      const scrollWidth = e.target?.['scrollWidth'] || 0;
      const clientHeight = e.target?.['clientHeight'] || 0;
      const scrollHeight = e.target?.['scrollHeight'] || 0;

      // 如果 scrollWidth 或 scrollHeight 大于 clientWidth 或 clientHeight
      if (scrollWidth > clientWidth || scrollHeight - clientHeight > 10) {
        // 输出事件目标元素的信息
        console.dir(e.target);
        // 计数器
        console.count('handleMouseMove');
        // 输出事件目标元素的信息
        console.dir(e.target);
        // 输出 innerText、scrollWidth、clientWidth、e.clientX 和 e.clientY 的值
        console.log('innerText', innerText, scrollWidth, clientWidth, e.clientX, e.clientY);
        const style = componentOffset(e.clientX, e.clientY);
        // 更新组件状态，显示相关信息
        setState({ text: innerText, isOpen: true, style });
      } else {
        // 更新组件状态，隐藏相关信息
        setState({ text: null, isOpen: false, style: {} });
      }
    } else {
      // 更新组件状态，隐藏相关信息
      setState({ text: null, isOpen: false, style: {} });
    }
  };

  const componentOffset = (clientX: number, clientY: number) => {
    const { clientWidth, clientHeight } = document.body;
    let left, top, right, bottom;

    const x = clientWidth - clientX - 310;
    const y = clientHeight - clientY - 300;
    x > 0 ? (left = clientX + 10) : (right = clientWidth - clientX + 10);
    y > 0 ? (top = clientY + 10) : (bottom = clientHeight - clientY + 10);
    return { left, top, right, bottom } as React.CSSProperties;
  };

  const throttledFunction = throttle(mouseMove, 50);
  const handleMouseMove = (e: MouseEvent) => {
    throttledFunction(e);
  };

  // 定义一个名为isHtmlTag的函数，该函数接受一个字符串作为参数
  const isHtmlTag = (str: string) => {
    // 返回一个布尔值，判断输入的字符串是否类似HTML标签的格式
    return (
      // 检查字符串是否以"<"开头，并且以">"结尾
      str.startsWith('<') &&
      str.endsWith('>') &&
      // 检查字符串中间部分是否包含">"或"</"
      (str.slice(1, -1).includes('>') || str.slice(1, -1).includes('</'))
    );
  };
  const mouseleave = () => {
    setState({ text: null, isOpen: false, style: {} });
  };
  return (
    state.isOpen ? (
      <div className={`ellipsis-tip-target ${className}`} style={{ ...tipStyle, ...state.style }}>
        {state.text}
      </div>
    ) : null
  );
};

export default EllipsisTip;
