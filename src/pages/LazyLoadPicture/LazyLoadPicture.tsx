import React, { useEffect, useRef } from "react";
import Loading from "./loading.png";

const LazyLoadImages: React.FC = () => {
  const imgRefs = useRef<HTMLImageElement[]>([]);

  const lazyLoad = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const winHeight = window.innerHeight;

    // 判断当前当前图片是否在可视区域
    imgRefs.current.forEach((img) => {
      if (img && img.offsetTop < scrollTop + winHeight) {
        setTimeout(() => {
          // 注意⚠️： 该定时器是模拟网络请求的消耗时间，实际操作的时候一定要去掉
          img.src = img.getAttribute("data-src") || "";
        }, 100);
      }
    });
  };

  /**
   * 初始化页面的时候在当前页面中的图片正常加载展示
   */
  const initializeLoad = () => {
    const winHeight = window.innerHeight;
    imgRefs.current.forEach((img) => {
      // 判断当前当前图片是否在可视区域
      if (img && img.offsetTop < winHeight) {
        img.src = img.getAttribute("data-src") || "";
      }
    });
  };

  useEffect(() => {
    // 添加滚动事件监听
    window.addEventListener("scroll", lazyLoad);

    // 初始加载在屏幕内的图像
    initializeLoad();

    // 组件卸载时移除事件监听
    return () => {
      window.removeEventListener("scroll", lazyLoad);
    };
  }, []);

  return (
    <div className="container">
      {Array.from({ length: 100 }, (_, index) => (
        <div key={index}>
          <img
            ref={(el) => (imgRefs.current[index] = el!)}
            src={Loading}
            data-src="https://cdn.jsdelivr.net/gh/maoyln/maoyl-img/blog/20200427163531.jpg"
            alt={`Lazy loaded ${index + 1}`}
          />
        </div>
      ))}
    </div>
  );
};

export default LazyLoadImages;
