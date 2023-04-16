import './App.css';
import { Route, Routes, Link } from 'react-router-dom';

//Pages
import Home from './pages/home/Home';
import SignUp from './components/sign-up/SignUp';
import SignIn from './components/sign-in/SignIn';

const App = () => {
  return (
    <main className="main-container">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
