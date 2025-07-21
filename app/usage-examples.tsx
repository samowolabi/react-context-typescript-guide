// app/usage-examples.tsx - Code snippets demonstrating each action usage

import React from 'react';
import { useAppContext } from '@/contexts/appContext';

export const UsageExamples = () => {
    const { state, dispatch } = useAppContext();

    // ======================
    // ACCESSING STATE DATA
    // ======================
    
    // Get current theme
    const currentTheme = state.theme; // 'light' | 'dark'
    
    // Get selected currency
    const selectedCurrency = state.selectedCurrency; // string
    
    // Get user data
    const userData = state.userData; // { firstName, lastName, email }
    const userFirstName = state.userData.firstName;
    const userEmail = state.userData.email;
    
    // Get authentication token
    const authToken = state.token; // string
    
    // Get all wallets
    const allWallets = state.wallets; // WalletType[]
    const walletCount = state.wallets.length;
    
    // Find specific wallet
    const usdWallet = state.wallets.find(wallet => wallet.currency === 'USD');
    const btcWallet = state.wallets.find(wallet => wallet.currency === 'BTC');
    
    // Get wallet balances
    const totalAvailableBalance = state.wallets.reduce(
        (total, wallet) => total + wallet.availableBalance, 0
    );
    
    // Check if user is logged in
    const isLoggedIn = state.userData.email !== '';
    const hasAuthToken = state.token !== '';
    
    // Check if specific wallet exists
    const hasUSDWallet = state.wallets.some(wallet => wallet.currency === 'USD');

    // ======================
    // THEME ACTIONS
    // ======================
    
    // SET_THEME - Toggle between light and dark theme
    const toggleTheme = () => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        dispatch({
            type: 'SET_THEME',
            payload: newTheme
        });
    };

    // ======================
    // CURRENCY ACTIONS
    // ======================
    
    // SET_SELECTED_CURRENCY - Change the selected currency
    const changeCurrency = (currency: string) => {
        dispatch({
            type: 'SET_SELECTED_CURRENCY',
            payload: currency
        });
    };

    // ======================
    // USER AUTHENTICATION ACTIONS
    // ======================
    
    // LOGIN_USER - Set user data when logging in
    const loginUser = () => {
        dispatch({
            type: 'LOGIN_USER',
            payload: {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com'
            }
        });
    };

    // SET_TOKEN - Set authentication token
    const setAuthToken = () => {
        dispatch({
            type: 'SET_TOKEN',
            payload: 'jwt-token-12345'
        });
    };

    // LOGOUT_USER - Clear user data and token
    const logoutUser = () => {
        dispatch({
            type: 'LOGOUT_USER'
        });
    };

    // ======================
    // WALLET ACTIONS
    // ======================
    
    // SET_WALLETS - Replace all wallets with new array
    const setWallets = () => {
        dispatch({
            type: 'SET_WALLETS',
            payload: [
                { currency: 'USD', availableBalance: 1000, pendingBalance: 50 },
                { currency: 'BTC', availableBalance: 0.5, pendingBalance: 0.01 }
            ]
        });
    };

    // ADD_WALLET - Add a new wallet
    const addWallet = () => {
        dispatch({
            type: 'ADD_WALLET',
            payload: {
                currency: 'ETH',
                availableBalance: 2.5,
                pendingBalance: 0.1
            }
        });
    };

    // UPDATE_WALLET - Update existing wallet balances
    const updateWallet = () => {
        dispatch({
            type: 'UPDATE_WALLET',
            payload: {
                currency: 'USD',
                availableBalance: 1500,
                pendingBalance: 75
            }
        });
    };

    // REMOVE_WALLET - Remove wallet by currency
    const removeWallet = () => {
        dispatch({
            type: 'REMOVE_WALLET',
            payload: 'BTC'
        });
    };

    // Component render is just for context - focus on the functions above
    return (
        <div>
            <h2>Usage Examples</h2>
            <p>Check the function implementations above for action usage patterns.</p>
        </div>
    );
};
