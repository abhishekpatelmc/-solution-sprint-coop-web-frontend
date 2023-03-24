import Link from "next/link";
import React, { useState } from "react";
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";
import { signInClickHandler, signOutClickHandler } from "../api/auth/auth";

// JJ Code Start
import {
  useMsal,
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";

// JJ Code End

export const Navbar = () => {
  const { instance } = useMsal();
  // const [userName, setUserName] = useState("");
  const [name, setName] = useState("");

  // JJ Code
  const { accounts } = useMsal();
  function WelcomeUser() {
    // setUserName(String(accounts[0]?.username));
    setName(String(accounts[0]?.name));
    console.log("Is User :", name);
    // console.log("Is User :", userName);
    return <p>Welcome, {name.substring(0, name.indexOf(" "))}</p>;
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
      <div className="border-b-2 bg-gray-100 shadow-md ">
        <nav className="mx-10 flex h-16 flex-row items-center justify-between text-lg text-gray-700">
          <div className="basis-1/5">
            <h1 className="text-2xl font-bold tracking-wide antialiased">
              <Link href="/">Lancer&apos;s View</Link>
            </h1>
          </div>
          {/* This is serach bar */}
          <div className="basis-1">
            <input
              type="text"
              className="w-96 rounded-lg border-2 border-gray-300 px-2 py-1 text-center text-base"
              placeholder="Search for a company, job title, or keyword"
            />
          </div>
          <div className="basis-1/10 text-lg">
            <ul className="flex gap-6">
              <li>
                <Link href="/aboutus">About</Link>
              </li>
              <Feed />
              {/* <li>
                <Link href="/company">Companies</Link>
              </li> */}
              <li className="flex gap-6">
                <AuthenticatedTemplate>
                  <WelcomeUser />
                  {/* <SignOutButton /> */}
                  <button
                    type="button"
                    onClick={() => signOutClickHandler(instance)}
                    className="flex gap-2 hover:text-red-400"
                  >
                    <p className="text-lg">Sign Out</p>
                    <FaUserCircle size={26} />
                  </button>
                </AuthenticatedTemplate>
                <UnauthenticatedTemplate>
                  {/* <SignINButton /> */}
                  <button
                    type="button"
                    onClick={() => signInClickHandler(instance)}
                    className="flex gap-2 hover:text-green-600"
                  >
                    <p className="text-lg">Sign In</p>
                    <FaRegUserCircle size={26} />
                  </button>
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
