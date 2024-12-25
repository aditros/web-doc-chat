import { useState, createContext } from 'react'
import Layout from './components/Layout.jsx'
import ChatWindow from './components/ChatWindow.jsx'
import MessageInput from './components/MessageInput.jsx'

const MessageContext = createContext()

function App() {

  const [messages, setMessages] = useState([
    { sender: 'other', text: 'Hello! how can I help you with?' },
  ]);

  const handleSendMessage = (message) => {
    console.log('new message: ', message);
    setMessages([...messages, message]);
  };

  return (
    <MessageContext.Provider value={[messages, setMessages]}>
      <Layout>
        <ChatWindow/>
        <MessageInput onSend={handleSendMessage} />
      </Layout>
    </MessageContext.Provider>
  );
}

export { MessageContext }
export default App
