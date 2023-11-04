import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

export default function Account() {
  return (
    <div className="wrapper">
      <div className="setting-heading">
        <FontAwesomeIcon icon={faGear} /> &nbsp; Your Account Settings
      </div>
      <form className="settingForm">
        <div className="settingFormGroup">
          <label forHtml="settingName" className="settingForm__label">
            Name
          </label>
          <input
            type="text"
            className="settingform__input"
            name="settingName"
            placeholder=""
            required
          ></input>
        </div>
        <div className="settingFormGroup">
          <label forHtml="settingEmail" className="settingForm__label">
            Email
          </label>
          <input
            type="text"
            className="settingform__input"
            name="settingEmail"
            placeholder=""
            required
          ></input>
        </div>
        <div className="settingFormGroup">
          <div className="settingForm_End">
            <div className="imageSet">
              {/* <img src="" alt="" /> */}
              <img
                src="https://i.pravatar.cc/50"
                className="settingform_UserImage"
                alt="Cameron"
              />
              <input
                type="file"
                className="settingform__ImageUpload"
                name="settingImage"
                accept="image/*"
              ></input>
              <label forHtml="settingImage">Choose new photo</label>
            </div>
            <a class="link btn" href="/">
              Save&nbsp;Settings
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
