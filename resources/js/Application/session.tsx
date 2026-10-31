import React, { createContext, useContext } from 'react';

export interface SessionValue {
    auth: boolean;
    setAuth: (auth: boolean) => void;
}

const SessionContext = createContext<SessionValue | null>(null);

interface SessionProps {
    value: SessionValue;
    children: React.ReactNode;
}

export function SessionProvider({ value, children }: SessionProps) {
    return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionValue {
    const session = useContext(SessionContext);
    if (!session) {
        throw new Error('useSession must be used within a SessionProvider');
    }
    return session;
}
