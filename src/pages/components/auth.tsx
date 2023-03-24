import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "../../authConfig";
import Router from "next/router";
import type { IPublicClientApplication } from "@azure/msal-browser";

// JJ Code Start
export async function signInClickHandler(
  instance: IPublicClientApplication
): Promise<void> {
  try {
    const e = await instance.loginPopup({
      scopes: ["User.Read"],
      authority: "https://login.microsoftonline.com/uwindsor.ca",
      prompt: "select_account",
      loginHint: "@uwindsor.ca",
      redirectUri: "http://localhost:3000",
    });
    if (e.account?.username.endsWith("@uwindsor.ca")) {
      console.log("Logged In : ", e);
      Router.reload();
      // const router = useRouter();
      // router.push("/");
    }
  } catch (e) {
    console.log("Error : ", e);
    try {
      const res = await instance.handleRedirectPromise();
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  }
}
export async function signOutClickHandler(
  instance: IPublicClientApplication
): Promise<void> {
  try {
    //Jaiman Code
    const msalInstance = new PublicClientApplication(msalConfig);

    const accounts = msalInstance.getAllAccounts();
    console.log("Account ::: ", accounts, accounts[0]?.homeAccountId);
    const homeAccID = accounts[0]?.homeAccountId;

    const logoutRequest = {
      account: instance.getAccountByHomeId(String(homeAccID)),
      postLogoutRedirectUri: "http://localhost:3000/",
    };
    await instance.logoutPopup(logoutRequest);
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
}
