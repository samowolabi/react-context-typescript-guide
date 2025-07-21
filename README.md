# Mastering State with React Context, useReducer, and TypeScript

This repository contains the source code for the article **"Don't Reach for Redux Just Yet: Mastering State with React Context, useReducer, and TypeScript"** by Samuel Owolabi.

It serves as a practical, real-world example of how to build a scalable and type-safe state management solution in a React (or Next.js) application without external libraries like Redux or Zustand.

## ✨ Features

- **Type-Safe State Management**: Leverages TypeScript's power to ensure all state transitions are safe and predictable.
- **Centralized Logic with useReducer**: Manages complex state logic in a single, organized reducer function.
- **Global State with useContext**: Provides a clean API to access and modify state from any component in the tree.
- **Discriminated Unions for Actions**: Offers superior autocompletion and compile-time safety for dispatching actions.
- **Custom Hook (useAppContext)**: A best-practice approach for consuming the context.
- **State Persistence**: Includes a bonus implementation that persists state to localStorage on refresh.

## 📂 Project Structure

The core logic is organized within the `/contexts` directory for clear separation of concerns.

```
/
|-- /app
|   |-- layout.tsx          # App wrapped with the AppProvider
|   |-- usage-examples.tsx  # Component demonstrating usage
|
|-- /contexts
|   |-- appContext.tsx      # The main context provider (no persistence)
|   |-- appContextWithPersistence.tsx # (Bonus) Provider with localStorage
|   |-- reducer.tsx         # The reducer function and initial state
|   |-- reducerTypes.tsx    # All TypeScript types and interfaces
```

## 🚀 Getting Started

### Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/react-context-typescript-guide.git
```

### Navigate to the project directory:
```bash
cd react-context-typescript-guide
```

### Install dependencies:
```bash
npm install
# or
yarn install
```

### Run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 💡 How to Use

### 1. Wrap Your Application

Wrap your root layout or main App component with the `AppProvider`.

**`app/layout.tsx`**
```typescript
import { AppProvider } from '@/contexts/appContext';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <AppProvider>
                    {children}
                </AppProvider>
            </body>
        </html>
    );
}
```

> **Note:** To enable persistence, import `AppProvider` from `appContextWithPersistence.tsx` instead.

### 2. Access State and Dispatch Actions

In any child component, use the `useAppContext` custom hook to access the global state and the dispatch function.

**`app/usage-examples.tsx`**
```typescript
import { useAppContext } from '@/contexts/appContext';

const MyComponent = () => {
    // 1. Consume the context
    const { state, dispatch } = useAppContext();

    // 2. Read from the state
    const { theme, userData } = state;
    const isLoggedIn = userData.email !== '';

    // 3. Dispatch actions to update the state
    const handleLogin = () => {
        dispatch({
            type: 'LOGIN_USER',
            payload: {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com'
            }
        });
    };

    const handleThemeToggle = () => {
        dispatch({
            type: 'SET_THEME',
            payload: theme === 'light' ? 'dark' : 'light'
        });
    };

    return (
        <div>
            <h2>Current Theme: {theme}</h2>
            <p>Welcome, {isLoggedIn ? userData.firstName : 'Guest'}</p>
            <button onClick={handleThemeToggle}>Toggle Theme</button>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};
```

## 📋 Available Actions

The state management system supports the following actions:

| Action | Purpose | Payload |
|--------|---------|---------|
| `SET_THEME` | Toggle between light/dark theme | `'light' \| 'dark'` |
| `SET_SELECTED_CURRENCY` | Change selected currency | `string` |
| `LOGIN_USER` | Set user authentication data | `UserData object` |
| `SET_TOKEN` | Set authentication token | `string` |
| `LOGOUT_USER` | Clear user data and token | No payload |
| `SET_WALLETS` | Replace all wallets | `WalletType[]` |
| `ADD_WALLET` | Add a new wallet | `WalletType` |
| `UPDATE_WALLET` | Update existing wallet | `Wallet update object` |
| `REMOVE_WALLET` | Remove wallet by currency | `string` |

## 🔧 State Structure

```typescript
type ContextStateType = {
    theme: 'light' | 'dark';
    selectedCurrency: string;
    userData: {
        firstName: string;
        lastName: string;
        email: string;
    };
    token: string;
    wallets: WalletType[];
}
```

## 🎯 Key Benefits

- ✅ **No External Dependencies**: Uses only React built-ins
- ✅ **Type Safety**: Full TypeScript coverage with discriminated unions
- ✅ **Predictable State Updates**: All changes go through the reducer
- ✅ **Scalable Architecture**: Easy to extend and maintain
- ✅ **Great DX**: Excellent autocomplete and error catching

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

**Created by Samuel Owolabi**# react-context-typescript-guide
