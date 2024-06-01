import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { deleteToken, getToken } from "../../../utils/cookies";
import Button from "../../base/Button";

const Navbar = ({ className }) => {
  const [loggedStatus, setLoggedStatus] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const { token } = getToken();
    if (token) {
      setLoggedStatus(true);
    }
  }, []);

  return (
    <nav
      className={clsx(
        "max-w-[1920px] w-full z-[9999] px-10 sm:px-28 py-12",
        className
      )}
    >
      <div className="flex justify-between ">
        <div className="flex font-medium gap-12 lg:gap-24 text-lg items-center text-recipe-blue">
          <NavbarAuth logged_status={loggedStatus} pathname={pathname} />
        </div>
        <UserAuth logged_status={loggedStatus} />
      </div>
    </nav>
  );
};

const NavbarAuth = ({ logged_status, pathname }) => {
  return (
    <>
      <Link
        className={`${
          pathname === "/"
            ? "border-b-[1.5px] border-recipe-blue"
            : "hover:border-b-[1.5px] hover:border-recipe-blue"
        } transition duration-300`}
        href={`/`}
      >
        Home
      </Link>
      {logged_status && (
        <>
          <Link
            className={`${
              pathname === "/recipe/add"
                ? "border-b-[1.5px] border-recipe-blue"
                : "hover:border-b-[1.5px] hover:border-recipe-blue"
            } transition duration-300`}
            href={`/recipe/add`}
          >
            Add Recipe
          </Link>
          <Link
            className={`${
              pathname === "/profile"
                ? "border-b-[1.5px] border-recipe-blue"
                : "hover:border-b-[1.5px] hover:border-recipe-blue"
            } transition duration-300`}
            href={`/profile`}
          >
            Profile
          </Link>
        </>
      )}
    </>
  );
};

const UserAuth = ({ logged_status }) => {
  const handleLogout = () => {
    deleteToken();
    window.location.href = "/login";
  };

  return (
    <>
      {!logged_status ? (
        <Link href={`/login`}>
          <Button className=" flex justify-between items-center gap-2 font-normal text-light text-recipe-blue xl:text-white">
            <div className="w-[52px]">
              <img
                className="w-full h-auto"
                src="/assets/icons/User icon.png"
                alt=""
              />
            </div>
            <h1 className="">Login</h1>
          </Button>
        </Link>
      ) : (
        <Button
          className=" flex justify-between items-center gap-2 font-normal text-light text-white"
          onClick={handleLogout}
        >
          <div className="w-[52px]">
            <img
              className="w-full h-auto"
              src="/assets/icons/User icon.png"
              alt=""
            />
          </div>
        </Button>
      )}
    </>
  );
};

export default Navbar;
