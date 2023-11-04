import './Setting.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

export default function ChangePassword() {
  return (
    <div className="wrapper">
      <div className="setting-heading">
        <FontAwesomeIcon icon={faGear} /> &nbsp; Password Change
      </div>
      <form className="settingForm">
        <div className="settingFormGroup">
          <label forHtml="currentPassword" className="settingForm__label">
            Current Password
          </label>
          <input
            type="password"
            className="settingform__input"
            name="currentPassword"
            placeholder="••••••••"
            required
            minLength="8"
          ></input>
        </div>
        <div className="settingFormGroup">
          <label forHtml="newPassword" className="settingForm__label">
            New Password
          </label>
          <input
            type="password"
            className="settingform__input"
            name="newPassword"
            placeholder="••••••••"
            required
            minLength="8"
          ></input>
        </div>
        <div className="settingFormGroup">
          <label forHtml="confirmPassword" className="settingForm__label">
            Confirm Password
          </label>
          <input
            type="password"
            className="settingform__input"
            name="confirmPassword"
            placeholder="••••••••"
            required
            minLength="8"
          ></input>
        </div>
        <a class="link btn passwordButton" href="/">
          Save&nbsp;Password
        </a>
      </form>
    </div>
  );
}
