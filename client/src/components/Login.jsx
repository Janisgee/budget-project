import { useRef } from 'react';
import './css/form.css';
import { doLogin, isLoggedIn } from '../js/api-service';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const formRef = useRef();
  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();
    const data = new FormData(formRef.current);

    const email = data.get('email');
    const password = data.get('password');

    if (!email || !password) return;

    try {
      await doLogin(email, password);
      if (isLoggedIn()) {
        window.setTimeout(() => {
          navigate('/user/overview');
        }, 2000);
      }
    } catch (err) {
      formRef.current.reset();
    }
  }

  return (
    <div className="container">
      <form ref={formRef} className="form" onSubmit={submit}>
        {/* <div className="alert alert--success">Successfully login</div> */}
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
    </div>
  );
}
