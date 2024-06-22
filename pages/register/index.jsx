import React, { useState } from "react";
import Container from "../../components/base/Container";
import Head from "next/head";
import InputAuth from "../../components/base/Input/auth";
import Button from "../../components/base/Button";
import Link from "next/link";
import * as yup from "yup";
import { register } from "../../services/auth";
import { useRouter } from "next/router";
import Alert from "../../components/base/Alert";
import { parseCookies } from "../../utils/cookies";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrorForms,
  registerAction,
} from "../../store/actions/authActions";
import { BiArrowBack, BiRightArrowAlt } from "react-icons/bi";

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

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { errors } = useSelector((state) => state.validation);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
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

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerAction(form, formAgreed, router));
  };

  return (
    <Container>
      <Head>
        <title>Sign Up - Mama Recipe</title>
      </Head>

      <Container className={`flex`}>
        <aside className="hidden md:block md:w-1/4 xl:w-5/12">
          <div className="relative w-full h-full">
            <img
              className="w-full h-full object-cover object-center"
              src="/assets/image 15.png"
              alt="Background"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-yellow-300 to-yellow-400 opacity-70" />
            <img
              onClick={() => router.push("/")}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              src="/assets/brands/Group 697.png"
              alt="Mama Recipe"
            />
          </div>
        </aside>
        <section className="w-full md:w-3/4 xl:w-7/12 font-inter flex flex-col justify-center items-center gap-6 my-24 2xl:my-0">
          <Button
            className={`absolute top-0 right-0 m-8 sm:m-10 p-1 text-4xl text-recipe-corral hover:text-recipe-dark sm:text-5xl first:rounded-[50%] hover:bg-recipe-yellow-normal hover:rotate-180 transition-all ease-in-out duration-300`}
            onClick={handleBack}
          >
            <BiArrowBack />
          </Button>
          <h1 className="font-bold text-3xl text-recipe-yellow-normal capitalize">
            Let&apos;s get started
          </h1>
          <p className="font-normal text-center text-lg text-recipe-gray mx-5">
            Create new account to access all features
          </p>
          <div className="w-4/5 sm:w-3/5 2xl:w-2/5 flex flex-col gap-6 text-recipe-corral">
            <InputAuth
              type={`text`}
              name="name"
              error={errors.name}
              value={form.name}
              onChange={handleChange}
              placeholder="Name (ex. John Doe)"
            >
              Name
            </InputAuth>
            <InputAuth
              type={`email`}
              name="email"
              error={errors.email}
              value={form.email}
              onChange={handleChange}
              placeholder="Email (ex. john.doe@gmail.com)"
            >
              Email
            </InputAuth>
            <InputAuth
              type={`text`}
              name="phone"
              error={errors.phone}
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone"
            >
              Phone Number
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

            <InputAuth
              type={`password`}
              name="confirmPassword"
              error={errors.confirmPassword}
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirmation Password"
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
              Register Account
            </Button>
            <div className="flex justify-center gap-1 font-medium text-sm">
              <span className="text-recipe-obsidian">
                Already have account?
              </span>
              <Link
                href={`/login`}
                className="text-recipe-yellow-normal hover:text-recipe-yellow-dark transition duration-200"
              >
                Log in Here
              </Link>
            </div>
          </div>
        </section>
      </Container>
    </Container>
  );
};

export default Register;
