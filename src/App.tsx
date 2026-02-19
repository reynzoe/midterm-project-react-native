import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { JobsProvider } from './context/JobsContext';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
    return (
        <ThemeProvider>
            <JobsProvider>
                <AppNavigator />
            </JobsProvider>
        </ThemeProvider>
    );
}
