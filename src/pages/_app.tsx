import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "../authConfig";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const msalInstance = new PublicClientApplication(msalConfig);
  const accounts = msalInstance.getAllAccounts();
  useEffect(() => {
    if (!accounts || accounts.length === 0) {
      console.log("Main App :", accounts);
    }
  });

  return (
    <MsalProvider instance={msalInstance}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
        <ToastContainer />
      </SessionProvider>
    </MsalProvider>
  );
};

export default MyApp;
