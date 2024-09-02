import React, { useContext } from 'react';
import ThemeContext from './ThemeProvider'; 

const Content: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  const styles = {
    padding: '20px',
    backgroundColor: theme === 'light' ? '#f0f8ff' : '#0a0a0a',
    color: theme === 'light' ? '#000' : '#ddd',
    minHeight: 'calc(100vh - 120px)',
  };

  return (
    <main style={styles}>
      <h2>欢迎来到我的应用！</h2>
      <p>
        这是一个示例应用，展示了如何使用 React Context 进行主题切换。点击顶部导航栏中的按钮即可在浅色和深色模式之间切换。
      </p>
    </main>
  );
};

export default Content;