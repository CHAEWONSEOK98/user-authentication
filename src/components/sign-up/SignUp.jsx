import { useState } from 'react';

const defaultFormFields = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [formErrors, setFormErrors] = useState({});

  const changeBorderColorOnError = (inputName) => {
    let formInput = document.getElementById(`${inputName}`);
    formInput.classList.add('error');
  };

  const handleValidation = () => {
    let error = {};

    if (!formFields.name) {
      error.name = 'Name is required!';
      changeBorderColorOnError('name');
    }

    if (!formFields.email) {
      error.email = 'Email is required!';
      changeBorderColorOnError('email');
    }

    if (!formFields.password) {
      error.password = 'Password is required!';
      changeBorderColorOnError('password');
    }

    if (!formFields.confirmPassword) {
      error.confirmPassword = 'Confirm your password!';
      changeBorderColorOnError('confirmPassword');
    }

    return error;
  };

  const handleInputValueChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(formFields);
    setFormErrors(handleValidation());
  };

  return (
    <section className="form-container">
      <h1 className="form-heading">Create an account</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-item" id="name">
          <label>Name</label>
          <input
            placeholder="Enter your name"
            name="name"
            type="text"
            value={formFields.name}
            onChange={handleInputValueChange}
          />
          <div className="error-text">{formErrors.name}</div>
        </div>

        <div className="form-item" id="email">
          <label>Email</label>
          <input
            placeholder="Enter your email"
            name="email"
            type="text"
            value={formFields.email}
            onChange={handleInputValueChange}
          />
          <div className="error-text">{formErrors.email}</div>
        </div>

        <div className="form-item" id="password">
          <label>Password</label>
          <input
            placeholder="Enter your password"
            name="password"
            type="password"
            value={formFields.password}
            onChange={handleInputValueChange}
          />
          <div className="error-text">{formErrors.password}</div>
        </div>

        <div className="form-item" id="confirmPassword">
          <label>Confirm Password</label>
          <input
            placeholder="Confirm your password"
            name="confirmPassword"
            type="password"
            value={formFields.confirmPassword}
            onChange={handleInputValueChange}
          />
          <div className="error-text">{formErrors.confirmPassword}</div>
        </div>

        <button className="form-button" type="submit">
          Sign Up
        </button>
      </form>
    </section>
  );
};

export default SignUp;
