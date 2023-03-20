import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "../../authConfig";
import Router from "next/router";

// JJ Code Start
import { useMsal } from "@azure/msal-react";

import { IPublicClientApplication } from "@azure/msal-browser";

export function signOutClickHandler(instance: IPublicClientApplication) {
  //Jaiman Code
  const msalInstance = new PublicClientApplication(msalConfig);

  const accounts = msalInstance.getAllAccounts();
  console.log("Account ::: ", accounts, accounts[0]?.homeAccountId);
  const homeAccID = accounts[0]?.homeAccountId;

  const logoutRequest = {
    account: instance.getAccountByHomeId(String(homeAccID)),
    postLogoutRedirectUri: "http://localhost:3000/",
  };
  instance.logoutPopup(logoutRequest);
}

export function signInClickHandler(instance: IPublicClientApplication): any {
  instance
    .loginPopup({
      scopes: ["User.Read"],
      authority: "https://login.microsoftonline.com/uwindsor.ca",
      prompt: "select_account",
      loginHint: "@uwindsor.ca",
      redirectUri: "http://localhost:3000",
    })
    .then((e) => {
      if (e.account?.username.endsWith("@uwindsor.ca")) {
        console.log("Logged In : ", e);
        Router.reload();
        // const router = useRouter();
        // router.push("/");
      } else {
      }
    })
    .catch((e) => {
      console.log("Error : ", e);
      instance
        .handleRedirectPromise()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    });
}
