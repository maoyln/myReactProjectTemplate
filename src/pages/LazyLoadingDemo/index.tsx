import React, { Suspense } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import './index.css';

// 使用 React.lazy 实现懒加载
const HeroSection = React.lazy(() => import('./components/HeroSection'));
const NewsSection = React.lazy(() => import('./components/NewsSection'));
const ProductSection = React.lazy(() => import('./components/ProductSection'));
const ContactSection = React.lazy(() => import('./components/ContactSection'));

const App: React.FC = () => {
  return (
    <div>
      <Header />
      
      {/* 使用 Suspense 包裹懒加载的部分 */}
      <Suspense fallback={<div>Loading...</div>}>
        <HeroSection />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <NewsSection />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <ProductSection />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <ContactSection />
      </Suspense>

      <Footer />
    </div>
  );
};

export default App;
