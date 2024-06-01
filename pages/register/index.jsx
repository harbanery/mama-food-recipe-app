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

const Register = () => {
  const router = useRouter();
  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: yup
      .string()
      .matches(/^[0-9]+$/, "Phone number must be digits")
      .required("Phone number is required"),
    password: yup
      .string()
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one digit")
      .matches(
        /[@$!%*?&#_]/,
        "Password must contain at least one special character"
      )
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const [alert, setAlert] = useState({ status: "idle", message: "" });
  const [alertKey, setAlertKey] = useState(0);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setErrors({
      ...errors,
      [name]: "",
    });

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      await schema.validate(form, { abortEarly: false });
      console.log("Form is valid, submitting data...");

      try {
        const { message } = await register({ form });
        setAlert({
          status: "success",
          message: message,
        });
        router.replace("/login");
      } catch (error) {
        setAlert({
          status: "failed",
          message: error.message,
        });
        setAlertKey((prevKey) => prevKey + 1);
      }
    } catch (err) {
      if (err.inner) {
        const formErrors = err.inner.reduce((acc, curr) => {
          return { ...acc, [curr.path]: curr.message };
        }, {});
        setErrors(formErrors);
      }
    }
  };

  return (
    <Container>
      <Head>
        <title>Sign Up - Mama Recipe</title>
      </Head>

      <Alert status={alert.status} message={alert.message} count={alertKey} />

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
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              src="/assets/brands/Group 697.png"
              alt="Mama Recipe"
            />
          </div>
        </aside>
        <section className="w-full md:w-3/4 xl:w-7/12 font-inter flex flex-col justify-center items-center gap-6 my-24 xl:my-0">
          <h1 className="font-bold text-3xl text-recipe-yellow-normal capitalize">
            Let's get started
          </h1>
          <p className="font-normal text-lg text-recipe-gray">
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
            <div className="flex gap-2">
              <input
                id="checkbox"
                className="accent-recipe-yellow-normal"
                type="checkbox"
                name=""
              />
              <label htmlFor="checkbox" className=" cursor-pointer">
                I agree to terms & conditions
              </label>
            </div>

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
                className="text-recipe-yellow-normal hover:text-recipe-yellow-dark"
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
