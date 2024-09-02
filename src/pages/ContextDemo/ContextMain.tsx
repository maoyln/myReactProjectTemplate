import React from 'react';
import { ThemeProvider } from './ThemeProvider';
import Navbar from './Navbar';
import Content from './Content';
import Footer from './Footer';

const ContextMain: React.FC = () => {
  return (
    <ThemeProvider>
      <div>
        <Navbar />
        <Content />
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default ContextMain;
