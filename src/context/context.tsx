import React, { createContext, useReducer, Dispatch } from "react";
import { authReducer, AuthActions, authInitialState } from "./reducers";
import type { AuthType } from "./reducers";
export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

// Two contexts (states management) available
type InitialStateType = {
  auth: AuthType; // User, conf, etc...
};

// Configure an initial state to easily onboard new users
const initialState: InitialStateType = {
  auth: authInitialState,
};

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<AuthActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Main reducer contains the two contexts
const mainReducer = ({ auth }: InitialStateType, action: AuthActions) => {
  return {
    auth: authReducer(auth, action),
  };
};

// This component will wrap the entire app, to distribute the context in every child components
const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
