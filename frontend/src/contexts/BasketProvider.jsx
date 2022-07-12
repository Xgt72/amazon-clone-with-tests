import { createContext, useReducer, useMemo } from "react";
import basketReducer from "@reducers/basketReducer";

const BasketContext = createContext({});

export const BasketContextProvider = ({ children }) => {
  const [basket, dispatch] = useReducer(basketReducer, {});
  const basketProviderValue = useMemo(
    () => ({ basket, dispatch }),
    [basket, dispatch]
  );
  return (
    <BasketContext.Provider value={basketProviderValue}>
      {children}
    </BasketContext.Provider>
  );
};

export default BasketContext;
