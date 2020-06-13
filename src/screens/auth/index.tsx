import * as AuthSession from "expo-auth-session";
import React, { useCallback, useState } from "react";
import { Button, View, Text } from 'react-native'

const requestTokenURL = "https://proxy.anxia.app/request-token";
const accessTokenURL = "https://proxy.anxia.app/access-token";

const redirect = AuthSession.makeRedirectUri();
console.log(`Callback URL: ${redirect}`);

export default function AuthScreen() {
  /* REDUX PLS */
  const [username, setUsername] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const onLogin = useCallback(async () => {
    setLoading(true);

    try {
      // Step #1 - first we need to fetch a request token to start the browser-based authentication flow
      const requestParams = toQueryString({ callback_url: redirect });
      const requestTokens = await fetch(
        requestTokenURL + requestParams
      ).then((res) => res.json());

      console.log("Request tokens fetched!", requestTokens);

      // Step #2 - after we received the request tokens, we can start the auth session flow using these tokens
      const authResponse = await AuthSession.startAsync({
        authUrl:
          "https://api.twitter.com/oauth/authenticate" +
          toQueryString(requestTokens),
      });

      console.log("Auth response received!", authResponse);
      
      // Validate if the auth session response is successful
      // Note, we still receive a `authResponse.type = 'success'`, thats why we need to check on the params itself
      if (authResponse.params && authResponse.params.denied) {
        return setError("AuthSession failed, user did not authorize the app");
      }

      // Step #3 - when the user (successfully) authorized the app, we will receive a verification code.
      // With this code we can request an access token and finish the auth flow.
      const accessParams = toQueryString({
        oauth_token: requestTokens.oauth_token,
        oauth_token_secret: requestTokens.oauth_token_secret,
        oauth_verifier: authResponse.params.oauth_verifier,
      });
      const accessTokens = await fetch(
        accessTokenURL + accessParams
      ).then((res) => res.json());

      console.log("Access tokens fetched!", accessTokens);

      // Now let's store the username in our state to render it.
      // You might want to store the `oauth_token` and `oauth_token_secret` for future use.
      setUsername(accessTokens.screen_name);
    } catch (error) {
      console.log("Something went wrong...", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={onLogin} title="Login with Twitter" />
    </View>
  )
}

/**
 * Converts an object to a query string.
 */
function toQueryString(params) {
  return (
    "?" +
    Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&")
  );
}
