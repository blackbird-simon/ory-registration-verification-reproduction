import React, {useEffect} from 'react';
import './App.css';
import { useAuth } from "react-oidc-context";

function App() {
    const auth = useAuth();

    useEffect(() => {
      if (!auth.isLoading && !auth.isAuthenticated) {
        auth.signinRedirect({
          scope: "openid offline_access email",
          prompt: "login",
        })}
    }, [auth]);

    if (auth.isAuthenticated) {
      return <>
        <h1>Logged in as: {auth.user?.profile.sub}</h1>
        <p>Email: {auth.user?.profile.email}</p>
        <button onClick={() => auth.signoutRedirect({post_logout_redirect_uri: `${window.location.origin}/`})}>
          Logout
        </button>
      </>
    }

    return <p>Loading....</p>
}

export default App;
