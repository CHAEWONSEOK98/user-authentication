import { useState, useEffect } from 'react';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { forgotPassword } from '../../features/auth/authActions';

const ForgotPassword = () => {
  const [formFields, setFormFields] = useState({ email: '' });
  const [formErrors, setFormErrors] = useState('');

  const { error, message, loading, success } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      setFormErrors(message);
    }
  }, [error, message]);

  const handleInputValueChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // dispatch the function that sneds ths reset token to the email address
    dispatch(forgotPassword(formFields));
  };

  return (
    <section className="reset-password-container">
      <form onSubmit={handleSubmit}>
        <div className="form-item" id="email">
          <label>Enter your registered email address</label>
          <input
            placeholder="Enter email"
            value={formFields.email}
            name="email"
            type="text"
            onChange={handleInputValueChange}
          />
        </div>
        <span className="error-text">{formErrors}</span>

        {loading ? (
          <span className="message">Please wait ...</span>
        ) : (
          <span className="message">{message.message}</span>
        )}

        <button
          className="form-button"
          type="submit"
          disabled={loading || success}
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default ForgotPassword;
