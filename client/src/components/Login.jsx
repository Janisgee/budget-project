import { useRef } from 'react';

import './css/form.css';
import { doLogin } from '../js/api-service';
import { showAlert } from '../js/alerts';
import { useNavigate } from 'react-router-dom';

import Forgetpassword from './Forgetpassword';

export default function Login() {
  const formRef = useRef();
  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();
    const data = new FormData(formRef.current);

    const email = data.get('email');
    const password = data.get('password');

    if (!email || !password) {
      showAlert('error', 'Please fill in all the log in details.', 4);
      return;
    }
    try {
      await doLogin(email, password);
      window.setTimeout(() => {
        navigate('/user/overview');
      }, 2000);
    } catch (err) {
      formRef.current.reset();
    }
  }

  function handleOpenModal(e) {
    e.preventDefault();
    const modalElement = document.getElementById('forgetPassword');
    modalElement.classList.remove('displayNone');
  }

  return (
    <div className="container">
      <form ref={formRef} className="form" onSubmit={submit}>
        {/* <div className="alert alert--success">Successfully login</div> */}
        <h2>🔐 Log In</h2>
        <div className="row">
          <label htmlFor="email">Email address</label>
          <input
            type="text"
            name="email"
            id="email"
            autoComplete="on"
            value="user3@gmail.com"
            onChange={(e) => e.target.value}
          />
        </div>

        <div className="row">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="on"
            value="pass1234"
            onChange={(e) => e.target.value}
          />
          <button
            className="forgetPasswordbtn"
            type="button"
            onClick={handleOpenModal}
          >
            Forget password?
          </button>
        </div>

        <div>
          <button className="btn" type="submit">
            Login
          </button>
        </div>
      </form>
      <Forgetpassword />
    </div>
  );
}
