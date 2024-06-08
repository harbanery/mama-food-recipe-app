import React, { useState } from "react";
import { parseCookies } from "../../utils/cookies";
import { useRouter } from "next/navigation";
import Container from "../../components/base/Container";
import Head from "next/head";
import Button from "../../components/base/Button";
import InputAuth from "../../components/base/Input/auth";
import Link from "next/link";
import Alert from "../../components/base/Alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrorForms, loginAction } from "../../store/actions/authActions";

export const getServerSideProps = async (context) => {
  const { req } = context;
  const cookies = parseCookies(req.headers.cookie);
  const token = cookies.token || null;

  if (token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { errors } = useSelector((state) => state.validation);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [formAgreed, setFormAgreed] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    dispatch(clearErrorForms(name));

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleChangeCheckbox = (e) => {
    setFormAgreed(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAction(form, formAgreed, router));
  };

  return (
    <Container>
      <Head>
        <title>Login - Mama Recipe</title>
      </Head>

      <Container className={`flex`}>
        <aside className="hidden md:block md:w-1/4 xl:w-5/12">
          <div className="relative w-full h-screen">
            <img
              className="w-full h-full object-cover object-center"
              src="/assets/image 15.png"
              alt="bg_mama_recipe"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-yellow-300 to-yellow-400 opacity-70" />
            <img
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              src="/assets/brands/Group 697.png"
              alt="logo_mama_recipe"
            />
          </div>
        </aside>
        <section className="w-full md:w-3/4 xl:w-7/12 font-inter flex flex-col justify-center items-center gap-6 h-screen">
          <h1 className=" font-bold text-3xl text-recipe-yellow-normal">
            Welcome
          </h1>
          <p className="font-normal text-lg text-recipe-gray">
            Log in into your account
          </p>
          <div className="w-4/5 sm:w-3/5 2xl:w-2/5 flex flex-col gap-6 text-recipe-corral">
            <InputAuth
              type={`email`}
              name="email"
              error={errors.email}
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
            >
              Email
            </InputAuth>
            <InputAuth
              type={`password`}
              name="password"
              error={errors.password}
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
            >
              Password
            </InputAuth>
            <InputAuth type={`checkbox`} onChange={handleChangeCheckbox}>
              I agree to terms & conditions
            </InputAuth>
            <Button
              className={`w-full h-16 bg-recipe-yellow-normal hover:bg-recipe-yellow-dark text-white font-medium text-base`}
              onClick={handleSubmit}
            >
              Log in
            </Button>
            <Link
              href={`/`}
              className="font-medium text-sm text-right text-recipe-obsidian"
            >
              Forgot Password ?
            </Link>
            <div className="flex justify-center gap-1 font-medium text-sm">
              <span className="text-recipe-obsidian">
                Don&apos;t have an account?
              </span>
              <Link
                href={`/register`}
                className="text-recipe-yellow-normal hover:text-recipe-yellow-dark"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </section>
      </Container>
    </Container>
  );
};

export default Login;
