import '../css/ManageSite.css';
import Account from './Account';
import Song from './Song';

export default function ManageMain() {
  return (
    <div className="manage-container">
      {localStorage.getItem('role') === 'admin' ? <Account /> : ''}
      <Song />
    </div>
  );
}
