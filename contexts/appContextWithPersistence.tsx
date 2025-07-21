// appContextWithPersistence.tsx - React Context with localStorage persistence

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { ContextStateType, ContextActionTypes, ContextValueType } from '@/reducerTypes';
import { reducer, initialState } from '@/reducer';

// Create the context
const AppContext = createContext<ContextValueType | undefined>(undefined);

// Provider component props
interface AppProviderProps {
    children: ReactNode;
}

// Keys for localStorage
const STORAGE_KEYS = {
    theme: 'app_theme',
    selectedCurrency: 'app_selectedCurrency',
    userData: 'app_userData',
    wallets: 'app_wallets'
};

// Helper function to get initial state from localStorage
const getPersistedState = (): ContextStateType => {
    if (typeof window === 'undefined') {
        // Server-side rendering - return default state
        return initialState;
    }

    try {
        // Get persisted values from localStorage
        const theme = localStorage.getItem(STORAGE_KEYS.theme) as 'light' | 'dark' || initialState.theme;
        const selectedCurrency = localStorage.getItem(STORAGE_KEYS.selectedCurrency) || initialState.selectedCurrency;
        const userData = JSON.parse(localStorage.getItem(STORAGE_KEYS.userData) || 'null') || initialState.userData;
        const wallets = JSON.parse(localStorage.getItem(STORAGE_KEYS.wallets) || 'null') || initialState.wallets;

        return {
            theme,
            selectedCurrency,
            userData,
            token: initialState.token, // Always use initial state for token
            wallets
        };
    } catch (error) {
        console.error('Error loading persisted state:', error);
        return initialState;
    }
};

// Helper function to save state to localStorage
const saveToStorage = (state: ContextStateType) => {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem(STORAGE_KEYS.theme, state.theme);
        localStorage.setItem(STORAGE_KEYS.selectedCurrency, state.selectedCurrency);
        localStorage.setItem(STORAGE_KEYS.userData, JSON.stringify(state.userData));
        localStorage.setItem(STORAGE_KEYS.wallets, JSON.stringify(state.wallets));
    } catch (error) {
        console.error('Error saving state to localStorage:', error);
    }
};

// Provider component with persistence
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState, getPersistedState);

    // Save state to localStorage whenever it changes
    useEffect(() => {
        saveToStorage(state);
    }, [state]);

    const value: ContextValueType = {
        state,
        dispatch
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

// Custom hook to use the context
export const useAppContext = (): ContextValueType => {
    const context = useContext(AppContext);
    
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    
    return context;
};

// Utility function to clear all persisted data
export const clearPersistedData = () => {
    if (typeof window === 'undefined') return;
    
    Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
    });
};

// Export the context for advanced use cases
export { AppContext };
