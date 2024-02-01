import './LoginCard.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
const LoginCard = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const login = async (email, password) => {
    const body = { email, password };

    try {
      const response = await axios.post(
        'http://localhost:5000/account/login',
        body
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem('token', data.token);
        setRedirect(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // Redirect to the home page when redirect state changes to true
    if (redirect) {
      navigate('/', { replace: true });
    }
  }, [redirect, navigate]);
  return (
    <div className='login__card__container'>
      <div className='login__card'>
        <div className='login__header'>
          <h1>Login</h1>
        </div>
        <div className='login__inputs'>
          <div className='email__input__container input__container'>
            <label className='email__label input__label'>Email</label>
            <input
              type='email'
              className='email__input login__input'
              value={email}
              placeholder='example@gmail.com'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='password__input__container input__container'>
            <label className='password__label input__label'>Password</label>
            <input
              type='password'
              className='password__input login__input'
              placeholder='**********'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className='login__button__container'>
            <button className='login__button' onClick={handleSubmit}>
              LOGIN{' '}
            </button>
          </div>
        </div>
        <div className='login__other__actions'>
          <div className='login__forgot__password'>Forgot password?</div>
          <div className='login__new__account'>
            Don't have account?{' '}
            <Link to='/account/register'>Create account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
