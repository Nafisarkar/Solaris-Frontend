const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
};


const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$/;
    //accepted password sample
    //Nafi1234
    return re.test(password);
};


const validateCreateUser = (user) => {
    const errors = [];

    if (user.name === "") {
      errors.push("Name is required");
    } else if (user.name.length < 3) {
      errors.push("Name must be at least 3 characters");
    }

    if (user.email === "") {
      errors.push("Email is required");
    } else if (!validateEmail(user.email)) {
      errors.push("Email must be valid");
    }

    if (user.password === "") {
      errors.push("Password is required");
    } else if (!validatePassword(user.password)) {
      errors.push(
        "Password must be at least 8 characters long, must contain at least one lowercase letter, one uppercase letter and one number"
      );
    }

    if (user.confirmPassword === "") {
      errors.push("Confirm Password is required");
    } else if (user.password !== user.confirmPassword) {
      errors.push("Passwords do not match");
    }

    if (user.imageUrl === "") {
      errors.push("Image Url is required");
    }

    return errors.length > 0 ? errors : null;
  };

const validateLogin = (user) => {
    const errors = [];

    if (user.email === "") {
      errors.push("Email is required");
    } else if (!validateEmail(user.email)) {
      errors.push("Email must be valid");
    }

    if (user.password === "") {
      errors.push("Password is required");
    } else if (!validatePassword(user.password)) {
      if (!/(?=.*[a-z])/.test(user.password)) {
        errors.push("Password must contain at least one lowercase letter");
      }
      if (!/(?=.*[A-Z])/.test(user.password)) {
        errors.push("Password must contain at least one uppercase letter");
      }
      if (!/(?=.*[0-9])/.test(user.password)) {
        errors.push("Password must contain at least one number");
      }
      if (user.password.length < 8) {
        errors.push("Password must be at least 8 characters long");
      }
    }

    return errors.length > 0 ? errors : null;
  };

  
  export { validateCreateUser, validateLogin };