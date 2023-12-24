import { SessionContextValue, useSession } from "next-auth/react";
import { createContext, useContext } from "react";

interface ContextValue {
  session: SessionContextValue;
  isAuthenticated: boolean;
}

const SessionContext = createContext<ContextValue | undefined>(undefined);

function SessionContextProvider({ children }: { children: React.ReactNode }) {
  const session = useSession();
  const isAuthenticated = session.status === "authenticated";
  return (
    <SessionContext.Provider value={{ session, isAuthenticated }}>
      {children}
    </SessionContext.Provider>
  );
}

function useSessionContext() {
  const context = useContext(SessionContext);
  if (context === undefined)
    throw new Error("SessionContext is used outside SessionContextProvider");
  return context;
}

export { SessionContextProvider, useSessionContext };
