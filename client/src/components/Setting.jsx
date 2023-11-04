import './Setting.css';

import Account from './Account';
import ChangePassword from './ChangePassword';

export default function Setting() {
  return (
    <div className="setting-container ">
      <div className="scroll-wrapper">
        <Account />
        <hr />
        <ChangePassword />
      </div>
    </div>
  );
}
