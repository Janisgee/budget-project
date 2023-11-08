import { useState, useRef } from 'react';
import { useAuth } from '../contexts/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { patchUpdateMe } from '../js/api-service';
import { showAlert } from '../js/alerts';

export default function Account() {
  const { user, updateUser } = useAuth();
  const [file, setFile] = useState(user.photo);
  const settingUserFormRef = useRef();
  const uploadPhoto = document.getElementById('photo');
  const userIcon = document.getElementById('userIcon');

  console.log(user);
  async function getFormDetailsAndUpdate() {
    const formData = new FormData(settingUserFormRef.current);
    const data = Object.fromEntries(formData.entries());

    if (file) {
      data.photo = file;
    } else {
      data.photo = user.photo;
    }

    try {
      //Update user information to server
      await patchUpdateMe(data, 'account');
    } catch (err) {
      console.log(err);
      showAlert('error', err.message, 3);
      return;
    }
    //Update user information UI
    updateUser(user, data);

    setFile('');
  }

  function handlePhotoChange(e) {
    if (e.target.files.length < 1) return;
    const newPhotoName = e.target.files[0].name;
    setFile(newPhotoName);
    e.preventDefault();
    if (uploadPhoto) {
      const [file] = uploadPhoto.files;
      if (file) {
        userIcon.src = URL.createObjectURL(file);
      }
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
                src={`/img/users/${user.photo}`}
                className="settingform_UserImage"
                id="userIcon"
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
              <label forhtml="photo">Choose new photo</label>
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
