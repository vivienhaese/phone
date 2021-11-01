import React from "react";
import { Tractor } from "@aircall/tractor";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { AppContext } from "./context/context";

export const LOGIN_PATH = "/login";
export const CALLS_PATH = "/calls";

const PrivateRoute = ({ component, isAuthenticated, ...rest }: any) => {
  const routeComponent = (props: any) =>
    isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: LOGIN_PATH }} />
    );
  return <Route {...rest} render={routeComponent} />;
};

const App = () => {
  const { state } = React.useContext(AppContext);

  return (
    <Tractor injectStyle>
      <Switch>
        <Route exact path={LOGIN_PATH} component={Login}></Route>
        <PrivateRoute
          path={CALLS_PATH}
          isAuthenticated={state.auth.authenticated}
          component={Home}
        ></PrivateRoute>
        <Route render={() => <Redirect to={CALLS_PATH} />} />
      </Switch>
    </Tractor>
  );
};

export default App;
