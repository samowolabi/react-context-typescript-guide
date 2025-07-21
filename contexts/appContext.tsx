// AppContext.tsx - Complete React Context implementation with useReducer and TypeScript

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { ContextStateType, ContextActionTypes, ContextValueType } from './reducerTypes';
import { reducer, initialState } from './reducer';

// Create the context
const AppContext = createContext<ContextValueType | undefined>(undefined);

// Provider component props
interface AppProviderProps {
    children: ReactNode;
}

// Provider component
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

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

// Export the context for advanced use cases
export { AppContext };
