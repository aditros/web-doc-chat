import { useState } from 'react'
import { CreateMLCEngine } from "@mlc-ai/web-llm"
import Layout from './components/Layout.jsx'
import ChatWindow from './components/ChatWindow.jsx'
import MessageInput from './components/MessageInput.jsx'

function App() {
  // Initialize with a progress callback
  const initProgressCallback = (progress) => {
    console.log("Model loading progress:", progress)
  }

  let engine = null

  useState(() => {
    const prepare = async () => {
      // Using CreateMLCEngine
      engine = await CreateMLCEngine("Llama-3.2-1B-Instruct-q4f16_1-MLC", { initProgressCallback })
    }
    prepare()
  });

  const [messages, setMessages] = useState([
    { sender: 'other', text: 'Hello!' },
    { sender: 'me', text: 'Hi! How are you?' },
  ]);

  const handleSendMessage = (message) => {
    setMessages([...messages, message]);
  };

  return (
    <Layout>
      <ChatWindow messages={messages} />
      <MessageInput onSend={handleSendMessage} />
    </Layout>
  );
}

export default App
