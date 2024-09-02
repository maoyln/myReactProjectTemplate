import React, { useContext } from 'react';
import ThemeContext from './ThemeProvider';

const Footer: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  const styles = {
    padding: '10px 20px',
    backgroundColor: theme === 'light' ? '#00aaff' : '#001f3f',
    color: '#fff',
    textAlign: 'center' as const,
  };

  return <footer style={styles}>© 2023 我的应用</footer>;
};

export default Footer;
