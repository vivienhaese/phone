import React, { useCallback, useState } from "react";
import { useMutation } from "@apollo/client";
import {
  Box,
  Button,
  Form,
  FormItem,
  Grid,
  Icon,
  SpinnerOutlined,
  TextFieldInput,
} from "@aircall/tractor";
import { AppContext } from "../context/context";
import { Types } from "../context/reducers";
import { Redirect } from "react-router";
import { CALLS_PATH } from "../App";
import { LOGIN } from "../model/gql";

function Login() {
  const { state, dispatch } = React.useContext(AppContext);
  const [login, { loading }] = useMutation(LOGIN, {
    onCompleted({ login }) {
      dispatch({ type: Types.SignIn, payload: {} });
    },
  });

  // Local state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Component events
  const onLoginClicked = useCallback(() => {
    // todo: add controls on username/password
    login({
      variables: { input: { username, password } },
    });
  }, [password, username, login]);

  // User authenticated, redirect to home page
  if (state.auth.authenticated) {
    return <Redirect to={{ pathname: CALLS_PATH }}></Redirect>;
  }

  return (
    <Box width="400px" mx="auto" mt="20vh">
      <Form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Grid gridColumnGap={4} gridRowGap={5} gridTemplateColumns="1fr">
          <FormItem label="Username" name="username">
            <TextFieldInput
              placeholder="john.doe@example.com"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </FormItem>
          <FormItem label="Password" name="password">
            <TextFieldInput
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </FormItem>
          <FormItem>
            {loading ? (
              <Button readOnly>
                <Icon component={SpinnerOutlined} spin /> Loading
              </Button>
            ) : (
              <Button
                disabled={!username.length || !password.length}
                onClick={onLoginClicked}
              >
                Log in
              </Button>
            )}
          </FormItem>
        </Grid>
      </Form>
    </Box>
  );
}

export default Login;
