import { Link } from 'react-router-dom';
import './App.css';
import './css/btn.css';
import './css/error.css';
import NavBar from './NavBar';

export default function Error() {
  return (
    <div className="App">
      <NavBar />
      <div className="error">
        <h2 className="errorTitle">Uh oh! Something went wrong!😢 </h2>
        <p>
          <Link to="/" className="btn link">
            Refresh to main page
          </Link>
        </p>
      </div>
    </div>
  );
}
