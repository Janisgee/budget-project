import { useRef, useState } from 'react';
import './Setting.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { showAlert } from '../js/alerts';

import { patchUpdateMe } from '../js/api-service';

export default function ChangePassword() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const changePasswordFormRef = useRef();

  // async function getChangePasswordDetails() {
  //   // const formData = new FormData(changePasswordFormRef.current);
  //   // const data = Object.fromEntries(formData.entries());

  //   console.log(data);
  //   return data;
  // }

  async function handleChangePasswordSubmit(e) {
    e.preventDefault();
    //get password details from form
    document.querySelector('.passwordButton').textContent = 'Updating ...';
    const currentPassword = document.getElementById('currentPassword').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;

    const data = { currentPassword, password, passwordConfirm };
    console.log(data);

    try {
      //Update server password
      await patchUpdateMe(data, 'password');

      document.querySelector('.passwordButton').textContent = 'Save Password';
      //Clear input fields
      document.getElementById('currentPassword').value = '';
      document.getElementById('password').value = '';
      document.getElementById('passwordConfirm').value = '';
    } catch (err) {
      console.log(err);
      document.querySelector('.passwordButton').textContent = 'Save Password';
      showAlert('error', err.message, 4);
      return;
    }
  }
  console.log(showCurrentPassword);

  function handleShowCurrentPasswordBtn() {
    setShowCurrentPassword(!showCurrentPassword);
  }
  function handleShowPasswordBtn() {
    setShowPassword(!showPassword);
  }
  function handleShowPasswordConfirmBtn() {
    setShowPasswordConfirm(!showPasswordConfirm);
  }

  return (
    <div className="wrapper">
      <div className="setting-heading">
        <FontAwesomeIcon icon={faGear} /> &nbsp; Password Change
      </div>
      <form className="settingForm" ref={changePasswordFormRef}>
        <div className="settingFormGroup">
          <label forhtml="currentPassword" className="settingForm__label">
            Current Password
          </label>
          <span className="flex-space-between">
            <input
              type={showCurrentPassword ? 'text' : 'password'}
              className="settingform__input"
              name="currentPassword"
              placeholder="••••••••"
              required
              id="currentPassword"
              minLength="8"
            ></input>
            <span
              className="openEyeIcon"
              onClick={handleShowCurrentPasswordBtn}
            >
              {showCurrentPassword ? (
                <FontAwesomeIcon icon={faEye} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} />
              )}
            </span>
          </span>
        </div>
        <div className="settingFormGroup">
          <label forhtml="password" className="settingForm__label">
            New Password (Minium 8 characters)
          </label>
          <span className="flex-space-between">
            <input
              type={showPassword ? 'text' : 'password'}
              className="settingform__input"
              name="password"
              placeholder="••••••••"
              required
              id="password"
              minLength="8"
            ></input>
            <span className="openEyeIcon" onClick={handleShowPasswordBtn}>
              {showPassword ? (
                <FontAwesomeIcon icon={faEye} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} />
              )}
            </span>
          </span>
        </div>
        <div className="settingFormGroup">
          <label forhtml="passwordConfirm" className="settingForm__label">
            Confirm Password
          </label>
          <span className="flex-space-between">
            <input
              type={showPasswordConfirm ? 'text' : 'password'}
              className="settingform__input"
              name="passwordConfirm"
              placeholder="••••••••"
              required
              id="passwordConfirm"
              minLength="8"
            ></input>
            <span
              className="openEyeIcon"
              onClick={handleShowPasswordConfirmBtn}
            >
              {showPasswordConfirm ? (
                <FontAwesomeIcon icon={faEye} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} />
              )}
            </span>
          </span>
        </div>
        <a
          className="link btn passwordButton"
          href="/"
          onClick={handleChangePasswordSubmit}
        >
          Save&nbsp;Password
        </a>
      </form>
    </div>
  );
}
