
export const msalConfig = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_MSAL_CLIENT_ID ?? '',
    authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_MSAL_TENANT_ID ?? ''}`,
    redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI ?? '',
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  }
};

export const loginRequest = {
  scopes: [
    `api://${process.env.NEXT_PUBLIC_MSAL_CLIENT_ID}/access_as_user`
  ]
};