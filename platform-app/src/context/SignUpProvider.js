import React, { createContext, useContext, useState } from "react";

export const SignUpProviderContext = createContext();

export default function SignUpProvider({ children }) {
  const value = useState({});
  return (
    <SignUpProviderContext.Provider value={value}>
      {children}
    </SignUpProviderContext.Provider>
  );
}

export function useSignupState() {
  const context = useContext(SignUpProviderContext);
  if (!context) {
    throw new Error("useAppState must be used within the SignUpProvider");
  }
  return context;
}

