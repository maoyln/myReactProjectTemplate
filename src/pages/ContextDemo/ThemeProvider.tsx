import React, { createContext, useState, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
// 定义主题类型
type Theme = 'light' | 'dark';

// 创建一个 Context 对象，默认值为 'light'
const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({
  theme: 'light', // 默认值
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<Props> = (props: Props) => {
  const { children } = props;
  const [theme, setTheme] = useState<Theme>('light');
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }
  return <ThemeContext.Provider value={{ theme, toggleTheme }}>
    {children}
  </ThemeContext.Provider>
}

export default ThemeContext