import { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { showAlert } from '../js/alerts';
import { resetPassword } from '../js/api-service';

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const newPasswordFormRef = useRef();
  const navigate = useNavigate();
  const params = useParams();

  function handleShowPasswordBtn() {
    setShowPassword(!showPassword);
  }
  function handleShowPasswordConfirmBtn() {
    setShowPasswordConfirm(!showPasswordConfirm);
  }

  async function handleSubmitResetPassword(e) {
    e.preventDefault();
    const formData = new FormData(newPasswordFormRef.current);
    console.log(formData);
    for (const ent of formData.entries()) {
      console.log(ent);
    }
    const password = formData.get('password');
    const passwordConfirm = formData.get('passwordConfirm');

    console.log(params);
    const { token } = params;
    console.log(token);
    try {
      await resetPassword(password, passwordConfirm, token);
      window.setTimeout(() => {
        navigate('/user/overview');
      }, 2000);
    } catch (err) {
      showAlert('error', err.message, 5);
      newPasswordFormRef.current.reset();
    }
  }

  return (
    <div className="container">
      <form
        className="form"
        onSubmit={handleSubmitResetPassword}
        ref={newPasswordFormRef}
      >
        <h2>Reset Password🔏</h2>

        <div className="row">
          <label htmlFor="newPassword">
            New Password: (Minium 8 characters)
          </label>
          <div>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="newPassword"
            />
            <span className="openEyeIcon" onClick={handleShowPasswordBtn}>
              {showPassword ? (
                <FontAwesomeIcon icon={faEye} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} />
              )}
            </span>
          </div>
        </div>
        <div className="row">
          <label htmlFor="newPasswordConfirm">New Password Confirm:</label>
          <div>
            <input
              type={showPasswordConfirm ? 'text' : 'password'}
              name="passwordConfirm"
              id="newPasswordConfirm"
            />
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
          </div>
        </div>
        <button className="btn">Submit</button>
      </form>
    </div>
  );
}
