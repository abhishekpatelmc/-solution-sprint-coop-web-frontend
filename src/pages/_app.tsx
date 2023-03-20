import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "./auth/index";
import { AuthProvider } from "../context/auth";

import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <MsalProvider instance={msalInstance}>
      <AuthProvider>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </AuthProvider>
    </MsalProvider>
  );
};

export default MyApp;
