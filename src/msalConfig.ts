import { Configuration, PopupRequest } from "@azure/msal-browser";

const msalConfig: Configuration = {
  auth: {
    clientId: "533a1bd8-efe8-4b53-a731-b463dc3ebc7b",
    authority: "https://login.microsoftonline.com/f8cdef31-a31e-4b4a-93e4-5f571e91255a",
    redirectUri: "http://localhost:3000/auth/callback",
  },
};

export const loginRequest: PopupRequest = {
  scopes: ["openid", "profile", "email"],
};

export default msalConfig;
