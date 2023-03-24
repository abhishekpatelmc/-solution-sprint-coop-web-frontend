import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
// JJ Code Start
import {
  useMsal,
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";

import { signInClickHandler, signOutClickHandler } from "./auth";
// JJ Code End

export const Navbar = () => {
  const [userName, setUserName] = useState("");

  // JJ Code
  const { accounts } = useMsal();
  function WelcomeUser() {
    setUserName(String(accounts[0]?.username));
    console.log("Is User :", userName);

    return <p>Welcome, {userName}</p>;
  }

  function SignOutButton() {
    // useMsal hook will return the PublicClientApplication instance you provided to MsalProvider
    const { instance } = useMsal();

    return (
      <button onClick={() => signOutClickHandler(instance)}>Sign Out</button>
    );
  }

  function SignINButton() {
    // useMsal hook will return the PublicClientApplication instance you provided to MsalProvider
    const { instance } = useMsal();

    return (
      <button onClick={() => signInClickHandler(instance)}>Sign In</button>
    );
  }

  function Feed() {
    return (
      <li>
        <AuthenticatedTemplate>
          <Link href="/feed">Add Post</Link>
        </AuthenticatedTemplate>
      </li>
    );
  }

  return (
    <>
      <div className="border-b-2 shadow-md">
        <nav className="mx-10 flex h-16 flex-row items-center justify-between text-lg text-gray-700">
          <div className="basis-1/6">
            <h1 className="text-2xl font-bold tracking-wide antialiased">
              Lancer&apos;s View
            </h1>
          </div>
          <div className="basis-1">
            <input
              type="text"
              className="w-96 rounded-lg border-2 px-2 py-1 text-base"
              placeholder="Search for a company, job title, or keyword"
            />
          </div>
          <div className="basis-1/8">
            <ul className="flex space-x-10">
              <li>
                <Link href="#">About</Link>
              </li>
              <li>
                <Link href="/company">Companies</Link>
              </li>
              <Feed />
              <li>
                <AuthenticatedTemplate>
                  <WelcomeUser />
                  <SignOutButton />
                </AuthenticatedTemplate>
                <UnauthenticatedTemplate>
                  {/* <SignInButton /> */}
                  <SignINButton />
                  {/* <button type="button" onClick={() => signInClickHandler()}>
                    <Image
                      quality={100}
                      width={30}
                      height={30}
                      src="/icons/user.png"
                      alt="user"
                    />
                  </button> */}
                </UnauthenticatedTemplate>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
function WelcomeUser() {
  throw new Error("Function not implemented.");
}
