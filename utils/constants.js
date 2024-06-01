export const allowedDomains = ["gmail.com", "yahoo.com"];

export const errorRegisterMessages = {
  name: {
    require: "Name is required",
    textOnly: "Name must contain only letters and spaces",
  },
  email: {
    require: "Email is required",
    invalidFormat: "Email format is invalid",
    domain: "Email domain is invalid",
  },
  phone: {
    require: "Phone number is required",
    numberOnly: "Phone must contain only numbers",
  },
  password: {
    require: "Password is required",
    noSpace: "Password cannot contain spaces",
    minLength: "Password must have more than 8 characters",
    digit: "Password must contain at least one digit",
    upperCase: "Password must contain at least one uppercase letter",
    specialCase: "Password must contain at least one special character",
  },
  confirmPassword: {
    require: "Confirm Password is required",
    isEqual: "Confirm Password must be same with Password",
  },
};
