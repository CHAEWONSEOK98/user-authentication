import './Welcome.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { reset, logout } from '../../../features/auth/authSlice';

const WelcomePage = () => {
  const { user, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      console.log(error);
    }

    if (!user) {
      navigate('/sign-in');
    }

    return () => {
      dispatch(reset());
    };
  }, [error, user]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/sign-in');
  };

  const username = user ? user.data.user.name : null;

  return (
    <section className="welcome-container">
      <h1 className="welcome-header">
        Welcome <span>{username} !</span>
      </h1>
      <button className="logout-button" onClick={handleLogout}>
        Log Out
      </button>
    </section>
  );
};

export default WelcomePage;
