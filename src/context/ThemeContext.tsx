import React, { createContext, useState, ReactNode } from 'react';
import { lightColors, darkColors } from '../constants/colors';

interface ThemeContextType {
    isDark: boolean;
    toggleTheme: () => void;
    colors: typeof lightColors;
}

export const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [isDark, setIsDark] = useState(false);

    const toggleTheme = () => setIsDark(prev => !prev);

    const colors = isDark ? darkColors : lightColors;

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme, colors }}>
            {children}
        </ThemeContext.Provider>
    );
};
