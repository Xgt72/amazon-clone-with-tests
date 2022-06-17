import { createContext, useReducer, useMemo } from "react";
import authReducer from "@reducers/authReducer";

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [auth, dispatch] = useReducer(authReducer, {});
  const authProviderValue = useMemo(
    () => ({ auth, dispatch }),
    [auth, dispatch]
  );
  return (
    <AuthContext.Provider value={authProviderValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
