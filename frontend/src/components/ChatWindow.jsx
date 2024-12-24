import robot from '../assets/robot.jpg'
import user from '../assets/user.png'
import PropTypes from 'prop-types';

const ChatWindow = ({ messages }) => {
  return (
    <div className="w-full max-w-2xl bg-white shadow-md rounded-lg overflow-hidden">
      <div className="h-96 p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className="flex flex-row align-middle items-center gap-2 mb-2">
            {message.sender === 'other' && (
              <div className="h-full text-sm text-gray-500">
                <img src={robot} alt="AI" className="w-6 h-6 rounded-full inline-block" />
              </div>
            )}
            <div className={`flex-1 p-2 rounded-lg ${message.sender === 'me' ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-black self-start'}`}>
              {message.text}
            </div>
            {message.sender === 'me' && (
              <div className="h-full text-sm text-gray-500">
                <img src={user} alt="User" className="w-6 h-6 rounded-full inline-block" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
ChatWindow.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      sender: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ChatWindow;