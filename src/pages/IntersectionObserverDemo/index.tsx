import React from 'react';
import LazyComponent from './components/LazyComponent';
import Header from './components/Header';
import Footer from './components/Footer';

const IntersectionObserverDemo: React.FC = () => {
  return (
    <div>
      <Header />
      
      {/* 高度较大的页面内容，每个部分都使用LazyComponent进行懒加载 */}
      <div style={{ padding: '50px 0' }}>
        <LazyComponent
          imgSrc="https://cdn.jsdelivr.net/gh/maoyln/maoyl-img/blog/20200427163531.jpg"
          text="这是第一张图片的描述内容。"
        />
        <LazyComponent
          imgSrc="hhttps://cdn.jsdelivr.net/gh/maoyln/maoyl-img/blog/20220922171036.png"
          text="这是第二张图片的描述内容。"
        />
        <LazyComponent
          imgSrc="https://cdn.jsdelivr.net/gh/maoyln/maoyl-img/blog/20220921175727.png"
          text="这是第三张图片的描述内容。"
        />
        <LazyComponent
          imgSrc="https://cdn.jsdelivr.net/gh/maoyln/maoyl-img/blog/my-head.jpeg"
          text="这是第四张图片的描述内容。"
        />
      </div>

      <Footer />
    </div>
  );
};

export default IntersectionObserverDemo;
