import { useState, useRef } from 'react';
import { useAuth } from '../contexts/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { patchUpdateMe } from '../js/api-service';
import { showAlert } from '../js/alerts';

export default function Account() {
  const { user, updateUser } = useAuth();
  const [fileName, setFileName] = useState(user.photo);
  const [imageFile, setImageFile] = useState(null);
  const settingUserFormRef = useRef();
  const uploadPhoto = document.getElementById('photo');
  const userIcon = document.getElementById('userIcon');

  console.log(user);
  async function getFormDetailsAndUpdate() {
    const formData = new FormData(settingUserFormRef.current);

    try {
      //Update user information to server
      await patchUpdateMe(formData, 'account');
    } catch (err) {
      console.log(err);
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
    const file = e.target.files[0];
    console.log(file);
    setImageFile(file);
    setFileName(newPhotoName);
    e.preventDefault();
    if (uploadPhoto) {
      const [fileName] = uploadPhoto.files;
      if (fileName) {
        userIcon.src = URL.createObjectURL(fileName);
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
                src={`http://localhost:3000/img/users/${user.photo}`}
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
