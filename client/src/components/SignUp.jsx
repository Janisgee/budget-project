import { useRef } from 'react';
import './css/form.css';
import { showAlert } from '../js/alerts';
import { signup } from '../js/api-service';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const signupUserFormRef = useRef();
  const navigate = useNavigate();
  async function handleSignupSubmit(e) {
    e.preventDefault();

    const formData = new FormData(signupUserFormRef.current);
    const userName = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const passwordConfirm = formData.get('passwordConfirm');

    if (!userName || !email || !password || !passwordConfirm) {
      showAlert(
        'error',
        'Missing information, please fill in all the blank from the form.',
        4
      );
      return;
    }

    const data = {
      name: userName,
      email: email,
      password: password,
      passwordConfirm: passwordConfirm,
    };

    try {
      await signup(data);
      window.setTimeout(() => {
        navigate('/user/overview');
      }, 2000);
    } catch (err) {
      signupUserFormRef.current.reset();
    }
  }

  return (
    <div className="container">
      <form
        className="form signupForm"
        onSubmit={handleSignupSubmit}
        ref={signupUserFormRef}
      >
        <h2>✒️ Sign Up</h2>
        <div className="row">
          <label htmlFor="userName">User Name</label>
          <input type="text" id="userName" name="name" defaultValue="Janis" />
        </div>

        <div className="row">
          <label htmlFor="sign-up-email">Email address</label>
          <input
            type="text"
            id="sign-up-email"
            name="email"
            defaultValue="janisgeegee@gmail.com"
          />
        </div>

        <div className="row">
          <label htmlFor="sign-up-password">Password</label>
          <input
            type="password"
            id="sign-up-password"
            name="password"
            defaultValue="pass1234"
          />
        </div>

        <div className="row">
          <label htmlFor="sign-up-passwordConfirm">Confirm Password</label>
          <input
            type="password"
            id="sign-up-passwordConfirm"
            name="passwordConfirm"
            defaultValue="pass1234"
          />
        </div>

        <div>
          <button className="btn">Submit</button>
        </div>
      </form>
    </div>
  );
}
