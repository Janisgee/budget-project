import './css/form.css';

export default function SignUp() {
  return (
    <div className="container">
      <form className="form">
        <h2>✒️ Sign Up</h2>
        <div className="row">
          <label htmlFor="name">User Name</label>
          <input type="text" id="name" />
        </div>

        <div className="row">
          <label htmlFor="email">Email address</label>
          <input type="text" id="email" />
        </div>

        <div className="row">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
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
