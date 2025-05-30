export const usernameValidate = {
    required: {
      value: true,
      message: "Please enter username",
    },
    minLength: {
      value: 6,
      message: "Username must be at least 6 characters long",
    },
    pattern: {
      value: /^[a-zA-Z0-9][^\s]*$/,

      message: "Username must be alphanumeric",
    },
  };
  
  export const emailValidate = {
    required: {
      value: true,
      message: "Please enter an email address",
    },
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Email address is not valid",
    },
  };

  export const rollno = {
    required: {
      value: true,
      message: "Please enter an roll no",
    },
    pattern: {
      value: /^\d{6}[a-zA-Z]{4}\d{3}$/,
      message: "Roll No is not valid",
    },
  };
  
  export const passwordValidate = {
    required: {
      value: true,
      message: "Please enter password",
    },
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters long",
    },
  };