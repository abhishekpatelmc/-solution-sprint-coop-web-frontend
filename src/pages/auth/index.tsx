import * as msal from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: "533a1bd8-efe8-4b53-a731-b463dc3ebc7b", // This is the ONLY mandatory field that you need to supply.
    authority:
      "https://login.microsoftonline.com/f8cdef31-a31e-4b4a-93e4-5f571e91255a", // Defaults to "https://login.microsoftonline.com/common"
    redirectUri: "/", // Points to window.location.origin. You must register this URI on Azure Portal/App Registration.
    postLogoutRedirectUri: "/login", // Indicates the page to navigate after logout.
    navigateToLoginRequestUrl: false, // If "true", will navigate back to the original request location before processing the auth code response.
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};
export const loginRequest = {
  scopes: ["openid", "profile", "email"],
};

export const apiRequest = {
  scopes: ["https://api-dev.roshalimaging.org/api/user_impersonation"],
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

export { msalInstance };
