import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { MLCEngine } from "@mlc-ai/web-llm"
import { MessageContext } from '../App.jsx';

let engine = null

const MessageInput = ({ onSend }) => {
  const [currentMessage, setCurrentMessage] = useState('')
  const [messages, setMessages] = useContext(MessageContext)
  const [isModelLoaded, setIsModelLoaded] = useState(true)
  const [isModelAnswering, setIsModelAnswering] = useState(false)

  const doAnswer = async () => {
    console.log("isModelLoaded", isModelLoaded)
    console.log("isModelAnswering", isModelAnswering)
    if (!isModelLoaded || isModelAnswering || engine === null) {
      return
    }
    await handleReceive()
  }

  // Initialize with a progress callback
  const initProgressCallback = (progress) => {
    console.log("Model loading progress:", progress.progress)
  }

  const handleSend = () => {
    if (currentMessage.trim()) {
      console.log("engine ", engine)
      if (engine === null) {
        setIsModelLoaded(false)
        const prepare = async () => {
          engine = new MLCEngine()
          const config = {
            temperature: 1.0,
            top_p: 1
          };
          engine.setInitProgressCallback(initProgressCallback)
          await engine.reload("Llama-3.2-1B-Instruct-q4f16_1-MLC", config)
          setIsModelLoaded(true)
          const answering = async () => {
            await doAnswer()
          }
          answering()
        }
        prepare()
      } else {
        const answering = async () => {
          await doAnswer()
        }
        answering()
      }
      setCurrentMessage('');
    }
  };

  const handleReceive = async () => {
    console.log('engine ', engine)
    const instructionMessages = [
      { role: "system", content: "You are a helpful AI assistant." },
      { role: "user", content: currentMessage },
    ]

    // Chunks is an AsyncGenerator object
    const chunks = await engine.chat.completions.create({
      messages: instructionMessages,
      temperature: 1,
      stream: true, // <-- Enable streaming
      stream_options: { include_usage: true },
    });
    console.log('answering...')

    let reply = "";
    setIsModelAnswering(true)
    for await (const chunk of chunks) {
      reply += chunk.choices[0]?.delta.content || "";
      console.log(reply);
      console.log('messages ', messages)
      setMessages([...messages, { sender: 'me', text: currentMessage }, { sender: "other", text: reply }]);
      if (chunk.usage) {
        setIsModelAnswering(false)
        console.log(chunk.usage); // only last chunk has usage
      }
    }
  }

  return (
    <div className="w-full max-w-2xl mt-4 flex items-center">
      <input
        type="text"
        className="flex-grow p-2 border rounded-l-lg border-gray-300"
        placeholder="Type your message..."
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSend()
          }
        }}
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