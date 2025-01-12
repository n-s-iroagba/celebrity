import React, { createContext, useContext, useState } from 'react';

interface UserContextType {
  isSignedIn: boolean;
  setSignedIn: (status: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{children:any}>= ({ children }) => {
  const [isSignedIn, setSignedIn] = useState(false); // Default to guest

  return (
    <UserContext.Provider value={{ isSignedIn, setSignedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUserContext must be used within UserProvider');
  return context;
};
