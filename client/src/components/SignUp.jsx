import './css/form.css';

export default function SignUp() {
  return (
    <div className="container">
      <form className="form signupForm">
        <h2>✒️ Sign Up</h2>
        <div className="row">
          <label htmlFor="name">User Name</label>
          <input type="text" id="name" />
        </div>

        <div className="row">
          <label htmlFor="sign-up-email">Email address</label>
          <input type="text" id="sign-up-email" />
        </div>

        <div className="row">
          <label htmlFor="sign-up-password">Password</label>
          <input type="password" id="sign-up-password" />
        </div>

        <div className="row">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" />
        </div>

        <div>
          <button className="btn">Submit</button>
        </div>
      </form>
    </div>
  );
}
