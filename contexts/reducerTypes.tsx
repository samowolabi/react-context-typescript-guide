import { Dispatch } from 'react';

export type WalletType = {
    currency: string,
    availableBalance: number,
    pendingBalance: number,
}

export type ContextStateType = {
    theme: 'light' | 'dark',
    selectedCurrency: string,
    userData: {
        firstName: string,
        lastName: string,
        email: string
    },
    token: string, // For API Requests Authentication
    wallets: WalletType[]
}

// Now let's declare our action types
export type ContextActionTypes = (
    {
        type: 'SET_THEME',
        payload: ContextStateType['theme']
    } | {
        type: 'SET_SELECTED_CURRENCY',
        payload: ContextStateType['selectedCurrency']
    } | {
        type: 'LOGIN_USER',
        payload: ContextStateType['userData']
    } | {
        type: 'SET_TOKEN',
        payload: ContextStateType['token']
    } | {
        type: 'LOGOUT_USER'
    } | {
        type: 'SET_WALLETS',
        payload: ContextStateType['wallets']
    } | {
        type: 'UPDATE_WALLET',
        payload: {
            currency: WalletType['currency'],
            availableBalance: WalletType['availableBalance'],
            pendingBalance: WalletType['pendingBalance']
        }
    } | {
        type: 'ADD_WALLET',
        payload: WalletType
    } | {
        type: 'REMOVE_WALLET',
        payload: WalletType['currency']
    }
)

// Type for the reducer function
export type ReducerType = (
    state: ContextStateType,
    action: ContextActionTypes
) => ContextStateType


// Type for the context value that will be provided
export type ContextValueType = {
    state: ContextStateType;
    dispatch: Dispatch<ContextActionTypes>;
} 