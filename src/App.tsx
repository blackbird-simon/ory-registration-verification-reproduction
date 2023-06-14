import React, {useEffect} from 'react';
import './App.css';
import { useAuth } from "react-oidc-context";
import { AxiosError } from 'axios';
import {Configuration, FrontendApi} from "@ory/client";

function App() {
    const auth = useAuth();

    useEffect(() => {
      if (!auth.isLoading && !auth.isAuthenticated) {
        auth.signinRedirect({
          scope: "openid offline_access email",
          prompt: "login",
        })}
    }, [auth]);

    // End the Kratos session if we have a session with Hydra - so we are always
    // prompted to login.
    useEffect(() => {
        if (auth.isAuthenticated) {
            endKratosSession();
        }
    }, [auth])

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

const endKratosSession = async () => {
    const ory = new FrontendApi(
        new Configuration({
            baseOptions: {
                withCredentials: true,
            },
            basePath: 'http://localhost:4000',
        })
    );

    try {
        // end the ory session
        const { data: flow } = await ory.createBrowserLogoutFlow();
        await ory.updateLogoutFlow({
            token: flow.logout_token,
        });
    } catch (e) {
        if (isAxiosError(e) && e.response?.status === 401) {
            // There was no session on Ory to begin with, so we are definitely logged out.
            return;
        }
        throw e;
    }
};

const isAxiosError = (error: unknown): error is AxiosError => {
    return !!(error && (error as AxiosError).isAxiosError);
};

export default App;
