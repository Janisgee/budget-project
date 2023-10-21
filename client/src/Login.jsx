import { useRef, useState } from 'react';
import './css/form.css';
import { doLogin, isLoggedIn } from './api-service';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const formRef = useRef();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  async function submit(event) {
    event.preventDefault();
    const data = new FormData(formRef.current);

    const email = data.get('email');
    const password = data.get('password');

    if (!email || !password) return;

    try {
      await doLogin(email, password);
    } catch (e) {
      setError(e.message);
      formRef.current.reset();
    }

    if (isLoggedIn()) {
      navigate('/');
    }
  }

  return (
    <div className="container">
      <form ref={formRef} className="form" onSubmit={submit}>
        <h2>🔐 Log In</h2>
        <div className="row">
          <label htmlFor="email">Email address</label>
          <input type="text" name="email" />
        </div>

        <div className="row">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
        </div>

        <div>
          <button className="btn">Login</button>
        </div>
      </form>
      {error && <div>Error: {error}</div>}
    </div>
  );
}
