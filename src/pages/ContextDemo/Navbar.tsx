import React, { useContext } from 'react';
import ThemeContext from './ThemeProvider'

const NavBar: React.FC<{}> = ({}) => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const styles = {
    padding: '10px 20px',
    backgroundColor: theme === 'light' ? '#00aaff' : '#001f3f',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };
  return (
    <nav style={styles}>
      <h1>我的应用</h1>
      <button onClick={toggleTheme} style={{ padding: '5px 10px', cursor: 'pointer' }}>
        切换到{theme === 'light' ? '深色' : '浅色'}模式
      </button>
    </nav>
  )
}

export default NavBar;