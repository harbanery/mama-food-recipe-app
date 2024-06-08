import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { deleteToken, getToken } from "../../../utils/cookies";
import Button from "../../base/Button";
import { BiChevronDown } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useRouter } from "next/dist/client/router";
import { logoutAction } from "../../../store/actions/authActions";

const Navbar = ({ className, home = false }) => {
  const [loggedStatus, setLoggedStatus] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const { token } = getToken();
    if (token) {
      setLoggedStatus(true);
    }
  }, []);

  return (
    <nav className={clsx("w-full z-[9999] px-10 sm:px-28 py-12", className)}>
      <div className="flex justify-between ">
        <div className="flex font-medium gap-12 lg:gap-24 text-lg items-center text-recipe-blue">
          <NavbarAuth logged_status={loggedStatus} pathname={pathname} />
        </div>
        <UserAuth logged_status={loggedStatus} home={home} />
      </div>
    </nav>
  );
};

const NavbarAuth = ({ logged_status, pathname }) => {
  const [visible, setVisible] = useState(false);
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
        <Button
          onClick={() => (visible ? setVisible(false) : setVisible(true))}
          className={`block min-[520px]:hidden text-2xl`}
        >
          <BiChevronDown />
        </Button>
      )}
      {logged_status && (
        <div
          className={`bg-recipe-yellow-normal min-[520px]:bg-transparent ${
            visible ? `flex` : `hidden`
          } min-[520px]:flex p-3 min-[520px]:p-0 rounded-md shadow-md min-[520px]:shadow-none absolute min-[520px]:static top-[104px] min-[520px]:top-0 flex-col min-[520px]:flex-row gap-3 min-[520px]:gap-12 lg:gap-24`}
        >
          <Link
            className={`${
              pathname === "/recipe/add"
                ? "border-b-[1.5px] border-recipe-blue"
                : "hover:border-b-[1.5px] hover:border-recipe-blue"
            } transition duration-300`}
            href={`/recipe/add`}
            onClick={() => setVisible(false)}
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
            onClick={() => setVisible(false)}
          >
            Profile
          </Link>
        </div>
      )}
    </>
  );
};

const UserAuth = ({ logged_status, home }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutAction(router));
  };

  return (
    <>
      {!logged_status ? (
        <Link href={`/login`}>
          <Button
            className={`flex justify-between items-center gap-2 font-normal text-light text-recipe-blue ${
              home && `xl:text-white`
            }`}
          >
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
