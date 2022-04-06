import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest, exchangeCodeAsync } from 'expo-auth-session'
import { Button, Platform } from 'react-native'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

import { CLIENT_ID } from './src/auth/constants'
import { useLogin } from './src/auth/hooks'

const useProxy = Platform.select({ web: false, default: true })

WebBrowser.maybeCompleteAuthSession()

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://twitter.com/i/oauth2/authorize',
  tokenEndpoint: 'https://twitter.com/i/oauth2/token',
  revocationEndpoint: 'https://twitter.com/i/oauth2/revoke',
}

// const client = new TwitterApi({
//   clientId: 'KxDCEmHAzU6EwIxNDQ9mzrpKr',
//   clientSecret: 'CLloDlSIQ7m6g1GreWvsC7JKZsEwk3M4j3w3oW6lwuyd901MaC',
// })

const redirectUri = makeRedirectUri({ useProxy })

export default function App() {
  const { login, logout, loginReady, loggedIn } = useLogin()
  // const [request, response, promptAsync] = useAuthRequest(
  //   {
  //     clientId: CLIENT_ID,
  //     clientSecret: 'z6EeEp6858TSq11BazGSYWVNBo7ONK-Rd6qaBBZtrI_FLFAB9P',
  //     redirectUri,
  //     usePKCE: true,
  //     scopes: ['tweet.read'],
  //   },
  //   discovery,
  // )

  // const exchangeCode = React.useCallback(async (code) => {
  //   const result = await exchangeCodeAsync(
  //     {
  //       clientId: CLIENT_ID,
  //       code,
  //       redirectUri,
  //       clientSecret: '',
  //     },
  //     discovery,
  //   )
  // }, [])

  // React.useEffect(() => {
  //   console.log(response)

  //   if (response?.type === 'success') {
  //     const { code } = response.params
  //     const res = exchangeCode(code)
  //       .then((res) => console.log(res))
  //       .catch(console.error)
  //   }
  // }, [response, exchangeCode])

  return (
    <View style={styles.container}>
      <Button disabled={!loginReady} title="Login" onPress={login} />
    </View>
  )
}

// import React, { useCallback, useState } from 'react';
// import * as AuthSession from 'expo-auth-session';

// import { TwitterApi } from 'twitter-api-v2';

// // const requestTokenURL = 'http://localhost:3000/request-token';
// // const accessTokenURL = 'http://localhost:3000/access-token';

// // const redirect = AuthSession.makeRedirectUri();
// // // This is the callback or redirect URL you need to whitelist in your Twitter app
// // console.log(`Callback URL: ${redirect}`);

// const discovery = {
//   authorizationEndpoint: 'https://twitter.com/i/oauth2/authorize',
//   tokenEndpoint: 'https://twitter.com/i/oauth2/token',
//   revocationEndpoint: 'https://twitter.com/i/oauth2/revoke',
// };

// export default function App() {
//   const [username, setUsername] = useState();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState();

//   const [request, response, promptAsync] = AuthSession.useAuthRequest(
//     {
//       redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
//       usePKCE: true,
//       scopes: ['tweet.read'],
//     },
//     discovery
//   );

//   console.log('request', request);
//   console.log('response', response);

//   React.useEffect(() => {
//     if (response?.type === 'success') {
//       const { code } = response.params;
//     }
//   }, [response]);

//   const onLogout = useCallback(() => {
//     setUsername();
//     setLoading(false);
//     setError();
//   }, []);

//   // const onLogin = useCallback(async () => {
//   //   setLoading(true);

//   //   try {
//   //     // Step #1 - first we need to fetch a request token to start the browser-based authentication flow
//   //     const requestParams = toQueryString({ callback_url: redirect });
//   //     const requestTokens = await fetch(requestTokenURL + requestParams).then(
//   //       (res) => res.json()
//   //     );

//   //     console.log('Request tokens fetched!', requestTokens);

//   //     // Step #2 - after we received the request tokens, we can start the auth session flow using these tokens
//   //     const authResponse = await AuthSession.startAsync({
//   //       authUrl:
//   //         'https://api.twitter.com/oauth/authenticate' +
//   //         toQueryString(requestTokens),
//   //     });

//   //     console.log('Auth response received!', authResponse);

//   //     // Validate if the auth session response is successful
//   //     // Note, we still receive a `authResponse.type = 'success'`, thats why we need to check on the params itself
//   //     if (authResponse.params && authResponse.params.denied) {
//   //       return setError('AuthSession failed, user did not authorize the app');
//   //     }

//   //     // Step #3 - when the user (successfully) authorized the app, we will receive a verification code.
//   //     // With this code we can request an access token and finish the auth flow.
//   //     const accessParams = toQueryString({
//   //       oauth_token: requestTokens.oauth_token,
//   //       oauth_token_secret: requestTokens.oauth_token_secret,
//   //       oauth_verifier: authResponse.params.oauth_verifier,
//   //     });
//   //     const accessTokens = await fetch(accessTokenURL + accessParams).then(
//   //       (res) => res.json()
//   //     );

//   //     console.log('Access tokens fetched!', accessTokens);

//   //     // Now let's store the username in our state to render it.
//   //     // You might want to store the `oauth_token` and `oauth_token_secret` for future use.
//   //     setUsername(accessTokens.screen_name);
//   //   } catch (error) {
//   //     console.log('Something went wrong...', error);
//   //     setError(error.message);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // }, []);

//   return (
//     <View style={styles.container}>
//       {username !== undefined ? (
//         <View>
//           <Text style={styles.title}>Hi {username}!</Text>
//           <Button title="Logout to try again" onPress={onLogout} />
//         </View>
//       ) : (
//         <View>
//           <Text style={styles.title}>Example: Twitter login</Text>
//           <Button
//             title="Login with Twitter"
//             onPress={() => {
//               promptAsync({ useProxy: true });
//             }}
//           />
//         </View>
//       )}

//       {error !== undefined && <Text style={styles.error}>Error: {error}</Text>}

//       {loading && (
//         <View style={[StyleSheet.absoluteFill, styles.loading]}>
//           <ActivityIndicator color="#fff" size="large" animating />
//         </View>
//       )}
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 40,
  },
  error: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
});

// /**
//  * Converts an object to a query string.
//  */
// function toQueryString(params) {
//   return (
//     '?' +
//     Object.entries(params)
//       .map(
//         ([key, value]) =>
//           `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
//       )
//       .join('&')
//   );
// }
