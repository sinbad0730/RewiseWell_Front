'use client'
import { createContext, ReactNode, useContext, useState } from "react";
interface GlobalProviderProps {
    children: ReactNode;
  }

const GlobalContext = createContext<any>({});


export const GlobalProvider = ({ children }: GlobalProviderProps) => {
    const [loading, setLoading] = useState(false);
    return (
        <GlobalContext.Provider value={{ loading, setLoading  }}>
          {children}
        </GlobalContext.Provider>
      );
}

export const useGlobalContext = () => useContext(GlobalContext);