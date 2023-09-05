"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";
const Nav = () => {
  // const isUserLogged = true;

  const router = useRouter();
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full  mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          className="object-contain"
          alt="Logo"
          width={30}
          height={30}
        />
        <p className="logo_text">Crisper</p>
      </Link>

      {/* Desktop nav */}
      <div className="sm:flex hidden">
        <button
          className="mx-2 outline_btn"
          onClick={() => {
           router.replace('/')
          }}
        >
          Refresh
        </button>
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Crisp
            </Link>
            <button
              type="button"
              onClick={() => {
                signOut({
                  callbackUrl:
                    "http://localhost:3000/" ||
                    "https://crisper-prompts.vercel.app/",
                });
              }}
              className="outline_btn"
            >
              Sign Out
            </button>
            <Link className="" href="/profile">
              <Image
                src={session?.user.image} //filhaal ke liye until we get real User Images
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile nav */}
      <div className="sm:hidden flex relative">
        <button
          className="mx-2 outline_btn"
          onClick={() => {
            router.refresh();
          }}
        >
          Refresh
        </button>
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => {
                    setToggleDropdown(false);
                  }}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => {
                    setToggleDropdown(false);
                  }}
                >
                  Create Crisp
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut({
                      callbackUrl:
                        "http://localhost:3000/" ||
                        "https://crisper-prompts.vercel.app/",
                    });
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
