import { allowedDomains, errorRegisterMessages } from "./constants";

// register
export const validateAuth = (name, value) => {
  let errorMessage = "";

  if (name === "name") {
    if (value.trim() === "") {
      errorMessage = errorRegisterMessages.name.require;
    } else if (!/^[a-zA-Z\s]*$/.test(value)) {
      errorMessage = errorRegisterMessages.name.textOnly;
    }
  }

  if (name === "email") {
    if (value.trim() === "") {
      errorMessage = errorRegisterMessages.email.require;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errorMessage = errorRegisterMessages.email.invalidFormat;
    } else {
      const domain = value.split("@")[1];
      if (!allowedDomains.includes(domain)) {
        errorMessage = errorRegisterMessages.email.domain;
      }
    }
  }

  if (name === "phone") {
    if (value.trim() === "") {
      errorMessage = errorRegisterMessages.phone.require;
    } else if (!/^[\d]*$/.test(value)) {
      errorMessage = errorRegisterMessages.phone.numberOnly;
    }
  }

  if (name === "password") {
    if (value.trim() === "") {
      errorMessage = errorRegisterMessages.password.require;
    } else if (/\s/.test(value)) {
      errorMessage = errorRegisterMessages.password.noSpace;
    } else if (value.length < 8) {
      errorMessage = errorRegisterMessages.password.minLength;
    } else if (!/\d/.test(value)) {
      errorMessage = errorRegisterMessages.password.digit;
    } else if (!/[A-Z]/.test(value)) {
      errorMessage = errorRegisterMessages.password.upperCase;
    } else if (!/[\W_]/.test(value)) {
      errorMessage = errorRegisterMessages.password.specialCase;
    }
  }

  if (name === "confirmPassword") {
    if (value.trim() === "") {
      errorMessage = errorRegisterMessages.confirmPassword.require;
    }
  }

  return errorMessage;
};
