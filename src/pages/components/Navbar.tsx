import Link from "next/link";
import { Fragment } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { Menu, Transition } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { signInClickHandler, signOutClickHandler } from "../api/auth/auth";
import Avatar from "boring-avatars";
import lancerImage from "../../../public/lancer.svg";

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

  useEffect(() => {
    if (accounts[0]?.name !== undefined) {
      setName(accounts[0].name.split(" ")[0] as string);
      console.log("Is User :", accounts[0].name.split(" ")[0]);
    }
  }, [accounts]);
  function WelcomeUser({ name }: { name: string }) {
    // setUserName(String(accounts[0]?.username));
    console.log("Is Name :", name);
    return (
      <p className="py-2 px-2 text-xl hover:border-b-2 hover:outline-gray-50">
        {name}
      </p>
    );
  }

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <div className=" bg-cyan-900 shadow-2xl shadow-slate-500 ">
        <nav className="mx-14 flex h-20 flex-row items-center justify-between text-xl text-gray-50">
          <div className="flex basis-1/5 items-center gap-1">
            <Image
              src={lancerImage as StaticImageData}
              alt="Lancer's View Logo"
              width={28}
              height={28}
            />
            <h1 className="text-3xl font-medium uppercase">
              <Link href="/">Lancer&apos;s View</Link>
            </h1>
          </div>
          <div className="basis-1/10 text-xl uppercase">
            <ul className="flex items-center gap-3 font-light tracking-wide">
              <li>
                <Link
                  href="/aboutus"
                  className="px-2 hover:border-b-2 hover:pb-2 hover:outline-gray-50 "
                >
                  About
                </Link>
              </li>
              <li>
                <AuthenticatedTemplate>
                  <Link
                    href="/feed"
                    className="px-2 hover:border-b-2 hover:pb-2 hover:outline-gray-50 "
                  >
                    Add Post
                  </Link>
                </AuthenticatedTemplate>
              </li>
              <li>
                <UnauthenticatedTemplate>
                  <button
                    type="button"
                    onClick={() => signInClickHandler(instance)}
                    className="px-2 text-xl font-light uppercase tracking-wide hover:border-b-2 hover:pb-2 hover:outline-gray-50 "
                  >
                    Sign In
                  </button>
                </UnauthenticatedTemplate>
                <AuthenticatedTemplate>
                  <div className="flex items-center gap-3">
                    <WelcomeUser name={name} />
                    <Menu as="div" className="relative">
                      <div>
                        <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open user menu</span>
                          <Avatar
                            size={27}
                            name={name}
                            variant="beam"
                            colors={[
                              "#92A1C6",
                              "#146A7C",
                              "#F0AB3D",
                              "#C271B4",
                              "#C20D90",
                            ]}
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                                onClick={() => signOutClickHandler(instance)}
                              >
                                Sign out
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </AuthenticatedTemplate>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
