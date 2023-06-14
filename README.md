# Ory Registration Verification Example

This is a quick react client to demonstrate a bug with the Ory
Network.

## To Run

Firstly you'll need to setup the Ory tunnel. 

```bash
ORY_PROJECT_SLUG=vigorous-colden-7ny5zqli19 npx @ory/cli tunnel --dev http://localhost:3000
```

In another terminal window start the react development server

```bash
npm start
```

Now open a browser to http://localhost:3000 you will be prompted to sign(in/up).

If you register a new account you will be successfully logged in, despite the Ory
project not being configured to allow "Sign in after Registration".

If you sign out and login again with the account you just created you'll be prompted
to go through the email verification flow with your account.
