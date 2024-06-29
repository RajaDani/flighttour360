import { Box, Typography, TextField, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { baseurl } from '../shared/baseUrl';

export default function ChatScreen (user)  {
  const [newMessage, setNewMessage] = useState('');
const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [replyText, setReplyText] = useState('');
  const [userChat,setUserChat]=useState([])
  const [selectedUserId, setSelectedUserId] = useState(null); // Assuming you track the selected user
  useEffect(() => {
    const newSocket = io('http://localhost:9000');

    newSocket.on('connect', () => {
      console.log('Connected to server with id:', newSocket.id);
      setSocket(newSocket);
    });

    newSocket.on('adminMessage', (data) => {
      console.log('Message from server:', data);
              // setSelectedUserId(data.userId)

      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);
 async function getChatByUser() {
        const response = await fetch(`${baseurl}/chat/user/${user.selectedUserId}`);
        const chats = await response.json();
        setUserChat(chats?.data);
    }
  useEffect(()=>{

    getChatByUser()
  },[user,messages])
  const sendMessageToUser = () => {
    if ( newMessage.trim() !== '') {
      socket.emit('adminReply', { userId: user.selectedUserId, message: newMessage });
          getChatByUser()

      setNewMessage(''); // Clear reply text after sending
    }
  };
 
  

  return (
    <div className="h-[900px] border border-1 mt-20 mr-32">
      <Box className="flex flex-col h-full">
        <Box className="flex-1 overflow-y-auto p-8 w-full flex flex-col">
          {userChat.map((message) => (
            <div key={message.createdAt} className={`flex  ${message.is_admin === 1 ? "bg-gray-300 mr-6 ml-auto" : "bg-green-300"} p-3 mt-1 mb-2 rounded-full w-96`}>
  <Typography variant="body1">{message.message}</Typography>
  <Typography variant="caption" color="textSecondary">
    {message.createdAt}
  </Typography>
</div>

          ))}
        </Box>
        <div className='flex items-center mb-10 ml-6 mr-6'>
          <input
          style={{borderRadius:20}}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className='rounded-full border border-2 w-full p-4 h-16'
          />

           <button variant="contained" color="primary" className='rounded-lg bg-blue-400 w-20 h-10 ml-8 mr-8' onClick={sendMessageToUser}>
            Send
          </button>
          </div>
      </Box>
    </div>
  );
};