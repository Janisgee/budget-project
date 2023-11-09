import { useState } from 'react';
import './ForgetPassword.css';
import { showAlert } from '../js/alerts';
import { forgetPassword } from '../js/api-service';

export default function ForgetPassword() {
  const [emailReset, setemailReset] = useState('');

  async function handleResetPasswordBtn(e) {
    e.preventDefault();
    document.getElementById('resetPasswordBtn').textContent = 'Loading ...';
    try {
      //Connect resetpassword to server api
      await forgetPassword(emailReset);
      const modalElement = document.getElementById('forgetPassword');

      //Close modal
      modalElement.classList.add('displayNone');
      document.getElementById('resetPasswordBtn').textContent =
        'Reset password';

      //Reset reset email field to blank
      document.getElementById('resetEmail').value = '';
    } catch (err) {
      showAlert('error', err.message, 4);
      document.getElementById('resetPasswordBtn').textContent =
        'Reset password';
    }
  }

  function handleEmailInputChange(e) {
    setemailReset(e.target.value);
  }

  function handleCloseModal(e) {
    e.preventDefault();
    const modalElement = document.getElementById('forgetPassword');
    modalElement.classList.add('displayNone');
  }
  return (
    <div className="forgetPassword-modal displayNone" id="forgetPassword">
      <div className="forgetPassword-content">
        <span className="flex-space-between">
          <h2>Forgot your password?🔑</h2>
          <button className="closeButton" onClick={handleCloseModal}>
            <span className="close">&times;</span>
          </button>
        </span>
        <p>It’s case sensitive and 8 or more letters, numbers or symbols.</p>
        <p>Still can’t remember?</p>
        <hr />
        <p>Please fill in your email address to reset password.</p>
        <div>
          <label htmlFor="resetEmail" className="resetLabel">
            Email:
          </label>
          <input
            type="text"
            name="email"
            id="resetEmail"
            className="resetInput"
            autoFocus={true}
            onChange={handleEmailInputChange}
          ></input>
        </div>
        <button
          className="btn resetPasswordBtn"
          onClick={handleResetPasswordBtn}
          id="resetPasswordBtn"
        >
          Reset password
        </button>
      </div>
    </div>
  );
}
