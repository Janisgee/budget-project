import './css/form.css';

export default function Login() {
  return (
    <div className="container">
      <form className="form">
        <h2>🔐 Log In</h2>
        <div className="row">
          <label htmlFor="email">Email address</label>
          <input type="text" id="email" />
        </div>

        <div className="row">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>

        <div>
          <button className="btn">Login</button>
        </div>
      </form>
    </div>
  );
}
