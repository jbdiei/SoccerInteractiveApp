import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type DarkModeContextType = { dark: boolean; toggle: () => void };

export const DarkModeContext = createContext<DarkModeContextType>({
  dark: false,
  toggle: () => {},
});

interface DarkModeProviderProps {
  children: ReactNode;
}

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({ children }) => {
  const [dark, setDark] = useState(false);
  const toggle = () => setDark(d => !d);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <DarkModeContext.Provider value={{ dark, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
};
