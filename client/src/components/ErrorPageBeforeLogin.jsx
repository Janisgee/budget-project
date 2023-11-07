import './App.css';
import './css/error.css';

export default function Error(errMsg) {
  return (
    <div className="error">
      <h2 className="errorTitle">Uh oh! Something went wrong!😢 </h2>
      <div className="errorMsg">error message</div>
    </div>
  );
}
