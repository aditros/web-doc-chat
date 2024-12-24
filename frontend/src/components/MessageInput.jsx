import { useState } from 'react';
import PropTypes from 'prop-types';

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
      if (message.trim()) {
          onSend({ sender: 'me', text: message });
          setMessage('');
      }
  };

  return (
      <div className="w-full max-w-2xl mt-4 flex items-center">
          <input
              type="text"
              className="flex-grow p-2 border rounded-l-lg border-gray-300"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
          />
          <button
              className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700"
              onClick={handleSend}
          >
              Send
          </button>
      </div>
  );
};
MessageInput.propTypes = {
  onSend: PropTypes.func.isRequired,
};

export default MessageInput;