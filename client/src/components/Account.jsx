import { useState, useRef } from 'react';
import { useAuth } from '../contexts/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { patchUpdateMe } from '../js/api-service';
import { showAlert } from '../js/alerts';

export default function Account() {
  const { user, updateUser } = useAuth();
  const [fileName, setFileName] = useState(user.photo);
  const settingUserFormRef = useRef();
  // const uploadPhoto = document.getElementById('photo');
  const userIconRef = useRef();

  async function getFormDetailsAndUpdate() {
    const formData = new FormData(settingUserFormRef.current);

    try {
      //Update user information to server
      await patchUpdateMe(formData, 'account');
    } catch (err) {
      showAlert('error', err.message, 3);
      return;
    }
    //Update user information UI
    if (fileName) {
      formData.photo = fileName;
    }
    updateUser(user, formData);
    window.location.reload(true);
  }

  function handlePhotoChange(e) {
    if (e.target.files.length < 1) return;
    const newPhotoName = e.target.files[0].name;
    setFileName(newPhotoName);
    e.preventDefault();
    const imageFile = e.target.files[0];

    if (imageFile) {
      const userIcon = userIconRef.current;
      userIcon.src = URL.createObjectURL(imageFile);
    }
  }

  function handleUpdate(e) {
    e.preventDefault();
    getFormDetailsAndUpdate();
  }

  return (
    <div className="wrapper">
      <div className="setting-heading">
        <FontAwesomeIcon icon={faGear} /> &nbsp; Your Account Settings
      </div>
      <form className="settingForm" ref={settingUserFormRef}>
        <div className="settingFormGroup">
          <label forhtml="settingName" className="settingForm__label">
            Name
          </label>
          <input
            type="text"
            className="settingform__input"
            name="name"
            defaultValue={user.name}
            id="name"
            required
          ></input>
        </div>
        <div className="settingFormGroup">
          <label forhtml="settingEmail" className="settingForm__label">
            Email
          </label>
          <input
            type="email"
            className="settingform__input"
            name="email"
            defaultValue={user.email}
            id="email"
            required
          ></input>
        </div>
        <hr />
        <div className="settingFormGroup">
          <div className="settingForm_End">
            <div className="imageSet">
              <img
                src={`http://localhost:3000/img/users/${user.photo}`}
                className="settingform_UserImage"
                id="userIcon"
                ref={userIconRef}
                alt={user.name}
              />
              <input
                type="file"
                className="settingform__ImageUpload"
                name="photo"
                id="photo"
                accept="image/*"
                onChange={handlePhotoChange}
              />
              <label htmlFor="photo">Choose new photo</label>
            </div>
            <a className="link btn" href="/" onClick={handleUpdate}>
              Save&nbsp;Settings
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
