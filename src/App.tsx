import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { JobsProvider, JobsContext } from './context/JobsContext';
import { ThemeProvider } from './context/ThemeContext';
import Toast from './components/Toast';

export default function App() {
    return (
        <ThemeProvider>
            <JobsProvider>
                <ToastWrapper>
                    <AppNavigator />
                </ToastWrapper>
            </JobsProvider>
        </ThemeProvider>
    );
}

function ToastWrapper({ children }: { children: React.ReactNode }) {
    const { toast } = React.useContext(JobsContext);
    return (
        <>
            {children}
            <Toast message={toast} />
        </>
    );
}
