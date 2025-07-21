import { ContextStateType, ContextActionTypes, ReducerType } from './reducerTypes';

// Initial state for the reducer
export const initialState: ContextStateType = {
    theme: 'light',
    selectedCurrency: 'USD',
    userData: {
        firstName: '',
        lastName: '',
        email: ''
    },
    token: '',
    wallets: []
};

export const reducer: ReducerType = (state: ContextStateType, action: ContextActionTypes): ContextStateType => {
    switch (action.type) {
        case 'SET_THEME':
            return {
                ...state,
                theme: action.payload
            };

        case 'SET_SELECTED_CURRENCY':
            return {
                ...state,
                selectedCurrency: action.payload
            };

        case 'LOGIN_USER':
            return {
                ...state,
                userData: action.payload
            };

        case 'SET_TOKEN':
            return {
                ...state,
                token: action.payload
            };

        case 'LOGOUT_USER':
            return {
                ...state,
                userData: {
                    firstName: '',
                    lastName: '',
                    email: ''
                },
                token: ''
            };

        case 'SET_WALLETS':
            return {
                ...state,
                wallets: action.payload
            };

        case 'UPDATE_WALLET':
            return {
                ...state,
                wallets: state.wallets.map(wallet =>
                    wallet.currency === action.payload.currency
                        ? { ...wallet, ...action.payload }
                        : wallet
                )
            };

        case 'ADD_WALLET':
            // Check if wallet already exists
            const walletExists = state.wallets.some(wallet => wallet.currency === action.payload.currency);
            if (walletExists) {
                // If wallet exists, update it instead of adding a duplicate
                return {
                    ...state,
                    wallets: state.wallets.map(wallet =>
                        wallet.currency === action.payload.currency
                            ? action.payload
                            : wallet
                    )
                };
            }
            // Add new wallet
            return {
                ...state,
                wallets: [...state.wallets, action.payload]
            };

        case 'REMOVE_WALLET':
            return {
                ...state,
                wallets: state.wallets.filter(wallet => wallet.currency !== action.payload)
            };

        default:
            // TypeScript will ensure this is never reached with proper action types
            return state;
    }
};
