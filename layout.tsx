import React, { ReactNode } from 'react';
import { AppProvider } from '@/contexts/appContext';

// Root Layout Component
export default async function RootLayout({ 
    children,
}: {
    children: ReactNode
}) {
    return (
        <html lang="en">
            <body>
                {/* Wrap the entire app with AppProvider */}
                <AppProvider>
                    {children}
                </AppProvider>
            </body>
        </html>
    );
}
