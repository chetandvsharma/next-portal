"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setUpProviders();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     const res = await getProviders();
  //     setProviders(res);
  //   })();
  // }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="next-prompt logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Next-Prompt</p>
      </Link>

      {/* ************************************************** Desktop Navigation ************************************* */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Prompt
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session?.user?.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            <Link href="/auth/sign-up" className="black_btn">
              Sign Up
            </Link>
            <Link href="/auth/sign-in" className="black_btn">
              Sign In
            </Link>
          </>
        )}
      </div>

      {/* ************************************************** Mobile Navigation ************************************* */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user?.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropDown((prev) => !prev)} // ++++Good practice
              //   onClick={() => setToggleDropDown(!toggleDropDown)} // -----bad practice: unexpected behavier
            />

            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  My Profile
                </Link>

                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  Create Prompt
                </Link>

                <Link href="/auth/sign-up" className="black_btn">
                  Sign Up
                </Link>
                <Link href="/auth/sign-in" className="black_btn">
                  Sign In
                </Link>
              </div>
            )}
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={() => signIn(provider.id)}
              className="black_btn"
            >
              Sign In
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
