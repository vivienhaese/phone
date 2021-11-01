import type { ActionMap } from "./context";

export enum Types {
  SignIn = "SIGN_IN",
  SignOut = "SIGN_OUT",
}

// Auth state definition
export type AuthType = {
  authenticated: boolean;
};

// Auth state initial value
export const authInitialState: AuthType = {
  // todo: check if token has expired
  authenticated: false,
};

// Auth state available dispatch methods
type AuthPayload = {
  [Types.SignIn]: {};
  [Types.SignOut]: {};
};
export type AuthActions = ActionMap<AuthPayload>[keyof ActionMap<AuthPayload>];

// ... finally, auth reducer !
export const authReducer = (state: AuthType, action: AuthActions): AuthType => {
  switch (action.type) {
    case Types.SignIn:
      return Object.assign({}, state, {
        authenticated: true,
      });
    case Types.SignOut:
      return Object.assign({}, state, {
        authenticated: false,
      });
    default:
      return state;
  }
};
