import React, { useEffect, useRef, useState } from 'react';
import './LazyComponent.css';  // 添加渐变动画的CSS样式

interface LazyComponentProps {
  imgSrc: string;
  text: string;
}

const LazyComponent: React.FC<LazyComponentProps> = ({ imgSrc, text }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true); // 当组件进入视口时触发
            observer.unobserve(entry.target); // 加载后不再观察该元素
          }
        });
      },
      {
        threshold: 0.1, // 只有10%进入视口时触发
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div className={`lazy-component ${isVisible ? 'visible' : ''}`} ref={ref}>
      <img src={imgSrc} alt="Lazy loaded content" />
      <p>{text}</p>
    </div>
  );
};

export default LazyComponent;
