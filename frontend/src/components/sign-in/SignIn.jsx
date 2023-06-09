import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { reset } from '../../features/auth/authSlice';
import { loginUser } from '../../features/auth/authActions';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [formErrors, setFormErrors] = useState({});

  const { user, error, success, message } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      handleError(message);
    }

    if (success && user) {
      navigate('/welcome');
    }

    return () => {
      dispatch(reset());
    };
  }, [error, message, user, success, navigate, dispatch]);

  const handleInputValueChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const changeBorderColorOnError = (inputName) => {
    let formInput = document.getElementById(`${inputName}`);
    formInput.classList.add('error');
  };

  const handleError = (message) => {
    // alert(message);

    // Parse the error message string
    const messageObject = JSON.parse(message);

    Object.keys(messageObject).forEach((item) => {
      changeBorderColorOnError(item);
    });

    setFormErrors(messageObject);
  };

  // const handleValidation = () => {
  //   let error = {};

  //   if (!formFields.email) {
  //     error.email = 'Email is required';
  //     changeBorderColorOnError('email');
  //   }

  //   if (!formFields.password) {
  //     error.password = 'Password is required';
  //     changeBorderColorOnError('password');
  //   }

  //   return error;
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(formFields);
    // setFormErrors(handleValidation());
    dispatch(loginUser(formFields));
  };

  return (
    <section className="form-container">
      <h1 className="form-heading">Sign in</h1>
      <form onSubmit={handleSubmit}>
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

        <button className="form-button" type="submit">
          Sign In
        </button>
        <Link className="forgot-link" to="/forgot-password">
          Forgot your password
        </Link>
      </form>
    </section>
  );
};

export default SignIn;
