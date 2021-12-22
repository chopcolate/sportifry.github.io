import { useEffect, useState } from 'react/cjs/react.development';
import '../css/ManageSite.css';
import { AddAccount, DeleteAccount, DisplayAccount } from '../util/Utilities';

export default function Account() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  useEffect(() => {
    const callback = async () => {
      await DisplayAccount();
    };
    callback();
  }, []);
  return (
    <div className="account">
      <div className="display-account"></div>
      <div className="handle-account">
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="text"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <label>Role</label>
        <input
          type="text"
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
          }}
        />
        <button
          onClick={() => {
            AddAccount({ username, password, role });
          }}
        >
          Add
        </button>
        <button
          onClick={() => {
            DeleteAccount(username);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
