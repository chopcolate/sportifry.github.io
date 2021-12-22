import { useEffect } from 'react';
import { AddChat, DisplayChat } from '../util/Utilities';

export default function Chatbox(prop) {
  useEffect(() => {
    if (prop.on) {
      DisplayChat();
    }
  }, [prop.on]);
  return (
    <div className="chatbox-container">
      <div className="chatbox"></div>
      <input
        id="chatbox-input"
        type="text"
        placeholder="Enter to say something..."
        onKeyPress={async (e) => {
          if (e.key === 'Enter') {
            await AddChat(e.target.value);
            e.target.value = '';
          }
        }}
      />
    </div>
  );
}
